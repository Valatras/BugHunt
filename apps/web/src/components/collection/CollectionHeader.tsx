import { Gauge } from "lucide-react";

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
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/45">
            Bestiaire
          </p>
          <h1 className="mt-2 text-3xl font-black text-white">
            Collection d’insectes
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {discovered} / {total} espèces découvertes
          </p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-lime-400/10 text-lime-300">
          <Gauge className="h-6 w-6" />
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-black/30">
        <div
          className="h-full rounded-full bg-gradient-to-r from-lime-300 via-emerald-400 to-amber-300"
          style={{ width: `${completion}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-white/55">{completion}% complété</p>
    </section>
  );
}
