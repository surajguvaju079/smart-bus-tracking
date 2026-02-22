import { ActivityIndicator, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import { io } from "socket.io-client";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
const socket = io("http://192.168.32.90:8080");
export default function LiveBusMap() {
  const params = useLocalSearchParams();
  const { tripId } = params as any;

  const [location, setLocation] = useState<any>(null);
  useEffect(() => {
    if (!tripId) return;

    console.log("Joining trip room:", Number(tripId));

    const handleLocation = (data: any) => {
      console.log("Received location update:", data);
      setLocation(data);
    };

    socket.emit("join-trip", Number(tripId));
    socket.on("trip:location", handleLocation);

    return () => {
      socket.off("trip:location", handleLocation);
    };
  }, [tripId]);

  console.log("Current location state:", location);

  if (!location)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={"green"} />
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <AppHeader />

      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: location?.latitude || 27.7017,
          longitude: location?.longitude || 85.3206,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location?.latitude || 27.7017,
            longitude: location?.longitude || 85.3206,
          }}
          title={`Bus ${location?.busNo}`}
          description={`Route: ${location?.route}, ETA: ${location?.eta} min`}
        >
          <MaterialIcons name="directions-bus" size={32} color="#15803d" />
        </Marker>
      </MapView>
    </View>
  );
}
