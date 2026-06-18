import { Ionicons } from "@expo/vector-icons";
import { Card, Chip, useThemeColor } from "heroui-native";
import {
  Text,
  View,
  Pressable,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

interface InsectCardItem {
  id: number;
  name: string;
  rarity?: string;
}

interface FeaturedInsectsSectionProps {
  insects?: InsectCardItem[];
  isLoading: boolean;
  onInsectPress?: (id: number) => void;
}

function InsectCard({
  insect,
  onPress,
}: {
  insect: InsectCardItem;
  onPress?: (id: number) => void;
}) {
  const foregroundColor = useThemeColor("foreground");

  return (
    <Pressable
      onPress={() => onPress?.(insect.id)}
      className="active:opacity-80"
    >
      <Card
        className={[frontendLayout.cardSurface, "overflow-hidden p-0"].join(
          " ",
        )}
      >
        {/* Image Placeholder */}
        <View
          className="h-40 items-center justify-center border-b border-white/10"
          style={{
            backgroundColor: "rgba(163,230,53,0.08)",
          }}
        >
          <Ionicons name="bug-sharp" size={56} color={foregroundColor} />
        </View>

        {/* Info */}
        <View className="p-4">
          <Text
            className="mb-2 text-sm font-semibold text-white"
            numberOfLines={1}
          >
            {insect.name}
          </Text>
          {insect.rarity && (
            <Chip variant="secondary" color="accent">
              <Chip.Label className="text-xs">{insect.rarity}</Chip.Label>
            </Chip>
          )}
        </View>
      </Card>
    </Pressable>
  );
}

export function FeaturedInsectsSection({
  insects = [],
  isLoading,
  onInsectPress,
}: FeaturedInsectsSectionProps) {
  const { width } = useWindowDimensions();
  const mutedColor = useThemeColor("muted");
  const foregroundColor = useThemeColor("foreground");

  // Determine layout based on screen width
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  if (isLoading) {
    return (
      <View className="mb-8">
        <SectionHeader
          eyebrow="Vedettes"
          title="Insectes en vedette"
          description="Découvrez les derniers ajouts à notre collection"
        />
        <View
          className={
            frontendLayout.cardSurface + " mt-6 w-full items-center py-8"
          }
        >
          <Ionicons name="hourglass-outline" size={32} color={mutedColor} />
          <Text className="mt-2 text-white/60">Chargement...</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="mb-8">
      <View className="px-6">
        <SectionHeader
          eyebrow="Vedettes"
          title="Insectes en vedette"
          description="Découvrez les derniers ajouts à notre collection"
        />
      </View>

      {/* Mobile: Horizontal Carousel */}
      {isMobile && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={insects}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
          scrollEventThrottle={16}
          snapToInterval={width * 0.8}
          decelerationRate="fast"
          renderItem={({ item }) => (
            <View style={{ width: width * 0.8 }}>
              <InsectCard insect={item} onPress={onInsectPress} />
            </View>
          )}
        />
      )}

      {/* Tablet & Desktop: Grid Layout */}
      {!isMobile && (
        <View className="px-6">
          <View
            className={`flex-row flex-wrap ${isTablet ? "gap-3" : "gap-4"}`}
          >
            {insects.map((insect) => (
              <View
                key={insect.id}
                className={`${isTablet ? "w-[calc(50%-6px)]" : "w-[calc(25%-12px)]"}`}
              >
                <InsectCard insect={insect} onPress={onInsectPress} />
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Empty State */}
      {insects.length === 0 && !isLoading && (
        <View
          className={frontendLayout.emptyState + " mx-6 mt-6 items-center py-8"}
        >
          <Ionicons name="bug" size={32} color={mutedColor} />
          <Text className="mt-2 text-white/60">
            Aucun insecte en vedette pour le moment
          </Text>
        </View>
      )}
    </View>
  );
}
