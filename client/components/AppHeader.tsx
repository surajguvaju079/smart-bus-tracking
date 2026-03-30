import { View, Text, StyleSheet } from "react-native";

type Header = {
  text?: string;
};

// Figma-style Green Header
export default function AppHeader({
  text = "Smart Bus System",
}: Header) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{text}</Text>

      <Text style={styles.subtitle}>
        AI-powered public transportation app with real-time tracking
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#15803d",
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#d1fae5",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
  },
});