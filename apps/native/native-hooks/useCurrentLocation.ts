import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";

export type LocationState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "denied" }
  | { status: "unavailable" }
  | {
      status: "success";
      coords: { latitude: number; longitude: number };
    }
  | { status: "error"; message: string };

/**
 * Demande la permission de localisation et suit la position GPS
 * de l'utilisateur en temps réel (watchPositionAsync).
 *
 * Usage :
 *   const location = useCurrentLocation();
 *   if (location.status === "success") { ... location.coords ... }
 */
export function useCurrentLocation(): LocationState {
  const [state, setState] = useState<LocationState>({ status: "idle" });
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setState({ status: "loading" });

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (cancelled) return;

      if (status === "denied") {
        setState({ status: "denied" });
        return;
      }

      if (status !== "granted") {
        setState({ status: "unavailable" });
        return;
      }

      try {
        // Abonnement aux mises à jour de position en temps réel
        subscriptionRef.current = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 5000, // au minimum toutes les 5s
            distanceInterval: 5, // ou tous les 5 mètres parcourus
          },
          (result) => {
            if (cancelled) return;
            setState({
              status: "success",
              coords: {
                latitude: result.coords.latitude,
                longitude: result.coords.longitude,
              },
            });
          },
        );
      } catch (err) {
        if (cancelled) return;
        setState({ status: "error", message: String(err) });
      }
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