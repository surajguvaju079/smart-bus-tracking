import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

type Props = {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
};

export default function FeatureCard({ title, icon, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.icon}>{icon}</View>

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#dcfce7",
    width: "48%",
    height: 112,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  icon: {
    marginBottom: 8,
  },

  title: {
    marginTop: 8,
    color: "#166534",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 12,
  },
});