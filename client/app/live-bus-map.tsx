import { ActivityIndicator, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import { io } from "socket.io-client";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";

const socket = io("http://192.168.32.90:8080");

export default function LiveBusMap() {
  const params = useLocalSearchParams();
  const { tripId } = params as any;

  const [locations, setLocations] = useState<any[]>([]);
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    if (!tripId) return;

    const handleLocation = (data: any) => {
      setLocations((prev) => [...prev, data]);
    };

    socket.emit("join-trip", Number(tripId));
    socket.on("trip:location", handleLocation);

    socket.on("trip:completed", () => {
      setLocations([]);
    });

    return () => {
      socket.off("trip:location", handleLocation);
    };
  }, [tripId]);

  if (locations.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );

  const latest = locations[locations.length - 1];

  return (
    <View style={{ flex: 1 }}>
      <AppHeader />

      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        region={{
          latitude: latest.latitude,
          longitude: latest.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Path */}
        <Polyline
          coordinates={locations.map((loc) => ({
            latitude: loc.latitude,
            longitude: loc.longitude,
          }))}
          strokeWidth={4}
          strokeColor="#15803d"
        />

        {/* Current Bus Position */}
        <Marker
          coordinate={{
            latitude: latest.latitude,
            longitude: latest.longitude,
          }}
          title={`Bus ${latest?.busNo}`}
        >
          <MaterialIcons name="directions-bus" size={32} color="#15803d" />
        </Marker>
      </MapView>
    </View>
  );
}
