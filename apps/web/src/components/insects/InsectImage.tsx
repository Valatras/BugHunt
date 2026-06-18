import { Bug } from "lucide-react";

type InsectImageProps = {
  imageKey?: string | null;
  name: string;
  size?: "sm" | "md" | "lg";
};

const IMAGE_SIZE_CLASSES = {
  sm: "h-28",
  md: "h-40",
  lg: "h-56",
} as const;

export function InsectImage({ imageKey, name, size = "md" }: InsectImageProps) {
  const imageSrc = imageKey
    ? `/insects/${encodeURIComponent(imageKey)}.webp`
    : undefined;

  return (
    <div
      className={`overflow-hidden border-b border-white/10 bg-black/10 ${IMAGE_SIZE_CLASSES[size]}`}
    >
      {imageSrc ? (
        <img src={imageSrc} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
          <Bug className="h-14 w-14 text-white/70" />
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">
            {name}
          </p>
        </div>
      )}
    </div>
  );
}
