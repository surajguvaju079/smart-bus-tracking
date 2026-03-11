import { View, Text, Alert, ActivityIndicator, Button } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { tripLocation } from "@/api/trip-location";
import AppHeader from "@/components/AppHeader";

const DriverTrackingScreen = () => {
  const { id: tripId } = useLocalSearchParams() as any;

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);

  const intervalRef = useRef<any>(null);
  const mapRef = useRef<MapView | null>(null);

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

  const sendLocationToServer = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const payload = {
        trip_id: Number(tripId),
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        speed: location.coords.speed ?? 0,
      };
      console.log("Sending location:", payload);

      const res = await tripLocation.create(payload);
      console.log("Location sent successfully", res.data);

      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setLocations((prev) => [...prev, newLocation]);

      mapRef.current?.animateCamera({
        center: newLocation,
        zoom: 16,
      });
    } catch (error) {
      console.log(
        "Location error:",
        error?.response?.data ||
          error?.response?.data?.message ||
          "Unknown error",
      );
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
          {/* Route path */}
          <Polyline
            coordinates={locations}
            strokeWidth={4}
            strokeColor="#15803d"
          />

          {/* Bus marker */}
          <Marker coordinate={latest}>
            <MaterialIcons name="directions-bus" size={36} color="green" />
          </Marker>
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

      {/* Controls */}
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
