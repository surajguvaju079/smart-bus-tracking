import { View, Text } from "react-native";

// Figma-style Green Header
export default function AppHeader() {
  return (
    <View className="bg-green-700 px-5 py-10 rounded-b-3xl">
      <Text className="text-white text-2xl font-bold text-center">
        Smart Bus System
      </Text>
      <Text className="text-green-100 text-sm text-center mt-2">
        AI-powered public transportation app with real-time tracking
      </Text>
    </View>
  );
}
