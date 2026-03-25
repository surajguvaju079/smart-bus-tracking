import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

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

export default function BusTable({ buses }: BusTableProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus List</Text>
      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, { width: 80 }]}>Bus No</Text>
            <Text style={[styles.headerCell, { width: 240 }]}>Route</Text>
            <Text style={[styles.headerCell, { width: 80 }]}>ETA</Text>
            <Text style={[styles.headerCell, { width: 80 }]}>Status</Text>
          </View>

          {/* Table Rows */}
          {buses.map((bus) => (
            <View key={bus.id} style={styles.row}>
              <Text style={[styles.cell, { width: 80 }]}>{bus.busNo}</Text>
              <Text style={[styles.cell, { width: 240 }]}>{bus.route}</Text>
              <Text style={[styles.cell, { width: 80 }]}>{bus.eta} min</Text>
              <Text
                style={[
                  styles.cell,
                  styles.status,
                  bus.status === "Live" ? styles.live : styles.scheduled,
                  { width: 80 },
                ]}
              >
                {bus.status}
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
    marginTop: 24,
    backgroundColor: "#dcfce7", // green-50
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#15803d", // green-700
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#bbf7d0", // green-100
    padding: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerCell: {
    fontWeight: "700",
    color: "#065f46", // green-800
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#bbf7d0",
  },
  cell: {
    color: "#15803d",
  },
  status: {
    fontWeight: "600",
  },
  live: {
    color: "#15803d",
  },
  scheduled: {
    color: "#ca8a04", // yellow-600
  },
});