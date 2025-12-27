import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";

export default function ETAPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [eta, setETA] = useState<number | null>(null);
  const [weather, setWeather] = useState<string | null>(null);
  const [traffic, setTraffic] = useState<string | null>(null);

  // Dummy AI prediction function with weather and traffic
  const predictETA = () => {
    if (!from.trim() || !to.trim()) {
      alert("Please enter both From and To locations");
      return;
    }

    // Simulate traffic: random "Low", "Moderate", "Heavy"
    const trafficOptions = ["Low", "Moderate", "Heavy"];
    const trafficCondition = trafficOptions[Math.floor(Math.random() * 3)];
    setTraffic(trafficCondition);

    // Simulate weather: random "Sunny", "Rainy", "Stormy"
    const weatherOptions = ["Sunny", "Rainy", "Stormy"];
    const weatherCondition = weatherOptions[Math.floor(Math.random() * 3)];
    setWeather(weatherCondition);

    // Base ETA
    let baseETA = Math.floor(Math.random() * 20 + 10); // 10-30 minutes

    // Adjust ETA based on traffic
    if (trafficCondition === "Moderate") baseETA += 5;
    if (trafficCondition === "Heavy") baseETA += 10;

    // Adjust ETA based on weather
    if (weatherCondition === "Rainy") baseETA += 5;
    if (weatherCondition === "Stormy") baseETA += 10;

    setETA(baseETA);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <AppHeader />

      <View className="px-6 mt-6">
        <Text className="text-2xl font-bold text-green-700 text-center">
          ETA Prediction
        </Text>

        {/* From */}
        <View className="flex-row items-center border border-green-300 rounded-lg px-4 py-3 mt-6">
          <MaterialIcons name="my-location" size={22} color="#15803d" />
          <TextInput
            placeholder="From (Current Location)"
            value={from}
            onChangeText={setFrom}
            className="ml-3 flex-1 text-gray-700"
          />
        </View>

        {/* To */}
        <View className="flex-row items-center border border-green-300 rounded-lg px-4 py-3 mt-4">
          <MaterialIcons name="location-on" size={22} color="#15803d" />
          <TextInput
            placeholder="To (Destination)"
            value={to}
            onChangeText={setTo}
            className="ml-3 flex-1 text-gray-700"
          />
        </View>

        {/* Predict Button */}
        <TouchableOpacity
          onPress={predictETA}
          className="bg-green-700 py-3 rounded-lg mt-6"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Predict ETA
          </Text>
        </TouchableOpacity>

        {/* ETA Result */}
        {eta !== null && (
          <View className="mt-6 bg-green-100 rounded-lg p-4">
            <Text className="text-green-800 text-lg font-semibold text-center">
              Estimated Time of Arrival
            </Text>

            <Text className="text-green-700 text-center mt-2 text-xl">
              {eta} minutes
            </Text>

            {/* Weather & Traffic Info */}
            <View className="mt-4">
              <Text className="text-green-800 font-semibold">Traffic:</Text>
              <Text className="text-green-700">{traffic}</Text>

              <Text className="text-green-800 font-semibold mt-2">Weather:</Text>
              <Text className="text-green-700">{weather}</Text>
            </View>

            {/* Explanation */}
            <Text className="text-green-700 mt-4 text-sm">
              * ETA is dynamically adjusted based on current traffic and weather conditions.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
