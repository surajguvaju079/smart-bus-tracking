import { View, Text, StyleSheet } from "react-native";

export default function AppHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Smart Bus System</Text>
      <Text style={styles.subtitle}>
        AI-powered public transportation app with real-time tracking
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#15803d", // green-700
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#d1fae5", // green-100
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
});