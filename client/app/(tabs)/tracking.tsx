import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { trip } from "@/api/trip";
import AppHeader from "@/components/AppHeader";

export default function LiveBusTracking() {
  const [loading, setLoading] = useState(false);
  const [buses, setBuses] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    setLoading(true);

    try {
      const res = await trip.getAll();

      if (res.status === 200) {
        const trips = res.data.responseObject.trips;

        const updatedBuses = trips
          .filter((trip: any) => trip.status !== "COMPLETED")
          .map((trip: any) => ({
            id: trip.id,
            busNo: trip.vehicleNumber,
            route: `${trip.startLocationName} → ${trip.endLocationName}`,
            lat: Number(trip.startLatitude),
            lng: Number(trip.startLongitude),
            status: trip.status === "PLANNED" ? "Scheduled" : "Live",
          }));

        setBuses(updatedBuses);
      }
    } catch (error) {
      console.error("Error fetching buses:", error);
      Alert.alert("Error", "Failed to fetch buses");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <AppHeader />

      <View style={styles.wrapper}>
        <Text style={styles.title}>Live Bus Dashboard</Text>

        {buses.length === 0 && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              No active buses available
            </Text>
          </View>
        )}

        {buses.map((bus) => (
          <View key={bus.id} style={styles.card}>
            <View style={styles.left}>
              <MaterialIcons
                name="directions-bus"
                size={28}
                color="#15803d"
              />

              <View style={styles.busInfo}>
                <Text style={styles.busTitle}>Bus {bus.busNo}</Text>
                <Text style={styles.route}>{bus.route}</Text>
              </View>
            </View>

            <View style={styles.right}>
              <Text
                style={[
                  styles.status,
                  bus.status === "Live"
                    ? styles.live
                    : styles.scheduled,
                ]}
              >
                {bus.status}
              </Text>

              <TouchableOpacity
                style={styles.trackBtn}
                onPress={() =>
                  router.push({
                    pathname: "/live-bus-map",
                    params: { tripId: bus.id },
                  })
                }
              >
                <Text style={styles.trackText}>Track</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  wrapper: {
    paddingHorizontal: 20,
    marginTop: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#15803d",
    textAlign: "center",
  },

  emptyBox: {
    marginTop: 40,
    alignItems: "center",
  },

  emptyText: {
    color: "#6b7280",
    fontSize: 16,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#bbf7d0",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  busInfo: {
    marginLeft: 12,
  },

  busTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#166534",
  },

  route: {
    fontSize: 12,
    color: "#374151",
  },

  right: {
    alignItems: "flex-end",
  },

  status: {
    fontSize: 12,
    fontWeight: "600",
  },

  live: {
    color: "#15803d",
  },

  scheduled: {
    color: "#ca8a04",
  },

  trackBtn: {
    backgroundColor: "#15803d",
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 8,
    borderRadius: 8,
  },

  trackText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});