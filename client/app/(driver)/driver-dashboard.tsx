import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import AppHeader from "@/components/AppHeader";

const DriverDashboard = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <AppHeader />
      <View className="flex-1 items-center justify-center">
        <Text className="text-green-700 text-lg">DriverDashboard</Text>
      </View>
    </ScrollView>
  );
};

export default DriverDashboard;
