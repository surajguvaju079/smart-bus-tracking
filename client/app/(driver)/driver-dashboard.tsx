import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import AppHeader from "@/components/AppHeader";

export default function DriverDashboard() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <AppHeader />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "green" }}>
          Driver Dashboard
        </Text>

        <Button
          title="Start New Trip"
          onPress={() => router.push("/create-trip")}
          color="green"
        />

        <Button
          title="Active Trip"
          onPress={() => router.push("/active-trip")}
          color="green"
        />
      </View>
    </View>
  );
}
