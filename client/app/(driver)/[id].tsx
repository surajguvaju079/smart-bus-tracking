import { View, Text, Alert, ActivityIndicator, Button } from "react-native";
import React, { useEffect } from "react";
import * as Location from "expo-location";
import { tripLocation } from "@/api/trip-location";
import { useLocalSearchParams } from "expo-router";
const DriverTrackingScreen = () => {
  const params = useLocalSearchParams();
  const { tripId } = params as any;
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isTracking, setIsTracking] = React.useState(false);
  const intervalRef = React.useRef<number | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to track the bus.",
        );
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
      const res = await tripLocation.create(payload);
      if (res.status === 200) {
        console.log("Location sent successfully");
      }
    } catch (error) {
      console.log("Error sending location:", error);
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
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={"green"} />
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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Driver Live Tracking
      </Text>
      {!isTracking ? (
        <Button title="Start Tracking" onPress={startTracking} color="green" />
      ) : (
        <Button title="Stop Tracking" onPress={stopTracking} color="red" />
      )}
    </View>
  );
};

export default DriverTrackingScreen;
