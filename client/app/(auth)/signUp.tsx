import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  console.log("we are at sign up page");
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.textColor} className="text-2xl font-bold">
          SignUp
        </Text>
        <Text className="text-white">Welcome to the SignUp page</Text>
        <View className="bg-yellow-300 px-3 py-3">
          <Text className="text-green-400">Where you going</Text>
        </View>
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
