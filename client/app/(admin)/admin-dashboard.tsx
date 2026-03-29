import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import DashboardCard from "../../components/DashboardCard";
import BusTable from "../../components/Bustable";
import MapCard from "../../components/MapCard";
import { fetchBuses, fetchDrivers } from "../../api/api";
import UserTable from "@/components/UserTable";

export default function AdminDashboard() {
  const [buses, setBuses] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState("Dashboard");

  useEffect(() => {
    const loadData = async () => {
      const busesData = await fetchBuses();
      const driversData = await fetchDrivers();
      setBuses(busesData);
      setDrivers(driversData);
    };
    loadData();
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case "Dashboard":
        return (
          <View style={styles.flex1}>
            <View style={styles.rowBetween}>
              <DashboardCard title="Buses" count={buses.length} />
              <DashboardCard title="Drivers" count={drivers.length} />
            </View>

            <BusTable buses={buses} />
            <MapCard buses={buses} />
          </View>
        );

      case "Buses":
        return <BusTable buses={buses} />;

      case "Drivers":
        return (
          <View>
            <Text style={styles.title}>Driver List</Text>

            {drivers.map((driver) => (
              <View key={driver.id} style={styles.driverCard}>
                <Text style={styles.driverName}>{driver.name}</Text>
                <Text style={styles.driverBus}>{driver.busNo}</Text>
              </View>
            ))}
          </View>
        );

      case "Routes":
        return <Text style={styles.title}>Routes Dashboard</Text>;

      case "Payments":
        return <Text style={styles.title}>Payment Dashboard</Text>;

      case "Fares":
        return <Text style={styles.title}>Fare Dashboard</Text>;

      case "Reports":
        return <Text style={styles.title}>Reports Dashboard</Text>;

      case "Settings":
        return <Text style={styles.title}>Settings Dashboard</Text>;

      case "Users":
        return <UserTable />;

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.mainRow}>
        <Sidebar onSelect={setCurrentPage} />

        <ScrollView style={styles.scroll}>
          {renderContent()}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  mainRow: {
    flex: 1,
    flexDirection: "row",
  },

  scroll: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  flex1: {
    flex: 1,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  title: {
    color: "#15803d",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  driverCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f0fdf4",
    marginBottom: 8,
    borderRadius: 12,
  },

  driverName: {
    color: "#166534",
  },

  driverBus: {
    color: "#16a34a",
  },
});