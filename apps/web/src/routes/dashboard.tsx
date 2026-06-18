import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { getUser } from "@/functions/get-user";
import { orpc } from "@/utils/orpc";
import { ProfileHeader } from "@/components/dashboard/ProfileHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { LevelProgress } from "@/components/dashboard/LevelProgress";
import { CollectionPreview } from "@/components/dashboard/CollectionPreview";
import { RecentCaptures } from "@/components/dashboard/RecentCaptures";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";
import { useDashboardMetrics } from "hooks";

export const Route = createFileRoute("/dashboard")({
  component: DashboardRoute,
  beforeLoad: async () => {
    const session = await getUser();
    return { session };
  },
  loader: async ({ context }) => {
    if (!context.session) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function DashboardRoute() {
  const { session } = Route.useRouteContext();

  const stats = useQuery(orpc.user.getStats.queryOptions());
  const collection = useQuery(orpc.userInsect.getMyCollection.queryOptions());
  const recentCaptures = useQuery(
    orpc.userInsect.getRecent.queryOptions({
      limit: 5,
    }),
  );
  const dashboardMetrics = useDashboardMetrics(stats.data);

  return (
    <main className={frontendLayout.pageContainer}>
      <div className={frontendLayout.pageStack}>
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
      </div>
    </main>
  );
}
