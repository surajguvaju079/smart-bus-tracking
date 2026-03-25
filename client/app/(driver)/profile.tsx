import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import React from "react";
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
    clearUser();
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    router.replace("/(auth)/user-login");
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <AppHeader />

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user?.profileImage || "https://via.placeholder.com/150" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user?.name || "User"}</Text>
        <Text style={styles.profileEmail}>{user?.email}</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        {/* Name */}
        <View style={styles.infoRow}>
          <MaterialIcons name="person" size={22} color="#16a34a" />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{user?.name}</Text>
          </View>
        </View>

        {/* Email */}
        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={22} color="#16a34a" />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
        </View>

        {/* Phone */}
        <View style={styles.infoRow}>
          <MaterialIcons name="phone" size={22} color="#16a34a" />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{user?.phoneNumber || "Not added"}</Text>
          </View>
        </View>

        {/* Role */}
        <View style={styles.infoRow}>
          <MaterialIcons name="verified-user" size={22} color="#16a34a" />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Role</Text>
            <Text style={styles.infoValue}>{user?.role}</Text>
          </View>
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity style={styles.accountRow}>
          <Text style={styles.accountText}>Change Password</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.accountRow}>
          <Text style={styles.accountText}>Payment Methods</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.accountRow} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
          <MaterialIcons name="logout" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 24,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 4,
    borderColor: "#16a34a",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 12,
  },
  profileEmail: {
    color: "#6b7280",
    marginTop: 4,
  },
  editButton: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 50,
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  editButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 12,
  },
  infoLabel: {
    color: "#6b7280",
    fontSize: 12,
  },
  infoValue: {
    color: "#1f2937",
    fontSize: 14,
    fontWeight: "500",
  },
  accountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#f3f4f6",
  },
  accountText: {
    color: "#374151",
    fontSize: 14,
  },
  logoutText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "500",
  },
});