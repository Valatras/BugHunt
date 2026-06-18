import { useEffect, useRef, useState } from "react";
import { Pedometer } from "expo-sensors";

export type PedometerState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "unavailable" }
  | { status: "denied" }
  | { status: "active"; steps: number }
  | { status: "error"; message: string };

/**
 * Calcule les points à partir des pas.
 * Règle actuelle : 1 pas = 1 point.
 * Règle future : Math.floor(steps / 1000)
 */
export function stepsToPoints(steps: number): number {
  return steps;
}

/**
 * Demande la permission d'activité physique puis s'abonne à
 * watchStepCount (compatible iOS + Android).
 * Compte les pas depuis l'ouverture de la page.
 *
 * Note : getStepCountAsync (plage de dates depuis minuit) n'est pas
 * supporté sur Android, on utilise donc uniquement le compteur
 * relatif à la session, via watchStepCount.
 */
export function usePedometer(): PedometerState {
  const [state, setState] = useState<PedometerState>({ status: "idle" });
  const subscriptionRef = useRef<ReturnType<typeof Pedometer.watchStepCount> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setState({ status: "loading" });

      const isAvailable = await Pedometer.isAvailableAsync();

      if (cancelled) return;

      if (!isAvailable) {
        setState({ status: "unavailable" });
        return;
      }

      // Permission runtime requise sur Android 10+ (ACTIVITY_RECOGNITION)
      const { status } = await Pedometer.requestPermissionsAsync();

      if (cancelled) return;

      if (status !== "granted") {
        setState({ status: "denied" });
        return;
      }

      setState({ status: "active", steps: 0 });

      subscriptionRef.current = Pedometer.watchStepCount((result) => {
        if (cancelled) return;
        setState({ status: "active", steps: result.steps });
      });
    }

    init();

    return () => {
      cancelled = true;
      subscriptionRef.current?.remove();
      subscriptionRef.current = null;
    };
  }, []);

  return state;
}