import { Card } from "@my-better-t-app/ui/components/card";
import { cn } from "@my-better-t-app/ui/lib/utils";
import { type LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: string;
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  accent = "from-lime-400/20 via-emerald-400/15 to-amber-300/15",
}: FeatureCardProps) {
  return (
    <Card className="border-white/10 bg-white/5 p-0 backdrop-blur">
      <div
        className={cn(
          "flex h-full flex-col gap-4 rounded-none bg-gradient-to-br p-5",
          accent,
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white">
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm leading-6 text-white/70">{description}</p>
        </div>
      </div>
    </Card>
  );
}
