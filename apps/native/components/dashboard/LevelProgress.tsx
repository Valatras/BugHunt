import { Text, View } from "react-native";

import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

type Props = {
  points: number;
};

export function LevelProgress({ points }: Props) {
  const currentXp = points % 100;

  return (
    <View className={[frontendLayout.cardSurface, "p-5"].join(" ")}>
      <Text className={frontendLayout.sectionEyebrow}>Progression</Text>

      <Text className="mt-2 text-2xl font-black tracking-tight text-white">
        Niveau {Math.floor(points / 100) + 1}
      </Text>

      <View className={frontendLayout.progressTrack + " mt-4"}>
        <View
          className={frontendLayout.progressFill}
          style={{
            width: `${currentXp}%`,
          }}
        />
      </View>

      <Text className="mt-2 text-sm text-white/55">
        {100 - currentXp} points avant le niveau suivant
      </Text>
    </View>
  );
}
