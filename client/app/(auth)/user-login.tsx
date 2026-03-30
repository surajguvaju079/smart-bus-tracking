import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppHeader from "../../components/AppHeader";
import { Auth } from "../../api/auth";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schema/userSchema";
import { useUserStore } from "@/store/userStore";

type LoginForm = {
  email: string;
  password: string;
};

export default function UserLogin() {
  const router = useRouter();
  const { setUser } = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await Auth.login({
        email: data.email.trim().toLowerCase(),
        password: data.password.trim(),
      });

      const { access_token, refresh_token } = res.data.responseObject;

      if (res?.data?.responseObject?.user) {
        setUser(res.data.responseObject.user);
      }

      await AsyncStorage.setItem("accessToken", access_token);
      await AsyncStorage.setItem("refreshToken", refresh_token);

      const role = res?.data?.responseObject?.user?.role;

      if (role === "ADMIN") {
        router.replace("/admin-dashboard");
        return;
      }

      if (role === "USER") {
        router.replace("/home");
        return;
      }

      if (role === "DRIVER") {
        router.replace("/driver-dashboard");
        return;
      }

      Alert.alert("Login Successful", "Welcome back!");
    } catch (error: any) {
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
    <View style={styles.container}>
      <AppHeader />

      <View style={styles.content}>
        <Text style={styles.title}>User/Driver Login</Text>

        {/* EMAIL */}
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <View style={styles.inputBox}>
              <MaterialIcons name="email" size={22} color="#15803d" />
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                value={value}
                onChangeText={onChange}
              />
            </View>
          )}
        />

        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        {/* PASSWORD */}
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <View style={styles.inputBox}>
              <MaterialIcons name="lock" size={22} color="#15803d" />
              <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                value={value}
                onChangeText={onChange}
              />
            </View>
          )}
        />

        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        {/* BUTTON */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          style={styles.button}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* REGISTER */}
        <TouchableOpacity
          onPress={() => router.push("/user-register")}
          style={styles.switchBox}
        >
          <Text style={styles.switchText}>
            Don’t have an account? Register
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

  errorText: {
    color: "red",
    marginTop: 4,
  },
});