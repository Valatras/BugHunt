import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Surface } from "heroui-native";
import { ScrollView, Text, View } from "react-native";

import { Container } from "@/components/container";
import { InsectImage } from "@/components/insects/InsectImage";
import { orpc } from "@/utils/orpc";

export default function InsectModal() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const insectId = Array.isArray(id) ? id[0] : id;
  const parsedId = Number(insectId);
  const isValidId = Boolean(insectId) && !Number.isNaN(parsedId);

  const insect = useQuery(
    orpc.insect.getDetails.queryOptions({
      input: {
        id: parsedId,
      },
      enabled: isValidId,
    }),
  );

  if (!isValidId || insect.isPending) {
    return null;
  }

  if (!insect.data) {
    return null;
  }

  const data = insect.data;

  return (
    <Container isScrollable={false}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          padding: 16,
        }}
      >
        <View className="flex-1 justify-center">
          <Surface variant="secondary" className="rounded-3xl p-5">
            <InsectImage
              imageKey={data.owned ? data.imageKey : null}
              name={data.name}
              size="lg"
            />

            <Text className="mt-4 text-xl font-bold text-foreground">
              {data.owned ? data.name : "Espèce inconnue"}
            </Text>

            <Text className="text-muted">
              {data.owned ? data.sciName : "???"}
            </Text>

            <Text className="text-foreground mt-4 font-semibold">Rareté</Text>
            <Text className="text-muted">{data.rarity}</Text>

            <Text className="text-foreground mt-4 font-semibold">Quantité</Text>
            <Text className="text-muted">{data.quantity}</Text>

            <Text className="text-foreground mt-4 font-semibold">
              Description
            </Text>
            <Text className="text-muted">
              {data.owned
                ? data.description
                : "Capturez cet insecte pour débloquer sa fiche."}
            </Text>

            <Button className="mt-6" onPress={() => router.back()}>
              <Button.Label>Fermer</Button.Label>
            </Button>
          </Surface>
        </View>
      </ScrollView>
    </Container>
  );
}
