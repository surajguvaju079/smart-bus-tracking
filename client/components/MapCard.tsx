import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";

interface Bus {
  id: number;
  busNo: string;
  lat: number;
  lng: number;
  route?: string;
}

interface MapCardProps {
  buses: Bus[];
}

export default function MapCard({ buses }: MapCardProps) {
  const screenWidth = Dimensions.get("window").width;
  const mapHeight = 300;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Bus Map</Text>

      <MapView
        style={[styles.map, { width: screenWidth - 40, height: mapHeight }]}
        initialRegion={{
          latitude: buses.length ? buses[0].lat : 27.7,
          longitude: buses.length ? buses[0].lng : 85.3,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {buses.map((bus) => (
          <Marker
            key={bus.id}
            coordinate={{ latitude: bus.lat, longitude: bus.lng }}
            title={`Bus ${bus.busNo}`}
            description={bus.route || "Route info"}
          >
            <MaterialIcons name="directions-bus" size={32} color="#166534" />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderRadius: 16,
    overflow: "hidden",
    paddingHorizontal: 20,
  },
  title: {
    color: "#166534",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  map: {
    borderRadius: 16,
  },
});