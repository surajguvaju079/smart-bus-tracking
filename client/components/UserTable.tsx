import React, { useEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { User } from "../api/user";
import { useUserStore } from "@/store/userStore";
interface Bus {
  id: number;
  busNo: string;
  route: string;
  eta: number;
  status: string;
}

interface BusTableProps {
  buses: Bus[];
}

export default function UserTable() {
  const { users, setUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await User.show();
      if (res?.data?.responseObject) {
        setUsers(res?.data?.responseObject?.users);
      }
    } catch (error: any) {
      Alert.alert("Failed to load users");
      console.log("error fetching users:", error?.response?.data?.message);
    }
  };
  return (
    <View className="mt-6 bg-green-50 rounded-xl p-4 shadow">
      <Text className="text-green-700 font-bold mb-2">Users</Text>
      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View className="flex-row bg-green-100 p-2 rounded-t-xl">
            <Text className="w-20 font-bold text-green-800">S.N.</Text>
            <Text
              className="w-40 font-bold text-green-800"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Name
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="w-60 font-bold text-green-800"
            >
              Email
            </Text>
          </View>

          {/* Table Rows */}
          {users?.length > 0 &&
            users.map((user) => (
              <View
                key={user.id}
                className="flex-row p-2 border-b border-green-200"
              >
                <Text className="w-20 text-green-700">{user.id}</Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="w-60 text-green-700"
                >
                  {user.name}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="w-20 text-green-700"
                >
                  {user.email}
                </Text>
              </View>
            ))}
          {users?.length === 0 && (
            <View className="flex-1 item-center justify-center">
              <Text className="font-extrabold text-3xl text-red-600">
                No Users Found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
