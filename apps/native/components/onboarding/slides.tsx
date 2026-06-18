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
    accentColor: "#a3e635",
    gradientColors: ["#050a08", "#08110d", "#050a08"],
    tag: "EXPLORE",
    title: "Explore",
    subtitle:
      "Chaque pas te rapporte des points. Transforme ton activité quotidienne en aventure.",
    Illustration: WalkIllustration,
  },
  {
    key: "summon",
    accentColor: "#10b981",
    gradientColors: ["#030806", "#08110d", "#030806"],
    tag: "CAPTURE",
    title: "🎲 Capture des insectes",
    subtitle:
      "Utilise tes points pour obtenir des insectes de différentes raretés.",
    Illustration: SummonIllustration,
  },
  {
    key: "collection",
    accentColor: "#f59e0b",
    gradientColors: ["#050a08", "#0b110b", "#050a08"],
    tag: "COLLECTIONNE",
    title: "📚 Complète ta collection",
    subtitle:
      "Découvre des centaines d'espèces et remplis ton encyclopédie personnelle.",
    Illustration: CollectionIllustration,
  },
  {
    key: "progress",
    accentColor: "#a3e635",
    gradientColors: ["#050a08", "#0d1410", "#050a08"],
    tag: "PROGRESSION",
    title: "🏆 Progresse en tant que chasseur",
    subtitle:
      "Débloque des badges, atteins des objectifs et deviens un expert.",
    Illustration: ProgressIllustration,
  },
];
