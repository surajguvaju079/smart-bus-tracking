import { kathmanduLocations } from "@/constants/KathmanduLocations";
import { LocationOption } from "@/types/location/location";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

interface Props {
  label: string;
  onSelect: (location: LocationOption) => void;
}

export default function LocationSelect({ label, onSelect }: Props) {
  return (
    <View>
      <Text style={{ fontWeight: "bold", marginBottom: 5 }}>{label}</Text>

      <FlatList
        data={kathmanduLocations}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderColor: "#ddd",
            }}
            onPress={() => onSelect(item)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
