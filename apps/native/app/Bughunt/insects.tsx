import { ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { Container } from "@/components/container";
import { orpc } from "@/utils/orpc";

import { CollectionHeader } from "@/components/collection/CollectionHeader";
import { InsectGrid } from "@/components/collection/InsectGrid";

export default function CollectionScreen() {
  const collection = useQuery(orpc.insect.getCollection.queryOptions());

  const data = collection.data ?? [];

  const discovered = data.filter((i) => i.owned).length;

  const total = data.length;

  const completion = total > 0 ? Math.round((discovered / total) * 100) : 0;

  return (
    <Container>
      <ScrollView
        className="flex-1 bg-green-900"
        contentContainerStyle={{
          padding: 16,
          gap: 16,
        }}
      >
        <CollectionHeader
          discovered={discovered}
          total={total}
          completion={completion}
        />

        <InsectGrid insects={data} />
      </ScrollView>
    </Container>
  );
}
