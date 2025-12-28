import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import BusTable from "../components/Bustable";
import MapCard from "../components/MapCard";
import { fetchBuses, fetchDrivers } from "../api/api";

export default function AdminDashboard() {
  const [buses, setBuses] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const busesData = await fetchBuses();
      const driversData = await fetchDrivers();
      setBuses(busesData);
      setDrivers(driversData);
    };
    loadData();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <Header />
      <View className="flex-row flex-1">
        <Sidebar onSelect={(page: string) => console.log("Selected:", page)} />
        <ScrollView className="flex-1 px-5 py-4">
          {/* Dashboard Cards */}
          <View className="flex-row justify-between mb-6">
            <DashboardCard title="Buses" count={buses.length} />
            <DashboardCard title="Drivers" count={drivers.length} />
          </View>

          {/* Bus Table */}
          <BusTable buses={buses} />

          {/* Live Map */}
          {showMap && <MapCard buses={buses} />}
        </ScrollView>
      </View>
    </View>
  );
}
