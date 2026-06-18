import { InsectCard } from "./InsectCard";

type Props = {
  insects: Array<{
    id: number;
    name: string;
    sciName?: string;
    rarity?: string | null;
    owned?: boolean;
    quantity?: number;
    imageKey?: string | null;
  }>;
};

export function InsectGrid({ insects }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {insects.map((insect) => (
        <InsectCard key={insect.id} insect={insect} />
      ))}
    </div>
  );
}
