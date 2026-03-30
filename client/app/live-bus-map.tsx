import { ActivityIndicator, View, Text } from "react-native";
import MapView, { Marker, Polyline, AnimatedRegion } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import { io } from "socket.io-client";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { SOCKET_URL } from "@/constants/SocketUrl";
import { Route } from "@/api/route";

const socket = io(SOCKET_URL);

export default function LiveBusMap() {
  const { tripId } = useLocalSearchParams() as any;

  const mapRef = useRef<MapView | null>(null);
  const isAnimating = useRef(false);

  const [locations, setLocations] = useState<any[]>([]);
  const [routeStops, setRouteStops] = useState<any[]>([]);
  const [rotation, setRotation] = useState(0);
  const [speed, setSpeed] = useState(0);

  const [nextStop, setNextStop] = useState<any>(null);
  const [eta, setEta] = useState<number | null>(null);
  const [etaList, setEtaList] = useState<any[]>([]);

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
  // Helpers
  // =========================
  const formatEta = (seconds: number) => {
    if (!seconds) return "--";
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}m ${sec}s`;
  };

  const interpolate = (start: any, end: any, steps = 20) => {
    const points = [];
    for (let i = 1; i <= steps; i++) {
      points.push({
        latitude:
          start.latitude + (end.latitude - start.latitude) * (i / steps),
        longitude:
          start.longitude + (end.longitude - start.longitude) * (i / steps),
      });
    }
    return points;
  };

  const animateSmoothly = async (start: any, end: any) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const points = interpolate(start, end, 20);

    for (let p of points) {
      await new Promise((resolve) => {
        animatedCoordinate
          .timing({
            latitude: p.latitude,
            longitude: p.longitude,
            duration: 100,
            useNativeDriver: false,
          })
          .start(() => resolve(true));
      });
    }

    isAnimating.current = false;
  };

  // =========================
  // Fetch route + stops
  // =========================
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await Route.show(Number(tripId));
        const stops = res?.data?.responseObject?.stops ?? [];

        const parsedStops = stops.map((s: any) => ({
          ...s,
          latitude: Number(s.latitude),
          longitude: Number(s.longitude),
        }));

        setRouteStops(parsedStops);

        if (parsedStops.length > 0 && mapRef.current) {
          mapRef.current.fitToCoordinates(
            parsedStops.map((s: any) => ({
              latitude: s.latitude,
              longitude: s.longitude,
            })),
            {
              edgePadding: { top: 100, right: 50, bottom: 100, left: 50 },
              animated: true,
            },
          );
        }
      } catch (error) {
        console.log("Route fetch error:", error);
      }
    };

    if (tripId) fetchRoute();
  }, [tripId]);

  // =========================
  // Socket tracking
  // =========================
  useEffect(() => {
    if (!tripId) return;

    const handleLocation = (data: any) => {
      const parsed = {
        ...data,
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
      };

      setLocations((prev) => {
        if (prev.length > 0) {
          const last = prev[prev.length - 1];

          animateSmoothly(last, parsed);

          const angle =
            parsed.heading ??
            (Math.atan2(
              parsed.longitude - last.longitude,
              parsed.latitude - last.latitude,
            ) *
              180) /
              Math.PI;

          setRotation(angle);
        } else {
          animatedCoordinate.setValue(parsed);
        }

        return [...prev.slice(-50), parsed];
      });

      setSpeed(Number(parsed.speed ?? 0));

      // ✅ Backend-driven next stop
      if (data.nextStop) {
        setNextStop({
          ...data.nextStop,
          latitude: Number(data.nextStop.latitude),
          longitude: Number(data.nextStop.longitude),
        });
      }

      // ✅ ETA
      setEta(data.etaToNext ?? null);

      // ✅ Multi-stop ETA
      setEtaList(data.etaList ?? []);

      mapRef.current?.animateCamera(
        {
          center: {
            latitude: parsed.latitude,
            longitude: parsed.longitude,
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
  // Loading
  // =========================
  if (locations.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  const latest = locations[locations.length - 1];

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
        {/* Planned Route */}
        <Polyline
          coordinates={routeStops.map((s) => ({
            latitude: s.latitude,
            longitude: s.longitude,
          }))}
          strokeWidth={3}
          strokeColor="#9CA3AF"
        />

        {/* Live Path */}
        <Polyline
          coordinates={locations}
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
          >
            <MaterialIcons
              name={index === routeStops.length - 1 ? "flag" : "trip-origin"}
              size={20}
              color={index === routeStops.length - 1 ? "red" : "#15803d"}
            />
          </Marker>
        ))}

        {/* Next Stop Highlight */}
        {nextStop && (
          <Marker
            coordinate={{
              latitude: nextStop.latitude,
              longitude: nextStop.longitude,
            }}
          >
            <MaterialIcons name="place" size={30} color="orange" />
          </Marker>
        )}

        {/* Animated Vehicle */}
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
      <Text style={boxStyle(100)}>Speed: {(speed * 3.6).toFixed(1)} km/h</Text>

      {/* Next Stop */}
      <Text style={boxStyle(140)}>Next Stop: {nextStop?.name ?? "--"}</Text>

      {/* ETA */}
      <Text style={boxStyle(180)}>ETA: {formatEta(eta ?? 0)}</Text>

      {/* Multi-stop ETA */}
      <View
        style={{
          position: "absolute",
          top: 220,
          left: 20,
          right: 20,
          backgroundColor: "white",
          padding: 10,
          borderRadius: 10,
          maxHeight: 200,
        }}
      >
        <Text style={{ fontWeight: "bold", marginBottom: 6 }}>
          Upcoming Stops
        </Text>

        {etaList.slice(0, 5).map((stop, index) => (
          <Text
            key={stop.stopId}
            style={{
              fontWeight: index === 0 ? "bold" : "normal",
              color: index === 0 ? "#15803d" : "#000",
            }}
          >
            {stop.stopName} → {formatEta(stop.eta)}
          </Text>
        ))}
      </View>
    </View>
  );
}

// UI helper
const boxStyle = (top: number) => ({
  position: "absolute" as const,
  top,
  left: 20,
  backgroundColor: "white",
  padding: 8,
  borderRadius: 8,
});
