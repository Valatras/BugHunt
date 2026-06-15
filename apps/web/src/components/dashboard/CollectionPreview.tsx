import { Link } from "@tanstack/react-router";
import { ArrowRight, Bug } from "lucide-react";

import { Card } from "@my-better-t-app/ui/components/card";

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
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/45">
            Collection
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Aperçu du bestiaire
          </h2>
        </div>

        <Link
          to="/insects"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10"
        >
          Ouvrir le bestiaire
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <Card className="border-white/10 bg-white/5 p-0">
        <div className="grid gap-4 rounded-none p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-white/60">
                {collection.length} espèces possédées sur {totalSpecies}
              </div>
              <div className="mt-2 text-3xl font-black text-white">
                {completion}% complété
              </div>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-lime-400/10 text-lime-300">
              <Bug className="h-6 w-6" />
            </div>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-black/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-lime-300 via-emerald-400 to-amber-300"
              style={{ width: `${completion}%` }}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {collection.slice(0, 6).map((item) => (
              <div
                key={item.insectId}
                className="rounded-3xl border border-white/10 bg-black/20 p-4"
              >
                <div className="text-sm font-semibold text-white">
                  {item.insect.name}
                </div>
                <div className="mt-1 text-xs text-white/50">
                  {item.insect.rarity ?? "Standard"}
                </div>
                <div className="mt-3 text-sm text-lime-300">
                  x{item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
