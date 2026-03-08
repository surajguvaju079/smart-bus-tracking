import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AppHeader from "../../components/AppHeader";

// Existing buses or initialize 10-20 buses
const initialBuses = [
  {
    id: 1,
    busNo: "27",
    route: "Ratnapark → Kalanki",
    eta: 18,
    lat: 27.7017,
    lng: 85.3206,
    status: "Live",
  },
  {
    id: 2,
    busNo: "12",
    route: "Tripureshwor → Balkhu",
    eta: 22,
    lat: 27.705,
    lng: 85.312,
    status: "Moderate",
  },
  {
    id: 3,
    busNo: "5",
    route: "Kalanki → Bhaktapur",
    eta: 30,
    lat: 27.709,
    lng: 85.31,
    status: "Live",
  },
  // Add your existing buses here
];

export default function LiveBusTracking() {
  const router = useRouter();
  const [buses, setBuses] = useState(initialBuses);

  // Simulate real-time updates for ETA and location
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prev) =>
        prev.map((bus) => ({
          ...bus,
          eta: Math.max(1, bus.eta + Math.floor(Math.random() * 3 - 1)),
          lat: bus.lat + (Math.random() - 0.5) * 0.0005,
          lng: bus.lng + (Math.random() - 0.5) * 0.0005,
        })),
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView className="flex-1 bg-white">
      <AppHeader />
      <View className="px-5 mt-6">
        <Text className="text-2xl font-bold text-green-700 text-center">
          Live Bus Tracking
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
                className={`mt-1 text-xs font-semibold ${bus.status === "Live" ? "text-green-700" : "text-yellow-600"}`}
              >
                {bus.status}
              </Text>

              <TouchableOpacity
                className="bg-green-700 px-3 py-1 mt-2 rounded-lg"
                onPress={() =>
                  router.push({
                    pathname: "/live-bus-map",
                    params: { tripId: 1 },
                  })
                }
              >
                <Text className="text-white font-semibold text-sm">
                  View Map
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
