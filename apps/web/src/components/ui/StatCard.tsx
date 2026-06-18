import type { ReactNode } from "react";

import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  tone?: "default" | "highlight";
};

export function StatCard({
  icon,
  label,
  value,
  tone = "default",
}: StatCardProps) {
  const highlightClasses =
    tone === "highlight"
      ? "border-lime-400/20 bg-lime-400/10 text-lime-300"
      : "border-white/10 bg-white/10 text-white";

  return (
    <div className={[frontendLayout.cardSurface, "p-4"].join(" ")}>
      <div className="flex items-start justify-between gap-3">
        <div
          className={[
            "flex h-11 w-11 items-center justify-center rounded-2xl border",
            highlightClasses,
          ].join(" ")}
        >
          {icon}
        </div>

        <div className="text-right">
          <div className="text-2xl font-black text-white">{value}</div>
          <div className={frontendLayout.mutedText}>{label}</div>
        </div>
      </div>
    </div>
  );
}
