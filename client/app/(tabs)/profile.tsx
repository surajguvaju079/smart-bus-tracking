import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "@/components/AppHeader";
import { useUserStore } from "@/store/userStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { clearUser } = useUserStore();

  const handleLogout = async () => {
    console.log("Logging out user:", user?.email);
    clearUser();
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    router.replace("/(auth)/user-login");
    console.log("User logged out, tokens cleared");
  };

  return (
    <ScrollView style={styles.container}>
      <AppHeader />

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={require("../../assets/images/user.jpg")}
          style={styles.avatar}
        />

        <Text style={styles.name}>{user?.name || "User"}</Text>

        <Text style={styles.email}>{user?.email}</Text>

        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Personal Information</Text>

        {/* Name */}
        <View style={styles.row}>
          <MaterialIcons name="person" size={22} color="#16a34a" />
          <View style={styles.textBox}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user?.name}</Text>
          </View>
        </View>

        {/* Email */}
        <View style={styles.row}>
          <MaterialIcons name="email" size={22} color="#16a34a" />
          <View style={styles.textBox}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email}</Text>
          </View>
        </View>

        {/* Phone */}
        <View style={styles.row}>
          <MaterialIcons name="phone" size={22} color="#16a34a" />
          <View style={styles.textBox}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>
              {user?.phoneNumber || "Not added"}
            </Text>
          </View>
        </View>

        {/* Role */}
        <View style={styles.row}>
          <MaterialIcons name="verified-user" size={22} color="#16a34a" />
          <View style={styles.textBox}>
            <Text style={styles.label}>Role</Text>
            <Text style={styles.value}>{user?.role}</Text>
          </View>
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account</Text>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Change Password</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Payment Methods</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
          <MaterialIcons name="logout" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  profileHeader: {
    alignItems: "center",
    marginTop: 24,
  },

  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 4,
    borderColor: "#16a34a",
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 16,
  },

  email: {
    color: "#6b7280",
    marginTop: 4,
  },

  editBtn: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 999,
    marginTop: 16,
  },

  editText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 24,
    padding: 20,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1f2937",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  textBox: {
    marginLeft: 16,
  },

  label: {
    fontSize: 12,
    color: "#6b7280",
  },

  value: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
  },

  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },

  optionText: {
    color: "#374151",
  },

  logout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  logoutText: {
    color: "red",
    fontWeight: "600",
  },
});