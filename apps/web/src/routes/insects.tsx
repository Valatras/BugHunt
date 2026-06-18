import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import { getUser } from "@/functions/get-user";
import { orpc } from "@/utils/orpc";
import { CollectionHeader } from "@/components/collection/CollectionHeader";
import { InsectGrid } from "@/components/collection/InsectGrid";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";
import { useCollectionSummary } from "hooks";

export const Route = createFileRoute("/insects")({
  component: InsectsRoute,
  beforeLoad: async () => {
    const session = await getUser();
    return { session };
  },
  loader: async ({ context }) => {
    if (!context.session) {
      throw redirect({ to: "/login" });
    }
  },
});

function InsectsRoute() {
  const navigate = useNavigate();
  const collection = useQuery(orpc.insect.getCollection.queryOptions());

  const data = collection.data ?? [];
  const { discovered, total, completion } = useCollectionSummary(data);

  return (
    <main className={frontendLayout.pageContainer}>
      <div className={frontendLayout.pageStack}>
        <button
          type="button"
          onClick={() => navigate({ to: "/dashboard" })}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au tableau de bord
        </button>

        <CollectionHeader
          discovered={discovered}
          total={total}
          completion={completion}
        />

        <InsectGrid insects={data} />
      </div>
    </main>
  );
}
