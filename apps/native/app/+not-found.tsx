import { Link, Stack } from "expo-router";
import { Button, Surface } from "heroui-native";
import { Text, View } from "react-native";

import { Container } from "@/components/container";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <Container>
        <View className="flex-1 justify-center items-center p-4">
          <Surface
            variant="secondary"
            className={[frontendLayout.cardSurface, "items-center max-w-sm p-6"].join(" ")}
          >
            <Text className="mb-3 text-4xl">🤔</Text>
            <Text className="mb-1 text-lg font-black text-white">Page Not Found</Text>
            <Text className="mb-4 text-center text-sm text-white/60">
              The page you're looking for doesn't exist.
            </Text>
            <Link href="/" asChild>
              <Button size="sm" className="rounded-2xl bg-lime-300">
                Go Home
              </Button>
            </Link>
          </Surface>
        </View>
      </Container>
    </>
  );
}
