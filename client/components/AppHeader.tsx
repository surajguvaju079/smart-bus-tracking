import { View, Text } from "react-native";
type Header = {
  text?: string;
};

// Figma-style Green Header
export default function AppHeader({ text = "Smart Bus System" }: Header) {
  return (
    <View className="bg-green-700 px-5 py-10 rounded-b-3xl">
      <Text className="text-white text-2xl font-bold text-center">{text}</Text>
      <Text className="text-green-100 text-sm text-center mt-2">
        AI-powered public transportation app with real-time tracking
      </Text>
    </View>
  );
}
