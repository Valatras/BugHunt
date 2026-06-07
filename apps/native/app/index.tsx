import { Redirect } from "expo-router";
import { Spinner } from "heroui-native";
import { View } from "react-native";

import { authClient } from "@/lib/auth-client";

export default function Index() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Spinner size="lg" color="primary" />
      </View>
    );
  }

  if (session?.user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/sign-up" />;
}
