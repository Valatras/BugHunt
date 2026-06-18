import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Text, View, ScrollView, Pressable } from "react-native";

import { Container } from "@/components/container";
import { authClient } from "@/lib/auth-client";
import { orpc } from "@/utils/orpc";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedInsectsSection } from "@/components/home/FeaturedInsectsSection";

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  // =========================
  // DATA
  // =========================
  const featured = useQuery(orpc.insect.getFeatured.queryOptions());

  const userStats = useQuery({
    ...orpc.user.getStats.queryOptions(),
    enabled: !!session?.user,
  });

  const recentInsects = useQuery({
    ...orpc.userInsect.getRecent.queryOptions(),
    enabled: !!session?.user,
  });

  // =========================
  // HANDLERS
  // =========================
  const goToCollection = () => router.push("/Bughunt/insects");
  const goToRewards = () => router.push("/");
  const goToInsect = (id: number) =>
    router.push({
      pathname: "/insect/[id]" as never,
      params: { id: String(id) },
    });

  // =========================
  // GUEST VIEW
  // =========================
  if (!session?.user) {
    return (
      <ScrollView className="flex-1 bg-background">
        <HeroSection
          session={null}
          isConnected={true}
          isLoading={false}
          onGetStarted={() => router.push("/sign-up")}
          onMyCollection={() => router.push("/sign-in")}
        />

        <Container className="px-6 py-8">
          <View className={[frontendLayout.cardSurface, "p-6"].join(" ")}>
            <Text className="mb-3 text-2xl font-black tracking-tight text-white">
              Découvre Bughunt
            </Text>

            <Text className="mb-6 text-white/65">
              Capture, collectionne et apprends sur les insectes autour de toi.
            </Text>

            <Pressable
              onPress={() => router.push("/sign-up")}
              className="rounded-2xl bg-lime-300 p-4 active:opacity-80"
            >
              <Text className="text-center font-semibold text-[#08110e]">
                Commencer maintenant
              </Text>
            </Pressable>
          </View>
        </Container>
      </ScrollView>
    );
  }

  // =========================
  // LOADING GUARD
  // =========================
  const stats = userStats.data;
  const featuredInsects = featured.data ?? [];
  const recent = recentInsects.data ?? [];

  return (
    <ScrollView className="flex-1 bg-background">
      {/* HEADER DASHBOARD */}
      <HeroSection
        session={session}
        isConnected={true}
        isLoading={false}
        onGetStarted={goToRewards}
        onMyCollection={goToCollection}
      />

      <Container className="px-6 py-6">
        <View className={[frontendLayout.cardSurface, "mb-6 p-4"].join(" ")}>
          <Text className="mb-2 text-lg font-black tracking-tight text-white">
            Bonjour {session.user.name}
          </Text>

          <View className="flex-row justify-between gap-3">
            <View>
              <Text className="text-xs uppercase tracking-[0.2em] text-white/45">
                Points
              </Text>
              <Text className="text-2xl font-black text-lime-300">
                {stats?.points ?? 0}
              </Text>
            </View>

            <View>
              <Text className="text-xs uppercase tracking-[0.2em] text-white/45">
                Insectes
              </Text>
              <Text className="text-2xl font-black text-white">
                {stats?.discoveredSpecies ?? 0}
              </Text>
            </View>

            <View>
              <Text className="text-xs uppercase tracking-[0.2em] text-white/45">
                Complétion
              </Text>
              <Text className="text-2xl font-black text-white">
                {stats?.completion ?? 0}%
              </Text>
            </View>
          </View>
        </View>

        {/* =========================
            FEATURED INSECTS
        ========================= */}
        <FeaturedInsectsSection
          insects={featuredInsects}
          isLoading={featured.isLoading}
          onInsectPress={goToInsect}
        />

        {/* =========================
            RECENT ACTIVITY
        ========================= */}
        <View className={[frontendLayout.cardSurface, "mb-6 p-4"].join(" ")}>
          <Text className="mb-4 text-xl font-black tracking-tight text-white">
            Activité récente
          </Text>

          {recent.length === 0 ? (
            <Text className="text-white/60">
              Tu n’as pas encore capturé d’insectes.
            </Text>
          ) : (
            recent.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => goToInsect(item.insectId)}
                className="mb-2 rounded-2xl border border-white/10 bg-black/20 p-3"
              >
                <Text className="font-medium text-white">
                  {item.insect.name}
                </Text>
                <Text className="text-sm text-lime-300">
                  x{item.quantity} capturé(s)
                </Text>
              </Pressable>
            ))
          )}
        </View>
      </Container>
    </ScrollView>
  );
}
