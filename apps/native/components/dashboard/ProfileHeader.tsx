import { Image, Text, View } from "react-native";

type Props = {
  name: string;
  image?: string | null;
};

export function ProfileHeader({ name, image }: Props) {
  return (
    <View className="items-center">
      {image ? (
        <Image source={{ uri: image }} className="h-24 w-24 rounded-full" />
      ) : (
        <View className="h-24 w-24 rounded-full bg-zinc-800 items-center justify-center">
          <Text className="text-3xl font-bold text-white">{name[0]}</Text>
        </View>
      )}

      <Text className="mt-4 text-2xl font-bold text-white">{name}</Text>
    </View>
  );
}
