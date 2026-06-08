import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Spinner } from "heroui-native";
import { StyleSheet, View } from "react-native";

import { authClient } from "@/lib/auth-client";

const ONBOARDING_KEY = "onboarding_completed";

export default function Index() {
  const { data: session, isPending } = authClient.useSession();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY)
      .then((value) => setHasSeenOnboarding(value === "true"))
      .catch(() => setHasSeenOnboarding(false));
  }, []);

  if (isPending || hasSeenOnboarding === null) {
    return (
      <View style={styles.centered}>
        <Spinner size="lg" color="primary" />
      </View>
    );
  }

  if (!hasSeenOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  if (session?.user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/sign-up" />;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
});
