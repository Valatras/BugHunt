import { Text, View } from "react-native";

type Props = {
  points: number;
};

export function LevelProgress({ points }: Props) {
  const currentXp = points % 100;

  return (
    <View className="rounded-2xl bg-zinc-900 p-5">
      <Text className="text-lg font-semibold text-white">Progression</Text>

      <Text className="mt-2 text-zinc-400">
        Niveau {Math.floor(points / 100) + 1}
      </Text>

      <View className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-800">
        <View
          className="h-full bg-green-500"
          style={{
            width: `${currentXp}%`,
          }}
        />
      </View>

      <Text className="mt-2 text-zinc-400">
        {100 - currentXp} points avant le niveau suivant
      </Text>
    </View>
  );
}
