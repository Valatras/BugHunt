import { Gauge } from "lucide-react";

import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

export function CollectionHeader({
  discovered,
  total,
  completion,
}: {
  discovered: number;
  total: number;
  completion: number;
}) {
  return (
    <section className={[frontendLayout.cardSurface, "p-6"].join(" ")}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={frontendLayout.sectionEyebrow}>
            Bestiaire
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">
            Collection d’insectes
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {discovered} / {total} espèces découvertes
          </p>
        </div>
        <div className={frontendLayout.iconBadge}>
          <Gauge className="h-6 w-6" />
        </div>
      </div>

      <div className={frontendLayout.progressTrack + " mt-5"}>
        <div
          className={frontendLayout.progressFill}
          style={{ width: `${completion}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-white/55">{completion}% complété</p>
    </section>
  );
}
