import { Text, View } from "react-native";

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
  return (
    <View className="rounded-2xl bg-zinc-900 p-5">
      <Text className="text-lg font-semibold text-white">Collection</Text>

      <Text className="mt-1 text-zinc-400">
        {collection.length} / {totalSpecies} espèces
      </Text>

      {collection.slice(0, 8).map((entry) => (
        <View key={entry.id} className="rounded-xl bg-zinc-800 px-3 py-2">
          <Text className="text-white">{entry.insect.name}</Text>

          <Text className="text-zinc-400">x{entry.quantity}</Text>
        </View>
      ))}
    </View>
  );
}
