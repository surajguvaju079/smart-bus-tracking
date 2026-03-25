import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";

export default function ETAPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [eta, setETA] = useState<number | null>(null);

  const predictETA = () => {
    const randomETA = Math.floor(Math.random() * 20 + 10); // 10-30 minutes
    setETA(randomETA);
  };

  return (
    <ScrollView style={styles.container}>
      <AppHeader />

      <View style={styles.content}>
        <Text style={styles.title}>ETA Prediction</Text>

        {/* From */}
        <View style={styles.inputRow}>
          <MaterialIcons name="my-location" size={22} color="#15803d" />
          <TextInput
            placeholder="From (Current Location)"
            value={from}
            onChangeText={setFrom}
            style={styles.input}
          />
        </View>

        {/* To */}
        <View style={[styles.inputRow, { marginTop: 12 }]}>
          <MaterialIcons name="location-on" size={22} color="#15803d" />
          <TextInput
            placeholder="To (Destination)"
            value={to}
            onChangeText={setTo}
            style={styles.input}
          />
        </View>

        {/* Predict Button */}
        <TouchableOpacity style={styles.button} onPress={predictETA}>
          <Text style={styles.buttonText}>Predict ETA</Text>
        </TouchableOpacity>

        {/* ETA Result */}
        {eta !== null && (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>Estimated Time of Arrival</Text>
            <Text style={styles.resultValue}>{eta} minutes</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#15803d",
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#15803d",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 24,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#111111",
  },
  button: {
    backgroundColor: "#15803d",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  resultBox: {
    backgroundColor: "#d1fae5",
    borderRadius: 10,
    padding: 16,
    marginTop: 24,
    alignItems: "center",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#065f46",
    textAlign: "center",
  },
  resultValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#047857",
    marginTop: 8,
    textAlign: "center",
  },
});