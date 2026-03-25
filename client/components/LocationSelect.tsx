import { kathmanduLocations } from "@/constants/KathmanduLocations";
import { LocationOption } from "@/types/location/location";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

interface Props {
  label: string;
  onSelect: (location: LocationOption) => void;
}

export default function LocationSelect({ label, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <FlatList
        data={kathmanduLocations}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onSelect(item)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 14,
    color: "#15803d", // green text, can adjust
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f3f4f6",
  },
  itemText: {
    fontSize: 14,
    color: "#333",
  },
});