import { Ionicons } from "@expo/vector-icons";
import { Card } from "heroui-native";
import { Text, View, Pressable } from "react-native";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

interface CategoryCardProps {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress?: () => void;
}

export function CategoryCard({
  name,
  icon,
  color,
  onPress,
}: CategoryCardProps) {
  return (
    <Card className={[frontendLayout.cardSurface, "overflow-hidden p-0"].join(" ")}>
      <Pressable
        className="min-h-32 items-center justify-center px-6 py-6 active:opacity-80"
        style={{ backgroundColor: `${color}18` }}
        onPress={onPress}
      >
        <View
          className="mb-3 h-14 w-14 items-center justify-center rounded-2xl border border-white/10"
          style={{ backgroundColor: `${color}22` }}
        >
          <Ionicons name={icon} size={34} color={color} />
        </View>
        <Text className="text-white font-semibold text-center text-sm">
          {name}
        </Text>
      </Pressable>
    </Card>
  );
}
