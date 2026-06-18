import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "heroui-native";
import { View, Pressable, Text } from "react-native";

import { SignUp } from "@/components/sign-up";
import { Container } from "@/components/container";

export default function SignUpModal() {
  const router = useRouter();
  const foregroundColor = useThemeColor("foreground");

  return (
    <Container className="px-6 py-8">
      <View className="mb-6 flex-row items-center justify-between">
        <Text className="text-3xl font-black tracking-tight text-white">
          Créer un compte
        </Text>
      </View>

      <SignUp />

      <View className="mt-6 flex-row items-center justify-center">
        <Text className="mr-2 text-sm text-white/60">
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
          <Text className="text-sm font-medium text-lime-300">Se connecter</Text>
        </Pressable>
      </View>
    </Container>
  );
}
