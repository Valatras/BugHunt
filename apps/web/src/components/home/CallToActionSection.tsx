import { ArrowRight, Rocket } from "lucide-react";

import { Button } from "@my-better-t-app/ui/components/button";
import { Card } from "@my-better-t-app/ui/components/card";

type CallToActionSectionProps = {
  onSignUp: () => void;
  onSignIn: () => void;
  isLoading?: boolean;
};

export function CallToActionSection({
  onSignUp,
  onSignIn,
  isLoading,
}: CallToActionSectionProps) {
  return (
    <Card className="border-white/10 bg-white/5 p-0">
      <div className="rounded-none bg-[linear-gradient(135deg,rgba(163,230,53,0.16),rgba(16,185,129,0.12),rgba(245,158,11,0.12))] p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white">
          <Rocket className="h-6 w-6" />
        </div>
        <h2 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-3xl">
          Prêt à commencer la chasse?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
          Ouvre un compte, récupère les écrans de progression et retrouve toute
          la logique de collection déjà présente dans l’app native.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            onClick={onSignUp}
            disabled={isLoading}
            className="h-12 rounded-full bg-white px-6 font-semibold text-[#07110d] hover:bg-white/90"
          >
            Créer un compte
          </Button>
          <Button
            variant="outline"
            onClick={onSignIn}
            disabled={isLoading}
            className="h-12 rounded-full border-white/15 bg-white/5 px-6 font-semibold text-white hover:bg-white/10"
          >
            J’ai déjà un compte
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
