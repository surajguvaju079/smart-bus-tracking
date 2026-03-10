import { GOOGLE_MAP_API_KEY } from "@/constants/GoogleMapKey";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

interface Props {
  placeholder: string;
  onLocationSelect: (data: {
    name: string;
    latitude: number;
    longitude: number;
  }) => void;
}

export default function LocationSearch({
  placeholder,
  onLocationSelect,
}: Props) {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      fetchDetails={true}
      query={{
        key: GOOGLE_MAP_API_KEY,
        language: "en",
      }}
      onPress={(data, details: any) => {
        const latitude = details.geometry.location.lat;
        const longitude = details.geometry.location.lng;

        onLocationSelect({
          name: data.description,
          latitude,
          longitude,
        });
      }}
      styles={{
        container: { flex: 0 },
        textInput: {
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
        },
        listView: {
          borderWidth: 1,
          borderRadius: 8,
          marginTop: 5,
          backgroundColor: "#ee3456",
        },
      }}
    />
  );
}
