import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AppHeader from "@/components/AppHeader";

export default function DriverDashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AppHeader />

      <View style={styles.content}>
        <Text style={styles.title}>Driver Dashboard</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/create-trip")}
        >
          <Text style={styles.buttonText}>Start New Trip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/active-trip")}
        >
          <Text style={styles.buttonText}>Active Trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#15803d",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#15803d",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 200,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});