import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const features = [
  {
    id: "1",
    name: "Real-time Bus Tracking",
    icon: <MaterialIcons name="directions-bus" size={28} color="#16a34a" />,
    route: "/busTracking",
  },
  {
    id: "2",
    name: "ETA Prediction",
    icon: <Ionicons name="time-outline" size={28} color="#16a34a" />,
    route: "/etaPrediction",
  },
  {
    id: "3",
    name: "Cashless Ticket Payment",
    icon: <FontAwesome5 name="money-bill-wave" size={28} color="#16a34a" />,
    route: "/ticketPayment",
  },
  {
    id: "4",
    name: "Best Route Recommendation",
    icon: <MaterialIcons name="route" size={28} color="#16a34a" />,
    route: "/bestRoute",
  },
  {
    id: "5",
    name: "Live Bus Locations",
    icon: <Ionicons name="location-outline" size={28} color="#16a34a" />,
    route: "/liveBus",
  },
];

export default function Home() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="mb-6 items-center">
        <Text className="text-3xl font-bold text-green-700">
          Smart Bus System
        </Text>
        <Text className="text-gray-500 text-center mt-1">
          AI-powered public transportation app with real-time tracking and cashless ticketing
        </Text>
      </View>

      {/* Features Grid */}
      <View className="flex-row flex-wrap justify-between">
        {features.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            className="w-48 bg-gray-100 p-4 mb-4 rounded-xl shadow items-center justify-center"
            onPress={() => router.push(feature.route as any)}
          >
            <View className="mb-2">{feature.icon}</View>
            <Text className="text-center font-semibold text-gray-800">
              {feature.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
