import { ActivityIndicator, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import { io } from "socket.io-client";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { SOCKET_URL } from "@/constants/SocketUrl";

const socket = io(SOCKET_URL);

export default function LiveBusMap() {
  const params = useLocalSearchParams();
  const { tripId } = params as any;

  const [locations, setLocations] = useState<any[]>([]);
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    if (!tripId) return;
    console.log("Joining trip room:", tripId);

    const handleLocation = (data: any) => {
      console.log();
      /*   const distance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000;
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}; */
      // setLocations(prev => {
      //   if (prev.length === 0) return [data];

      //   const last = prev[prev.length - 1];
      //   const d = distance(last.latitude, last.longitude, data.latitude, data.longitude);

      //   if (d < 5) return prev; // ignore small movements

      //   return [...prev, data];
      // });
      console.log("Received location update:", data);
      setLocations((prev) => [...prev, data]);
    };

    socket.emit("join-trip", Number(tripId));
    socket.on("trip:location", handleLocation);
    console.log("Listening for location updates for trip:", tripId);
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
