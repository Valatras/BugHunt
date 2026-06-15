import { ScrollView, Text, View } from "react-native";

import { authClient } from "@/lib/auth-client";

import { ProfileHeader } from "@/components/dashboard/ProfileHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { LevelProgress } from "@/components/dashboard/LevelProgress";
import { CollectionPreview } from "@/components/dashboard/CollectionPreview";
import { RecentCaptures } from "@/components/dashboard/RecentCaptures";
import { orpc } from "@/utils/orpc";
import { useQuery } from "@tanstack/react-query";

export default function DashboardScreen() {
  const { data: session } = authClient.useSession();
  const stats = useQuery(orpc.user.getStats.queryOptions());

  const collection = useQuery(orpc.userInsect.getMyCollection.queryOptions());

  const recentTransactions = useQuery(
    orpc.user.getRecentTransactions.queryOptions(),
  );

  const recentCaptures = useQuery(
    orpc.userInsect.getRecent.queryOptions({
      limit: 5,
    }),
  );

  return (
    <ScrollView
      className="flex-1 bg-green-900"
      contentContainerClassName="p-6 gap-6"
    >
      <ProfileHeader
        name={session?.user.name ?? "Explorer"}
        image={session?.user.image}
      />

      <StatsGrid
        points={stats.data?.points ?? 0}
        species={stats.data?.discoveredSpecies ?? 0}
        steps={stats.data?.todaySteps ?? 0}
        level={stats.data?.level ?? 1}
      />

      <LevelProgress points={stats.data?.points ?? 0} />

      <CollectionPreview
        collection={collection.data ?? []}
        completion={stats.data?.completion ?? 0}
        totalSpecies={stats.data?.totalSpecies ?? 0}
      />

      <RecentCaptures captures={recentCaptures.data ?? []} />
    </ScrollView>
  );
}
