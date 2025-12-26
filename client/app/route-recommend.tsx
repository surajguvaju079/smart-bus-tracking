import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import AppHeader from "../components/AppHeader";

const ALL_ROUTES = [
  { busNo: "27", stops: ["Ratnapark", "Tripureshwor", "Kalanki"], eta: 18, lat: 27.7017, lng: 85.3206, status: "Live" },
  { busNo: "12", stops: ["Ratnapark", "Balkhu", "Kalanki"], eta: 24, lat: 27.705, lng: 85.312, status: "Moderate" },
  { busNo: "5", stops: ["Tripureshwor", "Kalanki"], eta: 30, lat: 27.709, lng: 85.31, status: "Live" },
  { busNo: "3", stops: ["Kalanki", "Bhaktapur"], eta: 35, lat: 27.71, lng: 85.325, status: "Moderate" },
  { busNo: "7", stops: ["Tripureshwor", "Thamel"], eta: 22, lat: 27.704, lng: 85.315, status: "Live" },
  { busNo: "9", stops: ["Ratnapark", "Koteshwor"], eta: 28, lat: 27.708, lng: 85.318, status: "Live" },
  { busNo: "15", stops: ["Chabahil", "Kalanki"], eta: 26, lat: 27.706, lng: 85.322, status: "Moderate" },
  { busNo: "18", stops: ["Kalanki", "Koteshwor"], eta: 32, lat: 27.703, lng: 85.319, status: "Live" },
  { busNo: "20", stops: ["Maharajgunj", "Lagankhel"], eta: 40, lat: 27.707, lng: 85.321, status: "Moderate" },
  { busNo: "21", stops: ["Ratnapark", "Gongabu"], eta: 29, lat: 27.702, lng: 85.317, status: "Live" },
];

export default function RouteRecommend() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [routes, setRoutes] = useState(ALL_ROUTES);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  const findRoutes = () => {
    if (!from.trim() || !to.trim()) {
      alert("Please enter both current location and destination");
      return;
    }

    const filteredRoutes = ALL_ROUTES.filter((r) => {
      const fromIndex = r.stops.findIndex(
        (stop) => stop.toLowerCase() === from.trim().toLowerCase()
      );
      const toIndex = r.stops.findIndex(
        (stop) => stop.toLowerCase() === to.trim().toLowerCase()
      );

      return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
    });

    if (filteredRoutes.length === 0) {
      alert("No route found for the entered locations");
    } else {
      filteredRoutes.sort((a, b) => a.eta - b.eta); // sort by fastest ETA
    }

    setRoutes(filteredRoutes);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <AppHeader />
      <View className="px-5 mt-6">
        <Text className="text-2xl font-bold text-green-700 text-center">
          Route Recommendation
        </Text>

        <View className="flex-row items-center border border-green-300 rounded-xl px-4 py-3 mt-6">
          <MaterialIcons name="my-location" size={22} color="#15803d" />
          <TextInput
            placeholder="From (Current Location)"
            className="ml-3 flex-1 text-gray-700"
            value={from}
            onChangeText={setFrom}
          />
        </View>

        <View className="flex-row items-center border border-green-300 rounded-xl px-4 py-3 mt-4">
          <MaterialIcons name="location-on" size={22} color="#15803d" />
          <TextInput
            placeholder="To (Destination)"
            className="ml-3 flex-1 text-gray-700"
            value={to}
            onChangeText={setTo}
          />
        </View>

        <TouchableOpacity
          className="bg-green-700 py-4 rounded-xl mt-5"
          onPress={findRoutes}
        >
          <Text className="text-white text-center font-bold text-lg">
            Find Best Routes
          </Text>
        </TouchableOpacity>

        <Text className="text-lg font-bold text-green-700 mt-6">
          Recommended Routes
        </Text>

        {routes.map((r) => (
          <View key={r.busNo} className="border border-green-200 rounded-xl p-4 mt-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-green-700">
                Bus No: {r.busNo}
              </Text>
              <Text className={`text-sm font-semibold ${r.status === "Live" ? "text-green-600" : "text-yellow-600"}`}>
                {r.status}
              </Text>
            </View>

            <Text className="text-gray-600 mt-1">{r.stops.join(" → ")}</Text>

            <View className="flex-row justify-between mt-3">
              <Text className="text-sm text-gray-700">⏱ ETA: {r.eta} min</Text>
              <Text className="text-sm text-gray-700">📍 Stops: {r.stops.length}</Text>
            </View>

            <View className="flex-row mt-4 justify-between">
              <TouchableOpacity
                className="border border-green-600 px-4 py-2 rounded-lg"
                onPress={() =>
                  router.push({ pathname: "/live-bus-map", params: r })
                }
              >
                <Text className="text-green-700 font-semibold text-center">
                  View Map
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`px-4 py-2 rounded-lg ${selectedRoute?.busNo === r.busNo ? "bg-green-800" : "bg-green-700"}`}
                onPress={() => {
                  setSelectedRoute(r);
                  alert(`You selected Bus ${r.busNo} for your journey!`);
                }}
              >
                <Text className="text-white font-semibold text-center">
                  {selectedRoute?.busNo === r.busNo ? "Selected" : "Select Route"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
