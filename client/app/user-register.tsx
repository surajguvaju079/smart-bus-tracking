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
import AppHeader from "../components/AppHeader";
import { User } from "../api/user";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/userSchema";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export default function UserRegister() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await User.register({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password.trim(),
      });

      if (res.status === 201) {
        Alert.alert("Success", "Account created successfully");
        router.replace("/user-login");
      }
    } catch (error: any) {
      console.log("Register error:", error.response?.data);
      if (error.response?.status === 409) {
        Alert.alert("Register Failed", "Email already exists");
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    }
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader />
      <View className="px-6 mt-12">
        <Text className="text-2xl font-bold text-green-700 text-center">
          User Registration
        </Text>

        {/* Name */}
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <View className="flex-row items-center border border-green-300 rounded-lg px-4 py-3 mt-8">
              <MaterialIcons name="person" size={22} color="#15803d" />
              <TextInput
                placeholder="Full Name"
                className="ml-3 flex-1"
                value={value}
                onChangeText={onChange}
              />
            </View>
          )}
        />
        {errors.name && (
          <Text className="text-red-500">{errors.name.message}</Text>
        )}

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <View className="flex-row items-center border border-green-300 rounded-lg px-4 py-3 mt-4">
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
                placeholder="Password (min 6 chars)"
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
              Register
            </Text>
          )}
        </TouchableOpacity>

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
