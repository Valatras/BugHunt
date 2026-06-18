import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useThemeColor } from "heroui-native";
import { Text, View } from "react-native";

type InsectImageProps = {
  imageKey?: string | null;
  name: string;
  size?: "sm" | "md" | "lg";
};

const IMAGE_SOURCES: Record<string, number> = {
  "abeille-domestique": require("../../assets/images/insects/abeille-domestique.webp"),
  "bourdon-terrestre": require("../../assets/images/insects/bourdon-terrestre.webp"),
  coccinelle: require("../../assets/images/insects/coccinelle.webp"),
  "criquet-migrateur": require("../../assets/images/insects/criquet-migrateur.webp"),
  "fourmi-noire": require("../../assets/images/insects/fourmi-noire.webp"),
  gendarme: require("../../assets/images/insects/gendarme.webp"),
  "libellule-bleue": require("../../assets/images/insects/libellule-bleue.webp"),
  "mouche-domestique": require("../../assets/images/insects/mouche-domestique.webp"),
  "papillon-monarque": require("../../assets/images/insects/papillon-monarque.webp"),
};

const IMAGE_SIZE_CLASSES = {
  sm: "h-28",
  md: "h-40",
  lg: "h-56",
} as const;

export function InsectImage({ imageKey, name, size = "md" }: InsectImageProps) {
  const foregroundColor = useThemeColor("foreground");
  const imageSource = imageKey ? IMAGE_SOURCES[imageKey] : undefined;

  if (!imageSource) {
    return (
      <View
        className={[
          "items-center justify-center border-b border-white/10",
          IMAGE_SIZE_CLASSES[size],
        ].join(" ")}
        style={{ backgroundColor: "rgba(163,230,53,0.08)" }}
      >
        <Ionicons
          name="bug-sharp"
          size={size === "lg" ? 72 : 56}
          color={foregroundColor}
        />
        <Text className="mt-2 text-xs uppercase tracking-[0.24em] text-white/45">
          {name}
        </Text>
      </View>
    );
  }

  return (
    <View
      className={[
        "overflow-hidden border-b border-white/10",
        IMAGE_SIZE_CLASSES[size],
      ].join(" ")}
    >
      <Image
        source={imageSource}
        contentFit="cover"
        transition={150}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}
