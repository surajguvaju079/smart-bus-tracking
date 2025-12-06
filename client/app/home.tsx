import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons, Entypo } from "@expo/vector-icons";
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
    <View className="flex-1 bg-white">

      {/* ✅ GREEN HEADER (HEIGHT INCREASED SLIGHTLY) */}
      <View className="bg-green-700 py-8 px-4 rounded-b-2xl items-center shadow min-h-[155px] justify-center">
        <Text className="text-3xl font-bold text-white">Smart Bus System</Text>
        <Text className="text-white text-center mt-2 text-sm">
          AI-powered public transportation app with real-time tracking and cashless ticketing
        </Text>
      </View>

      {/* ✅ Scrollable Features */}
      <ScrollView className="flex-1 px-4 mt-4 mb-16">
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

      {/* ✅ Bottom Tab Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex-row justify-around py-3 shadow-lg">
        <TouchableOpacity className="items-center">
          <MaterialIcons name="home" size={28} color="#16a34a" />
          <Text className="text-green-700 text-xs mt-1">Home</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <MaterialIcons name="directions-bus" size={28} color="gray" />
          <Text className="text-gray-500 text-xs mt-1">Buses</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Ionicons name="time-outline" size={28} color="gray" />
          <Text className="text-gray-500 text-xs mt-1">ETA</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <FontAwesome5 name="money-bill-wave" size={28} color="gray" />
          <Text className="text-gray-500 text-xs mt-1">Tickets</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Entypo name="menu" size={28} color="gray" />
          <Text className="text-gray-500 text-xs mt-1">More</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
