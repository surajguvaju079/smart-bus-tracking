import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
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

      {/* PROFILE HEADER */}
      <View style={styles.profileHeader}>
        <Image
          source={require("../../assets/images/driver.jpg")}
          style={styles.avatar}
        />

        <Text style={styles.name}>{user?.name || "User"}</Text>

        <Text style={styles.email}>{user?.email}</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* INFO CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Personal Information</Text>

        {/* NAME */}
        <View style={styles.row}>
          <MaterialIcons name="person" size={22} color="#16a34a" />
          <View style={styles.textBlock}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user?.name}</Text>
          </View>
        </View>

        {/* EMAIL */}
        <View style={styles.row}>
          <MaterialIcons name="email" size={22} color="#16a34a" />
          <View style={styles.textBlock}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email}</Text>
          </View>
        </View>

        {/* PHONE */}
        <View style={styles.row}>
          <MaterialIcons name="phone" size={22} color="#16a34a" />
          <View style={styles.textBlock}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>
              {user?.phoneNumber || "Not added"}
            </Text>
          </View>
        </View>

        {/* ROLE */}
        <View style={styles.row}>
          <MaterialIcons name="verified-user" size={22} color="#16a34a" />
          <View style={styles.textBlock}>
            <Text style={styles.label}>Role</Text>
            <Text style={styles.value}>{user?.role}</Text>
          </View>
        </View>
      </View>

      {/* ACCOUNT SECTION */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account</Text>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Change Password</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Payment Methods</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
          <MaterialIcons name="logout" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

/* =======================
   STYLE SHEET
======================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  /* HEADER */
  profileHeader: {
    alignItems: "center",
    marginTop: 24,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
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

  editButton: {
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

  /* CARD */
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 32,
    padding: 20,
    borderRadius: 16,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  textBlock: {
    marginLeft: 16,
  },

  label: {
    fontSize: 12,
    color: "#6b7280",
  },

  value: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },

  /* ACCOUNT ITEMS */
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },

  itemText: {
    color: "#374151",
  },

  logoutItem: {
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