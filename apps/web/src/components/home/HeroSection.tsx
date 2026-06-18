import { ArrowRight, Bug, MapPinned, Sparkles } from "lucide-react";

import { Button } from "@my-better-t-app/ui/components/button";

type HeroSectionProps = {
  session?: { user?: { name: string } } | null;
  isConnected: boolean;
  isLoading: boolean;
  onGetStarted: () => void;
  onMyCollection: () => void;
};

export function HeroSection({
  session,
  isConnected,
  isLoading,
  onGetStarted,
  onMyCollection,
}: HeroSectionProps) {
  const displayName = session?.user?.name ?? "Explorateur";

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(163,230,53,0.18),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(245,158,11,0.14),_transparent_22%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,3,0.2),rgba(2,6,3,0.82))]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-20">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-lime-200">
            <Sparkles className="h-3.5 w-3.5" />
            Chasse aux insectes
          </div>

          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70">
              <span
                className={[
                  "h-2 w-2 rounded-full",
                  isLoading
                    ? "bg-amber-300 animate-pulse"
                    : isConnected
                      ? "bg-lime-300"
                      : "bg-rose-300",
                ].join(" ")}
              />
              {isLoading
                ? "Synchronisation en cours"
                : isConnected
                  ? "Connexion active"
                  : "Mode hors ligne"}
            </div>

            <h1 className="max-w-3xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              {session?.user ? (
                <>
                  Bonjour <span className="text-lime-300">{displayName}</span>.
                  Ta collection t’attend.
                </>
              ) : (
                <>
                  Explore le monde des insectes avec un style de carte au
                  trésor.
                </>
              )}
            </h1>

            <p className="max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Capture, compare, progresse. Bughunt transforme chaque sortie en
              aventure visuelle avec une collection vivante, des récompenses et
              un bestiaire à compléter.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={onGetStarted}
              className="h-12 rounded-full bg-lime-300 px-6 text-sm font-semibold text-[#08110e] shadow-xl shadow-lime-500/20 hover:bg-lime-200"
            >
              {session?.user
                ? "Aller au tableau de bord"
                : "Commencer l’aventure"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              onClick={onMyCollection}
              className="h-12 rounded-full border-white/15 bg-white/5 px-6 text-sm font-semibold text-white hover:bg-white/10"
            >
              Voir la collection
              <Bug className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-sm font-medium text-white/60">
                Exploration
              </div>
              <div className="mt-2 text-2xl font-bold text-white">100%</div>
              <div className="mt-1 text-xs text-white/50">
                Des itinéraires pensés comme une expédition.
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-sm font-medium text-white/60">
                Collection
              </div>
              <div className="mt-2 text-2xl font-bold text-white">Vivante</div>
              <div className="mt-1 text-xs text-white/50">
                Espèces, rareté et progression regroupées au même endroit.
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-sm font-medium text-white/60">Carte</div>
              <div className="mt-2 flex items-center gap-2 text-2xl font-bold text-white">
                <MapPinned className="h-5 w-5 text-amber-300" />
                Locale
              </div>
              <div className="mt-1 text-xs text-white/50">
                Donne une direction à la chasse sans perdre le côté ludique.
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-x-6 top-8 h-48 rounded-full bg-lime-400/20 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/10 bg-[#08110d]/75 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/45">
                  Mission du jour
                </div>
                <div className="mt-1 text-xl font-semibold text-white">
                  Collectionner 3 espèces
                </div>
              </div>
              <div className="rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1 text-xs font-semibold text-lime-200">
                +30 pts
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>Progrès global</span>
                  <span>68%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/30">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-lime-300 via-emerald-400 to-amber-300" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/45">
                    Rareté du jour
                  </div>
                  <div className="mt-2 text-3xl font-black text-white">
                    Rare
                  </div>
                  <div className="mt-1 text-sm text-white/60">
                    Quelques captures suffisent pour la débloquer.
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/45">
                    Récompense
                  </div>
                  <div className="mt-2 text-3xl font-black text-white">+10</div>
                  <div className="mt-1 text-sm text-white/60">
                    Points par capture validée.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
