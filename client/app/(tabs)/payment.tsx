import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "@/components/AppHeader";

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

  const updateFare = (fromStop: any, toStop: any) => {
    const dist = Math.abs(toStop.km - fromStop.km);
    setDistance(dist);
    setFare(dist * 5);
  };

  const handleFromSelect = (stop: any) => {
    setFrom(stop);
    updateFare(stop, to);
  };

  const handleToSelect = (stop: any) => {
    setTo(stop);
    updateFare(from, stop);
  };

  useEffect(() => {
    const subscription = Linking.addEventListener("url", (event) => {
      const url = event.url;

      if (url.includes("payment-success")) {
        Alert.alert("Payment Success", "Your payment was successful!");
      } else if (url.includes("payment-failure")) {
        Alert.alert("Payment Failed", "Your payment could not be processed.");
      }
    });

    return () => subscription.remove();
  }, []);

  const handlePay = async () => {
    const pid = `busfare${Date.now()}`;
    const pdc = "busfare";
    const scd = "EPAYTEST";
    const su = "myapp://payment-success";
    const fu = "myapp://payment-failure";
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
    <ScrollView style={styles.container}>
      <AppHeader />

      <View style={styles.wrapper}>
        <Text style={styles.title}>Fare and Payment</Text>

        {/* FROM */}
        <Text style={styles.label}>From</Text>

        <View style={styles.selectedBox}>
          <Text>{from.name}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#15803d" />
        </View>

        <View style={styles.listWrap}>
          {BUS_STOPS.map((stop) => (
            <TouchableOpacity
              key={stop.name}
              onPress={() => handleFromSelect(stop)}
              style={[
                styles.stopBtn,
                from.name === stop.name
                  ? styles.activeBtn
                  : styles.inactiveBtn,
              ]}
            >
              <Text style={styles.stopText}>{stop.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TO */}
        <Text style={styles.label}>To</Text>

        <View style={styles.selectedBox}>
          <Text>{to.name}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#15803d" />
        </View>

        <View style={styles.listWrap}>
          {BUS_STOPS.map((stop) => (
            <TouchableOpacity
              key={stop.name}
              onPress={() => handleToSelect(stop)}
              style={[
                styles.stopBtn,
                to.name === stop.name ? styles.activeBtn : styles.inactiveBtn,
              ]}
            >
              <Text style={styles.stopText}>{stop.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Distance */}
        <Text style={styles.distanceText}>
          Distance Travelled: <Text style={styles.bold}>{distance} km</Text>
        </Text>

        {/* Fare */}
        <View style={styles.fareBox}>
          <Text style={styles.fareText}>Total Fare: Rs. {fare}.00</Text>
        </View>

        {/* Payment */}
        <Text style={styles.label}>Payment Option</Text>

        <View style={styles.paymentBox}>
          <Text style={styles.esewa}>eSewa</Text>
        </View>

        {/* Pay Button */}
        <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
          <Text style={styles.payText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fdf4",
  },
  wrapper: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#15803d",
    textAlign: "center",
  },
  label: {
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  selectedBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  stopBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 4,
  },
  activeBtn: {
    backgroundColor: "#15803d",
  },
  inactiveBtn: {
    backgroundColor: "#bbf7d0",
  },
  stopText: {
    color: "#fff",
    fontWeight: "600",
  },
  distanceText: {
    color: "#374151",
    marginTop: 24,
  },
  bold: {
    fontWeight: "bold",
  },
  fareBox: {
    backgroundColor: "#16a34a",
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
  },
  fareText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  paymentBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: 120,
  },
  esewa: {
    color: "#15803d",
    fontWeight: "bold",
  },
  payBtn: {
    backgroundColor: "#15803d",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  payText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});