import { Card } from "@my-better-t-app/ui/components/card";
import { Shield, Trophy, Users } from "lucide-react";

type StatisticsCardProps = {
  userName?: string;
  collected: number;
  total: number;
  percentage: number;
};

export function StatisticsCard({
  userName = "Explorer",
  collected,
  total,
  percentage,
}: StatisticsCardProps) {
  const stats = [
    { label: "Collectés", value: collected, icon: Trophy },
    { label: "Total", value: total, icon: Users },
    { label: "Complété", value: `${percentage}%`, icon: Shield },
  ] as const;

  return (
    <Card className="border-white/10 bg-white/5 p-0">
      <div className="grid gap-4 rounded-none p-6">
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-[0.25em] text-white/45">
            Progression
          </p>
          <h2 className="text-2xl font-black text-white">Bienvenue, {userName}</h2>
          <p className="text-sm text-white/60">Continue ton exploration.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-black/20 p-4"
            >
              <Icon className="h-5 w-5 text-lime-300" />
              <div className="mt-3 text-2xl font-black text-white">{value}</div>
              <div className="mt-1 text-sm text-white/55">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
