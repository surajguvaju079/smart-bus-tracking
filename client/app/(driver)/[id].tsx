import { View, Text, Alert, ActivityIndicator, Button } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import MapView, { Marker, Polyline, AnimatedRegion } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { tripLocation } from "@/api/trip-location";
import AppHeader from "@/components/AppHeader";

const DriverTrackingScreen = () => {
  const { id: tripId } = useLocalSearchParams() as any;

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [rotation, setRotation] = useState(0);
  const [speed, setSpeed] = useState(0);

  const intervalRef = useRef<any>(null);
  const mapRef = useRef<MapView | null>(null);
  const isAnimating = useRef(false);

  const animatedCoordinate = useRef(
    new AnimatedRegion({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }),
  ).current;

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission required");
        setHasPermission(false);
        return;
      }

      setHasPermission(true);
    })();
  }, []);

  // Rotation
  const getRotation = (start: any, end: any) => {
    const latDiff = end.latitude - start.latitude;
    const lngDiff = end.longitude - start.longitude;
    return (Math.atan2(lngDiff, latDiff) * 180) / Math.PI;
  };

  // Interpolation
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

  // Smooth animation
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
            duration: 120,
            useNativeDriver: false,
          })
          .start(() => resolve(true));
      });
    }

    isAnimating.current = false;
  };

  const sendLocationToServer = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const payload = {
        trip_id: Number(tripId),
        latitude: newLocation.latitude,
        longitude: newLocation.longitude,
        speed: location.coords.speed ?? 0,
      };

      await tripLocation.create(payload);

      setSpeed(location.coords.speed ?? 0);

      setLocations((prev) => {
        if (prev.length > 0) {
          const prevLoc = prev[prev.length - 1];

          // 🔥 Smooth interpolation instead of jump
          animateSmoothly(prevLoc, newLocation);

          const heading =
            location.coords.heading ?? getRotation(prevLoc, newLocation);

          setRotation(heading);
        } else {
          animatedCoordinate.setValue(newLocation);
        }

        return [...prev.slice(-50), newLocation];
      });

      // Camera follow
      mapRef.current?.animateCamera(
        {
          center: newLocation,
          pitch: 45,
          heading: rotation,
          zoom: 17,
        },
        { duration: 2000 },
      );
    } catch (error: any) {
      console.log("Location error:", error);
    }
  };

  const startTracking = () => {
    if (!tripId) {
      Alert.alert("Trip not found");
      return;
    }

    setIsTracking(true);

    sendLocationToServer();

    intervalRef.current = setInterval(() => {
      sendLocationToServer();
    }, 4000);
  };

  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsTracking(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No location permission</Text>
      </View>
    );
  }

  const latest = locations[locations.length - 1];

  return (
    <View style={{ flex: 1 }}>
      <AppHeader />

      {latest ? (
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
          <Polyline
            coordinates={locations}
            strokeWidth={4}
            strokeColor="#15803d"
          />

          {locations.length > 0 && (
            <Marker coordinate={locations[0]} title="Start" pinColor="blue" />
          )}

          <Marker.Animated coordinate={animatedCoordinate}>
            <MaterialIcons
              name="near-me"
              size={36}
              color="green"
              style={{
                transform: [{ rotate: `${rotation}deg` }],
              }}
            />
          </Marker.Animated>
        </MapView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Waiting for location...</Text>
        </View>
      )}

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

      <View
        style={{
          position: "absolute",
          bottom: 40,
          left: 20,
          right: 20,
        }}
      >
        {!isTracking ? (
          <Button
            title="Start Trip Tracking"
            onPress={startTracking}
            color="green"
          />
        ) : (
          <Button title="Stop Tracking" onPress={stopTracking} color="red" />
        )}
      </View>
    </View>
  );
};

export default DriverTrackingScreen;
