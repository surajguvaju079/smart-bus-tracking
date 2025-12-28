import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface SidebarProps {
  onSelect: (page: string) => void;
}

export default function Sidebar({ onSelect }: SidebarProps) {
  const menuItems = ["Dashboard", "Buses", "Drivers", "Routes", "Payments"];

  return (
    <View className="w-48 bg-green-100 p-4">
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => onSelect(item)}
          className="py-3 px-2 rounded-lg hover:bg-green-200 mb-2"
        >
          <Text className="text-green-800 font-semibold">{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
