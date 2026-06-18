import { Text, View } from "react-native";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

type Props = {
  captures: Array<{
    id: number;
    quantity: number;
    insect: {
      name: string;
    };
  }>;
};

export function RecentCaptures({ captures }: Props) {
  return (
    <View className={[frontendLayout.cardSurface, "p-5"].join(" ")}>
      <SectionHeader eyebrow="Activité" title="Découvertes récentes" />

      {captures.length === 0 ? (
        <View className={frontendLayout.emptyState + " mt-4"}>
          <Text className="text-white/60">Aucune capture pour le moment.</Text>
        </View>
      ) : (
        <View className="mt-4 gap-3">
          {captures.map((capture) => (
            <View
              key={capture.id}
              className={frontendLayout.cardSurfaceMuted + " flex-row items-center justify-between px-3 py-2"}
            >
              <Text className="text-white">{capture.insect.name}</Text>

              <Text className="text-white/55">x{capture.quantity}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
