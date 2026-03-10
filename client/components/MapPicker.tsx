import MapView, { Marker } from "react-native-maps";
import { useState } from "react";
import * as Location from "expo-location";

interface Props {
  onLocationSelect: (data: {
    name: string;
    latitude: number;
    longitude: number;
  }) => void;
}

export default function MapPicker({ onLocationSelect }: Props) {
  const [marker, setMarker] = useState<any>(null);

  const handlePress = async (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    setMarker({ latitude, longitude });

    const result = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    const place = result[0];

    const address = place?.name + " " + place?.street + " " + place?.city;

    onLocationSelect({
      name: address,
      latitude,
      longitude,
    });
  };

  return (
    <MapView
      style={{ height: 250 }}
      initialRegion={{
        latitude: 27.7172,
        longitude: 85.324,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      onPress={handlePress}
    >
      {marker && <Marker coordinate={marker} />}
    </MapView>
  );
}
