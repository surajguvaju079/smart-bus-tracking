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

  const isAnimating = useRef(false);
  const mapRef = useRef<MapView | null>(null);

  const [locations, setLocations] = useState<any[]>([]);
  const [routeStops, setRouteStops] = useState<any[]>([]);
  const [rotation, setRotation] = useState(0);
  const [speed, setSpeed] = useState(0);

  const [nextStop, setNextStop] = useState<any>(null);
  const [eta, setEta] = useState<number | null>(null);

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
  // INTERPOLATION
  // =========================
  const interpolate = (start: any, end: any, steps = 20) => {
    const points = [];
    for (let i = 1; i <= steps; i++) {
      points.push({
        latitude:
          Number(start.latitude) +
          (Number(end.latitude) - Number(start.latitude)) * (i / steps),
        longitude:
          Number(start.longitude) +
          (Number(end.longitude) - Number(start.longitude)) * (i / steps),
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
            latitude: Number(p.latitude),
            longitude: Number(p.longitude),
            duration: 100,
            useNativeDriver: false,
          })
          .start(() => resolve(true));
      });
    }

    isAnimating.current = false;
  };

  // =========================
  // FETCH ROUTE
  // =========================
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await Route.show(Number(tripId));
        const stops = res?.data?.responseObject?.stops ?? [];
        console.log("stops are", stops);
        setRouteStops(stops);

        if (stops.length > 0 && mapRef.current) {
          mapRef.current.fitToCoordinates(
            stops.map((s: any) => ({
              latitude: Number(s.latitude),
              longitude: Number(s.longitude),
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
  // SOCKET
  // =========================
  useEffect(() => {
    if (!tripId) return;

    const handleLocation = (data: any) => {
      setLocations((prev) => {
        if (prev.length > 0) {
          const last = prev[prev.length - 1];
          animateSmoothly(last, data);

          const angle =
            data.heading ??
            (Math.atan2(
              Number(data.longitude) - Number(last.longitude),
              Number(data.latitude) - Number(last.latitude),
            ) *
              180) /
              Math.PI;

          setRotation(angle);
        } else {
          animatedCoordinate.setValue({
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
          });
        }

        return [...prev.slice(-50), data];
      });

      // 🔥 NEW: backend-driven state
      setSpeed(data.speed ?? 0);
      setNextStop(data.nextStop ?? null);
      setEta(data.eta ?? null);

      mapRef.current?.animateCamera(
        {
          center: {
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
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
  // ETA COUNTDOWN
  // =========================
  const [etaDisplay, setEtaDisplay] = useState<string>("--");

  useEffect(() => {
    if (!eta) return;

    let seconds = eta;

    const interval = setInterval(() => {
      seconds -= 1;

      if (seconds <= 0) {
        clearInterval(interval);
        setEtaDisplay("Arriving...");
        return;
      }

      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;

      setEtaDisplay(`${min}m ${sec}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [eta]);

  // =========================
  // LOADING
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
          latitude: Number(latest.latitude),
          longitude: Number(latest.longitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Planned Route */}
        <Polyline
          coordinates={routeStops.map((s) => ({
            latitude: Number(s.latitude),
            longitude: Number(s.longitude),
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
          <Marker key={stop.id} coordinate={stop}>
            <MaterialIcons
              name={index === routeStops.length - 1 ? "flag" : "trip-origin"}
              size={20}
              color={index === routeStops.length - 1 ? "red" : "#15803d"}
            />
          </Marker>
        ))}

        {/* Next Stop Highlight */}
        {nextStop && (
          <Marker coordinate={nextStop}>
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
      <Text style={boxStyle(180)}>ETA: {etaDisplay}</Text>
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
