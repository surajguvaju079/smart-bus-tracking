import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Linking, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";

// Example bus stops with approximate distance in km
const BUS_STOPS = [
  { name: "Ratnapark", km: 0 },
  { name: "Tripureshwor", km: 2 },
  { name: "Balkhu", km: 4 },
  { name: "Thamel", km: 6 },
  { name: "Kalanki", km: 8 },
  { name: "Koteshwor", km: 10 },
  { name: "Chabahil", km: 12 },
  { name: "Gongabu", km: 14 },
];

export default function PaymentPage() {
  const [from, setFrom] = useState(BUS_STOPS[0]);
  const [to, setTo] = useState(BUS_STOPS[1]);
  const [distance, setDistance] = useState(Math.abs(to.km - from.km));
  const [fare, setFare] = useState(distance * 5);

  // Update fare when selecting stops
  const updateFare = (fromStop: typeof BUS_STOPS[0], toStop: typeof BUS_STOPS[0]) => {
    const dist = Math.abs(toStop.km - fromStop.km);
    setDistance(dist);
    setFare(dist * 5);
  };

  const handleFromSelect = (stop: typeof BUS_STOPS[0]) => {
    setFrom(stop);
    updateFare(stop, to);
  };

  const handleToSelect = (stop: typeof BUS_STOPS[0]) => {
    setTo(stop);
    updateFare(from, stop);
  };

  // eSewa redirect listener
  useEffect(() => {
    const subscription = Linking.addEventListener("url", (event) => {
      const url = event.url;
      if (url.includes("payment-success")) {
        Alert.alert("Payment Success", "Your payment was successful!");
      } else if (url.includes("payment-failure")) {
        Alert.alert("Payment Failed", "Your payment could not be processed.");
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handlePay = async () => {
    const pid = `busfare${Date.now()}`;
    const pdc = "busfare";
    const scd = "EPAYTEST"; // sandbox merchant code
    const su = "myapp://payment-success"; // deep link scheme for success
    const fu = "myapp://payment-failure"; // deep link scheme for failure
    const amount = fare.toFixed(2);

    const esewaUrl = `https://esewa.com.np/epay/main?amt=${amount}&pdc=${pdc}&scd=${scd}&pid=${pid}&su=${su}&fu=${fu}`;

    const supported = await Linking.canOpenURL(esewaUrl);
    if (supported) {
      Linking.openURL(esewaUrl);
    } else {
      Alert.alert("Error", "Cannot open eSewa. Please try on a real device.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-green-50">
      <AppHeader />
      <View className="px-6 mt-6">
        <Text className="text-2xl font-bold text-green-700 text-center">Fare and Payment</Text>

        {/* FROM */}
        <Text className="text-gray-700 mt-6 mb-2">From</Text>
        <View className="bg-white rounded-xl px-4 py-3 flex-row justify-between items-center">
          <Text>{from.name}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#15803d" />
        </View>
        <View className="mt-2 flex-row flex-wrap">
          {BUS_STOPS.map((stop) => (
            <TouchableOpacity
              key={stop.name}
              onPress={() => handleFromSelect(stop)}
              className={`px-3 py-2 rounded-lg m-1 ${from.name === stop.name ? "bg-green-700" : "bg-green-200"}`}
            >
              <Text className="text-white font-semibold">{stop.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TO */}
        <Text className="text-gray-700 mt-4 mb-2">To</Text>
        <View className="bg-white rounded-xl px-4 py-3 flex-row justify-between items-center">
          <Text>{to.name}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#15803d" />
        </View>
        <View className="mt-2 flex-row flex-wrap">
          {BUS_STOPS.map((stop) => (
            <TouchableOpacity
              key={stop.name}
              onPress={() => handleToSelect(stop)}
              className={`px-3 py-2 rounded-lg m-1 ${to.name === stop.name ? "bg-green-700" : "bg-green-200"}`}
            >
              <Text className="text-white font-semibold">{stop.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Distance & Fare */}
        <Text className="text-gray-700 mt-6 mb-2">
          Distance Travelled: <Text className="font-bold">{distance} km</Text>
        </Text>
        <View className="bg-green-600 rounded-xl py-4 mt-2">
          <Text className="text-white text-center text-lg font-bold">Total Fare: Rs. {fare}.00</Text>
        </View>

        {/* eSewa Option */}
        <Text className="text-gray-700 mt-6 mb-2">Payment Option</Text>
        <View className="bg-white rounded-xl px-4 py-4 flex-row items-center w-36">
          <Text className="text-green-700 font-bold">eSewa</Text>
        </View>

        {/* Pay Now */}
        <TouchableOpacity
          onPress={handlePay}
          className="bg-green-700 py-4 rounded-xl mt-6"
        >
          <Text className="text-white text-center font-bold text-lg">Pay Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
