import React from "react";
import { View, Text } from "react-native";

export default function Header() {
  return (
    <View className="bg-green-700 py-4 px-5 shadow-md">
      <Text className="text-white text-2xl font-bold">Admin Dashboard</Text>
    </View>
  );
}
