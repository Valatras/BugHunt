import { Compass, Footprints, Sprout, Star } from "lucide-react";

import { StatCard } from "@/components/ui/StatCard";

type StatsGridProps = {
  points: number;
  species: number;
  steps: number;
  level: number;
};

export function StatsGrid({ points, species, steps, level }: StatsGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        icon={<Compass className="h-5 w-5" />}
        label="Points"
        value={points.toString()}
        tone="highlight"
      />
      <StatCard
        icon={<Sprout className="h-5 w-5" />}
        label="Espèces"
        value={species.toString()}
      />
      <StatCard
        icon={<Footprints className="h-5 w-5" />}
        label="Pas"
        value={steps.toString()}
      />
      <StatCard
        icon={<Star className="h-5 w-5" />}
        label="Niveau"
        value={level.toString()}
      />
    </div>
  );
}
