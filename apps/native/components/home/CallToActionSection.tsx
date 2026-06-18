import { Ionicons } from "@expo/vector-icons";
import { Card, useThemeColor } from "heroui-native";
import { Text, View, Pressable } from "react-native";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

interface CallToActionSectionProps {
  onSignUp: () => void;
  onSignIn: () => void;
  isLoading?: boolean;
}

export function CallToActionSection({
  onSignUp,
  onSignIn,
  isLoading,
}: CallToActionSectionProps) {
  const foregroundColor = useThemeColor("foreground");
  const disabled = !!isLoading;

  return (
    <Card className={[frontendLayout.cardSurface, "mb-8 p-0"].join(" ")}>
      <View className="items-center px-6 py-8">
        <Ionicons name="rocket" size={48} color={foregroundColor} />
        <Text className="mt-4 mb-2 text-center text-2xl font-black tracking-tight text-white">
          Prêt à commencer?
        </Text>
        <Text className="mb-6 px-4 text-center text-sm leading-6 text-white/65">
          Créez votre compte gratuitement et commencez votre collection dès
          aujourd'hui
        </Text>
        <Pressable
          className="mb-3 rounded-2xl bg-lime-300 px-8 py-3 active:opacity-80"
          onPress={onSignUp}
          disabled={disabled}
        >
          <Text className="text-[#08110e] font-semibold text-base">
            Créer un compte
          </Text>
        </Pressable>

        <Pressable
          className="flex-row items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-3 active:opacity-80"
          onPress={onSignIn}
          disabled={disabled}
        >
          <Ionicons
            name="arrow-forward"
            size={20}
            color={foregroundColor}
            style={{ marginRight: 8 }}
          />
          <Text className="text-white font-semibold text-base">
            J'ai déjà un compte
          </Text>
        </Pressable>
      </View>
    </Card>
  );
}
