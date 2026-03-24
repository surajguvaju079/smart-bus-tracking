import { kathmanduLocations } from "@/constants/KathmanduLocations";
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

const SearchableLocationPicker = ({ onSelect }: any) => {
  const [search, setSearch] = useState("");

  // 🔍 Filter locations
  const filteredLocations = useMemo(() => {
    if (!search) return kathmanduLocations;

    return kathmanduLocations.filter((loc) =>
      loc.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        elevation: 3,
      }}
    >
      {/* 🔍 Search Input */}
      <TextInput
        placeholder="Search location..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 8,
          borderRadius: 6,
          marginBottom: 10,
        }}
      />

      {/* 📍 List */}
      <FlatList
        data={filteredLocations}
        keyExtractor={(item) => item.name}
        style={{ maxHeight: 200 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderColor: "#eee",
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchableLocationPicker;
