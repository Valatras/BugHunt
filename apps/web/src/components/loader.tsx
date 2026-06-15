import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75 shadow-lg shadow-black/20">
        <Loader2 className="h-4 w-4 animate-spin text-lime-300" />
        Chargement de l'univers Bughunt...
      </div>
    </div>
  );
}
