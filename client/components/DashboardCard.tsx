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
    backgroundColor: "#dcfce7", // green-50
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    width: 176, // approx w-44
    alignItems: "center",
    marginRight: 12, // spacing if multiple cards in row
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#15803d", // green-700
  },
  count: {
    fontSize: 24,
    fontWeight: "800",
    color: "#064e3b", // green-900
    marginTop: 8,
  },
});