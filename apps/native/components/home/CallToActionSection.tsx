import { Ionicons } from "@expo/vector-icons";
import { Card, useThemeColor } from "heroui-native";
import { Text, View, Pressable } from "react-native";

interface CallToActionSectionProps {
  onSignUp: () => void;
}

export function CallToActionSection({ onSignUp }: CallToActionSectionProps) {
  const foregroundColor = useThemeColor("foreground");

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
        className="bg-primary py-3 px-8 rounded-full active:opacity-80"
        onPress={onSignUp}
      >
        <Text className="text-foreground font-semibold text-base">
          Créer un compte
        </Text>
      </Pressable>
    </Card>
  );
}
