import { Button } from "@my-better-t-app/ui/components/button";
import { Input } from "@my-better-t-app/ui/components/input";
import { Label } from "@my-better-t-app/ui/components/label";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";
import { Mail, Lock, LogIn } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import Loader from "./loader";

export default function SignInForm({
  onSwitchToSignUp,
}: {
  onSwitchToSignUp: () => void;
}) {
  const navigate = useNavigate({
    from: "/",
  });
  const { isPending } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            navigate({
              to: "/dashboard",
            });
            toast.success("Connexion réussie");
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText);
          },
        },
      );
    },
    validators: {
      onSubmit: z.object({
        email: z.email("Adresse e-mail invalide"),
        password: z.string().min(8, "Le mot de passe doit contenir 8 caractères"),
      }),
    },
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.25em] text-white/45">
          Accès
        </p>
        <h1 className="mt-2 text-3xl font-black text-white">Se connecter</h1>
        <p className="mt-2 text-sm text-white/60">
          Retrouvez votre progression et votre collection.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field name="email">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="text-white/70">
                Adresse e-mail
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="h-11 rounded-2xl border-white/10 bg-black/20 pl-10 text-white placeholder:text-white/30"
                  placeholder="exemple@bughunt.app"
                />
              </div>
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-sm text-rose-300">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="text-white/70">
                Mot de passe
              </Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="h-11 rounded-2xl border-white/10 bg-black/20 pl-10 text-white placeholder:text-white/30"
                  placeholder="••••••••"
                />
              </div>
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-sm text-rose-300">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          })}
        >
          {({ canSubmit, isSubmitting }) => (
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="h-11 w-full rounded-2xl bg-lime-300 font-semibold text-[#08110e] hover:bg-lime-200"
            >
              <LogIn className="mr-2 h-4 w-4" />
              {isSubmitting ? "Connexion..." : "Se connecter"}
            </Button>
          )}
        </form.Subscribe>
      </form>

      <div className="mt-5 text-center text-sm text-white/60">
        Vous n’avez pas encore de compte?{" "}
        <Button
          variant="link"
          onClick={onSwitchToSignUp}
          className="h-auto p-0 text-lime-300 hover:text-lime-200"
        >
          Créer un compte
        </Button>
      </div>
    </div>
  );
}
