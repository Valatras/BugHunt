import { Card } from "@my-better-t-app/ui/components/card";
import { type LucideIcon } from "lucide-react";

type CategoryCardProps = {
  name: string;
  icon: LucideIcon;
  color: string;
  onPress?: () => void;
};

export function CategoryCard({
  name,
  icon: Icon,
  color,
  onPress,
}: CategoryCardProps) {
  return (
    <Card className="border-white/10 bg-white/5 p-0">
      <button
        type="button"
        onClick={onPress}
        className="flex min-h-32 w-full flex-col items-center justify-center gap-3 rounded-none px-6 py-6 text-center transition hover:bg-white/5"
        style={{ backgroundColor: `${color}18` }}
      >
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ color, backgroundColor: `${color}22` }}
        >
          <Icon className="h-6 w-6" />
        </span>
        <span className="text-sm font-semibold text-white sm:text-base">
          {name}
        </span>
      </button>
    </Card>
  );
}
