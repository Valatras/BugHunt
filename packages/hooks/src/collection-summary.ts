// Shared collection summary logic used by both web and native screens.
// Keeping the count and completion math here avoids repeating the same
// derived-state calculation in every page component.

import { useMemo } from "react";

export type CollectionEntry = {
  owned?: boolean | null;
};

export type CollectionSummary = {
  discovered: number;
  total: number;
  completion: number;
};

export function getCollectionSummary(
  collection: readonly CollectionEntry[] | undefined,
): CollectionSummary {
  const total = collection?.length ?? 0;
  const discovered = collection?.filter((entry) => entry.owned).length ?? 0;
  const completion = total > 0 ? Math.round((discovered / total) * 100) : 0;

  return {
    discovered,
    total,
    completion,
  };
}

export function useCollectionSummary(
  collection: readonly CollectionEntry[] | undefined,
): CollectionSummary {
  return useMemo(() => getCollectionSummary(collection), [collection]);
}
