import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "expo-router";
import AppHeader from "@/components/AppHeader";
import { trip } from "@/api/trip";
import { useUserStore } from "@/store/userStore";

export default function ActiveTrip() {
  const user = useUserStore((state) => state.user);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchTrips = useCallback(async () => {
    try {
      const res = await trip.getByDriver(user?.driver_id!);
      const data = res?.data?.responseObject?.trips || [];
      console.log("Fetched trips:", data);
      setTrips(data);
    } catch (error) {
      console.log("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.driver_id]);

  useEffect(() => {
    if (!user?.driver_id) {
      router.push(`/(auth)/user-login`);
      return;
    }
    fetchTrips();
  }, [fetchTrips, router, user?.driver_id]);

  const goToTracking = (tripId: number) => {
    router.push(`/(driver)/${tripId}`);
  };

  const getStatusColor = (status: string) => {
    if (status === "PLANNED") return "#2563eb";
    if (status === "COMPLETED") return "#16a34a";
    return "#6b7280";
  };

  const renderTrip = ({ item }: any) => (
    <View style={styles.tripCard}>
      <Text style={styles.routeText}>
        {item.startLocationName} → {item.endLocationName}
      </Text>
      <Text style={styles.subText}>Vehicle: {item.vehicleNumber}</Text>
      <Text style={styles.subText}>
        Start Time:{" "}
        {new Date(item.startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>

      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>

      {item.status === "PLANNED" && (
        <TouchableOpacity style={styles.startButton} onPress={() => goToTracking(item.id)}>
          <Text style={styles.startButtonText}>Start Trip</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <AppHeader />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }

  if (trips.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <AppHeader />
        <View style={styles.centerContent}>
          <Text>No trips available</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader />
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTrip}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContent: {
    padding: 20,
  },
  tripCard: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  routeText: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  subText: {
    color: "#555",
    marginBottom: 4,
  },
  statusBadge: {
    marginTop: 10,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: "white",
    fontWeight: "600",
  },
  startButton: {
    backgroundColor: "#16a34a",
    marginTop: 14,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  startButtonText: {
    color: "white",
    fontWeight: "700",
  },
});