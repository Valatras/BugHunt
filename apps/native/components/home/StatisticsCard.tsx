import { Ionicons } from "@expo/vector-icons";
import { Card, useThemeColor } from "heroui-native";
import { Text, View, Pressable } from "react-native";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

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

  return (
    <Card className={[frontendLayout.cardSurface, "mb-8 p-0"].join(" ")}>
      <View className="p-6">
        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="mb-1 text-2xl font-black tracking-tight text-white">
              Bienvenue, {userName}!
            </Text>
            <Text className="text-sm text-white/60">
              Continuez votre exploration
            </Text>
          </View>
          <Pressable
            className="rounded-2xl border border-white/10 bg-white/5 p-2.5 active:opacity-70"
            onPress={onSignOut}
          >
            <Ionicons name="log-out-outline" size={24} color={dangerColor} />
          </Pressable>
        </View>

        {/* Statistics Grid */}
        <View className="mt-4 flex-row justify-between gap-2">
          {/* Collected */}
          <View className="flex-1 items-center rounded-2xl border border-white/10 bg-black/20 p-4">
            <Ionicons name="trophy" size={28} color={successColor} />
            <Text className="mt-2 text-2xl font-black text-white">
              {collected}
            </Text>
            <Text className="text-center text-xs text-white/55">
              Collectés
            </Text>
          </View>

          {/* Total */}
          <View className="flex-1 items-center rounded-2xl border border-white/10 bg-black/20 p-4">
            <Ionicons name="book" size={28} color={foregroundColor} />
            <Text className="mt-2 text-2xl font-black text-white">
              {total}
            </Text>
            <Text className="text-center text-xs text-white/55">Total</Text>
          </View>

          {/* Percentage */}
          <View className="flex-1 items-center rounded-2xl border border-white/10 bg-black/20 p-4">
            <Ionicons name="star" size={28} color="#fbbf24" />
            <Text className="mt-2 text-2xl font-black text-white">
              {percentage}%
            </Text>
            <Text className="text-center text-xs text-white/55">
              Complété
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
}
