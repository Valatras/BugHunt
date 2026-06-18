import { Link } from "@tanstack/react-router";
import { Clock3, MoveRight } from "lucide-react";

import { Card } from "@my-better-t-app/ui/components/card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

type RecentCapturesProps = {
  captures: Array<{
    id: number;
    insectId: number;
    quantity: number;
    insect?: { name: string; rarity?: string | null };
    createdAt?: string | Date;
  }>;
};

export function RecentCaptures({ captures }: RecentCapturesProps) {
  return (
    <section className="space-y-4">
      <SectionHeader
        eyebrow="Activité"
        title="Captures récentes"
        action={
          <Link
            to="/insects"
            className="inline-flex items-center gap-2 text-sm font-medium text-lime-300"
          >
            Voir tout
            <MoveRight className="h-4 w-4" />
          </Link>
        }
      />

      <div className="grid gap-3">
        {captures.length === 0 ? (
          <Card className={[frontendLayout.cardSurface, "p-0"].join(" ")}>
            <div className="p-6 text-center text-white/60">
              Aucune capture pour le moment.
            </div>
          </Card>
        ) : (
          captures.map((capture) => (
            <Card key={capture.id} className={[frontendLayout.cardSurface, "p-0"].join(" ")}>
              <div className="flex items-center justify-between gap-4 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Clock3 className="h-4 w-4 text-lime-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {capture.insect?.name ?? `Insecte #${capture.insectId}`}
                    </div>
                    <div className="mt-1 text-sm text-white/55">
                      {capture.insect?.rarity ?? "Standard"} · x
                      {capture.quantity}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
