import { ScrollView, View } from "react-native";
import AppHeader from "../components/AppHeader";
 import FeatureCard from "../components/Featurecard";
import BottomNav from "../components/ui/BottomNav";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <AppHeader />

        <View className="px-5 mt-6 flex-row flex-wrap justify-between">
          <FeatureCard
            title="User Login"
            icon={<MaterialIcons name="login" size={28} color="#166534" />}
            onPress={() => router.push("/user-login")}
          />

          <FeatureCard
            title="Driver Login"
            icon={<MaterialIcons name="directions-bus" size={28} color="#166534" />}
            onPress={() => router.push("/driver-login")}
          />

          <FeatureCard
            title="Live Bus Tracking"
            icon={<MaterialIcons name="map" size={28} color="#166534" />}
            onPress={() => router.push("/tracking")}
          />

          <FeatureCard
            title="ETA Prediction"
            icon={<MaterialIcons name="schedule" size={28} color="#166534" />}
            onPress={() => router.push("/eta")}
          />

          <FeatureCard
            title="Cashless Payment"
            icon={<MaterialIcons name="payment" size={28} color="#166534" />}
            onPress={() => router.push("/payment")}
          />

          <FeatureCard
            title="Route Recommendation"
            icon={<MaterialIcons name="alt-route" size={28} color="#166534" />}
            onPress={() => router.push("/route-recommend")}
            
          />

          <FeatureCard
            title="Live Bus Location"
            icon={<MaterialIcons name="location-on" size={28} color="#166534" />}
            onPress={() => router.push("/live-bus")}
          />
        </View>
      </ScrollView>

      {/* ✅ Bottom Navigation */}
      <BottomNav />
    </View>
  );
}
