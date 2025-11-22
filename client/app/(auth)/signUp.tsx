import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  return (
    <SafeAreaView>
      <View className="bg-white flex-1 items-center justify-center">
        <Text style={styles.textColor} className="text-2xl font-bold">
          SignUp
        </Text>
        <Text className="text-gray-300">Welcome to the SignUp page</Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  textColor: {
    color: "red",
  },
});
