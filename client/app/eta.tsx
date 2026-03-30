import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";

export default function ETAPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [eta, setETA] = useState<number | null>(null);

  const predictETA = () => {
    const randomETA = Math.floor(Math.random() * 20 + 10);
    setETA(randomETA);
  };

  return (
    <ScrollView style={styles.container}>
      <AppHeader />

      <View style={styles.wrapper}>
        <Text style={styles.title}>ETA Prediction</Text>

        {/* From */}
        <View style={styles.inputBox}>
          <MaterialIcons name="my-location" size={22} color="#15803d" />
          <TextInput
            placeholder="From (Current Location)"
            value={from}
            onChangeText={setFrom}
            style={styles.input}
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* To */}
        <View style={styles.inputBox}>
          <MaterialIcons name="location-on" size={22} color="#15803d" />
          <TextInput
            placeholder="To (Destination)"
            value={to}
            onChangeText={setTo}
            style={styles.input}
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={predictETA}>
          <Text style={styles.buttonText}>Predict ETA</Text>
        </TouchableOpacity>

        {/* Result */}
        {eta !== null && (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>
              Estimated Time of Arrival
            </Text>

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
    backgroundColor: "#fff",
  },

  wrapper: {
    paddingHorizontal: 24,
    marginTop: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#15803d",
    textAlign: "center",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#86efac",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
  },

  input: {
    marginLeft: 12,
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },

  button: {
    backgroundColor: "#15803d",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },

  resultBox: {
    marginTop: 24,
    backgroundColor: "#dcfce7",
    borderRadius: 8,
    padding: 16,
  },

  resultTitle: {
    color: "#166534",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  resultValue: {
    color: "#15803d",
    textAlign: "center",
    marginTop: 8,
    fontSize: 20,
    fontWeight: "700",
  },
});