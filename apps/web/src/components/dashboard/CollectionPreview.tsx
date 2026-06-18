import { Link } from "@tanstack/react-router";
import { ArrowRight, Bug } from "lucide-react";

import { Card } from "@my-better-t-app/ui/components/card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

type CollectionPreviewProps = {
  collection: Array<{
    insectId: number;
    quantity: number;
    insect: { name: string; rarity?: string | null };
  }>;
  completion: number;
  totalSpecies: number;
};

export function CollectionPreview({
  collection,
  completion,
  totalSpecies,
}: CollectionPreviewProps) {
  return (
    <section className="space-y-4">
      <SectionHeader
        eyebrow="Collection"
        title="Aperçu du bestiaire"
        action={
          <Link
            to="/insects"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10"
          >
            Ouvrir le bestiaire
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <Card className={[frontendLayout.cardSurface, "p-0"].join(" ")}>
        <div className="grid gap-4 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className={frontendLayout.bodyText}>
                {collection.length} espèces possédées sur {totalSpecies}
              </div>
              <div className="mt-2 text-3xl font-black text-white">
                {completion}% complété
              </div>
            </div>
            <div className={frontendLayout.iconBadge}>
              <Bug className="h-6 w-6" />
            </div>
          </div>

          <div className={frontendLayout.progressTrack}>
            <div
              className={frontendLayout.progressFill}
              style={{ width: `${completion}%` }}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {collection.slice(0, 6).map((item) => (
              <div key={item.insectId} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">
                  {item.insect.name}
                </div>
                <div className="mt-1 text-xs text-white/50">
                  {item.insect.rarity ?? "Standard"}
                </div>
                <div className="mt-3 text-sm text-lime-300">x{item.quantity}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
