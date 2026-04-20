import { Ionicons } from "@expo/vector-icons";
import { Card, useThemeColor } from "heroui-native";
import { Text, View, Pressable } from "react-native";

interface StatisticsCardProps {
  userName?: string;
  collected: number;
  total: number;
  percentage: number;
  onSignOut: () => void;
}

export function StatisticsCard({
  userName = "User",
  collected,
  total,
  percentage,
  onSignOut,
}: StatisticsCardProps) {
  const successColor = useThemeColor("success");
  const foregroundColor = useThemeColor("foreground");
  const dangerColor = useThemeColor("danger");
  const mutedColor = useThemeColor("muted");

  return (
    <Card variant="secondary" className="mb-8 p-6">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1">
          <Text className="text-foreground text-xl md:text-2xl font-bold mb-1">
            Bienvenue, {userName}!
          </Text>
          <Text className="text-muted text-sm">
            Continuez votre exploration
          </Text>
        </View>
        <Pressable
          className="bg-danger/20 p-2 rounded-lg active:opacity-70"
          onPress={onSignOut}
        >
          <Ionicons name="log-out-outline" size={24} color={dangerColor} />
        </Pressable>
      </View>

      {/* Statistics Grid */}
      <View className="flex-row justify-between mt-4 gap-2">
        {/* Collected */}
        <View className="flex-1 items-center bg-background p-4 rounded-lg">
          <Ionicons name="trophy" size={28} color={successColor} />
          <Text className="text-2xl font-bold text-foreground mt-2">
            {collected}
          </Text>
          <Text className="text-muted text-xs md:text-sm text-center">
            Collectés
          </Text>
        </View>

        {/* Total */}
        <View className="flex-1 items-center bg-background p-4 rounded-lg">
          <Ionicons name="book" size={28} color={foregroundColor} />
          <Text className="text-2xl font-bold text-foreground mt-2">
            {total}
          </Text>
          <Text className="text-muted text-xs md:text-sm text-center">
            Total
          </Text>
        </View>

        {/* Percentage */}
        <View className="flex-1 items-center bg-background p-4 rounded-lg">
          <Ionicons name="star" size={28} color="#fbbf24" />
          <Text className="text-2xl font-bold text-foreground mt-2">
            {percentage}%
          </Text>
          <Text className="text-muted text-xs md:text-sm text-center">
            Complété
          </Text>
        </View>
      </View>
    </Card>
  );
}
