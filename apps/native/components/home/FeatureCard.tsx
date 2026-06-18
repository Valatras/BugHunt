import { Ionicons } from "@expo/vector-icons";
import { Card, useThemeColor } from "heroui-native";
import { Text, View } from "react-native";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  color,
}: FeatureCardProps) {
  const foregroundColor = useThemeColor("foreground");
  const iconColor = color || foregroundColor;

  return (
    <Card className={[frontendLayout.cardSurface, "mb-4 p-0"].join(" ")}>
      <View className="flex-row items-start gap-4 p-5">
        <View
          className="h-12 w-12 items-center justify-center rounded-2xl border border-white/10"
          style={{
            backgroundColor: color ? `${color}1f` : "rgba(255,255,255,0.08)",
          }}
        >
          <Ionicons name={icon} size={26} color={iconColor} />
        </View>

        <View className="flex-1">
          <Text className="text-white text-lg font-semibold mb-2">
            {title}
          </Text>
          <Text className="text-white/70 text-sm leading-6">{description}</Text>
        </View>
      </View>
    </Card>
  );
}
