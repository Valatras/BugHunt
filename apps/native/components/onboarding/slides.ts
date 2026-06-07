import type { ComponentType } from "react";
import {
  CollectionIllustration,
  ProgressIllustration,
  SummonIllustration,
  WalkIllustration,
} from "./illustrations";

export type Slide = {
  key: string;
  accentColor: string;
  gradientColors: readonly [string, string, string];
  tag: string;
  title: string;
  subtitle: string;
  Illustration: ComponentType;
};

export const SLIDES: Slide[] = [
  {
    key: "walk",
    accentColor: "#8b5cf6",
    gradientColors: ["#05050f", "#0d0622", "#05050f"],
    tag: "MARCHE",
    title: "🚶 Marche dans la vraie vie",
    subtitle:
      "Chaque pas te rapporte des points. Transforme ton activité quotidienne en aventure.",
    Illustration: WalkIllustration,
  },
  {
    key: "summon",
    accentColor: "#06b6d4",
    gradientColors: ["#020f18", "#031c2d", "#020f18"],
    tag: "INVOQUE",
    title: "🎲 Invoque des insectes",
    subtitle:
      "Utilise tes points pour obtenir des insectes communs, rares ou légendaires.",
    Illustration: SummonIllustration,
  },
  {
    key: "collection",
    accentColor: "#22c55e",
    gradientColors: ["#05140a", "#0b2515", "#05140a"],
    tag: "COLLECTION",
    title: "📚 Complète ta collection",
    subtitle:
      "Découvre des centaines d'espèces et remplis ton encyclopédie personnelle.",
    Illustration: CollectionIllustration,
  },
  {
    key: "progress",
    accentColor: "#f59e0b",
    gradientColors: ["#1a1200", "#291b04", "#1a1200"],
    tag: "PROGRESSION",
    title: "🏆 Progresse",
    subtitle:
      "Débloque des badges, atteins des objectifs et deviens un expert.",
    Illustration: ProgressIllustration,
  },
];
