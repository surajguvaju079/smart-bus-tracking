import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BottomNav() {
  const router = useRouter();

  return (
    <View className="flex-row justify-around items-center h-16 bg-green-700 rounded-t-2xl">
      <NavItem icon="home" label="Home" onPress={() => router.push("/home")} />
      <NavItem icon="map" label="Track" onPress={() => router.push("/tracking")} />
      <NavItem icon="alt-route" label="Route" onPress={() => router.push("/route-recommend")} />
      <NavItem icon="payment" label="Pay" onPress={() => router.push("/payment")} />
      <NavItem icon="person" label="Login" onPress={() => router.push("/user-login")} />
    </View>
  );
}

function NavItem({ icon, label, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} className="items-center">
      <MaterialIcons name={icon} size={24} color="white" />
      <Text className="text-white text-xs">{label}</Text>
    </TouchableOpacity>
  );
}
