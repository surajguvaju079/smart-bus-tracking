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
      if (error.response?.status === 409) {
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

          {/* Name */}
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <View style={styles.inputContainer}>
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
          {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <View style={styles.inputContainer}>
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
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <View style={styles.inputContainer}>
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
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            style={styles.button}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          {/* Login */}
          <TouchableOpacity onPress={() => router.push("/user-login")} style={styles.link}>
            <View style={styles.rowCenter}>
              <Text style={styles.linkText}>Already have an account? </Text>
              <Text style={styles.linkBold}>Login</Text>
            </View>
          </TouchableOpacity>

          {/* Driver Register */}
          <TouchableOpacity onPress={() => router.push("/driver-register")} style={styles.link}>
            <View style={styles.rowCenter}>
              <Text style={styles.linkText}>Join as a Driver? </Text>
              <Text style={styles.linkBold}>Register here</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    marginTop: 24,
  },

  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },

  link: {
    marginTop: 20,
  },

  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  linkText: {
    color: "#15803d",
    textAlign: "center",
  },

  linkBold: {
    color: "#15803d",
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  errorText: {
    color: "#ef4444",
    marginTop: 4,
  },
});