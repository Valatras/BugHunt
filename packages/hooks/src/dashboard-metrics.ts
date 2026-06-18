// Shared dashboard normalization used by both web and native screens.
// This keeps the pages focused on rendering and makes the fallback values
// consistent across the monorepo.

import { useMemo } from "react";

export type DashboardStatsInput = {
  points?: number | null;
  discoveredSpecies?: number | null;
  todaySteps?: number | null;
  level?: number | null;
  completion?: number | null;
  totalSpecies?: number | null;
} | null | undefined;

export type DashboardMetrics = {
  points: number;
  species: number;
  steps: number;
  level: number;
  completion: number;
  totalSpecies: number;
};

export function getDashboardMetrics(
  stats: DashboardStatsInput,
): DashboardMetrics {
  return {
    points: stats?.points ?? 0,
    species: stats?.discoveredSpecies ?? 0,
    steps: stats?.todaySteps ?? 0,
    level: stats?.level ?? 1,
    completion: stats?.completion ?? 0,
    totalSpecies: stats?.totalSpecies ?? 0,
  };
}

export function useDashboardMetrics(
  stats: DashboardStatsInput,
): DashboardMetrics {
  return useMemo(() => getDashboardMetrics(stats), [stats]);
}
