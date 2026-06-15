import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { getUser } from "@/functions/get-user";
import { orpc } from "@/utils/orpc";
import { ProfileHeader } from "@/components/dashboard/ProfileHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { LevelProgress } from "@/components/dashboard/LevelProgress";
import { CollectionPreview } from "@/components/dashboard/CollectionPreview";
import { RecentCaptures } from "@/components/dashboard/RecentCaptures";

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

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
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
      </div>
    </main>
  );
}
