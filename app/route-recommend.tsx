import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AppHeader from "../components/AppHeader";

const recommendedRoutes = [
  { busNo: "27", route: "Ratnapark → Tripureshwor → Kalanki", eta: 18, lat: 27.7017, lng: 85.3206, stops: 6, status: "Live" },
  { busNo: "12", route: "Ratnapark → Balkhu → Kalanki", eta: 24, lat: 27.7050, lng: 85.3120, stops: 9, status: "Moderate" },
  { busNo: "5", route: "Tripureshwor → Kalanki", eta: 30, lat: 27.7090, lng: 85.3100, stops: 8, status: "Live" },
  { busNo: "3", route: "Kalanki → Bhaktapur", eta: 35, lat: 27.7100, lng: 85.3250, stops: 10, status: "Moderate" },
  { busNo: "7", route: "Tripureshwor → Thamel", eta: 22, lat: 27.7040, lng: 85.3150, stops: 7, status: "Live" },
  { busNo: "9", route: "Ratnapark → Koteshwor", eta: 28, lat: 27.7080, lng: 85.3180, stops: 9, status: "Live" },
  { busNo: "15", route: "Chabahil → Kalanki", eta: 26, lat: 27.7060, lng: 85.3220, stops: 8, status: "Moderate" },
  { busNo: "18", route: "Kalanki → Koteshwor", eta: 32, lat: 27.7030, lng: 85.3190, stops: 10, status: "Live" },
  { busNo: "20", route: "Maharajgunj → Lagankhel", eta: 40, lat: 27.7070, lng: 85.3210, stops: 12, status: "Moderate" },
  { busNo: "21", route: "Ratnapark → Gongabu", eta: 29, lat: 27.7020, lng: 85.3170, stops: 9, status: "Live" },
];

export default function RouteRecommend() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white">
      <AppHeader />

      <View className="px-5 mt-6">
        <Text className="text-2xl font-bold text-green-700 text-center">
          Route Recommendation
        </Text>

        {recommendedRoutes.map((route) => (
          <View key={route.busNo} className="border border-green-200 rounded-xl p-4 mt-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-green-700">Bus {route.busNo}</Text>
              <Text className={`text-sm font-semibold ${route.status === "Live" ? "text-green-700" : "text-yellow-600"}`}>
                {route.status}
              </Text>
            </View>

            <Text className="text-gray-600 mt-1">{route.route}</Text>

            <View className="flex-row justify-between mt-3">
              <Text className="text-sm text-gray-700">⏱ ETA: {route.eta} min</Text>
              <Text className="text-sm text-gray-700">📍 Stops: {route.stops}</Text>
            </View>

            <View className="flex-row mt-4 justify-between">
              <TouchableOpacity
                className="border border-green-600 px-4 py-2 rounded-lg"
                onPress={() =>
                  router.push({
                    pathname: "/live-bus-map",
                    params: {
                      lat: route.lat,
                      lng: route.lng,
                      busNo: route.busNo,
                      route: route.route,
                      eta: route.eta,
                    },
                  })
                }
              >
                <Text className="text-green-700 font-semibold">View Map</Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-green-700 px-4 py-2 rounded-lg">
                <Text className="text-white font-semibold">Select Route</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
