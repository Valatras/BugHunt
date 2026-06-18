import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, Pressable } from "react-native";

import { Container } from "@/components/container";
import { InsectImage } from "@/components/insects/InsectImage";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";
import { orpc, queryClient } from "@/utils/orpc";

const bannerConfigs = {
  standard: {
    title: "Bannière standard",
    description:
      "Invoque un insecte commun ou rare et enrichis ta collection avec un coût accessible.",
    cost: 100,
    rarityHint: "Raretés possibles : Commun, Rare, Épique, Légendaire",
    icon: "bug" as const,
  },
  limited: {
    title: "Bannière limitée",
    description:
      "Invoque un insecte plus rare avec un coût plus élevé et une meilleure chance d’obtenir une espèce épique ou légendaire.",
    cost: 250,
    rarityHint: "Raretés possibles : Rare, Épique, Légendaire",
    icon: "star" as const,
  },
} as const;

type BannerType = keyof typeof bannerConfigs;

type WishScreenProps = {
  banner: BannerType;
};

export function WishScreen({ banner }: WishScreenProps) {
  const config = bannerConfigs[banner];

  const userStats = useQuery(orpc.user.getStats.queryOptions());

  const summonMutation = useMutation(
    orpc.userInsect.summon.mutationOptions({
      onSettled: () => {
        userStats.refetch();
        queryClient.invalidateQueries({
          queryKey: orpc.userInsect.getMyCollection.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: orpc.userInsect.getRecent.queryKey(),
        });
      },
    }),
  );

  const points = userStats.data?.points ?? 0;
  const canSummon = points >= config.cost;
  const isSummoning = summonMutation.status === "pending";
  const result = summonMutation.data;

  return (
    <Container contentContainerClassName="p-6 gap-6">
      <View className={[frontendLayout.cardSurface, "p-5"].join(" ")}>
        <View className="mb-4 flex-row items-center justify-between">
          <View>
            <Text className={frontendLayout.sectionEyebrow}>
              {config.title}
            </Text>
            <Text className="mt-3 text-3xl font-black tracking-tight text-white">
              {config.title}
            </Text>
          </View>
          <View className="rounded-3xl border border-white/10 bg-white/5 px-3 py-3">
            <Ionicons
              name={config.icon as any}
              size={28}
              color="rgb(190, 242, 100)"
            />
          </View>
        </View>

        <Text className="text-sm leading-6 text-white/65">
          {config.description}
        </Text>

        <View className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-4">
          <Text className="text-xs uppercase tracking-[0.24em] text-white/45">
            Coût d’invocation
          </Text>
          <Text className="mt-2 text-4xl font-black text-lime-300">
            {config.cost} points
          </Text>
          <Text className="mt-1 text-sm text-white/60">
            {config.rarityHint}
          </Text>
        </View>

        <View className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-4">
          <Text className="text-xs uppercase tracking-[0.24em] text-white/45">
            Solde actuel
          </Text>
          <Text className="mt-2 text-4xl font-black text-white">{points}</Text>
          <Text className="mt-1 text-sm text-white/60">
            {canSummon
              ? "Tu peux invoquer un insecte maintenant."
              : "Il te faut plus de points pour invoquer."}
          </Text>
        </View>

        <Pressable
          onPress={() => summonMutation.mutate({ banner })}
          disabled={!canSummon || isSummoning}
          className={
            "mt-6 rounded-2xl px-5 py-4 active:opacity-80 " +
            (canSummon ? "bg-lime-300" : "bg-white/10")
          }
        >
          <Text className="text-center text-base font-semibold text-[#08110e]">
            {isSummoning ? "Invocation..." : "Invoquer"}
          </Text>
        </Pressable>

        {summonMutation.isError ? (
          <View className="mt-4 rounded-3xl border border-rose-500 bg-rose-500/10 p-4">
            <Text className="font-semibold text-rose-200">Erreur</Text>
            <Text className="mt-2 text-sm text-white/70">
              {String(summonMutation.error?.message)}
            </Text>
          </View>
        ) : null}
      </View>

      {result?.insect ? (
        <View className={[frontendLayout.cardSurface, "p-5"].join(" ")}>
          <Text className={frontendLayout.sectionEyebrow}>
            Résultat de l’invocation
          </Text>
          <View className="mt-4 flex-row gap-4">
            <InsectImage
              imageKey={result.insect.imageKey}
              name={result.insect.name}
              size="sm"
            />
            <View className="flex-1 justify-center">
              <Text className="text-2xl font-black text-white">
                {result.insect.name}
              </Text>
              <Text className="mt-1 text-sm italic text-white/50">
                {result.insect.sciName}
              </Text>
              <Text className="mt-3 text-sm leading-6 text-white/70">
                {result.insect.description ??
                  "Cet insecte rejoint ta collection."}
              </Text>
              <Text className="mt-3 text-sm text-lime-300">
                Rareté : {result.insect.rarity}
              </Text>
              <Text className="mt-2 text-sm text-white/60">
                Points restants : {result.pointsLeft}
              </Text>
            </View>
          </View>
        </View>
      ) : null}
    </Container>
  );
}
