import { Bird, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

import UserMenu from "./user-menu";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/dashboard", label: "Tableau de bord" },
  { to: "/insects", label: "Bestiaire" },
  { to: "/todos", label: "Todos" },
] as const;

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050a08]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-lime-400/40 hover:bg-white/10"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-lime-300 via-emerald-400 to-amber-300 text-[#08110e] shadow-lg shadow-lime-500/20">
            <Bird className="h-4 w-4" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-[0.22em] text-white">
              BUGHUNT
            </span>
            <span className="block text-xs text-white/60">
              Explore, capture, collectionne
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              activeProps={{
                className:
                  "bg-green-950 text-[#07110d] shadow-sm shadow-lime-500/20",
              }}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-2 text-xs font-medium text-lime-200 sm:flex">
            <Sparkles className="h-3.5 w-3.5" />
            Saison active
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
