import { View, Text } from "react-native";
import { useThemeColor } from "heroui-native";

import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

export function CollectionHeader({
  discovered,
  total,
  completion,
}: {
  discovered: number;
  total: number;
  completion: number;
}) {
  const progressColor = useThemeColor("success");

  return (
    <View className={[frontendLayout.cardSurface, "p-4"].join(" ")}>
      <Text className={frontendLayout.sectionEyebrow}>Bestiaire</Text>

      <Text className="mt-2 text-2xl font-black tracking-tight text-white">
        Collection d’insectes
      </Text>

      <Text className="mt-1 text-white/60">
        {discovered} / {total} espèces découvertes
      </Text>

      <View className={frontendLayout.progressTrack + " mt-3"}>
        <View
          className="h-full rounded-full"
          style={{
            width: `${completion}%`,
            backgroundColor: progressColor,
          }}
        />
      </View>

      <Text className="mt-2 text-sm text-white/55">{completion}% complété</Text>
    </View>
  );
}
