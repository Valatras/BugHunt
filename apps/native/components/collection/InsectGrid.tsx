import { View } from "react-native";
import { InsectCard } from "./InsectCard";

type Props = {
  insects: any[];
};

export function InsectGrid({ insects }: Props) {
  return (
    <View className="flex-row flex-wrap gap-3">
      {insects.map((insect) => (
        <InsectCard key={insect.id} insect={insect} />
      ))}
    </View>
  );
}
