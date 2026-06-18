import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <View
      className={[
        "gap-3",
        className,
        action ? "sm:flex-row sm:items-end sm:justify-between" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <View className="gap-2">
        <Text className={frontendLayout.sectionEyebrow}>{eyebrow}</Text>
        <Text className={frontendLayout.sectionTitle}>{title}</Text>
        {description ? (
          <Text className={frontendLayout.sectionDescription}>{description}</Text>
        ) : null}
      </View>

      {action ? <View className="shrink-0">{action}</View> : null}
    </View>
  );
}
