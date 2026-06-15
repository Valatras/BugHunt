import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";

type Insect = {
  id: number;
  name: string;
  sciName?: string;
  rarity?: string | null;
  owned?: boolean;
  quantity?: number;
};

type Props = {
  insect: Insect;
};

export function InsectCard({ insect }: Props) {
  const owned = Boolean(insect.owned);

  return (
    <Link
      to="/insect/$id"
      params={{ id: String(insect.id) }}
      className={[
        "group rounded-[1.75rem] border p-0 transition hover:-translate-y-1",
        owned
          ? "border-white/10 bg-white/5 hover:border-lime-400/30 hover:bg-white/10"
          : "border-white/5 bg-white/3 opacity-75",
      ].join(" ")}
    >
      <div className="flex h-full flex-col overflow-hidden">
        <div className="flex h-32 items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(163,230,53,0.24),_rgba(2,6,3,0.08)_55%),linear-gradient(135deg,rgba(16,185,129,0.18),rgba(245,158,11,0.14))]">
          {owned ? (
            <CheckCircle2 className="h-10 w-10 text-white/90" />
          ) : (
            <HelpCircle className="h-10 w-10 text-white/65" />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div>
            <h3 className="text-base font-semibold text-white">
              {owned ? insect.name : "Espèce inconnue"}
            </h3>
            <p className="mt-1 text-xs italic text-white/50">
              {owned ? insect.sciName : "Débloque cette fiche en capture"}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between gap-2">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              {insect.rarity ?? "Standard"}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-lime-300">
              {owned ? `x${insect.quantity ?? 0}` : "Non capturé"}
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
