import { View, Text, Image, TouchableOpacity } from "react-native";
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
    <ScrollView className="flex-1 bg-gray-50">
      <AppHeader />

      {/* Profile Header */}
      <View className="items-center mt-6">
        <Image
          source={{
            uri: user?.profileImage || "https://via.placeholder.com/150",
          }}
          className="w-28 h-28 rounded-full border-4 border-green-600"
        />

        <Text className="text-2xl font-bold text-gray-800 mt-4">
          {user?.name || "User"}
        </Text>

        <Text className="text-gray-500 mt-1">{user?.email}</Text>

        <TouchableOpacity className="bg-green-600 px-6 py-2 rounded-full mt-4 shadow">
          <Text className="text-white font-semibold">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Info Card */}
      <View className="bg-white rounded-2xl shadow-sm mx-5 mt-8 p-5">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Personal Information
        </Text>

        {/* Name */}
        <View className="flex-row items-center mb-4">
          <MaterialIcons name="person" size={22} color="#16a34a" />
          <View className="ml-4">
            <Text className="text-gray-500 text-sm">Name</Text>
            <Text className="text-gray-800 font-medium">{user?.name}</Text>
          </View>
        </View>

        {/* Email */}
        <View className="flex-row items-center mb-4">
          <MaterialIcons name="email" size={22} color="#16a34a" />
          <View className="ml-4">
            <Text className="text-gray-500 text-sm">Email</Text>
            <Text className="text-gray-800 font-medium">{user?.email}</Text>
          </View>
        </View>

        {/* Phone */}
        <View className="flex-row items-center mb-4">
          <MaterialIcons name="phone" size={22} color="#16a34a" />
          <View className="ml-4">
            <Text className="text-gray-500 text-sm">Phone</Text>
            <Text className="text-gray-800 font-medium">
              {user?.phoneNumber || "Not added"}
            </Text>
          </View>
        </View>

        {/* Role */}
        <View className="flex-row items-center">
          <MaterialIcons name="verified-user" size={22} color="#16a34a" />
          <View className="ml-4">
            <Text className="text-gray-500 text-sm">Role</Text>
            <Text className="text-gray-800 font-medium">{user?.role}</Text>
          </View>
        </View>
      </View>

      {/* Account Section */}
      <View className="bg-white rounded-2xl shadow-sm mx-5 mt-6 p-5 mb-10">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Account
        </Text>

        <TouchableOpacity className="flex-row justify-between items-center py-3 border-b border-gray-100">
          <Text className="text-gray-700">Change Password</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row justify-between items-center py-3 border-b border-gray-100">
          <Text className="text-gray-700">Payment Methods</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row justify-between items-center py-3"
        >
          <Text className="text-red-500 font-medium">Logout</Text>
          <MaterialIcons name="logout" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
