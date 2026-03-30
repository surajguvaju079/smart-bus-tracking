import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
    <View style={styles.sidebar}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.item}
          onPress={() => onSelect(item.name)}
        >
          <MaterialIcons name={item.icon as any} size={24} color="#166534" />
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 240,
    backgroundColor: "#f0fdf4",
    padding: 16,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 10,
  },

  text: {
    marginLeft: 12,
    color: "#166534",
    fontWeight: "600",
    fontSize: 14,
  },
});