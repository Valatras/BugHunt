import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useThemeColor } from "heroui-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

interface HeroSectionProps {
  session?: { user?: { name: string } } | null;
  isConnected: boolean;
  isLoading: boolean;
  onGetStarted: () => void;
  onMyCollection: () => void;
}

export function HeroSection({
  session,
  isConnected,
  isLoading,
  onGetStarted,
  onMyCollection,
}: HeroSectionProps) {
  const foregroundColor = useThemeColor("foreground");
  const displayName = session?.user?.name ?? "Explorateur";
  const primaryActionLabel = session?.user
    ? "Aller au tableau de bord"
    : "Commencer l’aventure";
  const secondaryActionLabel = "Voir la collection";

  return (
    <View className="relative min-h-[520px] overflow-hidden border-b border-white/10">
      <Image
        source={require("../../assets/images/hero.png")}
        contentFit="cover"
        style={StyleSheet.absoluteFill}
      />

      <View className="absolute inset-0 bg-black/55" />
      <View className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/80" />

      <View className="relative z-10 items-center justify-center px-6 py-14">
        <View
          className={[
            frontendLayout.cardSurface,
            "w-full max-w-md items-center p-6",
          ].join(" ")}
          style={{ backgroundColor: "rgba(8,17,13,0.82)" }}
        >
          <View className="mb-3 self-stretch flex-row items-center justify-between">
            <View className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <Text className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                {isLoading
                  ? "Synchronisation"
                  : isConnected
                    ? "Connexion active"
                    : "Mode hors ligne"}
              </Text>
            </View>

            {session?.user ? (
              <Text className="text-xs font-medium text-white/55">
                {displayName}
              </Text>
            ) : null}
          </View>

          <View className="mb-5 rounded-full border border-lime-400/20 bg-lime-400/10 p-5">
            <Ionicons name="bug" size={56} color={foregroundColor} />
          </View>

          <Text className="mb-3 text-center text-5xl font-black tracking-tight text-white">
            {session?.user ? (
              <>
                Bonjour <Text className="text-lime-300">{displayName}</Text>.
              </>
            ) : (
              "Bughunt"
            )}
          </Text>

          <Text className="mb-8 max-w-sm text-center text-base leading-6 text-white/70">
            {session?.user
              ? "Ta collection t’attend. Continue à découvrir, comparer et compléter ton bestiaire."
              : "Découvrez, collectionnez et apprenez tout sur le fascinant monde des insectes"}
          </Text>

          <View className="w-full flex-row gap-3">
            <Pressable
              onPress={onGetStarted}
              className="flex-1 rounded-2xl bg-lime-300 px-4 py-4 active:opacity-80"
            >
              <Text className="text-center font-semibold text-[#08110e]">
                {primaryActionLabel}
              </Text>
            </Pressable>

            <Pressable
              onPress={onMyCollection}
              className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 active:opacity-80"
            >
              <Text className="text-center font-semibold text-white">
                {secondaryActionLabel}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
