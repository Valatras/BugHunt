import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

import { InsectImage } from "@/components/insects/InsectImage";

type Props = {
  insect: {
    id: number;
    name: string;
    sciName?: string;
    rarity?: string | null;
    owned?: boolean;
    quantity?: number;
    imageKey?: string | null;
  };
};

export function InsectCard({ insect }: Props) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/insect/[id]" as never,
          params: { id: String(insect.id) },
        })
      }
      className={`
    w-[48%]
    rounded-2xl
    p-4
    bg-zinc-900
    ${!insect.owned ? "opacity-30" : ""}
  `}
    >
      <InsectImage
        imageKey={insect.owned ? insect.imageKey : null}
        name={insect.name}
        size="sm"
      />

      {/* NAME */}
      <Text className="mt-2 text-center text-white font-bold">
        {insect.owned ? insect.name : "Inconnu"}
      </Text>

      {/* SCI NAME */}
      <Text className="text-center text-xs text-zinc-400">
        {insect.owned ? insect.sciName : "???"}
      </Text>

      {/* QUANTITY */}
      {insect.owned && (
        <View className="mt-3 items-center">
          <Text className="text-green-400 font-semibold">
            x{insect.quantity}
          </Text>
        </View>
      )}

      {/* RARITY INDICATOR (OPTIONNEL MAIS BON UX) */}
      <Text className="text-center mt-2 text-[10px] text-zinc-500">
        {insect.rarity}
      </Text>
    </Pressable>
  );
}
