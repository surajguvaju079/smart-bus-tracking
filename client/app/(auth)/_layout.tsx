import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="user-register" />
      <Stack.Screen name="user-login" />
    </Stack>
  );
};

export default AuthLayout;
