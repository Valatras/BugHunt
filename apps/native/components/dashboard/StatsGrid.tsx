import { Text, View } from "react-native";

type StatsCardProps = {
  emoji: string;
  value: string;
  title: string;
};

export function StatsCard({ emoji, value, title }: StatsCardProps) {
  return (
    <View className="flex-1 min-w-[45%] rounded-2xl bg-zinc-900 p-4">
      <Text className="text-xl">{emoji}</Text>

      <Text className="mt-2 text-2xl font-bold text-white">{value}</Text>

      <Text className="text-zinc-400">{title}</Text>
    </View>
  );
}

type StatsGridProps = {
  points: number;
  species: number;
  steps: number;
  level: number;
};

export function StatsGrid({ points, species, steps, level }: StatsGridProps) {
  return (
    <View className="flex-row flex-wrap gap-3">
      <StatsCard title="Points" value={points.toString()} emoji="🪙" />

      <StatsCard title="Espèces" value={species.toString()} emoji="🐞" />

      <StatsCard title="Pas" value={steps.toString()} emoji="🚶" />

      <StatsCard title="Niveau" value={level.toString()} emoji="⭐" />
    </View>
  );
}
