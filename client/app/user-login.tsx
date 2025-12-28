import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppHeader from "../components/AppHeader";
import { Auth } from "../api/auth";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/userSchema";
import { useUserStore } from "@/store/userStore";

type LoginForm = {
  email: string;
  password: string;
};

export default function UserLogin() {
  // ========================
  // Navigation
  // ========================
  const router = useRouter();

  // ========================
  // Zustand Store
  // ========================
  const { setUser } = useUserStore();

  // ========================
  // Local State
  // ========================
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // ========================
  // Functions and Utilities
  // ========================
  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await Auth.login({
        email: data.email.trim().toLowerCase(),
        password: data.password.trim(),
      });
      console.log("Login response:", res.data.responseObject);

      const { access_token, refresh_token, user } = res.data.responseObject;
      if (res?.data?.responseObject?.user) {
        setUser(res.data.responseObject.user);
      }
      await AsyncStorage.setItem("accessToken", access_token);
      await AsyncStorage.setItem("refreshToken", refresh_token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      Alert.alert("Success", "Login successful");
      router.replace("/admin-dashboard");
    } catch (error: any) {
      console.log("Login error:", error?.response?.data);
      if (error.response?.status === 401) {
        Alert.alert("Login Failed", "Invalid credentials");
      } else {
        Alert.alert(
          "Error",
          error?.response?.data?.error?.message || "Something went wrong"
        );
      }
    }
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader />
      <View className="px-6 mt-12">
        <Text className="text-2xl font-bold text-green-700 text-center">
          User Login
        </Text>

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <View className="flex-row items-center border border-green-300 rounded-lg px-4 py-3 mt-8">
              <MaterialIcons name="email" size={22} color="#15803d" />
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                className="ml-3 flex-1"
                value={value}
                onChangeText={onChange}
              />
            </View>
          )}
        />
        {errors.email && (
          <Text className="text-red-500">{errors.email.message}</Text>
        )}

        {/* Password */}
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <View className="flex-row items-center border border-green-300 rounded-lg px-4 py-3 mt-4">
              <MaterialIcons name="lock" size={22} color="#15803d" />
              <TextInput
                placeholder="Password"
                secureTextEntry
                className="ml-3 flex-1"
                value={value}
                onChangeText={onChange}
              />
            </View>
          )}
        />
        {errors.password && (
          <Text className="text-red-500">{errors.password.message}</Text>
        )}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="bg-green-700 py-3 rounded-lg mt-6"
        >
          {isSubmitting ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white text-center font-semibold text-lg">
              Login
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/user-register")}
          className="mt-5"
        >
          <Text className="text-center text-green-700">
            Don’t have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
