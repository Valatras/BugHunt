import { useQuery } from "@tanstack/react-query";

import { Container } from "@/components/container";
import { orpc } from "@/utils/orpc";

import { CollectionHeader } from "@/components/collection/CollectionHeader";
import { InsectGrid } from "@/components/collection/InsectGrid";
import { useCollectionSummary } from "hooks";

export default function CollectionScreen() {
  const collection = useQuery(orpc.insect.getCollection.queryOptions());

  const data = collection.data ?? [];
  const { discovered, total, completion } = useCollectionSummary(data);

  return (
    <Container contentContainerClassName="p-4 gap-4">
      <CollectionHeader
        discovered={discovered}
        total={total}
        completion={completion}
      />

      <InsectGrid insects={data} />
    </Container>
  );
}
