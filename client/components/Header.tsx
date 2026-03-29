import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Admin Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#15803d",
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4, // Android shadow
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});