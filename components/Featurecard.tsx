import { TouchableOpacity, Text, View } from "react-native";

type Props = {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
};

export default function FeatureCard({ title, icon, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-green-100 w-[48%] h-28 rounded-xl justify-center items-center mb-4"
    >
      <View>{icon}</View>
      <Text className="mt-2 text-green-800 font-semibold text-center text-sm">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
