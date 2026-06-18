import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

type LevelProgressProps = {
  points: number;
};

export function LevelProgress({ points }: LevelProgressProps) {
  const pointsInLevel = points % 100;
  const progress = Math.min(pointsInLevel, 100);
  const nextLevel = Math.floor(points / 100) + 1;

  return (
    <section className={[frontendLayout.cardSurface, "p-6"].join(" ")}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className={frontendLayout.sectionEyebrow}>Progression</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
            Niveau {nextLevel}
          </h2>
        </div>
        <div className="text-right">
          <div className="text-sm text-white/55">Points actuels</div>
          <div className="text-xl font-black text-lime-300">{points}</div>
        </div>
      </div>

      <div className={frontendLayout.progressTrack + " mt-6"}>
        <div
          className={frontendLayout.progressFill + " transition-all"}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-white/55">
        Encore {100 - progress} points avant le prochain niveau.
      </p>
    </section>
  );
}
