// Semantic layout tokens shared by the frontend apps.
// These are plain class strings so web and native can reuse the same
// spacing, radius, and typography vocabulary without sharing platform code.

export const frontendLayout = {
  pageContainer: "mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8",
  pageStack: "space-y-6",
  sectionEyebrow: "text-sm uppercase tracking-[0.25em] text-white/45",
  sectionTitle: "text-2xl font-black tracking-tight text-white",
  sectionDescription: "text-sm leading-6 text-white/65",
  cardSurface: "rounded-2xl border border-white/10 bg-white/5",
  cardSurfaceMuted: "rounded-2xl border border-white/10 bg-black/20",
  iconBadge:
    "flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-lime-400/10 text-lime-300",
  progressTrack: "h-3 overflow-hidden rounded-full bg-black/30",
  progressFill:
    "h-full rounded-full bg-gradient-to-r from-lime-300 via-emerald-400 to-amber-300",
  emptyState: "rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white/60",
  mutedText: "text-sm text-white/55",
  bodyText: "text-sm text-white/70",
} as const;
