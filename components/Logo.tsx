// Logo typographique du Moulin de la Croix Nivert (l'enseigne de la façade est une simple écriture script,
// sans logo dessiné) : un moulin à vent au trait, « LE MOULIN » en capitales à empattements,
// « de la Croix Nivert · Boulangerie » en petit. Fichiers SVG complets et favicon : « npm run logo ».
import { MillMark } from "@/components/Doodles";

/** Logo horizontal de l'en-tête. */
export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${light ? "text-paper" : "text-slate"} ${className}`}>
      <MillMark className={`h-10 w-10 md:h-11 md:w-11 ${light ? "text-wheat" : "text-crust"}`} strokeWidth={2.2} />
      <span className="flex flex-col leading-none">
        <span className="font-[family-name:var(--font-display)] text-[1.375rem] font-semibold tracking-[0.12em] md:text-[1.5rem]">LE MOULIN</span>
        <span className={`mt-1 text-[0.625rem] font-medium tracking-[0.14em] whitespace-nowrap ${light ? "text-wheat-soft" : "text-crust"}`}>de la Croix Nivert · Boulangerie</span>
      </span>
    </span>
  );
}

/** Version empilée, centrée, pour le pied de page et l'affichette. */
export function LogoStacked({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center text-center ${className}`}>
      <MillMark className="h-16 w-16 text-wheat" strokeWidth={1.8} />
      <span className="mt-2 font-[family-name:var(--font-display)] text-[1.75rem] font-semibold tracking-[0.14em]">LE MOULIN</span>
      <span className="mt-1 text-[0.6875rem] font-medium tracking-[0.16em] text-wheat-soft">de la Croix Nivert · Boulangerie</span>
    </span>
  );
}
