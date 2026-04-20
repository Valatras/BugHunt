import { Ionicons } from "@expo/vector-icons";
import { Card, useThemeColor } from "heroui-native";
import { Text, View } from "react-native";

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
  const mutedColor = useThemeColor("muted");
  const iconColor = color || foregroundColor;

  return (
    <Card variant="secondary" className="mb-4 p-5">
      <View className="flex-row items-start">
        {/* Icon Container */}
        <View
          className="p-3 rounded-full mr-4"
          style={{
            backgroundColor: color ? `${color}20` : "rgb(59, 130, 246)",
          }}
        >
          <Ionicons name={icon} size={28} color={iconColor} />
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text className="text-foreground text-lg font-semibold mb-2">
            {title}
          </Text>
          <Text className="text-muted text-sm leading-5">{description}</Text>
        </View>
      </View>
    </Card>
  );
}
