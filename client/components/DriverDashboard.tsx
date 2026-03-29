import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
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
    {
      id: 1,
      name: "Ram",
      busNo: "27",
      vehicleNo: "KA-1234",
      route: "Ratnapark → Kalanki",
      mobile: "9800000001",
    },
    {
      id: 2,
      name: "Shyam",
      busNo: "12",
      vehicleNo: "KA-5678",
      route: "Ratnapark → Balkhu",
      mobile: "9800000002",
    },
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
    setName("");
    setBusNo("");
    setVehicleNo("");
    setRoute("");
    setMobile("");
  };

  const filteredDrivers = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.busNo.toLowerCase().includes(search.toLowerCase()) ||
      d.route.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Driver Dashboard</Text>

      {/* Search */}
      <View style={styles.searchBox}>
        <MaterialIcons name="search" size={24} color="#166534" />

        <TextInput
          placeholder="Search driver by name, bus no or route"
          placeholderTextColor="#6b7280"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Add Driver */}
      <View style={styles.formBox}>
        <Text style={styles.sectionTitle}>Add New Driver</Text>

        <TextInput
          placeholder="Driver Name"
          placeholderTextColor="#6b7280"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Bus No"
          placeholderTextColor="#6b7280"
          style={styles.input}
          value={busNo}
          onChangeText={setBusNo}
        />

        <TextInput
          placeholder="Vehicle No"
          placeholderTextColor="#6b7280"
          style={styles.input}
          value={vehicleNo}
          onChangeText={setVehicleNo}
        />

        <TextInput
          placeholder="Route"
          placeholderTextColor="#6b7280"
          style={styles.input}
          value={route}
          onChangeText={setRoute}
        />

        <TextInput
          placeholder="Mobile Number"
          placeholderTextColor="#6b7280"
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
        />

        <TouchableOpacity style={styles.button} onPress={addDriver}>
          <Text style={styles.buttonText}>Add Driver</Text>
        </TouchableOpacity>
      </View>

      {/* Driver List */}
      <View style={styles.listBox}>
        <Text style={styles.listTitle}>
          Driver List ({filteredDrivers.length})
        </Text>

        {filteredDrivers.length === 0 ? (
          <Text style={styles.emptyText}>No drivers found</Text>
        ) : (
          filteredDrivers.map((d) => (
            <View key={d.id} style={styles.row}>
              <View style={styles.left}>
                <Text style={styles.name}>{d.name}</Text>
                <Text style={styles.subText}>
                  {d.busNo} | {d.vehicleNo}
                </Text>
                <Text style={styles.subText}>{d.route}</Text>
              </View>

              <Text style={styles.mobile}>{d.mobile}</Text>
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
    backgroundColor: "#f0fdf4",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#15803d",
    textAlign: "center",
    marginBottom: 16,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#86efac",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
    color: "#111827",
  },

  formBox: {
    backgroundColor: "#dcfce7",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#15803d",
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#86efac",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  button: {
    backgroundColor: "#15803d",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 4,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

  listBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },

  listTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#15803d",
    marginBottom: 12,
  },

  emptyText: {
    textAlign: "center",
    color: "#6b7280",
    paddingVertical: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#bbf7d0",
    paddingVertical: 10,
  },

  left: {
    flex: 1,
  },

  name: {
    color: "#15803d",
    fontWeight: "600",
  },

  subText: {
    color: "#374151",
    fontSize: 12,
  },

  mobile: {
    color: "#374151",
    fontSize: 12,
  },
});