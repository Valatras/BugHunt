import { Ionicons } from "@expo/vector-icons";
import { Card, useThemeColor } from "heroui-native";
import { Text, View, Pressable } from "react-native";

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
    <Card variant="secondary" className="mb-8 p-8 items-center">
      <Ionicons name="rocket" size={48} color={foregroundColor} />
      <Text className="text-foreground text-xl md:text-2xl font-bold mt-4 mb-2 text-center">
        Prêt à commencer?
      </Text>
      <Text className="text-muted text-center mb-6 text-sm md:text-base px-4">
        Créez votre compte gratuitement et commencez votre collection dès
        aujourd'hui
      </Text>
      <Pressable
        className="bg-primary py-3 px-8 rounded-full active:opacity-80 mb-4"
        onPress={onSignUp}
        disabled={disabled}
      >
        <Text className="text-foreground font-semibold text-base">
          Créer un compte
        </Text>
      </Pressable>

      <Pressable
        className="bg-primary py-3 md:py-4 px-8 rounded-full active:opacity-80 flex-row items-center justify-center"
        onPress={onSignIn}
        disabled={disabled}
      >
        <Ionicons
          name="arrow-forward"
          size={20}
          color={foregroundColor}
          style={{ marginRight: 8 }}
        />
        <Text className="text-foreground font-semibold text-base md:text-lg">
          J'ai déjà un compte
        </Text>
      </Pressable>
    </Card>
  );
}
