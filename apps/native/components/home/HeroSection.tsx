import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useThemeColor } from "heroui-native";
import { url } from "inspector";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface HeroSectionProps {
  session?: { user?: { name: string } } | null;
  isConnected: boolean;
  isLoading: boolean;
  onGetStarted: () => void;
  onMyCollection: () => void;
}

export function HeroSection({}: HeroSectionProps) {
  const foregroundColor = useThemeColor("foreground");
  const primaryActionLabel = "Commencer";
  const secondaryActionLabel = "Ma collection";

  return (
    <View className="relative h-105 md:h-120 overflow-hidden">
      {/* Background image */}
      <Image
        source={require("../../assets/images/hero.png")}
        contentFit="cover"
        style={StyleSheet.absoluteFill}
      />

      <View className="absolute inset-0 bg-black/35" />
      <View className="absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black/60" />

      <View className="absolute inset-0 items-center justify-center px-6">
        <View className="w-full max-w-md items-center rounded-4xl border border-white/15 bg-black/25 px-6 py-8">
          <View className="mb-5 rounded-full border border-white/20 bg-white/15 p-5">
            <Ionicons name="bug" size={56} color={foregroundColor} />
          </View>

          <Text className="text-5xl font-bold text-white text-center mb-3">
            Bughunt
          </Text>

          <Text className="text-base leading-6 text-white/85 text-center mb-8 max-w-sm">
            Découvrez, collectionnez et apprenez tout sur le fascinant monde des
            insectes
          </Text>

          <View className="w-full flex-row gap-3">
            <Pressable className="flex-1 rounded-2xl bg-primary px-4 py-4 active:opacity-80">
              <Text className="text-center text-white font-semibold">
                {primaryActionLabel}
              </Text>
            </Pressable>

            <Pressable className="flex-1 rounded-2xl border border-white/20 bg-white/10 px-4 py-4 active:opacity-80">
              <Text
                className="text-center text-white font-semibold"
                onPress={() => router.push("/Bughunt/insects")}
              >
                {secondaryActionLabel}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
