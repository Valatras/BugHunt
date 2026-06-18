import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, BadgeCheck, Bug, Sparkles, Wand2 } from "lucide-react";

import { getUser } from "@/functions/get-user";
import { orpc } from "@/utils/orpc";
import { InsectImage } from "@/components/insects/InsectImage";

export const Route = createFileRoute("/insect/$id")({
  component: InsectDetailsRoute,
  beforeLoad: async () => {
    const session = await getUser();
    return { session };
  },
  loader: async ({ context }) => {
    if (!context.session) {
      throw redirect({ to: "/login" });
    }
  },
});

function InsectDetailsRoute() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const parsedId = Number(id);
  const isValidId = Number.isFinite(parsedId);

  const insect = useQuery(
    orpc.insect.getDetails.queryOptions({
      input: {
        id: parsedId,
      },
      enabled: isValidId,
    }),
  );

  if (!isValidId) {
    return (
      <main className="mx-auto flex w-full max-w-3xl items-center justify-center px-4 py-20 text-white">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center">
          Identifiant invalide.
        </div>
      </main>
    );
  }

  if (insect.isPending) {
    return (
      <main className="mx-auto flex w-full max-w-3xl items-center justify-center px-4 py-20 text-white/70">
        Chargement de la fiche...
      </main>
    );
  }

  if (!insect.data) {
    return (
      <main className="mx-auto flex w-full max-w-3xl items-center justify-center px-4 py-20 text-white/70">
        Cette espèce est introuvable.
      </main>
    );
  }

  const data = insect.data;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate({ to: "/insects" })}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au bestiaire
        </button>

        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/20">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex min-h-[22rem] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(163,230,53,0.24),_transparent_40%),linear-gradient(135deg,rgba(16,185,129,0.2),rgba(245,158,11,0.14))]">
              <InsectImage
                imageKey={data.owned ? data.imageKey : null}
                name={data.name}
                size="lg"
              />
            </div>

            <div className="space-y-6 p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-lime-200">
                <Sparkles className="h-3.5 w-3.5" />
                Fiche espèce
              </div>

              <div>
                <h1 className="text-4xl font-black text-white">
                  {data.owned ? data.name : "Espèce inconnue"}
                </h1>
                <p className="mt-2 text-sm italic text-white/55">
                  {data.owned
                    ? data.sciName
                    : "Débloquez cette espèce en la capturant"}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/45">
                    Rareté
                  </div>
                  <div className="mt-2 text-xl font-bold text-white">
                    {data.rarity}
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/45">
                    Quantité
                  </div>
                  <div className="mt-2 text-xl font-bold text-white">
                    {data.quantity}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-lime-300">
                  <BadgeCheck className="h-4 w-4" />
                  Description
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  {data.owned
                    ? data.description
                    : "Capturez cet insecte pour débloquer sa fiche complète."}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate({ to: "/dashboard" })}
                  className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-5 py-3 text-sm font-semibold text-[#08110e] transition hover:bg-lime-200"
                >
                  <Wand2 className="h-4 w-4" />
                  Revenir au dashboard
                </button>
                <button
                  type="button"
                  onClick={() => navigate({ to: "/insects" })}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                >
                  Collection complète
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
