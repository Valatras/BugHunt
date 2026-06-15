import { UserRound } from "lucide-react";

type Props = {
  name: string;
  image?: string | null;
};

export function ProfileHeader({ name, image }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {image ? (
        <img
          src={image}
          alt={name}
          className="h-24 w-24 rounded-full border border-white/10 object-cover shadow-lg shadow-black/20"
        />
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/10">
          <UserRound className="h-10 w-10 text-lime-300" />
        </div>
      )}

      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-white/45">
          Chasseur
        </p>
        <h1 className="mt-2 text-3xl font-black text-white">{name}</h1>
      </div>
    </div>
  );
}
