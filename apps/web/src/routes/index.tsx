import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  MapPinned,
  Radar,
  Sprout,
  Trophy,
  WandSparkles,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { orpc } from "@/utils/orpc";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedInsectsSection } from "@/components/home/FeaturedInsectsSection";
import { FeatureCard } from "@/components/home/FeatureCard";
import { CategoryCard } from "@/components/home/CategoryCard";
import { CallToActionSection } from "@/components/home/CallToActionSection";
import { StatisticsCard } from "@/components/home/StatisticsCard";

export const Route = createFileRoute("/")({
  component: HomeRoute,
});

function HomeRoute() {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();

  const featured = useQuery(orpc.insect.getFeatured.queryOptions());
  const userStats = useQuery({
    ...orpc.user.getStats.queryOptions(),
    enabled: !!session?.user,
  });

  const goToCollection = () => navigate({ to: "/insects" });
  const goToDashboard = () => navigate({ to: "/dashboard" });
  const goToAuth = () => navigate({ to: "/login" });

  return (
    <main className="bg-transparent text-white">
      <HeroSection
        session={session}
        isConnected={true}
        isLoading={false}
        onGetStarted={session?.user ? goToDashboard : goToAuth}
        onMyCollection={goToCollection}
      />

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-white/45">
            Le concept
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white">
            Une interface pensée comme un carnet d’expédition.
          </h2>
          <p className="max-w-xl text-sm leading-6 text-white/65">
            Les écrans web reprennent les sections clés de l’app native pour
            garder la même logique de progression, de collection et de
            découverte.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <FeatureCard
              icon={Radar}
              title="Explorer"
              description="Parcours guidé pour découvrir les espèces et les niveaux."
            />
            <FeatureCard
              icon={WandSparkles}
              title="Capturer"
              description="Des actions claires pour enrichir la collection à tout moment."
            />
            <FeatureCard
              icon={BookOpen}
              title="Collectionner"
              description="Le bestiaire centralise l’état de chaque espèce au même endroit."
            />
            <FeatureCard
              icon={Trophy}
              title="Progresser"
              description="Les points, niveaux et pourcentages restent visibles partout."
            />
          </div>
        </div>

        <div className="space-y-4">
          <StatisticsCard
            userName={session?.user?.name}
            collected={userStats.data?.discoveredSpecies ?? 0}
            total={userStats.data?.totalSpecies ?? 0}
            percentage={userStats.data?.completion ?? 0}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <CategoryCard
              name="Carte locale"
              icon={MapPinned}
              color="#84cc16"
              onPress={goToCollection}
            />
            <CategoryCard
              name="Progression"
              icon={Sprout}
              color="#f59e0b"
              onPress={goToDashboard}
            />
          </div>
        </div>
      </section>

      <FeaturedInsectsSection
        insects={featured.data ?? []}
        isLoading={featured.isLoading}
        onInsectPress={(id) => navigate({ to: "/insect/$id", params: { id: String(id) } })}
      />

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <CallToActionSection
          onSignUp={() => navigate({ to: "/login" })}
          onSignIn={() => navigate({ to: "/login" })}
        />
      </section>
    </main>
  );
}
