import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "heroui-native";
import { View, Pressable, Text, ScrollView } from "react-native";

import { SignIn } from "@/components/sign-in";
import { Container } from "@/components/container";

export default function SignInModal() {
  const router = useRouter();
  const foregroundColor = useThemeColor("foreground");

  return (
    <ScrollView className="flex-1 bg-background">
      <Container className="px-6 py-8">
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="text-3xl font-black tracking-tight text-white">
            Se connecter
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="rounded-full border border-white/10 bg-white/5 p-2.5 active:opacity-70"
          >
            <Ionicons name="close" size={24} color={foregroundColor} />
          </Pressable>
        </View>

        <SignIn />
      </Container>
    </ScrollView>
  );
}
