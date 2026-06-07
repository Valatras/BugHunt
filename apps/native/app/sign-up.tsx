import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "heroui-native";
import { View, Pressable, Text, ScrollView } from "react-native";

import { SignUp } from "@/components/sign-up";
import { Container } from "@/components/container";

export default function SignUpModal() {
  const router = useRouter();
  const foregroundColor = useThemeColor("foreground");

  return (
    <Container className="px-6 py-8">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-2xl font-bold text-foreground">
          Créer un compte
        </Text>
      </View>

      {/* Sign Up Form */}
      <SignUp />

      {/* Footer with Sign In Link */}
      <View className="flex-row items-center justify-center mt-6">
        <Text className="text-muted text-sm mr-2">
          Vous avez déjà un compte?
        </Text>
        <Pressable
          onPress={() => router.push("/sign-in")}
          className="flex-row items-center active:opacity-70"
        >
          <Ionicons
            name="arrow-forward"
            size={16}
            color={foregroundColor}
            style={{ marginRight: 4 }}
          />
          <Text className="text-primary font-medium text-sm">Se connecter</Text>
        </Pressable>
      </View>
    </Container>
  );
}
