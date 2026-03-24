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

  if (!users || users.length === 0) {
    return (
      <View style={styles.noUsersContainer}>
        <Text style={styles.noUsersText}>No Users Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users</Text>
      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { width: 50 }]}>S.N.</Text>
            <Text style={[styles.headerCell, { width: 120 }]}>Name</Text>
            <Text style={[styles.headerCell, { width: 200 }]}>Email</Text>
          </View>

          {/* Table Rows */}
          {users.map((user) => (
            <View key={user.id} style={styles.tableRow}>
              <Text style={[styles.cell, { width: 50 }]}>{user.id}</Text>
              <Text
                style={[styles.cell, { width: 120 }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {user.name}
              </Text>
              <Text
                style={[styles.cell, { width: 200 }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {user.email}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "#ecfdf5", // Tailwind green-50
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#15803d", // Tailwind green-700
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#d1fae5", // Tailwind green-100
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerCell: {
    fontWeight: "bold",
    color: "#065f46", // Tailwind green-800
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#bbf7d0", // Tailwind green-200
  },
  cell: {
    color: "#15803d", // Tailwind green-700
  },
  noUsersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  noUsersText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#dc2626", // Tailwind red-600
  },
});