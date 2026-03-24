import React, { useEffect } from "react";
import { View, Text, ScrollView, Alert, StyleSheet } from "react-native";
import { User } from "../api/user";
import { useUserStore } from "@/store/userStore";

interface Bus {
  id: number;
  busNo: string;
  route: string;
  eta: number;
  status: string;
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
    <View style={styles.container}>
      <Text style={styles.header}>Users</Text>
      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.sn]}>S.N.</Text>
            <Text style={[styles.cell, styles.name]} numberOfLines={1} ellipsizeMode="tail">
              Name
            </Text>
            <Text style={[styles.cell, styles.email]} numberOfLines={1} ellipsizeMode="tail">
              Email
            </Text>
          </View>

          {/* Table Rows */}
          {users?.length > 0 ? (
            users.map((user) => (
              <View key={user.id} style={styles.tableRow}>
                <Text style={[styles.cell, styles.sn]}>{user.id}</Text>
                <Text style={[styles.cell, styles.name]} numberOfLines={1} ellipsizeMode="tail">
                  {user.name}
                </Text>
                <Text style={[styles.cell, styles.email]} numberOfLines={1} ellipsizeMode="tail">
                  {user.email}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.noUsers}>
              <Text style={styles.noUsersText}>No Users Found</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "#ecfdf5", // green-50
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    color: "#16a34a", // green-700
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 18,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#d1fae5", // green-100
    padding: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#bbf7d0", // green-200
  },
  cell: {
    color: "#15803d", // green-700
    fontSize: 14,
  },
  sn: { width: 50, fontWeight: "bold" },
  name: { width: 150 },
  email: { width: 250 },
  noUsers: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  noUsersText: {
    fontWeight: "800",
    fontSize: 24,
    color: "#dc2626", // red-600
  },
});