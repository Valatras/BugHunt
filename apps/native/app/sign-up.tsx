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
    <ScrollView className="flex-1 bg-background">
      <Container className="px-6 py-8">
        {/* Header with close button */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-foreground">
            Créer un compte
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="bg-muted/20 p-2 rounded-full active:opacity-70"
          >
            <Ionicons name="close" size={24} color={foregroundColor} />
          </Pressable>
        </View>

        {/* Sign Up Form */}
        <SignUp />
      </Container>
    </ScrollView>
  );
}
