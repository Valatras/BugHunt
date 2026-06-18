import { UserRound } from "lucide-react";

import { frontendLayout } from "@my-better-t-app/ui/lib/frontend-layout";

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
        <p className={frontendLayout.sectionEyebrow}>Chasseur</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-white">{name}</h1>
      </div>
    </div>
  );
}
