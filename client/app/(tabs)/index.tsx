import { View, ActivityIndicator, Text } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import AppHeader from "../../components/AppHeader";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home"); // Go to Home page after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-white">
      <AppHeader />
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#15803d" />
        <Text className="mt-2 text-green-700">Loading Smart Bus System...</Text>
      </View>
    </View>
  );
}
