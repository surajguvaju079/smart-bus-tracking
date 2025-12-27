import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
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
    <ScrollView className="flex-1 bg-green-50 px-5 py-4">
      <Text className="text-2xl font-bold text-green-700 mb-4 text-center">Driver Dashboard</Text>

      {/* Search */}
      <View className="flex-row items-center border border-green-300 rounded-lg px-4 py-2 mb-4">
        <MaterialIcons name="search" size={24} color="#166534" />
        <TextInput
          placeholder="Search driver by name, bus no or route"
          className="ml-3 flex-1 text-gray-700"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Add Driver */}
      <View className="bg-green-100 p-4 rounded-xl mb-6">
        <Text className="text-lg font-semibold text-green-700 mb-3">Add New Driver</Text>
        <TextInput placeholder="Driver Name" className="border border-green-300 rounded-lg px-3 py-2 mb-2" value={name} onChangeText={setName} />
        <TextInput placeholder="Bus No" className="border border-green-300 rounded-lg px-3 py-2 mb-2" value={busNo} onChangeText={setBusNo} />
        <TextInput placeholder="Vehicle No" className="border border-green-300 rounded-lg px-3 py-2 mb-2" value={vehicleNo} onChangeText={setVehicleNo} />
        <TextInput placeholder="Route" className="border border-green-300 rounded-lg px-3 py-2 mb-2" value={route} onChangeText={setRoute} />
        <TextInput placeholder="Mobile Number" className="border border-green-300 rounded-lg px-3 py-2 mb-2" value={mobile} onChangeText={setMobile} />
        <TouchableOpacity className="bg-green-700 py-3 rounded-lg mt-2" onPress={addDriver}>
          <Text className="text-white text-center font-semibold">Add Driver</Text>
        </TouchableOpacity>
      </View>

      {/* Driver List */}
      <View className="bg-white rounded-xl p-4 shadow">
        <Text className="text-lg font-semibold text-green-700 mb-3">Driver List ({filteredDrivers.length})</Text>
        {filteredDrivers.length === 0 ? (
          <Text className="text-gray-600 text-center py-4">No drivers found</Text>
        ) : (
          filteredDrivers.map((d) => (
            <View key={d.id} className="flex-row justify-between items-center p-3 border-b border-green-200">
              <View>
                <Text className="text-green-700 font-semibold">{d.name}</Text>
                <Text className="text-gray-700 text-sm">{d.busNo} | {d.vehicleNo}</Text>
                <Text className="text-gray-700 text-sm">{d.route}</Text>
              </View>
              <Text className="text-gray-700 text-sm">{d.mobile}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
