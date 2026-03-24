import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import AppHeader from "@/components/AppHeader";

export default function DriverRegister() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <AppHeader />

      <View style={styles.content}>
        {/* Profile Image */}
        <View style={styles.center}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <MaterialIcons name="camera-alt" size={32} color="#15803d" />
            )}
          </TouchableOpacity>

          <Text style={styles.uploadText}>Upload Profile Photo</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Driver Registration</Text>

        {/* Driver Name */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={22} color="#15803d" />
          <TextInput placeholder="Driver Name" style={styles.input} />
        </View>

        {/* Mobile Number */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="phone" size={22} color="#15803d" />
          <TextInput
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>

        {/* Vehicle Number */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="directions-bus" size={22} color="#15803d" />
          <TextInput placeholder="Vehicle Number" style={styles.input} />
        </View>

        {/* Route */}
        <View style={styles.inputContainer}>
          <Ionicons name="git-network-outline" size={22} color="#15803d" />
          <TextInput
            placeholder="Route (e.g. Ratnapark - Kalanki)"
            style={styles.input}
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={22} color="#15803d" />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Register Driver</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity
          onPress={() => router.push("/user-login")}
          style={styles.loginLink}
        >
          <Text style={styles.loginText}>Already registered? Login</Text>
        </TouchableOpacity>
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
    marginTop: 24,
  },

  center: {
    alignItems: "center",
  },

  imagePicker: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 2,
    borderColor: "#16a34a",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 56,
  },

  uploadText: {
    marginTop: 8,
    color: "#15803d",
    fontSize: 14,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#15803d",
    textAlign: "center",
    marginTop: 24,
  },

  inputContainer: {
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
    fontSize: 16,
  },

  button: {
    backgroundColor: "#15803d",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 28,
  },

  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },

  loginLink: {
    marginTop: 20,
    marginBottom: 40,
  },

  loginText: {
    textAlign: "center",
    color: "#15803d",
  },
});