import type { ReactNode } from "react";
import { Text, View } from "react-native";

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
    <View className={[frontendLayout.cardSurface, "flex-1 p-4"].join(" ")}>
      <View className="flex-row items-start justify-between gap-3">
        <View
          className={[
            "h-11 w-11 items-center justify-center rounded-2xl border",
            highlightClasses,
          ].join(" ")}
        >
          {typeof icon === "string" ? (
            <Text className="text-xl">{icon}</Text>
          ) : (
            icon
          )}
        </View>

        <View className="items-end">
          <Text className="text-2xl font-black text-white">{value}</Text>
          <Text className={frontendLayout.mutedText}>{label}</Text>
        </View>
      </View>
    </View>
  );
}
