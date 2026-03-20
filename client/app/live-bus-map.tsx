import { ActivityIndicator, View, Text } from "react-native";
import MapView, { Marker, Polyline, AnimatedRegion } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import { io } from "socket.io-client";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { SOCKET_URL } from "@/constants/SocketUrl";

const socket = io(SOCKET_URL);

export default function LiveBusMap() {
  const { tripId } = useLocalSearchParams() as any;
  const isAnimating = useRef(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [rotation, setRotation] = useState(0);
  const [speed, setSpeed] = useState(0);

  const mapRef = useRef<MapView | null>(null);

  // Animated coordinate
  const animatedCoordinate = useRef(
    new AnimatedRegion({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }),
  ).current;

  // Calculate distance (meters)
  const distance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
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
  };

  // Calculate rotation
  const getRotation = (start: any, end: any) => {
    const latDiff = end.latitude - start.latitude;
    const lngDiff = end.longitude - start.longitude;
    return (Math.atan2(lngDiff, latDiff) * 180) / Math.PI;
  };

  const interpolate = (start: any, end: any, steps = 20) => {
    const points = [];

    for (let i = 1; i <= steps; i++) {
      const lat =
        start.latitude + (end.latitude - start.latitude) * (i / steps);
      const lng =
        start.longitude + (end.longitude - start.longitude) * (i / steps);

      points.push({ latitude: lat, longitude: lng });
    }

    return points;
  };

  const animateSmoothly = async (start: any, end: any) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const points = interpolate(start, end, 20); // 20 steps

    for (let i = 0; i < points.length; i++) {
      await new Promise((resolve) => {
        animatedCoordinate
          .timing({
            latitude: points[i].latitude,
            longitude: points[i].longitude,
            duration: 100, // smoothness speed
            useNativeDriver: false,
          })
          .start(() => resolve(true));
      });
    }
  };

  useEffect(() => {
    if (!tripId) return;

    const handleLocation = (data: any) => {
      setLocations((prev) => {
        if (prev.length > 0) {
          const last = prev[prev.length - 1];

          const d = distance(
            last.latitude,
            last.longitude,
            data.latitude,
            data.longitude,
          );

          // Ignore small GPS noise (<5m)
          if (d < 5) return prev;

          // Animate movement
          animateSmoothly(last, data);

          // Rotation (use heading if exists)
          const angle = data.heading ?? getRotation(last, data);

          setRotation(angle);
          setSpeed(data.speed ?? 0);
        } else {
          animatedCoordinate.setValue({
            latitude: data.latitude,
            longitude: data.longitude,
          });
        }

        // Limit to last 50 points
        return [...prev.slice(-50), data];
      });

      // Camera follow
      mapRef.current?.animateCamera(
        {
          center: {
            latitude: data.latitude,
            longitude: data.longitude,
          },
          pitch: 45,
          heading: rotation,
          zoom: 17,
        },
        { duration: 2000 },
      );
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

  if (locations.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  const latest = locations[locations.length - 1];

  return (
    <View style={{ flex: 1 }}>
      <AppHeader />

      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
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

        {/* Start Marker */}
        {locations.length > 0 && (
          <Marker
            coordinate={{
              latitude: locations[0].latitude,
              longitude: locations[0].longitude,
            }}
            title="Start"
            pinColor="blue"
          />
        )}

        {/* Animated Bus */}
        <Marker.Animated coordinate={animatedCoordinate}>
          <MaterialIcons
            name="navigation"
            size={34}
            color="#15803d"
            style={{
              transform: [{ rotate: `${rotation}deg` }],
            }}
          />
        </Marker.Animated>
      </MapView>

      {/* Speed UI */}
      <Text
        style={{
          position: "absolute",
          top: 100,
          left: 20,
          backgroundColor: "white",
          padding: 8,
          borderRadius: 8,
        }}
      >
        Speed: {(speed * 3.6).toFixed(1)} km/h
      </Text>
    </View>
  );
}
