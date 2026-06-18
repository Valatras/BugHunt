import { View } from "react-native";

import { StatCard } from "@/components/ui/StatCard";

type StatsGridProps = {
  points: number;
  species: number;
  steps: number;
  level: number;
};

export function StatsGrid({ points, species, steps, level }: StatsGridProps) {
  return (
    <View className="flex-row flex-wrap gap-3">
      <StatCard
        label="Points"
        value={points.toString()}
        icon="🪙"
        tone="highlight"
      />
      <StatCard label="Espèces" value={species.toString()} icon="🐞" />
      <StatCard label="Pas" value={steps.toString()} icon="🥾" />
      <StatCard label="Niveau" value={level.toString()} icon="⭐" />
    </View>
  );
}
