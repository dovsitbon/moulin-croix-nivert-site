import Image from "next/image";
import type { Dict } from "@/lib/i18n";
import { altOf } from "@/lib/text";
import { has, img } from "@/lib/media";
import { MillMark } from "@/components/Doodles";

const TINTS = ["bg-wheat-soft text-crust", "bg-slate-soft text-slate", "bg-cream-deep text-crust"];

/**
 * Photo de public/media, recadrée dans son cadre. Si le fichier n'existe pas encore (photo à prendre sur place,
 * voir assets/A-PHOTOGRAPHIER.md), un moulin au trait sur fond uni tient la place, avec une légende discrète :
 * aucune fausse photo.
 */
export function Pic({ src, d, sizes, className = "", priority = false, position = "center", alt, label, tint = 0 }: { src: string; d: Dict; sizes: string; className?: string; priority?: boolean; position?: string; alt?: string; label?: string; tint?: number }) {
  if (!src || !has(src))
    return (
      <div className={`flex flex-col items-center justify-center gap-2 ${TINTS[tint % TINTS.length]} ${className}`} data-photo-slot={src || "vide"} aria-hidden="true">
        <MillMark className="h-1/4 max-h-14 w-auto opacity-60" strokeWidth={1.6} />
        {label && <span className="px-4 text-center text-[0.8125rem] font-medium opacity-80">{label}</span>}
      </div>
    );
  const i = img(src);
  return (
    <div className={`zoom ${className}`}>
      <Image src={i.src} alt={alt ?? altOf(d, i.src)} width={i.width} height={i.height} sizes={sizes} quality={80} priority={priority} fetchPriority={priority ? "high" : undefined} className="h-full w-full object-cover" style={{ objectPosition: position }} />
    </div>
  );
}
