import { ScrollView, View } from "react-native";
import AppHeader from "../components/AppHeader";
import FeatureCard from "../components/Featurecard"; // Correct file name
import BottomNav from "../components/ui/BottomNav";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {
  const router = useRouter();

  router.push("/live-bus");

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <AppHeader />

        <View className="px-5 mt-6 flex-row flex-wrap justify-between">
          {/* User Login */}
          <FeatureCard
            title="User Login"
            icon={<MaterialIcons name="login" size={28} color="#166534" />}
            onPress={() => router.push("/user-login")}
          />

          {/* Driver Login */}
          <FeatureCard
            title="Driver Login"
            icon={
              <MaterialIcons name="directions-bus" size={28} color="#166534" />
            }
            onPress={() => router.push("/driver-login")}
          />

          {/* Live Bus Tracking */}
          <FeatureCard
            title="Live Bus Tracking"
            icon={<MaterialIcons name="map" size={28} color="#166534" />}
            onPress={() => router.push("/tracking")}
          />

          {/* ETA Prediction */}
          <FeatureCard
            title="ETA Prediction"
            icon={<MaterialIcons name="schedule" size={28} color="#166534" />}
            onPress={() => router.push("/eta")}
          />

          {/* Cashless Payment */}
          <FeatureCard
            title="Cashless Payment"
            icon={<MaterialIcons name="payment" size={28} color="#166534" />}
            onPress={() => router.push("/payment")}
          />

          {/* Route Recommendation */}
          <FeatureCard
            title="Route Recommendation"
            icon={<MaterialIcons name="alt-route" size={28} color="#166534" />}
            onPress={() => router.push("/route-recommend")}
          />

          {/* Live Bus Location */}
          <FeatureCard
            title="Live Bus Location"
            icon={
              <MaterialIcons name="location-on" size={28} color="#166534" />
            }
            onPress={() => router.push("/live-bus")}
          />

          {/* Admin Dashboard */}
          <FeatureCard
            title="Admin Dashboard"
            icon={<MaterialIcons name="dashboard" size={28} color="#166534" />}
            onPress={() => router.push("/admin-dashboard")}
          />

          <FeatureCard
            title="Driver Tracking Location"
            icon={
              <MaterialIcons name="my-location" size={28} color="#166534" />
            }
            onPress={() =>
              router.push({
                pathname: "/(driver)/[id]",
                params: { id: 1 },
              })
            }
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav />
    </View>
  );
}
