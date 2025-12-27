import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type SidebarProps = {
  onSelect: (page: string) => void;
};

export default function Sidebar({ onSelect }: SidebarProps) {
  const items = [
    { name: "Buses", icon: "directions-bus" },
    { name: "Drivers", icon: "person" },
    { name: "Routes", icon: "alt-route" },
    { name: "Payments", icon: "payment" },
    { name: "Fares", icon: "attach-money" },
    { name: "Users", icon: "groups" },
    { name: "Reports", icon: "bar-chart" },
    { name: "Settings", icon: "settings" },
  ];

  return (
    <View className="w-60 bg-green-50 p-4">
      {items.map((item) => (
        <TouchableOpacity
          key={item.name}
          className="flex-row items-center py-3 px-2 mb-2 rounded-lg hover:bg-green-100"
          onPress={() => onSelect(item.name)}
        >
          <MaterialIcons name={item.icon as any} size={24} color="#166534" />
          <Text className="ml-3 text-green-700 font-semibold">{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
