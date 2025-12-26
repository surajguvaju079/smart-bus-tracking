import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import { useLocalSearchParams } from "expo-router";

export default function LiveBusMap() {
  const params = useLocalSearchParams();
  const { lat, lng, busNo, route, eta } = params as any;

  return (
    <View style={{ flex: 1 }}>
      <AppHeader />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
          }}
          title={`Bus ${busNo}`}
          description={`Route: ${route}, ETA: ${eta} min`}
        >
          <MaterialIcons name="directions-bus" size={32} color="#15803d" />
        </Marker>
      </MapView>
    </View>
  );
}
