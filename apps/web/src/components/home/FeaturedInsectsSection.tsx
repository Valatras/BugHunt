import { ArrowRight, BadgeInfo, Hourglass } from "lucide-react";

import { Card } from "@my-better-t-app/ui/components/card";
import { InsectImage } from "@/components/insects/InsectImage";

type InsectCardItem = {
  id: number;
  name: string;
  rarity?: string;
  sciName?: string;
  imageKey?: string | null;
};

type FeaturedInsectsSectionProps = {
  insects?: InsectCardItem[];
  isLoading: boolean;
  onInsectPress?: (id: number) => void;
};

function InsectCard({
  insect,
  onPress,
}: {
  insect: InsectCardItem;
  onPress?: (id: number) => void;
}) {
  return (
    <Card className="group border-white/10 bg-white/5 p-0 transition hover:-translate-y-1 hover:border-lime-400/30 hover:bg-white/10">
      <button
        type="button"
        onClick={() => onPress?.(insect.id)}
        className="flex h-full w-full flex-col overflow-hidden text-left"
      >
        <InsectImage imageKey={insect.imageKey} name={insect.name} size="md" />

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="min-h-10">
            <h3 className="text-base font-semibold text-white">
              {insect.name}
            </h3>
            {insect.sciName ? (
              <p className="mt-1 text-xs italic text-white/50">
                {insect.sciName}
              </p>
            ) : null}
          </div>

          <div className="mt-auto flex items-center justify-between gap-2">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75">
              {insect.rarity ?? "Standard"}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-lime-300">
              Détails
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </button>
    </Card>
  );
}

export function FeaturedInsectsSection({
  insects = [],
  isLoading,
  onInsectPress,
}: FeaturedInsectsSectionProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/45">
            Vedettes
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-white">
            Insectes en vedette
          </h2>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-sm font-medium text-lime-200">
          <BadgeInfo className="h-4 w-4" />
          Sélection dynamique
        </div>
      </div>

      <p className="max-w-2xl text-sm leading-6 text-white/65">
        Une sélection rapide pour donner envie d’ouvrir le bestiaire et
        d’explorer les détails des espèces.
      </p>

      {isLoading ? (
        <div className="mt-8 flex min-h-40 items-center justify-center rounded-[2rem] border border-white/10 bg-white/5">
          <div className="flex items-center gap-3 text-white/70">
            <Hourglass className="h-5 w-5 animate-pulse text-lime-300" />
            Chargement des insectes...
          </div>
        </div>
      ) : insects.length === 0 ? (
        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center text-white/60">
          Aucun insecte vedette pour le moment.
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {insects.map((insect) => (
            <InsectCard
              key={insect.id}
              insect={insect}
              onPress={onInsectPress}
            />
          ))}
        </div>
      )}
    </section>
  );
}
