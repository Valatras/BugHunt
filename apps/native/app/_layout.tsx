import "@/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Uniwind } from "uniwind";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { AppThemeProvider } from "@/contexts/app-theme-context";
import { queryClient } from "@/utils/orpc";

export const unstable_settings = {
  initialRouteName: "Bughunt",
};

// Keep native theme aligned with the dark web reference on first paint.
if (Uniwind.currentTheme !== "dark") {
  Uniwind.setTheme("dark");
}

function StackLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="Bughunt" options={{ headerShown: false }} />
      <Stack.Screen
        name="insect/[id]"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="modal"
        options={{ title: "Modal", presentation: "modal" }}
      />
    </Stack>
  );
}

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <AppThemeProvider>
            <HeroUINativeProvider>
              <StackLayout />
            </HeroUINativeProvider>
          </AppThemeProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
