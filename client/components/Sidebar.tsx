import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface SidebarProps {
  onSelect: (page: string) => void;
}

export default function Sidebar({ onSelect }: SidebarProps) {
  const menuItems = [
    { name: "Dashboard", icon: "dashboard" },
    { name: "Buses", icon: "directions-bus" },
    { name: "Drivers", icon: "person" },
    { name: "Routes", icon: "alt-route" },
    { name: "Payments", icon: "payment" },
    { name: "Fares", icon: "attach-money" },
    { name: "Reports", icon: "assessment" },
    { name: "Settings", icon: "settings" },
    { name: "Users", icon: "people" },
  ];

  return (
    <View className="w-48 bg-green-100 p-4">
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          onPress={() => onSelect(item.name)}
          className="flex-row items-center py-3 px-2 rounded-lg hover:bg-green-200 mb-2"
        >
          <MaterialIcons name={item.icon as any} size={22} color="#166534" />
          <Text className="ml-3 text-green-800 font-semibold">{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
