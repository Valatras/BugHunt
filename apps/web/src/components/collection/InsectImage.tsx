import { useMemo } from "react";

type InsectImageProps = {
  imageKey?: string | null;
  name: string;
  size?: "sm" | "md" | "lg";
};

const IMAGE_SOURCES: Record<string, string> = {
  "abeille-domestique": "../../packages/db/prisma/assets",
  "bourdon-terrestre": "/insects/bourdon-terrestre.webp",
  coccinelle: "/insects/coccinelle.webp",
  "criquet-migrateur": "/insects/criquet-migrateur.webp",
  "fourmi-noire": "/insects/fourmi-noire.webp",
  gendarme: "/insects/gendarme.webp",
  "libellule-bleue": "/insects/libellule-bleue.webp",
  "mouche-domestique": "/insects/mouche-domestique.webp",
  "papillon-monarque": "/insects/papillon-monarque.webp",
};

const IMAGE_SIZE_CLASSES: Record<
  NonNullable<InsectImageProps["size"]>,
  string
> = {
  sm: "h-28",
  md: "h-40",
  lg: "h-56",
};

export function InsectImage({ imageKey, name, size = "md" }: InsectImageProps) {
  const imageSrc = useMemo(() => {
    if (!imageKey) return null;
    return IMAGE_SOURCES[imageKey] ?? null;
  }, [imageKey]);

  const heightClass = IMAGE_SIZE_CLASSES[size];

  if (!imageSrc) {
    return (
      <div
        className={`flex flex-col items-center justify-center border-b border-white/10 ${heightClass}`}
        style={{ backgroundColor: "rgba(163,230,53,0.08)" }}
      >
        <svg
          width={size === "lg" ? 72 : 56}
          height={size === "lg" ? 72 : 56}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M20 13a8 8 0 1 0-16 0" />
          <path d="M12 21V13" />
          <path d="M8 21h8" />
        </svg>

        <p className="mt-2 text-xs uppercase tracking-[0.24em] text-white/45">
          {name}
        </p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden border-b border-white/10 ${heightClass}`}>
      <img
        src={imageSrc}
        alt={name}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
