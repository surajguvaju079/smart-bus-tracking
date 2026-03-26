import { View, ActivityIndicator, Pressable, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { router, useLocalSearchParams } from "expo-router";
import { Route } from "@/api/route";
import AppHeader from "@/components/AppHeader";

const RouteDetail = () => {
  const { id } = useLocalSearchParams() as any;

  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState<any>(null);

  useEffect(() => {
    fetchRoute();
  }, []);

  const fetchRoute = async () => {
    try {
      const res = await Route.showById(id);
      const data = res?.data?.responseObject;

      setRoute(data);
    } catch (error) {
      console.log("Failed to fetch route", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !route) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  const coordinates = route.stops.map((s: any) => ({
    latitude: s.latitude,
    longitude: s.longitude,
  }));

  const first = coordinates[0];

  return (
    <View style={{ flex: 1 }}>
      <AppHeader text="Routes" />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: first.latitude,
          longitude: first.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Route Line */}
        <Polyline
          coordinates={coordinates}
          strokeWidth={4}
          strokeColor="#15803d"
        />

        {/* Stops */}
        {route.stops.map((stop: any) => (
          <Marker
            key={stop.id}
            coordinate={{
              latitude: stop.latitude,
              longitude: stop.longitude,
            }}
            title={stop.name}
          />
        ))}
      </MapView>
      <Pressable
        onPress={() => router.replace("/(driver)/route")}
        style={{
          marginVertical: 10,
          marginBottom: 20,
          paddingVertical: 10,
          marginHorizontal: 20,
          backgroundColor: "#345723",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Back
        </Text>
      </Pressable>
    </View>
  );
};

export default RouteDetail;
