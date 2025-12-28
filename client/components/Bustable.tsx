import React from "react";
import { View, Text, ScrollView } from "react-native";

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
    <View className="mt-6 bg-green-50 rounded-xl p-4 shadow">
      <Text className="text-green-700 font-bold mb-2">Bus List</Text>
      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View className="flex-row bg-green-100 p-2 rounded-t-xl">
            <Text className="w-20 font-bold text-green-800">Bus No</Text>
            <Text className="w-60 font-bold text-green-800">Route</Text>
            <Text className="w-20 font-bold text-green-800">ETA</Text>
            <Text className="w-20 font-bold text-green-800">Status</Text>
          </View>

          {/* Table Rows */}
          {buses.map((bus) => (
            <View key={bus.id} className="flex-row p-2 border-b border-green-200">
              <Text className="w-20 text-green-700">{bus.busNo}</Text>
              <Text className="w-60 text-green-700">{bus.route}</Text>
              <Text className="w-20 text-green-700">{bus.eta} min</Text>
              <Text
                className={`w-20 font-semibold ${
                  bus.status === "Live" ? "text-green-700" : "text-yellow-600"
                }`}
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
