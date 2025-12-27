import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import { useLocalSearchParams } from "expo-router";

export default function LiveBusMap() {
  const params = useLocalSearchParams();
  const { lat, lng, busNo, route, eta } = params as any;

  // Bus current location state (for simulation)
  const [busLocation, setBusLocation] = useState({
    latitude: parseFloat(lat),
    longitude: parseFloat(lng),
  });

  const [predictedEta, setPredictedEta] = useState<number>(eta); // predicted ETA

  // Simulate ETA countdown and bus movement
  useEffect(() => {
    const interval = setInterval(() => {
      // Reduce ETA by 1 min per interval (simple simulation)
      setPredictedEta((prev) => (prev > 0 ? prev - 1 : 0));

      // Optional: simulate slight bus movement
      setBusLocation((prev) => ({
        latitude: prev.latitude + (parseFloat(lat) - prev.latitude) * 0.01,
        longitude: prev.longitude + (parseFloat(lng) - prev.longitude) * 0.01,
      }));
    }, 60000); // every 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AppHeader />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Bus Marker */}
        <Marker
          coordinate={busLocation}
          title={`Bus ${busNo}`}
          description={`Route: ${route}, ETA: ${predictedEta} min`}
        >
          <MaterialIcons name="directions-bus" size={32} color="#15803d" />
        </Marker>

        {/* Destination Marker */}
        <Marker
          coordinate={{
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
          }}
          pinColor="green"
          title="Destination"
        />
      </MapView>

      {/* ETA Card */}
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: "white",
          padding: 15,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#15803d" }}>
          Bus {busNo} ETA: {predictedEta} min
        </Text>
        <Text style={{ marginTop: 5, color: "#555" }}>Route: {route}</Text>
      </View>
    </View>
  );
}
