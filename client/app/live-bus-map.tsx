import { ActivityIndicator, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import { io } from "socket.io-client";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
const socket = io("http://192.168.165.90:8080");
export default function LiveBusMap() {
  const params = useLocalSearchParams();
  const { tripId } = params as any;

  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    console.log("socket instance:", socket);
    console.log("Connecting to socket for tripId:", tripId);
    socket.connect();
    socket.emit("join-trip", Number(tripId));

    socket.on("trip:location", (data) => {
      console.log("Received location update:", data);
      setLocation(data);
    });

    return () => {
      /* socket.emit("leaveTrip", tripId); */
      socket.disconnect();
    };
  }, [tripId]);

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
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={`Bus ${location.busNo}`}
          description={`Route: ${location.route}, ETA: ${location.eta} min`}
        >
          <MaterialIcons name="directions-bus" size={32} color="#15803d" />
        </Marker>
      </MapView>
    </View>
  );
}
