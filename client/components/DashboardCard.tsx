import React from "react";
import { View, Text } from "react-native";

interface DashboardCardProps {
  title: string;
  count: number;
}

export default function DashboardCard({ title, count }: DashboardCardProps) {
  return (
    <View className="bg-green-50 p-5 rounded-xl shadow w-44 items-center">
      <Text className="text-green-700 font-bold text-lg">{title}</Text>
      <Text className="text-green-900 font-extrabold text-2xl mt-2">{count}</Text>
    </View>
  );
}
