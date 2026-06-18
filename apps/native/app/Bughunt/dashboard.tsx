import { authClient } from "@/lib/auth-client";

import { Container } from "@/components/container";
import { ProfileHeader } from "@/components/dashboard/ProfileHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { LevelProgress } from "@/components/dashboard/LevelProgress";
import { CollectionPreview } from "@/components/dashboard/CollectionPreview";
import { RecentCaptures } from "@/components/dashboard/RecentCaptures";
import { orpc } from "@/utils/orpc";
import { useQuery } from "@tanstack/react-query";
import { useDashboardMetrics } from "hooks";

export default function DashboardScreen() {
  const { data: session } = authClient.useSession();
  const stats = useQuery(orpc.user.getStats.queryOptions());

  const collection = useQuery(orpc.userInsect.getMyCollection.queryOptions());

  const recentCaptures = useQuery(
    orpc.userInsect.getRecent.queryOptions({
      limit: 5,
    }),
  );
  const dashboardMetrics = useDashboardMetrics(stats.data);

  return (
    <Container contentContainerClassName="p-6 gap-6">
      <ProfileHeader
        name={session?.user.name ?? "Explorer"}
        image={session?.user.image}
      />

      <StatsGrid
        points={dashboardMetrics.points}
        species={dashboardMetrics.species}
        steps={dashboardMetrics.steps}
        level={dashboardMetrics.level}
      />

      <LevelProgress points={dashboardMetrics.points} />

      <CollectionPreview
        collection={collection.data ?? []}
        completion={dashboardMetrics.completion}
        totalSpecies={dashboardMetrics.totalSpecies}
      />

      <RecentCaptures captures={recentCaptures.data ?? []} />
    </Container>
  );
}
