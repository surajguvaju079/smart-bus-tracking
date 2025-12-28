import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Bus {
  id: number;
  busNo: string;
  lat: number;
  lng: number;
}

interface MapCardProps {
  buses: Bus[];
}

export default function MapCard({ buses }: MapCardProps) {
  const initialRegion = {
    latitude: buses[0]?.lat || 27.7,
    longitude: buses[0]?.lng || 85.32,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View className="mt-6 bg-green-50 rounded-xl p-4 shadow h-64">
      <Text className="text-green-700 font-bold mb-2">Live Bus Map</Text>
      <MapView style={{ flex: 1, borderRadius: 12 }} initialRegion={initialRegion}>
        {buses.map((bus) => (
          <Marker
            key={bus.id}
            coordinate={{ latitude: bus.lat, longitude: bus.lng }}
            title={`Bus ${bus.busNo}`}
          />
        ))}
      </MapView>
    </View>
  );
}
