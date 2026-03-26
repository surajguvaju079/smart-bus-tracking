import { ActivityIndicator, View, Text } from "react-native";
import MapView, { Marker, Polyline, AnimatedRegion } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import { io } from "socket.io-client";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { SOCKET_URL } from "@/constants/SocketUrl";
import { Route } from "@/api/route";

const API_URL = "YOUR_API_URL_HERE"; // 🔥 replace this
const socket = io(SOCKET_URL);

export default function LiveBusMap() {
  const { tripId } = useLocalSearchParams() as any;

  const isAnimating = useRef(false);
  const mapRef = useRef<MapView | null>(null);

  const [locations, setLocations] = useState<any[]>([]);
  const [routeStops, setRouteStops] = useState<any[]>([]);
  const [rotation, setRotation] = useState(0);
  const [speed, setSpeed] = useState(0);

  // Animated coordinate
  const animatedCoordinate = useRef(
    new AnimatedRegion({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }),
  ).current;

  // =========================
  // Distance (Haversine)
  // =========================
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

  // =========================
  // Rotation
  // =========================
  const getRotation = (start: any, end: any) => {
    const latDiff = end.latitude - start.latitude;
    const lngDiff = end.longitude - start.longitude;
    return (Math.atan2(lngDiff, latDiff) * 180) / Math.PI;
  };

  // =========================
  // Interpolation
  // =========================
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

    const points = interpolate(start, end, 20);

    for (let i = 0; i < points.length; i++) {
      await new Promise((resolve) => {
        animatedCoordinate
          .timing({
            latitude: points[i].latitude,
            longitude: points[i].longitude,
            duration: 100,
            useNativeDriver: false,
          })
          .start(() => resolve(true));
      });
    }

    isAnimating.current = false;
  };

  // =========================
  // Fetch Route + Stops
  // =========================
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await Route.show(Number(tripId));

        const stops = res?.data?.responseObject?.stops ?? [];

        setRouteStops(stops);

        // Fit map to route
        if (stops.length > 0 && mapRef.current) {
          mapRef.current.fitToCoordinates(
            stops.map((s: any) => ({
              latitude: s.latitude,
              longitude: s.longitude,
            })),
            {
              edgePadding: {
                top: 100,
                right: 50,
                bottom: 100,
                left: 50,
              },
              animated: true,
            },
          );
        }
      } catch (error) {
        console.log("Error fetching route:", error);
      }
    };

    if (tripId) fetchRoute();
  }, [tripId]);

  // =========================
  // Socket Tracking
  // =========================
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

          if (d < 5) return prev;

          animateSmoothly(last, data);

          const angle = data.heading ?? getRotation(last, data);

          setRotation(angle);
          setSpeed(data.speed ?? 0);
        } else {
          animatedCoordinate.setValue({
            latitude: data.latitude,
            longitude: data.longitude,
          });
        }

        return [...prev.slice(-50), data];
      });

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

  // =========================
  // Nearest Stop
  // =========================
  const latest = locations[locations.length - 1];

  const getNearestStop = () => {
    if (!latest || routeStops.length === 0) return null;

    let minDist = Infinity;
    let nearest = null;

    routeStops.forEach((stop) => {
      const d = distance(
        latest.latitude,
        latest.longitude,
        stop.latitude,
        stop.longitude,
      );

      if (d < minDist) {
        minDist = d;
        nearest = stop;
      }
    });

    return nearest;
  };

  const nearestStop = getNearestStop();

  // =========================
  // Loading
  // =========================
  if (locations.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  // =========================
  // UI
  // =========================
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
        {/* Planned Route (Grey) */}
        {routeStops.length > 0 && (
          <Polyline
            coordinates={routeStops.map((stop) => ({
              latitude: stop.latitude,
              longitude: stop.longitude,
            }))}
            strokeWidth={3}
            strokeColor="#9CA3AF"
          />
        )}

        {/* Live Path (Green) */}
        <Polyline
          coordinates={locations.map((loc) => ({
            latitude: loc.latitude,
            longitude: loc.longitude,
          }))}
          strokeWidth={4}
          strokeColor="#15803d"
        />

        {/* Stops */}
        {routeStops.map((stop, index) => (
          <Marker
            key={stop.id}
            coordinate={{
              latitude: stop.latitude,
              longitude: stop.longitude,
            }}
            title={stop.name}
          >
            <MaterialIcons
              name={index === routeStops.length - 1 ? "flag" : "trip-origin"}
              size={20}
              color={index === routeStops.length - 1 ? "red" : "#15803d"}
            />
          </Marker>
        ))}

        {/* Nearest Stop */}
        {nearestStop && (
          <Marker
            coordinate={{
              latitude: nearestStop.latitude,
              longitude: nearestStop.longitude,
            }}
          >
            <MaterialIcons name="place" size={30} color="orange" />
          </Marker>
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

      {/* Speed */}
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

      {/* Next Stop */}
      <Text
        style={{
          position: "absolute",
          top: 140,
          left: 20,
          backgroundColor: "white",
          padding: 8,
          borderRadius: 8,
        }}
      >
        Next Stop: {nearestStop?.name ?? "—"}
      </Text>
    </View>
  );
}
