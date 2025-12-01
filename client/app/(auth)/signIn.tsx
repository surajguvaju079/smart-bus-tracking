import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-3xl font-bold text-black mb-8">Welcome Back 👋</Text>

      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 mb-6"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-blue-600 py-4 rounded-xl mb-4"
        onPress={handleSignIn}
      >
        <Text className="text-center text-white font-semibold">Sign In</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text className="text-gray-500">Don't have an account? </Text>
        <Link href="/signUp">
          <Text className="text-blue-600 font-semibold">Sign Up</Text>
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
