import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Chip,
  useThemeColor,
  Surface,
  TextField,
  Input,
} from "heroui-native";
import { Text, View, Pressable } from "react-native";

import { Container } from "@/components/container";
import { SignIn } from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";
import { authClient } from "@/lib/auth-client";
import { queryClient, orpc } from "@/utils/orpc";

import { ScrollView, Image } from "react-native";
import { useState } from "react";

export default function Home() {
  const healthCheck = useQuery(orpc.healthCheck.queryOptions());
  const isConnected = healthCheck?.data === "OK";
  const isLoading = healthCheck?.isLoading;

  const { data: session } = authClient.useSession();
  const privateData = useQuery(
    orpc.privateData.queryOptions({
      enabled: !!session?.user,
    }),
  );

  const mutedColor = useThemeColor("muted");
  const successColor = useThemeColor("success");
  const dangerColor = useThemeColor("danger");
  const foregroundColor = useThemeColor("foreground");
  const [newInsect, setNewInsect] = useState({ name: "", Sci_Name: "" });
  const insects = useQuery(orpc.insect.getAll.queryOptions());

  const [showAuth, setShowAuth] = useState(false);

  return (
    <ScrollView className="flex-1 bg-background">
      {/* SECTION HERO - Bannière principale */}
      <View className="relative h-96 bg-primary/10">
        {/* Vous pouvez ajouter une image de fond ici */}
        <View className="absolute inset-0 bg-linear-to-b from-primary/20 to-background" />

        <Container className="h-full justify-center items-center px-6">
          {/* Logo ou icône d'insecte */}
          <View className="mb-6 bg-primary/20 p-6 rounded-full">
            <Ionicons name="bug" size={64} color={foregroundColor} />
          </View>

          <Text className="text-5xl font-bold text-foreground text-center mb-4">
            Bughunt
          </Text>

          <Text className="text-xl text-muted text-center mb-8 max-w-md">
            Découvrez, collectionnez et apprenez tout sur le fascinant monde des
            insectes
          </Text>

          {session?.user ? (
            <Pressable
              className="bg-primary py-4 px-8 rounded-full active:opacity-80 flex-row items-center"
              onPress={() => {
                /* Navigation vers la collection */
              }}
            >
              <Ionicons
                name="grid"
                size={20}
                color={foregroundColor}
                style={{ marginRight: 8 }}
              />
              <Text className="text-foreground font-semibold text-lg">
                Ma Collection
              </Text>
            </Pressable>
          ) : (
            <Pressable
              className="bg-primary py-4 px-8 rounded-full active:opacity-80"
              onPress={() => setShowAuth(true)}
            >
              <Text className="text-foreground font-semibold text-lg">
                Commencer l'aventure
              </Text>
            </Pressable>
          )}
        </Container>
      </View>

      <Container className="px-6 py-8">
        {/* SECTION STATISTIQUES - Si connecté */}
        {session?.user && (
          <Card variant="secondary" className="mb-8 p-6">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-foreground text-2xl font-bold mb-1">
                  Bienvenue, {session.user.name}!
                </Text>
                <Text className="text-muted text-sm">
                  Continuez votre exploration
                </Text>
              </View>
              <Pressable
                className="bg-danger/20 p-2 rounded-lg active:opacity-70"
                onPress={() => authClient.signOut()}
              >
                <Ionicons name="log-out-outline" size={24} color="#ef4444" />
              </Pressable>
            </View>

            {/* Statistiques de collection */}
            <View className="flex-row justify-between mt-4">
              <View className="flex-1 items-center bg-background p-4 rounded-lg mr-2">
                <Ionicons name="trophy" size={28} color={successColor} />
                <Text className="text-2xl font-bold text-foreground mt-2">
                  24
                </Text>
                <Text className="text-muted text-sm">Collectés</Text>
              </View>

              <View className="flex-1 items-center bg-background p-4 rounded-lg mx-2">
                <Ionicons name="book" size={28} color={foregroundColor} />
                <Text className="text-2xl font-bold text-foreground mt-2">
                  156
                </Text>
                <Text className="text-muted text-sm">Total</Text>
              </View>

              <View className="flex-1 items-center bg-background p-4 rounded-lg ml-2">
                <Ionicons name="star" size={28} color="#fbbf24" />
                <Text className="text-2xl font-bold text-foreground mt-2">
                  15%
                </Text>
                <Text className="text-muted text-sm">Complété</Text>
              </View>
            </View>
          </Card>
        )}

        {/* SECTION INSECTES EN VEDETTE */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-3xl font-bold text-foreground">
              Insectes en vedette
            </Text>
            <Chip variant="secondary" color="accent" size="sm">
              <Chip.Label>Nouveautés</Chip.Label>
            </Chip>
          </View>

          <Text className="text-muted mb-6">
            Découvrez les derniers ajouts à notre collection
          </Text>

          {/* Grid d'insectes en vedette - Remplacer "insects" par "featuredInsects" après avoir ajouter la fonctionnalité */}
          <View className="flex-row flex-wrap -mx-2">
            {insects.isLoading ? (
              <View className="w-full items-center py-8">
                <Ionicons
                  name="hourglass-outline"
                  size={32}
                  color={mutedColor}
                />
                <Text className="text-muted mt-2">Chargement...</Text>
              </View>
            ) : (
              // Exemples d'insectes (à remplacer par vos vraies données)
              //[
              // {
              //   id: 1,
              //   name: "Coccinelle à 7 points",
              //   rarity: "Commun",
              //   icon: "ellipse",
              // },
              // {
              //   id: 2,
              //   name: "Papillon Monarque",
              //   rarity: "Rare",
              //   icon: "heart",
              // },
              // {
              //   id: 3,
              //   name: "Scarabée doré",
              //   rarity: "Épique",
              //   icon: "diamond",
              // },
              // {
              //   id: 4,
              //   name: "Mante religieuse",
              //   rarity: "Rare",
              //   icon: "flash",
              // },
              //]
              insects?.data?.map((insect) => (
                <View key={insect.id} className="w-1/2 px-2 mb-4">
                  <Card className="overflow-hidden active:opacity-80">
                    <Pressable
                      onPress={() => {
                        /* Ouvrir la fiche de l'insecte */
                      }}
                    >
                      {/* Image de l'insecte (placeholder) */}
                      <View className="bg-linear-to-br from-primary/20 to-success/20 h-40 items-center justify-center">
                        <Ionicons
                          name="bug-sharp"
                          size={64}
                          color={foregroundColor}
                        />
                      </View>

                      {/* Info de l'insecte */}
                      <View className="p-3">
                        <Text
                          className="text-foreground font-semibold mb-1"
                          numberOfLines={1}
                        >
                          {insect.name}
                        </Text>
                        <Chip
                        // size="sm"
                        // variant="secondary"
                        // color={
                        //   insect.rarity === "Commun"
                        //     ? "default"
                        //     : insect.rarity === "Rare"
                        //       ? "accent"
                        //       : "success"
                        // }
                        >
                          <Chip.Label className="text-xs"></Chip.Label>
                        </Chip>
                      </View>
                    </Pressable>
                  </Card>
                </View>
              ))
            )}
          </View>
        </View>

        {/* SECTION FONCTIONNALITÉS */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-foreground mb-6">
            Fonctionnalités
          </Text>

          {/* Fiches descriptives */}
          <Card variant="secondary" className="mb-4 p-5">
            <View className="flex-row items-start">
              <View className="bg-primary/20 p-3 rounded-full mr-4">
                <Ionicons
                  name="document-text"
                  size={28}
                  color={foregroundColor}
                />
              </View>
              <View className="flex-1">
                <Text className="text-foreground text-lg font-semibold mb-2">
                  Fiches détaillées
                </Text>
                <Text className="text-muted">
                  Chaque insecte possède une fiche complète avec des
                  informations scientifiques, son habitat, son régime
                  alimentaire et bien plus encore.
                </Text>
              </View>
            </View>
          </Card>

          {/* Collection personnalisée */}
          <Card variant="secondary" className="mb-4 p-5">
            <View className="flex-row items-start">
              <View className="bg-success/20 p-3 rounded-full mr-4">
                <Ionicons name="albums" size={28} color={successColor} />
              </View>
              <View className="flex-1">
                <Text className="text-foreground text-lg font-semibold mb-2">
                  Votre collection
                </Text>
                <Text className="text-muted">
                  Collectionnez vos insectes préférés, suivez votre progression
                  et débloquez des badges spéciaux en complétant des catégories.
                </Text>
              </View>
            </View>
          </Card>

          {/* Apprentissage ludique */}
          <Card variant="secondary" className="mb-4 p-5">
            <View className="flex-row items-start">
              <View className="bg-warning/20 p-3 rounded-full mr-4">
                <Ionicons name="school" size={28} color="#fbbf24" />
              </View>
              <View className="flex-1">
                <Text className="text-foreground text-lg font-semibold mb-2">
                  Apprentissage ludique
                </Text>
                <Text className="text-muted">
                  Découvrez des faits fascinants, participez à des quiz et
                  devenez un expert en entomologie de manière amusante.
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* SECTION CATÉGORIES D'INSECTES */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-foreground mb-6">
            Explorer par catégorie
          </Text>

          <View className="flex-row flex-wrap -mx-2">
            {[
              { name: "Papillons", icon: "rose", color: "#ec4899" },
              { name: "Coléoptères", icon: "shield", color: "#8b5cf6" },
              { name: "Abeilles", icon: "cellular", color: "#f59e0b" },
              { name: "Libellules", icon: "water", color: "#06b6d4" },
            ].map((category, index) => (
              <View key={index} className="w-1/2 px-2 mb-4">
                <Card className="overflow-hidden">
                  <Pressable
                    className="p-6 items-center active:opacity-80"
                    style={{ backgroundColor: `${category.color}15` }}
                  >
                    <Ionicons
                      name={category.icon as any}
                      size={40}
                      color={category.color}
                    />
                    <Text className="text-foreground font-semibold mt-3">
                      {category.name}
                    </Text>
                  </Pressable>
                </Card>
              </View>
            ))}
          </View>
        </View>

        {/* SECTION CALL TO ACTION - Si non connecté */}
        {!session?.user && (
          <Card variant="secondary" className="mb-8 p-8 items-center">
            <Ionicons name="rocket" size={48} color={foregroundColor} />
            <Text className="text-foreground text-2xl font-bold mt-4 mb-2 text-center">
              Prêt à commencer?
            </Text>
            <Text className="text-muted text-center mb-6">
              Créez votre compte gratuitement et commencez votre collection dès
              aujourd'hui
            </Text>
            <Pressable
              className="bg-primary py-3 px-8 rounded-full active:opacity-80"
              onPress={() => setShowAuth(true)}
            >
              <Text className="text-foreground font-semibold text-base">
                Créer un compte
              </Text>
            </Pressable>
          </Card>
        )}

        {/* SECTION AUTHENTIFICATION - Modal toggle */}
        {showAuth && !session?.user && (
          <View className="mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-2xl font-bold text-foreground">
                Authentification
              </Text>
              <Pressable
                onPress={() => setShowAuth(false)}
                className="bg-muted/20 p-2 rounded-full"
              >
                <Ionicons name="close" size={24} color={foregroundColor} />
              </Pressable>
            </View>

            <SignIn />
            <View className="my-4" />
            <SignUp />
          </View>
        )}
      </Container>

      {/* FOOTER */}
      <View className="bg-muted/10 py-8 mt-8">
        <Container className="px-6">
          <View className="items-center">
            <Ionicons
              name="bug"
              size={32}
              color={foregroundColor}
              className="mb-3"
            />
            <Text className="text-foreground font-semibold text-lg mb-2">
              Bughunt
            </Text>
            <Text className="text-muted text-sm text-center mb-4">
              Votre guide interactif du monde des insectes
            </Text>
            <Text className="text-muted text-xs">
              © 2025 - Tous droits réservés
            </Text>
          </View>
        </Container>
      </View>
    </ScrollView>
  );
}
