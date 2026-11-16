"use client";

import { useEffect, useState } from "react";
import { MILL_DOOR, MILL_ROOF, MILL_SAIL, MILL_TOWER, SAIL_ANGLES } from "@/components/Doodles";

/**
 * Effet d'ouverture (1,2 s, une fois par session) : fond crème, un moulin à vent se dessine au trait doré,
 * ses ailes font un tour, « LE MOULIN » puis « BOULANGERIE · CROIX NIVERT », fondu sur le hero.
 * Styles dans globals.css (.intro-*). Masqué d'office si déjà vu ou si l'utilisateur préfère réduire les animations.
 */
export function Intro({ skipLabel, tagline }: { skipLabel: string; tagline: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem("moulin-intro", "1");
    } catch {}
    const t = setTimeout(() => setGone(true), 1250);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;
  return (
    <div className="intro-curtain">
      <svg viewBox="0 0 64 64" className="h-28 w-28 text-wheat md:h-32 md:w-32" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path className="intro-draw" d={MILL_TOWER} pathLength={1} />
        <path className="intro-draw" d={MILL_ROOF} pathLength={1} />
        <path className="intro-draw" d={MILL_DOOR} pathLength={1} />
        <g className="intro-sails">
          {SAIL_ANGLES.map((a) => (
            <path key={a} d={MILL_SAIL} transform={`rotate(${a} 32 24)`} />
          ))}
          <circle cx="32" cy="24" r="1.7" />
        </g>
      </svg>
      <p className="intro-word mt-5 font-[family-name:var(--font-display)] text-[2.25rem] font-semibold tracking-[0.14em] text-slate md:text-[2.75rem]" aria-hidden="true">
        LE MOULIN
      </p>
      <p className="intro-word intro-word-2 mt-1 text-[0.75rem] font-medium tracking-[0.32em] text-crust" aria-hidden="true">
        {tagline}
      </p>
      <button type="button" onClick={() => setGone(true)} className="absolute end-5 bottom-5 min-h-11 px-3 text-sm text-muted underline underline-offset-4">
        {skipLabel}
      </button>
    </div>
  );
}
