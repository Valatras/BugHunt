import { Compass, Footprints, Sprout, Star } from "lucide-react";
import type { ElementType } from "react";

type StatsGridProps = {
  points: number;
  species: number;
  steps: number;
  level: number;
};

function StatsCard({
  icon: Icon,
  title,
  value,
}: {
  icon: ElementType;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <Icon className="h-5 w-5 text-lime-300" />
      <div className="mt-3 text-2xl font-black text-white">{value}</div>
      <div className="mt-1 text-sm text-white/55">{title}</div>
    </div>
  );
}

export function StatsGrid({ points, species, steps, level }: StatsGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard icon={Compass} title="Points" value={points.toString()} />
      <StatsCard icon={Sprout} title="Espèces" value={species.toString()} />
      <StatsCard icon={Footprints} title="Pas" value={steps.toString()} />
      <StatsCard icon={Star} title="Niveau" value={level.toString()} />
    </div>
  );
}
