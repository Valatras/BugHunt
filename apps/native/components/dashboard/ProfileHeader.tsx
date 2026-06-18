import { Image, Text, View } from "react-native";

import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

type Props = {
  name: string;
  image?: string | null;
};

export function ProfileHeader({ name, image }: Props) {
  return (
    <View className="items-center">
      {image ? (
        <Image
          source={{ uri: image }}
          className="h-24 w-24 rounded-full border border-white/10"
        />
      ) : (
        <View className="h-24 w-24 rounded-full border border-white/10 bg-white/10 items-center justify-center">
          <Text className="text-3xl font-black text-white">
            {name[0]}
          </Text>
        </View>
      )}

      <Text className={frontendLayout.sectionEyebrow + " mt-4"}>Chasseur</Text>
      <Text className="mt-2 text-2xl font-black tracking-tight text-white">
        {name}
      </Text>
    </View>
  );
}
