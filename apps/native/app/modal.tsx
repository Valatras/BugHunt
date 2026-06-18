import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button, Surface, useThemeColor } from "heroui-native";
import { Text, View } from "react-native";

import { Container } from "@/components/container";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

function Modal() {
  const accentForegroundColor = useThemeColor("accent-foreground");

  function handleClose() {
    router.back();
  }

  return (
    <Container>
      <View className="flex-1 justify-center items-center p-4">
        <Surface
          variant="secondary"
          className={[frontendLayout.cardSurface, "w-full max-w-sm p-5"].join(" ")}
        >
          <View className="items-center">
            <View className="mb-3 h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-lime-400/10">
              <Ionicons name="checkmark" size={24} color={accentForegroundColor} />
            </View>
            <Text className="mb-1 text-lg font-black text-white">Modal Screen</Text>
            <Text className="mb-4 text-center text-sm text-white/60">
              This is an example modal screen for dialogs and confirmations.
            </Text>
          </View>
          <Button onPress={handleClose} className="w-full rounded-2xl bg-lime-300" size="sm">
            <Button.Label>Close</Button.Label>
          </Button>
        </Surface>
      </View>
    </Container>
  );
}

export default Modal;
