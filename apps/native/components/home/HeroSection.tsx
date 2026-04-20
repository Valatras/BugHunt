import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "heroui-native";
import { Text, View, Pressable } from "react-native";

import { Container } from "@/components/container";

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
  const backgroundColor = useThemeColor("background");

  return (
    <View className="relative h-80 md:h-96 bg-linear-to-br from-primary/5 to-primary/10">
      {/* Subtle gradient overlay */}
      <View className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent" />

      <Container
        isScrollable={false}
        className="h-full justify-center items-center px-6 relative z-10"
      >
        {/* Logo/Icon */}
        <View className="mb-6 bg-primary/20 p-6 rounded-full">
          <Ionicons name="bug" size={56} color={foregroundColor} />
        </View>

        {/* Title */}
        <Text className="text-4xl md:text-5xl font-bold text-foreground text-center mb-3">
          Bughunt
        </Text>

        {/* Subtitle */}
        <Text className="text-base md:text-lg text-muted text-center mb-8 px-4 max-w-sm">
          Découvrez, collectionnez et apprenez tout sur le fascinant monde des
          insectes
        </Text>

        {/* CTA Button */}
        {!isLoading && (
          <Pressable
            className="bg-primary py-3 md:py-4 px-8 rounded-full active:opacity-80 flex-row items-center"
            onPress={session?.user ? onMyCollection : onGetStarted}
          >
            <Ionicons
              name={session?.user ? "grid" : "arrow-forward"}
              size={20}
              color={foregroundColor}
              style={{ marginRight: 8 }}
            />
            <Text className="text-foreground font-semibold text-base md:text-lg">
              {session?.user ? "Ma Collection" : "Commencer l'aventure"}
            </Text>
          </Pressable>
        )}
      </Container>
    </View>
  );
}
