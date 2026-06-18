import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Card, Chip, useThemeColor } from "heroui-native";
import { Text, View, Pressable } from "react-native";

import { Container } from "@/components/container";
import { SignIn } from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";
import { authClient } from "@/lib/auth-client";
import { queryClient, orpc } from "@/utils/orpc";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

export default function server_tools() {
  const healthCheck = useQuery(orpc.healthCheck.queryOptions());
  const privateData = useQuery(orpc.privateData.queryOptions());
  const isConnected = healthCheck?.data === "OK";
  const isLoading = healthCheck?.isLoading;
  const { data: session } = authClient.useSession();

  const mutedColor = useThemeColor("muted");
  const successColor = useThemeColor("success");
  const dangerColor = useThemeColor("danger");
  const foregroundColor = useThemeColor("foreground");

  return (
    <Container className="p-6">
      <View className="mb-6 py-4">
        <Text className="mb-2 text-4xl font-black tracking-tight text-white">
          BETTER T STACK
        </Text>
      </View>

      {session?.user ? (
        <Card className={[frontendLayout.cardSurface, "mb-6 p-4"].join(" ")}>
          <Text className="mb-2 text-base text-white">
            Welcome, <Text className="font-medium">{session.user.name}</Text>
          </Text>
          <Text className="mb-4 text-sm text-white/60">{session.user.email}</Text>
          <Pressable
            className="self-start rounded-2xl bg-rose-500 px-4 py-3 active:opacity-70"
            onPress={() => {
              authClient.signOut();
              queryClient.invalidateQueries();
            }}
          >
            <Text className="font-medium text-white">Sign Out</Text>
          </Pressable>
        </Card>
      ) : null}

      <Card className={[frontendLayout.cardSurface, "p-6"].join(" ")}>
        <View className="mb-4 flex-row items-center justify-between">
          <Card.Title>System Status</Card.Title>
          <Chip
            variant="secondary"
            color={isConnected ? "success" : "danger"}
            size="sm"
          >
            <Chip.Label>{isConnected ? "LIVE" : "OFFLINE"}</Chip.Label>
          </Chip>
        </View>

        <Card className={[frontendLayout.cardSurfaceMuted, "p-4"].join(" ")}>
          <View className="flex-row items-center">
            <View
              className={`mr-3 h-3 w-3 rounded-full ${isConnected ? "bg-lime-300" : "bg-white/30"}`}
            />
            <View className="flex-1">
              <Text className="mb-1 font-medium text-white">
                ORPC Backend
              </Text>
              <Card.Description>
                {isLoading
                  ? "Checking connection..."
                  : isConnected
                    ? "Connected to API"
                    : "API Disconnected"}
              </Card.Description>
            </View>
            {isLoading && (
              <Ionicons name="hourglass-outline" size={20} color={mutedColor} />
            )}
            {!isLoading && isConnected && (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={successColor}
              />
            )}
            {!isLoading && !isConnected && (
              <Ionicons name="close-circle" size={20} color={dangerColor} />
            )}
          </View>
        </Card>
      </Card>

      <Card className={[frontendLayout.cardSurface, "mt-6 p-4"].join(" ")}>
        <Card.Title className="mb-3">Private Data</Card.Title>
        {privateData && (
          <Card.Description>{privateData.data?.message}</Card.Description>
        )}
      </Card>

      {!session?.user && (
        <>
          <SignIn />
          <SignUp />
        </>
      )}
    </Container>
  );
}
