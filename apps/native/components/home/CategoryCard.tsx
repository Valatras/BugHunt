import { Ionicons } from "@expo/vector-icons";
import { Card } from "heroui-native";
import { Text, View, Pressable } from "react-native";

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
    <Card className="overflow-hidden">
      <Pressable
        className="p-6 items-center active:opacity-80 min-h-32 justify-center"
        style={{ backgroundColor: `${color}15` }}
        onPress={onPress}
      >
        <Ionicons name={icon} size={40} color={color} />
        <Text className="text-foreground font-semibold mt-3 text-center text-sm md:text-base">
          {name}
        </Text>
      </Pressable>
    </Card>
  );
}
