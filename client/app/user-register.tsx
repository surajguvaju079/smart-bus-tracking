import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";

export default function UserRegister() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <AppHeader />

      <View className="px-6 mt-12">
        {/* Title */}
        <Text className="text-2xl font-bold text-green-700 text-center">
          User Registration
        </Text>

        {/* Full Name */}
        <View className="flex-row items-center border border-green-300 rounded-lg px-4 py-3 mt-8">
          <MaterialIcons name="person" size={22} color="#15803d" />
          <TextInput
            placeholder="Full Name"
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
        <TouchableOpacity className="bg-green-700 py-3 rounded-lg mt-6">
          <Text className="text-white text-center font-semibold text-lg">
            Register
          </Text>
        </TouchableOpacity>

        {/* Switch */}
        <TouchableOpacity
          onPress={() => router.push("/user-login")}
          className="mt-5"
        >
          <Text className="text-center text-green-700">
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
