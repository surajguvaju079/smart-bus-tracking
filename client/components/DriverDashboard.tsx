import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Driver = {
  id: number;
  name: string;
  busNo: string;
  vehicleNo: string;
  route: string;
  mobile: string;
};

export default function DriverDashboard() {
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: 1, name: "Ram", busNo: "27", vehicleNo: "KA-1234", route: "Ratnapark → Kalanki", mobile: "9800000001" },
    { id: 2, name: "Shyam", busNo: "12", vehicleNo: "KA-5678", route: "Ratnapark → Balkhu", mobile: "9800000002" },
  ]);

  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [busNo, setBusNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [route, setRoute] = useState("");
  const [mobile, setMobile] = useState("");

  const addDriver = () => {
    if (!name || !busNo || !vehicleNo || !route || !mobile) {
      alert("Please fill all fields");
      return;
    }
    const newDriver: Driver = {
      id: drivers.length + 1,
      name,
      busNo,
      vehicleNo,
      route,
      mobile,
    };
    setDrivers((prev) => [...prev, newDriver]);
    setName(""); setBusNo(""); setVehicleNo(""); setRoute(""); setMobile("");
  };

  const filteredDrivers = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.busNo.toLowerCase().includes(search.toLowerCase()) ||
      d.route.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Driver Dashboard</Text>

      {/* Search */}
      <View style={styles.searchBox}>
        <MaterialIcons name="search" size={24} color="#166534" />
        <TextInput
          placeholder="Search driver by name, bus no or route"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Add Driver */}
      <View style={styles.addCard}>
        <Text style={styles.addTitle}>Add New Driver</Text>
        <TextInput style={styles.input} placeholder="Driver Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Bus No" value={busNo} onChangeText={setBusNo} />
        <TextInput style={styles.input} placeholder="Vehicle No" value={vehicleNo} onChangeText={setVehicleNo} />
        <TextInput style={styles.input} placeholder="Route" value={route} onChangeText={setRoute} />
        <TextInput style={styles.input} placeholder="Mobile Number" value={mobile} onChangeText={setMobile} />
        <TouchableOpacity style={styles.addBtn} onPress={addDriver}>
          <Text style={styles.addBtnText}>Add Driver</Text>
        </TouchableOpacity>
      </View>

      {/* Driver List */}
      <View style={styles.listCard}>
        <Text style={styles.listTitle}>Driver List ({filteredDrivers.length})</Text>
        {filteredDrivers.length === 0 ? (
          <Text style={styles.noData}>No drivers found</Text>
        ) : (
          filteredDrivers.map((d) => (
            <View key={d.id} style={styles.driverRow}>
              <View>
                <Text style={styles.driverName}>{d.name}</Text>
                <Text style={styles.driverInfo}>{d.busNo} | {d.vehicleNo}</Text>
                <Text style={styles.driverInfo}>{d.route}</Text>
              </View>
              <Text style={styles.driverInfo}>{d.mobile}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dcfce7", // green-50
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#15803d",
    textAlign: "center",
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#a7f3d0", // green-300
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchInput: {
    marginLeft: 12,
    flex: 1,
    fontSize: 14,
    color: "#166534",
  },
  addCard: {
    backgroundColor: "#bbf7d0", // green-100
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  addTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#15803d",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#a7f3d0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    color: "#065f46",
  },
  addBtn: {
    backgroundColor: "#15803d",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 4,
    alignItems: "center",
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  listCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#15803d",
    marginBottom: 12,
  },
  noData: {
    textAlign: "center",
    color: "#4b5563",
    paddingVertical: 16,
  },
  driverRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#bbf7d0",
  },
  driverName: {
    fontWeight: "600",
    color: "#15803d",
    fontSize: 14,
  },
  driverInfo: {
    fontSize: 12,
    color: "#374151",
  },
});