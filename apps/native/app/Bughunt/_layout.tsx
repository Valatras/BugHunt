import { Ionicons } from "@expo/vector-icons";
import { Tabs, Redirect } from "expo-router";
import { useThemeColor } from "heroui-native";
import { authClient } from "@/lib/auth-client";

export default function TabLayout() {
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  if (!session?.user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      key="main-tabs"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: themeColorBackground,
        },
        headerTintColor: themeColorForeground,
        headerTitleStyle: {
          color: themeColorForeground,
          fontWeight: "600",
        },
        tabBarStyle: {
          backgroundColor: themeColorBackground,
        },
      }}
    >
      <Tabs.Screen
        name="map"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="compass" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(wish)"
        options={{
          title: "hunt",
          headerTitle: "hunt",
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name="cube"
              size={size}
              color={focused ? color : themeColorForeground}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="insects"
        options={{
          title: "My Collection",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="bug" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
