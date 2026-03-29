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
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={[styles.cell, styles.headerCell, styles.colBusNo]}>
              Bus No
            </Text>
            <Text style={[styles.cell, styles.headerCell, styles.colRoute]}>
              Route
            </Text>
            <Text style={[styles.cell, styles.headerCell, styles.colEta]}>
              ETA
            </Text>
            <Text style={[styles.cell, styles.headerCell, styles.colStatus]}>
              Status
            </Text>
          </View>

          {/* Rows */}
          {buses.map((bus) => (
            <View key={bus.id} style={styles.row}>
              <Text style={[styles.cell, styles.colBusNo]}>
                {bus.busNo}
              </Text>

              <Text style={[styles.cell, styles.colRoute]}>
                {bus.route}
              </Text>

              <Text style={[styles.cell, styles.colEta]}>
                {bus.eta} min
              </Text>

              <Text
                style={[
                  styles.cell,
                  styles.colStatus,
                  bus.status === "Live"
                    ? styles.live
                    : styles.scheduled,
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
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    padding: 16,
  },

  title: {
    color: "#15803d",
    fontWeight: "bold",
    marginBottom: 8,
  },

  headerRow: {
    flexDirection: "row",
    backgroundColor: "#dcfce7",
    padding: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  row: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#bbf7d0",
  },

  cell: {
    color: "#15803d",
  },

  headerCell: {
    fontWeight: "bold",
    color: "#166534",
  },

  colBusNo: {
    width: 80,
  },

  colRoute: {
    width: 240,
  },

  colEta: {
    width: 80,
  },

  colStatus: {
    width: 80,
    fontWeight: "600",
  },

  live: {
    color: "#15803d",
  },

  scheduled: {
    color: "#ca8a04",
  },
});