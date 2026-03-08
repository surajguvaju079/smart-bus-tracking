import React, { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
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
          <View className="flex-1">
            <View className="flex-row justify-between mb-6">
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
            <Text className="text-green-700 font-bold text-xl mb-2">
              Driver List
            </Text>
            {/* Add driver search & list */}
            {drivers.map((driver) => (
              <View
                key={driver.id}
                className="flex-row justify-between p-3 bg-green-50 mb-2 rounded-xl"
              >
                <Text className="text-green-800">{driver.name}</Text>
                <Text className="text-green-600">{driver.busNo}</Text>
              </View>
            ))}
          </View>
        );
      case "Routes":
        return (
          <Text className="text-green-700 font-bold text-xl">
            Routes Dashboard
          </Text>
        );
      case "Payments":
        return (
          <Text className="text-green-700 font-bold text-xl">
            Payment Dashboard
          </Text>
        );
      case "Fares":
        return (
          <Text className="text-green-700 font-bold text-xl">
            Fare Dashboard
          </Text>
        );
      case "Reports":
        return (
          <Text className="text-green-700 font-bold text-xl">
            Reports Dashboard
          </Text>
        );
      case "Settings":
        return (
          <Text className="text-green-700 font-bold text-xl">
            Settings Dashboard
          </Text>
        );

      case "Users":
        return <UserTable />;
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Header />
      <View className="flex-row flex-1">
        <Sidebar onSelect={setCurrentPage} />
        <ScrollView className="flex-1 px-5 py-4">{renderContent()}</ScrollView>
      </View>
    </View>
  );
}
