import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AppHeader from "@/components/AppHeader";
import { trip } from "@/api/trip";
import { useUserStore } from "@/store/userStore";
import { MaterialIcons } from "@expo/vector-icons";

export default function ActiveTrip() {
  const user = useUserStore((state) => state.user);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!user?.driver_id) {
      router.push(`/(auth)/user-login`);
      return;
    }
    const fetchTrips = async () => {
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
    };
    fetchTrips();
  }, [router, user?.driver_id]);

  const goToTracking = (tripId: number) => {
    router.push(`/(tracking)/driver/${tripId}`);
  };

  const getStatusColor = (status: string) => {
    if (status === "PLANNED") return "#2563eb";
    if (status === "COMPLETED") return "#ee2345";
    return "#6b7280";
  };

  const renderTrip = ({ item }: any) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 14,
          padding: 18,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 3,
        }}
      >
        {/* Route */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            marginBottom: 6,
          }}
        >
          {item.startLocationName} → {item.endLocationName}
        </Text>

        {/* Vehicle */}
        <Text style={{ color: "#555", marginBottom: 4 }}>
          Vehicle: {item.vehicleNumber}
        </Text>

        {/* Start Time */}
        <Text style={{ color: "#555" }}>
          Start Time:{" "}
          {new Date(item.startTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>

        {/* Status Badge */}
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              marginTop: 10,
              alignSelf: "flex-start",
              backgroundColor: getStatusColor(item.status),
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              {item.status}
            </Text>
          </View>
          {item.status !== "COMPLETED" && (
            <Pressable
              style={{
                marginTop: 10,
                alignSelf: "flex-end",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 8,
                backgroundColor: "#145689",
              }}
              onPress={() => router.replace("/create-route-screen")}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                + Add Routes
              </Text>
            </Pressable>
          )}
        </View>

        {/* Start Tracking */}
        {item.status === "PLANNED" && (
          <TouchableOpacity
            style={{
              backgroundColor: "#16a34a",
              marginTop: 14,
              padding: 12,
              borderRadius: 10,
              alignItems: "center",
            }}
            onPress={() => goToTracking(item.id)}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "700",
              }}
            >
              Start Trip
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <AppHeader text="Trips" />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }

  if (trips.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <AppHeader />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>No trips available</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
      <AppHeader text="Trips" />
      <View
        style={{
          marginHorizontal: 20,
          paddingVertical: 20,
          display: "flex",
          marginTop: 20,
          justifyContent: "flex-end",
          backgroundColor: "#555555",
          borderRadius: 20,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => router.push("/create-trip")}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="add" size={18} color={"#ffffff"} />
          <Text
            style={{
              color: "#ffffff",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Create Trips
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTrip}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}
