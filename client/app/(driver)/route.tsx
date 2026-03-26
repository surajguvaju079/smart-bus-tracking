import {
  View,
  Text,
  Alert,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Route } from "@/api/route";
import AppHeader from "@/components/AppHeader";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const Routes = () => {
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchAllRoutes();
  }, []);

  const fetchAllRoutes = async () => {
    try {
      setLoading(true);

      const res = await Route.showAll();

      const data = res?.data?.responseObject?.data ?? [];
      setRoutes(data);
    } catch (error) {
      console.log("Failed to fetch data", error);
      Alert.alert("Failed to fetch routes");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllRoutes();
    setRefreshing(false);
  };

  const renderStops = (stops: any[]) => {
    if (!stops || stops.length === 0) {
      return <Text style={{ color: "gray" }}>No stops</Text>;
    }

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "column" }}>
          {/* Line + Dots */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {stops.map((_, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                {/* Dot */}
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "#15803d",
                  }}
                />

                {/* Line */}
                {index !== stops.length - 1 && (
                  <View
                    style={{
                      width: 40,
                      height: 2,
                      backgroundColor: "#15803d",
                    }}
                  />
                )}
              </View>
            ))}
          </View>

          {/* Stop Names */}
          <View style={{ flexDirection: "row", marginTop: 6 }}>
            {stops.map((stop, index) => (
              <View key={stop.id} style={{ width: 50 }}>
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 10, textAlign: "center" }}
                >
                  {stop.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderItem = ({ item }: any) => (
    <View
      style={{
        padding: 16,
        marginBottom: 12,
        backgroundColor: "#f0fdf4",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#bbf7d0",
      }}
    >
      {/* Route Name */}
      <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 8 }}>
        {item.name}
      </Text>

      {/* Stops Flow */}
      {renderStops(item.stops)}

      {/* Map Button */}
      <TouchableOpacity
        onPress={() => router.push(`/(routes)/${item.id}?map=true`)}
        style={{
          marginTop: 12,
          paddingVertical: 8,
          backgroundColor: "#15803d",
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>View on Map</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <AppHeader text="Routes" />
      <View
        style={{
          marginHorizontal: 20,
          paddingVertical: 20,
          display: "flex",
          marginTop: 15,
          justifyContent: "flex-end",
          backgroundColor: "#555555",
          borderRadius: 20,
          alignContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Pressable
          onPress={() => router.push("/create-route-screen")}
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
            Create Routes
          </Text>
        </Pressable>
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="green" />
        </View>
      ) : routes.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>No routes found</Text>
        </View>
      ) : (
        <FlatList
          data={routes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

export default Routes;
