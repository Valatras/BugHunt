import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Bug, Shield, Sparkles } from "lucide-react";

import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";

export const Route = createFileRoute("/login")({
  component: LoginRoute,
});

function LoginRoute() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(163,230,53,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.12),_transparent_30%)]" />
          <div className="relative space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-lime-200">
              <Sparkles className="h-3.5 w-3.5" />
              Authentification
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl">
                Reprenez la chasse là où vous l’avez laissée.
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
                Connexion et inscription gardent le langage visuel de Bughunt:
                cartes sombres, détails lumineux et progression très lisible.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <Bug className="h-5 w-5 text-lime-300" />
                <h2 className="mt-4 text-lg font-semibold text-white">
                  Collection persistante
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Vos captures, vos points et votre bestiaire restent liés à
                  votre compte.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <Shield className="h-5 w-5 text-amber-300" />
                <h2 className="mt-4 text-lg font-semibold text-white">
                  Interface sécurisée
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Les pages privées protègent naturellement l’accès au
                  dashboard et au bestiaire.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm uppercase tracking-[0.25em] text-white/45">
                    Flux
                  </div>
                  <div className="mt-1 text-xl font-black text-white">
                    {showSignIn ? "Connexion" : "Inscription"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSignIn((value) => !value)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10"
                >
                  {showSignIn ? "Créer un compte" : "Déjà inscrit?"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-center">
          {showSignIn ? (
            <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
          ) : (
            <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
          )}
        </div>
      </div>
    </main>
  );
}
