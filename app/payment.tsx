import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";

export default function PaymentPage() {
  const [amount, setAmount] = useState("");

  const handlePay = () => {
    // Placeholder for payment integration
    alert(`Paying NPR ${amount} via eSewa`);
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader />

      <View className="px-6 mt-8">
        {/* Title */}
        <Text className="text-2xl font-bold text-green-700 text-center">
          Cashless Payment
        </Text>

        {/* eSewa Icon + Label */}
        <View className="items-center mt-6">
          <MaterialIcons name="payment" size={64} color="#15803d" />
          <Text className="text-green-700 mt-2 font-semibold text-lg">eSewa</Text>
        </View>

        {/* Amount Input */}
        <View className="flex-row items-center border border-green-300 rounded-lg px-4 py-3 mt-8">
          <MaterialIcons name="attach-money" size={22} color="#15803d" />
          <TextInput
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            className="ml-3 flex-1 text-base"
          />
        </View>

        {/* Pay Button */}
        <TouchableOpacity
          onPress={handlePay}
          className="bg-green-700 py-3 rounded-lg mt-6"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Pay Now
          </Text>
        </TouchableOpacity>

        {/* Secure Info Text */}
        <Text className="text-center text-green-700 mt-6 text-sm">
          All transactions are secure via eSewa
        </Text>
      </View>
    </View>
  );
}
