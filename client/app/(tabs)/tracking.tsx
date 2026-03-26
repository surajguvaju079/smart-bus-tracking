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

import { trip } from "@/api/trip";
import AppHeader from "@/components/AppHeader";

export default function LiveBusTracking() {
  const [loading, setLoading] = useState(false);
  const [buses, setBuses] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    setLoading(true);

    try {
      const res = await trip.getAll();

      if (res.status === 200) {
        const trips = res.data.responseObject.trips;

        console.log("Fetched trips:", trips);

        const updatedBuses = trips
          .filter((trip: any) => trip.status !== "COMPLETED") // show only active
          .map((trip: any) => ({
            id: trip.id,
            busNo: trip.vehicleNumber,
            route: `${trip.startLocationName} → ${trip.endLocationName}`,
            lat: Number(trip.startLatitude),
            lng: Number(trip.startLongitude),
            status: trip.status === "PLANNED" ? "Scheduled" : "Live",
          }));

        setBuses(updatedBuses);
      }
    } catch (error) {
      console.error("Error fetching buses:", error);
      Alert.alert("Error", "Failed to fetch buses");
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

        {buses.length === 0 && (
          <View className="mt-10 items-center">
            <Text className="text-gray-500 text-base">
              No active buses available
            </Text>
          </View>
        )}

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
              <Text
                className={`text-xs font-semibold ${
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
                    params: { tripId: bus.id },
                  })
                }
              >
                <Text className="text-white font-semibold text-sm">Track</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
