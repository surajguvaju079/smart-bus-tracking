import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

type Props = {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
};

export default function FeatureCard({ title, icon, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>{icon}</View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#bbf7d0", // green-100
    width: "48%",
    height: 112, // approx 28 * 4 px
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    marginTop: 8,
    color: "#166534", // green-800
    fontWeight: "600",
    textAlign: "center",
    fontSize: 12,
  },
});