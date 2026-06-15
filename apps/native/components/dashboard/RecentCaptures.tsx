import { Text, View } from "react-native";

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
    <View className="rounded-2xl bg-zinc-900 p-5">
      <Text className="text-lg font-semibold text-white">
        Découvertes récentes
      </Text>

      {captures.map((capture) => (
        <View
          key={capture.id}
          className="mt-3 flex-row justify-between border-b border-zinc-800 pb-3"
        >
          <Text className="text-white">{capture.insect.name}</Text>

          <Text className="text-zinc-400">x{capture.quantity}</Text>
        </View>
      ))}
    </View>
  );
}
