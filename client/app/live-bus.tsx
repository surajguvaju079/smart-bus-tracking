import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AppHeader from "../components/AppHeader";
import { trip } from "@/api/trip";

// Sample 20 proper bus routes in Kathmandu
const busRoutes = [
  { busNo: "1", route: "Ratnapark → Kalanki" },
  { busNo: "2", route: "Tripureshwor → Gongabu" },
  { busNo: "3", route: "Kalanki → Bhaktapur" },
  { busNo: "4", route: "Ratnapark → Balkhu" },
  { busNo: "5", route: "Chabahil → Lagankhel" },
  { busNo: "6", route: "Ratnapark → Maharajgunj" },
  { busNo: "7", route: "Tripureshwor → Thamel" },
  { busNo: "8", route: "Kalanki → Chabahil" },
  { busNo: "9", route: "Ratnapark → Koteshwor" },
  { busNo: "10", route: "Maharajgunj → Gongabu" },
  { busNo: "11", route: "Ratnapark → Banasthali" },
  { busNo: "12", route: "Tripureshwor → Lagankhel" },
  { busNo: "13", route: "Kalanki → Bhaktapur" },
  { busNo: "14", route: "Ratnapark → Balkhu" },
  { busNo: "15", route: "Chabahil → Kalanki" },
  { busNo: "16", route: "Ratnapark → Maharajgunj" },
  { busNo: "17", route: "Tripureshwor → Thamel" },
  { busNo: "18", route: "Kalanki → Koteshwor" },
  { busNo: "19", route: "Ratnapark → Gongabu" },
  { busNo: "20", route: "Maharajgunj → Lagankhel" },
];

// Initialize buses with coordinates and status
const generateBuses = () =>
  busRoutes.map((bus, index) => ({
    ...bus,
    id: index + 1,
    eta: Math.floor(Math.random() * 20 + 10),
    lat: 27.7017 + Math.random() * 0.02,
    lng: 85.3206 + Math.random() * 0.02,
    status: Math.random() > 0.3 ? "Live" : "Moderate",
  }));

export default function LiveBusDashboard() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [buses, setBuses] = useState(generateBuses());

  useEffect(() => {
    fetchBuses();
  }, []);

  // Simulate live ETA updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prev) =>
        prev.map((bus) => ({
          ...bus,
          eta: Math.max(1, bus.eta + Math.floor(Math.random() * 3 - 1)),
        })),
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchBuses = async () => {
    setLoading(true);
    try {
      const res = await trip.getAll();
      if (res.status === 200) {
        const trips = res.data.responseObject.trips;
        console.log("Fetched trips:", trips);
        const updatedBuses = trips.map((trip: any) => ({
          id: trip.id,
          busNo: trip.busNo,
          route: trip.route,
          eta: trip.eta,
          lat: trip.latitude,
          lng: trip.longitude,
          status: trip.status,
        }));
        setBuses(updatedBuses);
      }
    } catch (error) {
      console.error("Error fetching buses:", error);
      Alert.alert("Error", "Failed to fetch bus data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={"green"} />
      </View>
    );

  return (
    <ScrollView className="flex-1 bg-white">
      <AppHeader />

      <View className="px-5 mt-6">
        <Text className="text-2xl font-bold text-green-700 text-center">
          Live Bus Dashboard
        </Text>

        {buses.map((bus) => (
          <View
            key={bus.id}
            className="flex-row justify-between items-center bg-green-50 border border-green-200 rounded-xl p-4 mt-4"
          >
            <View className="flex-row items-center">
              <MaterialIcons name="directions-bus" size={28} color="#15803d" />
              <View className="ml-3">
                <Text className="text-green-800 font-semibold text-lg">
                  Bus {bus.busNo}
                </Text>
                <Text className="text-gray-700 text-sm">{bus.route}</Text>
              </View>
            </View>

            <View className="items-end">
              <Text className="text-gray-700 text-sm">ETA: {bus.eta} min</Text>
              <Text
                className={`mt-1 text-xs font-semibold ${
                  bus.status === "Live" ? "text-green-700" : "text-yellow-600"
                }`}
              >
                {bus.status}
              </Text>

              <TouchableOpacity
                className="bg-green-700 px-3 py-1 mt-2 rounded-lg"
                onPress={() =>
                  router.push({
                    pathname: "/live-bus-map",
                    params: {
                      tripId: 1,
                    },
                  })
                }
              >
                <Text className="text-white font-semibold text-sm">View</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
