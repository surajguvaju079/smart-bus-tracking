import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface DashboardCardProps {
  title: string;
  count: number;
}

export default function DashboardCard({ title, count }: DashboardCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ECFDF5", // green-50
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 176, // ~w-44
    alignItems: "center",
  },
  title: {
    color: "#15803D", // green-700
    fontWeight: "bold",
    fontSize: 18, // text-lg
  },
  count: {
    color: "#064E3B", // green-900
    fontWeight: "800", // extrabold
    fontSize: 28, // text-2xl
    marginTop: 8,
  },
});