import { Text, View } from "react-native";
import { useThemeColor } from "heroui-native";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

type Props = {
  completion: number;
  totalSpecies: number;
  collection: Array<{
    id: number;
    quantity: number;
    insect: {
      id: number;
      name: string;
      rarity: string;
    };
  }>;
};

export function CollectionPreview({
  completion,
  totalSpecies,
  collection,
}: Props) {
  const progressColor = useThemeColor("success");

  return (
    <View className={[frontendLayout.cardSurface, "p-5"].join(" ")}>
      <SectionHeader
        eyebrow="Collection"
        title="Aperçu du bestiaire"
        description={`${collection.length} / ${totalSpecies} espèces`}
      />

      <View className="mt-4 h-3 overflow-hidden rounded-full bg-black/30">
        <View
          className="h-full rounded-full"
          style={{
            width: `${completion}%`,
            backgroundColor: progressColor,
          }}
        />
      </View>

      <Text className="mt-3 text-sm text-white/55">{completion}% complété</Text>

      <View className="mt-4 gap-3">
        {collection.slice(0, 8).map((entry) => (
          <View key={entry.id} className={frontendLayout.cardSurfaceMuted + " px-3 py-2"}>
            <Text className="text-white">{entry.insect.name}</Text>

            <Text className="text-white/55">x{entry.quantity}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
