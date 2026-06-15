import { View, Text } from "react-native";

export function CollectionHeader({
  discovered,
  total,
  completion,
}: {
  discovered: number;
  total: number;
  completion: number;
}) {
  return (
    <View className="rounded-2xl bg-zinc-900 p-4">
      <Text className="text-xl font-bold text-white">Bestiaire</Text>

      <Text className="text-muted mt-1">
        {discovered} / {total} espèces découvertes
      </Text>

      <View className="mt-3 h-3 rounded-full bg-zinc-800 overflow-hidden">
        <View
          className="h-full bg-green-500"
          style={{ width: `${completion}%` }}
        />
      </View>

      <Text className="text-muted mt-2 text-sm">{completion}% complété</Text>
    </View>
  );
}
