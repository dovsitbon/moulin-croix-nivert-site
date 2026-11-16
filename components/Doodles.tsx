// Petits dessins au trait de la maison : le moulin à vent du logo, l'épi de blé, la baguette, le croissant,
// la boîte à gâteau, l'horloge. Toujours en currentColor, trait arrondi.

type P = { className?: string };
const line = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

/** Moulin à vent, boîte 64 × 64 : la tour, le toit, la porte, et les quatre ailes autour du moyeu (32, 24).
 *  Mêmes tracés que scripts/draw.mjs. */
export const MILL_TOWER = "M23 58 27.2 30h9.6L41 58M17 58h30";
export const MILL_ROOF = "M25.6 30 32 21.5 38.4 30";
export const MILL_DOOR = "M29.4 58v-5.2a2.6 2.6 0 0 1 5.2 0V58M32 37.6v.1";
/** Une aile (vers le haut), répétée quatre fois à 45°, 135°, 225°, 315°. */
export const MILL_SAIL = "M32 22V5M32 6.5h5.2v13H32M32 11h5.2M32 15.2h5.2";
export const SAIL_ANGLES = [45, 135, 225, 315];

export function MillSails({ strokeWidth }: { strokeWidth?: number }) {
  return (
    <>
      {SAIL_ANGLES.map((a) => (
        <path key={a} d={MILL_SAIL} transform={`rotate(${a} 32 24)`} strokeWidth={strokeWidth} />
      ))}
      <circle cx="32" cy="24" r="1.7" />
    </>
  );
}

export const MillMark = ({ className = "h-10 w-10", strokeWidth = 2 }: P & { strokeWidth?: number }) => (
  <svg viewBox="0 0 64 64" className={className} {...line} strokeWidth={strokeWidth}>
    <path d={MILL_TOWER} />
    <path d={MILL_ROOF} />
    <path d={MILL_DOOR} />
    <MillSails />
  </svg>
);

/** Épi de blé. */
export const Wheat = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...line} strokeWidth={1.6}>
    <path d="M16 29V7" />
    <path d="M16 9c-2.2-1-3.2-3-3-5.3 2.2.6 3.4 2.6 3 5.3Zm0 0c2.2-1 3.2-3 3-5.3-2.2.6-3.4 2.6-3 5.3Z" />
    <path d="M16 14.5c-2.6-.8-4-2.9-4-5.4 2.5.5 4 2.6 4 5.4Zm0 0c2.6-.8 4-2.9 4-5.4-2.5.5-4 2.6-4 5.4Z" />
    <path d="M16 20c-2.6-.8-4-2.9-4-5.4 2.5.5 4 2.6 4 5.4Zm0 0c2.6-.8 4-2.9 4-5.4-2.5.5-4 2.6-4 5.4Z" />
  </svg>
);

/** Baguette en biais, avec ses coups de lame. */
export const Baguette = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...line} strokeWidth={1.6}>
    <path d="M5.2 26.8c-1.7-1.7-.9-4.6 1.7-7.2L19.6 6.9c2.6-2.6 5.5-3.4 7.2-1.7s.9 4.6-1.7 7.2L12.4 25.1c-2.6 2.6-5.5 3.4-7.2 1.7Z" />
    <path d="m10.8 18.4 2.6 1.6M15 14.2l2.6 1.6M19.2 10l2.6 1.6" />
  </svg>
);

export const Croissant = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...line} strokeWidth={1.6}>
    <path d="M4 20.5c1.5-6.5 6.2-10.5 12-10.5s10.5 4 12 10.5c-2.2 1.3-4.6 1.1-6.2-.6-.9 2.4-3.2 3.6-5.8 3.6s-4.9-1.2-5.8-3.6c-1.6 1.7-4 1.9-6.2.6Z" />
    <path d="M10.2 19.9c.6-3 2-5.4 3.8-7M21.8 19.9c-.6-3-2-5.4-3.8-7M16 23.5V10" />
  </svg>
);

/** Boîte à gâteau nouée. */
export const CakeBox = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...line} strokeWidth={1.6}>
    <path d="M6 13h20v13H6zM5 9h22v4H5z" />
    <path d="M16 9v17M16 9c-2-3.6-6.2-4.4-6.2-1.9C9.8 8.6 13 9 16 9Zm0 0c2-3.6 6.2-4.4 6.2-1.9 0 1.5-3.2 1.9-6.2 1.9Z" />
  </svg>
);

export const Clock = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...line} strokeWidth={1.6}>
    <circle cx="16" cy="16" r="11.5" />
    <path d="M16 9v7l4.5 3" />
  </svg>
);

/** Séparateur discret : un trait, un épi, un trait. */
export function WheatRule({ className = "" }: P) {
  return (
    <div className={`flex items-center gap-3 text-wheat ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-current opacity-50" />
      <Wheat className="h-5 w-5" />
      <span className="h-px flex-1 bg-current opacity-50" />
    </div>
  );
}
