import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import AppHeader from "../components/AppHeader";

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
    <ScrollView className="flex-1 bg-white">
      <AppHeader />

      <View className="px-6 mt-6">
        {/* Profile Image */}
        <View className="items-center">
          <TouchableOpacity
            onPress={pickImage}
            className="w-28 h-28 rounded-full border-2 border-green-600 items-center justify-center"
          >
            {image ? (
              <Image
                source={{ uri: image }}
                className="w-full h-full rounded-full"
              />
            ) : (
              <MaterialIcons name="camera-alt" size={32} color="#15803d" />
            )}
          </TouchableOpacity>

          <Text className="mt-2 text-green-700 text-sm">
            Upload Profile Photo
          </Text>
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-green-700 text-center mt-6">
          Driver Registration
        </Text>

        {/* Driver Name */}
        <View className="flex-row items-center border border-green-300 rounded-lg px-4 py-3 mt-6">
          <MaterialIcons name="person" size={22} color="#15803d" />
          <TextInput
            placeholder="Driver Name"
            className="ml-3 flex-1 text-base"
          />
        </View>

        {/* Mobile Number */}
        <View className="flex-row items-center border border-green-300 rounded-lg px-4 py-3 mt-4">
          <MaterialIcons name="phone" size={22} color="#15803d" />
          <TextInput
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            className="ml-3 flex-1 text-base"
          />
        </View>

        {/* Vehicle Number */}
        <View className="flex-row items-center border border-green-300 rounded-lg px-4 py-3 mt-4">
          <MaterialIcons name="directions-bus" size={22} color="#15803d" />
          <TextInput
            placeholder="Vehicle Number"
            className="ml-3 flex-1 text-base"
          />
        </View>

        {/* Route */}
        <View className="flex-row items-center border border-green-300 rounded-lg px-4 py-3 mt-4">
          <Ionicons name="git-network-outline" size={22} color="#15803d" />
          <TextInput
            placeholder="Route (e.g. Ratnapark - Kalanki)"
            className="ml-3 flex-1 text-base"
          />
        </View>

        {/* Password */}
        <View className="flex-row items-center border border-green-300 rounded-lg px-4 py-3 mt-4">
          <MaterialIcons name="lock" size={22} color="#15803d" />
          <TextInput
            placeholder="Password"
            secureTextEntry
            className="ml-3 flex-1 text-base"
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity className="bg-green-700 py-3 rounded-lg mt-7">
          <Text className="text-white text-center font-semibold text-lg">
            Register Driver
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity
          onPress={() => router.push("/driver-login")}
          className="mt-5 mb-10"
        >
          <Text className="text-center text-green-700">
            Already registered? Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
