import { useEffect, useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";

import { Container } from "@/components/container";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";
import { orpc } from "@/utils/orpc";
import { useCurrentLocation } from "native-hooks";
import { usePedometer, stepsToPoints } from "native-hooks";

// ─── Constantes de synchronisation ───────────────────────────────────────────

const SYNC_INTERVAL_MS = 30_000;
const SYNC_MIN_NEW_STEPS = 20;

// ─── Carte Leaflet via WebView ────────────────────────────────────────────────

function LeafletMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body, #map { width: 100%; height: 100%; background: #0d1a0f; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map', { zoomControl: true, attributionControl: false })
            .setView([${latitude}, ${longitude}], 16);

          L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
          }).addTo(map);

          const icon = L.divIcon({
            className: '',
            html: \`<div style="
              width: 16px; height: 16px;
              background: rgb(190,242,100);
              border: 2.5px solid white;
              border-radius: 50%;
              box-shadow: 0 0 0 4px rgba(190,242,100,0.25);
            "></div>\`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          });

          L.marker([${latitude}, ${longitude}], { icon })
            .addTo(map)
            .bindPopup('Vous êtes ici');
        </script>
      </body>
    </html>
  `;

  return (
    <WebView
      source={{ html }}
      style={{ width: "100%", height: 260, backgroundColor: "#0d1a0f" }}
      scrollEnabled={false}
      javaScriptEnabled
      originWhitelist={["*"]}
    />
  );
}

// ─── Composants auxiliaires ───────────────────────────────────────────────────

function PermissionBadge({
  icon,
  label,
  ok,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  ok: boolean | null;
}) {
  const color =
    ok === null ? "text-white/40" : ok ? "text-lime-300" : "text-rose-400";
  const borderColor =
    ok === null
      ? "border-white/10"
      : ok
        ? "border-lime-300/20"
        : "border-rose-400/20";
  const bg =
    ok === null ? "bg-white/5" : ok ? "bg-lime-300/5" : "bg-rose-400/5";

  return (
    <View
      className={`flex-row items-center gap-2 rounded-xl border px-3 py-2 ${bg} ${borderColor}`}
    >
      <Ionicons
        name={(ok ? icon : `${icon}-outline`) as any}
        size={14}
        color={
          ok === null
            ? "rgba(255,255,255,0.4)"
            : ok
              ? "rgb(190,242,100)"
              : "rgb(251,113,133)"
        }
      />
      <Text className={`text-xs font-medium ${color}`}>{label}</Text>
    </View>
  );
}

function StatCard({
  eyebrow,
  value,
  unit,
  icon,
  accent = false,
}: {
  eyebrow: string;
  value: string | number;
  unit: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent?: boolean;
}) {
  return (
    <View className={[frontendLayout.cardSurface, "flex-1 p-4"].join(" ")}>
      <View className="mb-3 flex-row items-center justify-between">
        <Text className={frontendLayout.sectionEyebrow}>{eyebrow}</Text>
        <View className="rounded-xl border border-white/10 bg-white/5 p-2">
          <Ionicons name={icon} size={16} color="rgb(190,242,100)" />
        </View>
      </View>
      <Text
        className={`text-3xl font-black tracking-tight ${accent ? "text-lime-300" : "text-white"}`}
      >
        {value}
      </Text>
      <Text className="mt-1 text-xs text-white/45">{unit}</Text>
    </View>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function MapScreen() {
  const queryClient = useQueryClient();
  const location = useCurrentLocation();
  const pedometer = usePedometer();

  const userStats = useQuery(orpc.user.getStats.queryOptions());

  const addStepsMutation = useMutation(
    orpc.podometer.addSteps.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.user.getStats.queryKey(),
        });
      },
    }),
  );

  // ── Synchronisation périodique ──────────────────────────────────────────────
  const lastSyncedStepsRef = useRef(0);
  const lastSyncTimeRef = useRef(Date.now());

  useEffect(() => {
    if (pedometer.status !== "active") return;

    const currentSteps = pedometer.steps;
    const newSteps = currentSteps - lastSyncedStepsRef.current;
    const elapsed = Date.now() - lastSyncTimeRef.current;

    const shouldSyncByCount = newSteps >= SYNC_MIN_NEW_STEPS;
    const shouldSyncByTime = elapsed >= SYNC_INTERVAL_MS && newSteps > 0;

    if (shouldSyncByCount || shouldSyncByTime) {
      lastSyncedStepsRef.current = currentSteps;
      lastSyncTimeRef.current = Date.now();

      addStepsMutation.mutate({
        date: new Date().toISOString(),
        steps: currentSteps,
      });
    }
  }, [pedometer.status === "active" ? pedometer.steps : null]);

  // ── Données affichées ───────────────────────────────────────────────────────
  const steps =
    pedometer.status === "active"
      ? pedometer.steps
      : (userStats.data?.todaySteps ?? 0);
  const points = stepsToPoints(steps);

  const locationOk = location.status === "success";
  const pedometerOk = pedometer.status === "active";

  return (
    <Container>
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-5 gap-5"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ─────────────────────────────────────────────────── */}
        <View className="pt-2">
          <Text className={frontendLayout.sectionEyebrow}>
            Mode exploration
          </Text>
          <Text className="mt-2 text-3xl font-black tracking-tight text-white">
            Exploration
          </Text>
          <Text
            className={["mt-1", frontendLayout.sectionDescription].join(" ")}
          >
            Ta position et tes pas en temps réel.
          </Text>
        </View>

        {/* ── Carte ──────────────────────────────────────────────────── */}
        <View
          className={[frontendLayout.cardSurface, "overflow-hidden"].join(" ")}
        >
          {location.status === "success" ? (
            <>
              <LeafletMap
                latitude={location.coords.latitude}
                longitude={location.coords.longitude}
              />
              <View className="flex-row gap-3 p-4">
                <View className="flex-1 rounded-xl border border-white/10 bg-black/20 p-3">
                  <Text className="mb-1 text-xs uppercase tracking-[0.2em] text-white/40">
                    Latitude
                  </Text>
                  <Text className="font-mono text-sm font-semibold text-white">
                    {location.coords.latitude.toFixed(6)}
                  </Text>
                </View>
                <View className="flex-1 rounded-xl border border-white/10 bg-black/20 p-3">
                  <Text className="mb-1 text-xs uppercase tracking-[0.2em] text-white/40">
                    Longitude
                  </Text>
                  <Text className="font-mono text-sm font-semibold text-white">
                    {location.coords.longitude.toFixed(6)}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <View className="h-64 items-center justify-center gap-3 p-6">
              {location.status === "loading" || location.status === "idle" ? (
                <>
                  <Ionicons
                    name="location-outline"
                    size={32}
                    color="rgba(255,255,255,0.3)"
                  />
                  <Text className="text-center text-sm text-white/50">
                    Récupération de la position GPS…
                  </Text>
                </>
              ) : location.status === "denied" ? (
                <>
                  <Ionicons
                    name="location-outline"
                    size={32}
                    color="rgb(251,113,133)"
                  />
                  <Text className="text-center text-sm font-semibold text-rose-300">
                    Permission de localisation refusée
                  </Text>
                  <Text className="text-center text-xs text-white/50">
                    Active-la dans les réglages pour voir la carte.
                  </Text>
                </>
              ) : (
                <>
                  <Ionicons
                    name="warning-outline"
                    size={32}
                    color="rgba(255,255,255,0.3)"
                  />
                  <Text className="text-center text-sm text-white/50">
                    {location.status === "error"
                      ? location.message
                      : "Localisation indisponible sur cet appareil."}
                  </Text>
                </>
              )}
            </View>
          )}
        </View>

        {/* ── Stats ──────────────────────────────────────────────────── */}
        <View className="flex-row gap-3">
          <StatCard
            eyebrow="Session"
            value={steps.toLocaleString("fr-FR")}
            unit="pas effectués"
            icon="footsteps"
          />
          <StatCard
            eyebrow="Points gagnés"
            value={points.toLocaleString("fr-FR")}
            unit="points cumulés"
            icon="flash"
            accent
          />
        </View>

        {/* ── Avertissement podomètre ─────────────────────────────────── */}
        {pedometer.status === "unavailable" && (
          <View
            className={[
              frontendLayout.cardSurface,
              "flex-row items-center gap-3 p-4",
            ].join(" ")}
          >
            <Ionicons
              name="warning-outline"
              size={20}
              color="rgb(251,173,24)"
            />
            <Text className="flex-1 text-sm text-amber-300">
              Le podomètre n'est pas disponible sur cet appareil.
            </Text>
          </View>
        )}
        {pedometer.status === "denied" && (
          <View
            className={[
              frontendLayout.cardSurface,
              "flex-row items-center gap-3 p-4",
            ].join(" ")}
          >
            <Ionicons
              name="alert-circle-outline"
              size={20}
              color="rgb(251,113,133)"
            />
            <Text className="flex-1 text-sm text-rose-300">
              Permission d'activité physique refusée. Active-la dans les
              réglages pour compter tes pas.
            </Text>
          </View>
        )}

        {/* ── Permissions ─────────────────────────────────────────────── */}
        <View className={[frontendLayout.cardSurface, "p-4"].join(" ")}>
          <Text className={["mb-3", frontendLayout.sectionEyebrow].join(" ")}>
            Permissions
          </Text>
          <View className="flex-row flex-wrap gap-2">
            <PermissionBadge
              icon="location"
              label="Localisation"
              ok={
                location.status === "loading" || location.status === "idle"
                  ? null
                  : locationOk
              }
            />
            <PermissionBadge
              icon="footsteps"
              label="Activité physique"
              ok={
                pedometer.status === "loading" || pedometer.status === "idle"
                  ? null
                  : pedometerOk
              }
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
