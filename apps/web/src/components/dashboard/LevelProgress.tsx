type LevelProgressProps = {
  points: number;
};

export function LevelProgress({ points }: LevelProgressProps) {
  const pointsInLevel = points % 100;
  const progress = Math.min(pointsInLevel, 100);
  const nextLevel = Math.floor(points / 100) + 1;

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/45">
            Progression
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Niveau {nextLevel}
          </h2>
        </div>
        <div className="text-right">
          <div className="text-sm text-white/55">Points actuels</div>
          <div className="text-xl font-black text-lime-300">{points}</div>
        </div>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-black/30">
        <div
          className="h-full rounded-full bg-gradient-to-r from-lime-300 via-emerald-400 to-amber-300 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-white/55">
        Encore {100 - progress} points avant le prochain niveau.
      </p>
    </section>
  );
}
