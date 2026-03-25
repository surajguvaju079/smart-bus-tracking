import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import { driver } from "@/api/driver";

export default function DriverRegister() {
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleRegister = async () => {
    if (!name || !email || !vehicleNumber || !licenseNumber || !password) {
      return Alert.alert("Error", "All fields are required");
    }

    try {
      setLoading(true);

      const res = await driver.create({
        name,
        email,
        password,
        vehicle_number: vehicleNumber,
        license_number: licenseNumber,
        profile_image: image || "",
      });

      if (res.data.success) {
        Alert.alert("Success", "Driver registered successfully");
        router.push("/user-login");
      }
    } catch (error: any) {
      console.log(error.response?.data);

      Alert.alert(
        "Error",
        error.response?.data?.error?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <AppHeader />

      <View style={styles.inner}>
        {/* Image */}
        <View style={styles.center}>
          <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <MaterialIcons name="camera-alt" size={32} color="#15803d" />
            )}
          </TouchableOpacity>
          <Text style={styles.uploadText}>Upload Profile Photo</Text>
        </View>

        <Text style={styles.title}>Driver Registration</Text>

        {/* Inputs */}
        <View style={styles.inputBox}>
          <MaterialIcons name="person" size={22} color="#15803d" />
          <TextInput
            placeholder="Driver Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputBox}>
          <MaterialIcons name="email" size={22} color="#15803d" />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputBox}>
          <MaterialIcons name="directions-bus" size={22} color="#15803d" />
          <TextInput
            placeholder="Vehicle Number"
            style={styles.input}
            value={vehicleNumber}
            onChangeText={setVehicleNumber}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="card-outline" size={22} color="#15803d" />
          <TextInput
            placeholder="License Number"
            style={styles.input}
            value={licenseNumber}
            onChangeText={setLicenseNumber}
          />
        </View>

        <View style={styles.inputBox}>
          <MaterialIcons name="lock" size={22} color="#15803d" />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Registering..." : "Register Driver"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/user-login")}>
          <Text style={styles.loginText}>
            Already registered? Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  inner: { padding: 20 },

  center: { alignItems: "center" },
  imageBox: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#15803d",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "100%", height: "100%", borderRadius: 60 },
  uploadText: { marginTop: 6, color: "#15803d" },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#15803d",
    marginTop: 20,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#86efac",
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
  },

  input: { marginLeft: 10, flex: 1 },

  button: {
    backgroundColor: "#15803d",
    padding: 12,
    borderRadius: 8,
    marginTop: 25,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },

  loginText: {
    textAlign: "center",
    marginTop: 15,
    color: "#15803d",
  },
});