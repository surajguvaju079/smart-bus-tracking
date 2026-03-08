import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserStore } from "@/store/userStore";

const IndexPage = () => {
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const isHydrated = useUserStore((state) => state._hasHydrated);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isHydrated) return;

    const checkAuth = async () => {
      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const accessToken = await AsyncStorage.getItem("accessToken");

        if (!refreshToken || !accessToken || !user) {
          router.replace("/(auth)/user-register");
          return;
        }

        if (user.role === "ADMIN") {
          router.replace("/(admin)/admin-dashboard");
          return;
        }

        if (user.role === "DRIVER") {
          router.replace("/(driver)/driver-dashboard");
          return;
        }

        if (user.role === "USER") {
          router.replace("/(tabs)/home");
          return;
        }
      } catch (error) {
        console.log("Auth check error:", error);
        router.replace("/(auth)/user-register");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isHydrated, router, user]);

  if (!isHydrated || loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#166534" />
      </SafeAreaView>
    );
  }

  return null;
};

export default IndexPage;
