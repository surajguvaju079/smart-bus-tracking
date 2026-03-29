import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../../components/AppHeader";

export default function DriverLogin() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AppHeader />

      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Driver Login</Text>

        {/* Mobile Number */}
        <View style={styles.inputBox}>
          <MaterialIcons name="phone" size={22} color="#15803d" />
          <TextInput
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>

        {/* Password */}
        <View style={styles.inputBox}>
          <MaterialIcons name="lock" size={22} color="#15803d" />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Switch */}
        <TouchableOpacity
          onPress={() => router.push("/driver-register")}
          style={styles.switchBox}
        >
          <Text style={styles.switchText}>
            New Driver? Register here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    paddingHorizontal: 24,
    marginTop: 48,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#15803d",
    textAlign: "center",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#86efac", // green-300
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
  },

  input: {
    marginLeft: 12,
    flex: 1,
    fontSize: 16,
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
    fontSize: 18,
    fontWeight: "600",
  },

  switchBox: {
    marginTop: 20,
  },

  switchText: {
    textAlign: "center",
    color: "#15803d",
  },
});