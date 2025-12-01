import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    console.log({ name, email, password });
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 justify-center">
      <Text className="text-3xl font-bold text-black mb-8">Create Account 🤝</Text>

      <TextInput
        className="border border-gray-300 px-4 py-3 rounded-xl mb-4"
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        className="border border-gray-300 px-4 py-3 rounded-xl mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        className="border border-gray-300 px-4 py-3 rounded-xl mb-6"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-green-600 py-4 rounded-xl mb-4"
        onPress={handleSignUp}
      >
        <Text className="text-center text-white font-semibold">Sign Up</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text className="text-gray-500">Already have an account? </Text>
        <Link href="/signIn">
          <Text className="text-green-600 font-semibold">Sign In</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
