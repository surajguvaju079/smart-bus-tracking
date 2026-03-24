import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "@/components/AppHeader";
import SearchableLocationPicker from "@/components/SearchLocationPicker";
import { Route } from "@/api/route";
const API_URL = "http://YOUR_API_URL/routes/full";

const CreateRouteScreen = () => {
  const { tripId } = useLocalSearchParams() as any;

  const [routeName, setRouteName] = useState("");
  const [stops, setStops] = useState<any[]>([
    {
      id: Date.now(),
      name: "",
      latitude: null,
      longitude: null,
      showPicker: false,
    },
  ]);
  const [loading, setLoading] = useState(false);

  // ➕ Add Stop
  const addStop = () => {
    setStops((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        latitude: null,
        longitude: null,
        showPicker: false,
      },
    ]);
  };

  // ❌ Remove Stop
  const removeStop = (id: number) => {
    setStops((prev) => prev.filter((s) => s.id !== id));
  };

  // ✏️ Update Stop
  const updateStop = (id: number, data: any) => {
    setStops((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
  };

  // 🚀 Submit
  const handleSubmit = async () => {
    if (!routeName.trim()) {
      Alert.alert("Error", "Route name is required");
      return;
    }

    const formattedStops = stops.map((s, index) => ({
      name: s.name,
      latitude: s.latitude,
      longitude: s.longitude,
      order: index + 1,
    }));

    // validation
    if (formattedStops.some((s) => !s.name || !s.latitude || !s.longitude)) {
      Alert.alert("Error", "Please select all stop locations");
      return;
    }

    try {
      setLoading(true);

      const url = tripId ? `${API_URL}?tripId=${tripId}` : API_URL;

      const res = await Route.create({
        name: routeName,
        stops: formattedStops,
      });
      if (!res?.data?.responseObject) {
        throw new Error(res.data || "Failed");
      }

      Alert.alert("Success", "Route created successfully!");

      // reset
      setRouteName("");
      setStops([
        {
          id: Date.now(),
          name: "",
          latitude: null,
          longitude: null,
          showPicker: false,
        },
      ]);
      router.replace("/(driver)/active-trip");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🧾 Render Stop Item
  const renderStop = ({ item, index }: any) => (
    <View
      style={{
        marginBottom: 12,
        padding: 12,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
      }}
    >
      <Text style={{ fontWeight: "bold" }}>Stop {index + 1}</Text>

      {/* Selected location */}
      <Text style={{ marginVertical: 6 }}>
        {item.name || "No location selected"}
      </Text>

      {/* Select button */}
      <Button
        title="Select Location"
        onPress={() =>
          updateStop(item.id, {
            showPicker: !item.showPicker,
          })
        }
      />

      {/* Picker */}
      {item.showPicker && (
        <View style={{ marginTop: 10 }}>
          <SearchableLocationPicker
            onSelect={(loc: any) => {
              updateStop(item.id, {
                name: loc.name,
                latitude: loc.latitude,
                longitude: loc.longitude,
                showPicker: false,
              });
            }}
          />
        </View>
      )}

      {/* Remove */}
      <TouchableOpacity
        onPress={() => removeStop(item.id)}
        style={{ marginTop: 10 }}
      >
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <AppHeader />

      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Create Route
      </Text>

      {/* Route Name */}
      <TextInput
        placeholder="Route name"
        value={routeName}
        onChangeText={setRouteName}
        style={styles.input}
      />

      {/* Stops */}
      <FlatList
        data={stops}
        renderItem={renderStop}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Add Stop */}
      <Button title="Add Stop" onPress={addStop} />

      {/* Submit */}
      <View style={{ marginTop: 20 }}>
        <Button
          title={loading ? "Creating..." : "Create Route"}
          onPress={handleSubmit}
          disabled={loading}
          color="green"
        />
      </View>
    </View>
  );
};

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "white",
  },
};

export default CreateRouteScreen;
