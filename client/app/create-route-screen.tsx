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
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "@/components/AppHeader";

const API_URL = "http://YOUR_API_URL/routes/full";

const CreateRouteScreen = () => {
  const { tripId } = useLocalSearchParams() as any;

  const [routeName, setRouteName] = useState("");
  const [stops, setStops] = useState<any[]>([
    { id: Date.now(), name: "", latitude: "", longitude: "" },
  ]);
  const [loading, setLoading] = useState(false);

  // ➕ Add Stop
  const addStop = () => {
    setStops((prev) => [
      ...prev,
      { id: Date.now(), name: "", latitude: "", longitude: "" },
    ]);
  };

  // ❌ Remove Stop
  const removeStop = (id: number) => {
    setStops((prev) => prev.filter((s) => s.id !== id));
  };

  // ✏️ Update Stop
  const updateStop = (id: number, field: string, value: string) => {
    setStops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };

  // 🚀 Submit
  const handleSubmit = async () => {
    if (!routeName.trim()) {
      Alert.alert("Error", "Route name is required");
      return;
    }

    const formattedStops = stops.map((s, index) => ({
      name: s.name,
      latitude: Number(s.latitude),
      longitude: Number(s.longitude),
      order: index + 1,
    }));

    // validation
    if (
      formattedStops.some(
        (s) => !s.name || isNaN(s.latitude) || isNaN(s.longitude),
      )
    ) {
      Alert.alert("Error", "All stops must have valid data");
      return;
    }

    try {
      setLoading(true);

      const url = tripId ? `${API_URL}?tripId=${tripId}` : API_URL;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: routeName,
          stops: formattedStops,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed");
      }

      Alert.alert("Success", "Route created successfully!");

      // reset
      setRouteName("");
      setStops([{ id: Date.now(), name: "", latitude: "", longitude: "" }]);
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
        padding: 10,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
      }}
    >
      <Text>Stop {index + 1}</Text>

      <TextInput
        placeholder="Stop name"
        value={item.name}
        onChangeText={(text) => updateStop(item.id, "name", text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Latitude"
        keyboardType="numeric"
        value={item.latitude}
        onChangeText={(text) => updateStop(item.id, "latitude", text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Longitude"
        keyboardType="numeric"
        value={item.longitude}
        onChangeText={(text) => updateStop(item.id, "longitude", text)}
        style={styles.input}
      />

      <TouchableOpacity onPress={() => removeStop(item.id)}>
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

      <TextInput
        placeholder="Route name"
        value={routeName}
        onChangeText={setRouteName}
        style={styles.input}
      />

      <FlatList
        data={stops}
        renderItem={renderStop}
        keyExtractor={(item) => item.id.toString()}
      />

      <Button title="Add Stop" onPress={addStop} />

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
    padding: 8,
    marginVertical: 5,
    borderRadius: 6,
  },
};

export default CreateRouteScreen;
