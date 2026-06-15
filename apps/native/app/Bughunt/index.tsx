import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Text, View, ScrollView, Pressable } from "react-native";

import { Container } from "@/components/container";
import { authClient } from "@/lib/auth-client";
import { orpc } from "@/utils/orpc";

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
  const goToCollection = () => router.push("/(tabs)/insects");
  const goToLeaderboard = () => router.push("/");
  const goToRewards = () => router.push("/");
  const goToInsect = (id: number) => router.push("/" /*`/insect/${id}`*/);

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
          <Text className="text-xl font-bold text-foreground mb-3">
            Découvre Bughunt
          </Text>

          <Text className="text-muted mb-6">
            Capture, collectionne et apprends sur les insectes autour de toi.
          </Text>

          <Pressable
            onPress={() => router.push("/sign-up")}
            className="bg-primary p-4 rounded-xl"
          >
            <Text className="text-white text-center font-semibold">
              Commencer maintenant
            </Text>
          </Pressable>
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
        {/* =========================
            STATS USER
        ========================= */}
        <View className="bg-muted/10 p-4 rounded-2xl mb-6">
          <Text className="text-lg font-bold text-foreground mb-2">
            Bonjour {session.user.name}
          </Text>

          <View className="flex-row justify-between">
            <View>
              <Text className="text-muted text-sm">Points</Text>
              <Text className="text-2xl font-bold text-primary">
                {stats?.points ?? 0}
              </Text>
            </View>

            <View>
              <Text className="text-muted text-sm">Insectes</Text>
              <Text className="text-2xl font-bold text-foreground">
                {stats?.collected ?? 0}
              </Text>
            </View>

            <View>
              <Text className="text-muted text-sm">Complétion</Text>
              <Text className="text-2xl font-bold text-foreground">
                {stats?.completion ?? 0}%
              </Text>
            </View>
          </View>
        </View>

        {/* =========================
            ACTIONS RAPIDES
        ========================= */}
        <View className="flex-row gap-3 mb-6">
          <Pressable
            onPress={goToCollection}
            className="flex-1 bg-primary p-4 rounded-xl"
          >
            <Text className="text-white text-center font-semibold">
              Ma collection
            </Text>
          </Pressable>

          <Pressable
            onPress={goToRewards}
            className="flex-1 bg-muted/20 p-4 rounded-xl"
          >
            <Text className="text-foreground text-center font-semibold">
              Récompenses
            </Text>
          </Pressable>
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
        <View className="mt-8">
          <Text className="text-xl font-bold text-foreground mb-4">
            Activité récente
          </Text>

          {recent.length === 0 ? (
            <Text className="text-muted">
              Tu n’as pas encore capturé d’insectes.
            </Text>
          ) : (
            recent.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => goToInsect(item.insectId)}
                className="p-3 mb-2 bg-muted/10 rounded-xl"
              >
                <Text className="text-foreground font-medium">
                  Insecte #{item.insectId}
                </Text>
                <Text className="text-muted text-sm">
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
