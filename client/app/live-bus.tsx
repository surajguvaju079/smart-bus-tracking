import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AppHeader from "../components/AppHeader";
import { trip } from "@/api/trip";

export default function LiveBusDashboard() {
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
      alert("Failed to fetch buses");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#15803d" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <AppHeader />

      <View style={styles.content}>
        <Text style={styles.title}>Live Bus Dashboard</Text>

        {buses.length === 0 && (
          <View style={styles.noBuses}>
            <Text style={styles.noBusesText}>No active buses available</Text>
          </View>
        )}

        {buses.map((bus) => (
          <View key={bus.id} style={styles.busCard}>
            <View style={styles.busInfo}>
              <MaterialIcons name="directions-bus" size={28} color="#15803d" />
              <View style={styles.busText}>
                <Text style={styles.busNumber}>Bus {bus.busNo}</Text>
                <Text style={styles.busRoute}>{bus.route}</Text>
              </View>
            </View>

            <View style={styles.busActions}>
              <Text
                style={[
                  styles.busStatus,
                  bus.status === "Live" ? styles.statusLive : styles.statusScheduled,
                ]}
              >
                {bus.status}
              </Text>

              <TouchableOpacity
                style={styles.trackButton}
                onPress={() =>
                  router.push({
                    pathname: "/live-bus-map",
                    params: { tripId: bus.id },
                  })
                }
              >
                <Text style={styles.trackButtonText}>Track</Text>
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
    backgroundColor: "#ffffff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#15803d",
    textAlign: "center",
  },
  noBuses: {
    marginTop: 40,
    alignItems: "center",
  },
  noBusesText: {
    color: "#6b7280",
    fontSize: 16,
  },
  busCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#d1fae5",
    borderWidth: 1,
    borderColor: "#bbf7d0",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  busInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  busText: {
    marginLeft: 12,
  },
  busNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#065f46",
  },
  busRoute: {
    fontSize: 14,
    color: "#374151",
    marginTop: 2,
  },
  busActions: {
    alignItems: "flex-end",
  },
  busStatus: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusLive: {
    color: "#15803d",
  },
  statusScheduled: {
    color: "#ca8a04",
  },
  trackButton: {
    backgroundColor: "#15803d",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  trackButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
});