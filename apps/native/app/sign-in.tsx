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
        {/* Header with close button */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-foreground">
            Se connecter
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="bg-muted/20 p-2 rounded-full active:opacity-70"
          >
            <Ionicons name="close" size={24} color={foregroundColor} />
          </Pressable>
        </View>

        {/* Sign In Form */}
        <SignIn />
      </Container>
    </ScrollView>
  );
}
