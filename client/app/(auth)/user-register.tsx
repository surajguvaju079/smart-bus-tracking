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
import { User } from "../../api/user";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schema/userSchema";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "@/components/AppHeader";

import { BASE_URL } from "@/constants/BaseUrl";

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
      console.log("Base URL:", BASE_URL);

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
      console.log("Register error:", error?.response?.data);

      if (error?.response?.status === 409) {
        Alert.alert("Register Failed", "Email already exists");
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader />

        <View style={styles.content}>
          <Text style={styles.title}>User Registration</Text>

          {/* NAME */}
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <View style={styles.inputBox}>
                <MaterialIcons name="person" size={22} color="#15803d" />
                <TextInput
                  placeholder="Full Name"
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
          />
          {errors.name && (
            <Text style={styles.errorText}>{errors.name.message}</Text>
          )}

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
                  placeholder="Password (min 6 chars)"
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

          {/* REGISTER BUTTON */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            style={styles.button}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          {/* LOGIN LINK */}
          <TouchableOpacity
            onPress={() => router.push("/user-login")}
            style={styles.linkBox}
          >
            <Text style={styles.linkText}>
              Already have an account?{" "}
              <Text style={styles.linkStrong}>Login</Text>
            </Text>
          </TouchableOpacity>

          {/* DRIVER LINK */}
          <TouchableOpacity
            onPress={() => router.push("/driver-register")}
            style={styles.linkBox}
          >
            <Text style={styles.linkText}>
              Join as a Driver?{" "}
              <Text style={styles.linkStrong}>Register here</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* =======================
   STYLE SHEET
======================= */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

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

  linkBox: {
    marginTop: 20,
  },

  linkText: {
    textAlign: "center",
    color: "#15803d",
  },

  linkStrong: {
    fontWeight: "700",
    textDecorationLine: "underline",
  },

  errorText: {
    color: "red",
    marginTop: 4,
  },
});