import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useThemeColor } from "heroui-native";
import { Text, View, ScrollView } from "react-native";

import { Container } from "@/components/container";
import { authClient } from "@/lib/auth-client";
import { orpc } from "@/utils/orpc";
import { HeroSection } from "@/components/home/HeroSection";
import { StatisticsCard } from "@/components/home/StatisticsCard";
import { FeaturedInsectsSection } from "@/components/home/FeaturedInsectsSection";
import { FeatureCard } from "@/components/home/FeatureCard";
import { CategoryCard } from "@/components/home/CategoryCard";
import { CallToActionSection } from "@/components/home/CallToActionSection";

export default function Home() {
  const router = useRouter();
  const foregroundColor = useThemeColor("foreground");

  // Queries
  const healthCheck = useQuery(orpc.healthCheck.queryOptions());
  const { data: session } = authClient.useSession();
  const featured = useQuery(orpc.insect.getFeatured.queryOptions());

  // Handlers
  const handleGetStarted = () => {
    router.push("/sign-in");
  };

  const handleSignIn = handleGetStarted;

  const handleMyCollection = () => {
    router.push("/(tabs)/insects");
  };

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  const handleInsectPress = (id: number) => {
    // TODO: Navigate to insect detail page
    console.log("Navigate to insect:", id);
  };

  const handleCategoryPress = (category: string) => {
    // TODO: Navigate to category page
    console.log("Navigate to category:", category);
  };

  return (
    <ScrollView className="flex-1 bg-background">
      {/* HERO SECTION */}
      <HeroSection
        session={session}
        isConnected={healthCheck?.data === "OK"}
        isLoading={healthCheck?.isLoading || false}
        onGetStarted={handleGetStarted}
        onMyCollection={handleMyCollection}
      />

      <Container className="px-6 py-8">
        {/* STATISTICS SECTION - Si connecté */}
        {session?.user && (
          <StatisticsCard
            userName={session.user.name}
            collected={24}
            total={156}
            percentage={15}
            onSignOut={() => authClient.signOut()}
          />
        )}

        {/* FEATURED INSECTS SECTION */}
        <FeaturedInsectsSection
          insects={featured?.data}
          isLoading={featured?.isLoading || false}
          onInsectPress={handleInsectPress}
        />

        {/* FEATURES SECTION */}
        <View className="mb-8">
          <Text className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Fonctionnalités
          </Text>

          <FeatureCard
            icon="document-text"
            title="Fiches détaillées"
            description="Chaque insecte possède une fiche complète avec des informations scientifiques, son habitat, son régime alimentaire et bien plus encore."
            color="#3b82f6"
          />

          <FeatureCard
            icon="albums"
            title="Votre collection"
            description="Collectionnez vos insectes préférés, suivez votre progression et débloquez des badges spéciaux en complétant des catégories."
            color="#10b981"
          />

          <FeatureCard
            icon="school"
            title="Apprentissage ludique"
            description="Découvrez des faits fascinants, participez à des quiz et devenez un expert en entomologie de manière amusante."
            color="#fbbf24"
          />
        </View>

        {/* CATEGORIES SECTION */}
        <View className="mb-8">
          <Text className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Explorer par catégorie
          </Text>

          <View className="flex-row flex-wrap gap-3">
            <View className="w-[calc(50%-6px)]">
              <CategoryCard
                name="Papillons"
                icon="rose"
                color="#ec4899"
                onPress={() => handleCategoryPress("papillons")}
              />
            </View>
            <View className="w-[calc(50%-6px)]">
              <CategoryCard
                name="Coléoptères"
                icon="shield"
                color="#8b5cf6"
                onPress={() => handleCategoryPress("coleopteres")}
              />
            </View>
            <View className="w-[calc(50%-6px)]">
              <CategoryCard
                name="Abeilles"
                icon="cellular"
                color="#f59e0b"
                onPress={() => handleCategoryPress("abeilles")}
              />
            </View>
            <View className="w-[calc(50%-6px)]">
              <CategoryCard
                name="Libellules"
                icon="water"
                color="#06b6d4"
                onPress={() => handleCategoryPress("libellules")}
              />
            </View>
          </View>
        </View>

        {/* CALL TO ACTION - Si non connecté */}
        {!session?.user && (
          <CallToActionSection
            onSignUp={handleSignUp}
            onSignIn={handleSignIn}
            isLoading={healthCheck?.isLoading || false}
          />
        )}
      </Container>

      {/* FOOTER */}
      <View className="bg-muted/10 py-8 mt-8">
        <Container isScrollable={false} className="px-6">
          <View className="items-center">
            <Text className="text-foreground font-semibold text-lg mb-2">
              Bughunt
            </Text>
            <Text className="text-muted text-sm text-center mb-4">
              Votre guide interactif du monde des insectes
            </Text>
            <Text className="text-muted text-xs">
              © 2025 - Tous droits réservés
            </Text>
          </View>
        </Container>
      </View>
    </ScrollView>
  );
}
