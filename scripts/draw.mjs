// Outils de dessin partagés par les scripts (logo, image de partage, affichette) :
// texte converti en tracés (aucune police à installer), le moulin du logo, l'épi de blé.
import { readFile } from "node:fs/promises";
import path from "node:path";
import opentype from "opentype.js";

export const ROOT = path.resolve(import.meta.dirname, "..");
// Charte : ardoise sombre de la façade, crème, blé doré, brun croûte, rouge des croissants framboise.
export const C = {
  cream: "#FBF6EC",
  creamDeep: "#F3E9D8",
  paper: "#FFFCF6",
  slate: "#2F3E4E",
  slateDeep: "#222D39",
  wheat: "#D4A24C",
  wheatSoft: "#F5E8CB",
  crust: "#6B3E26",
  red: "#B23A2E",
  ink: "#2A211C",
  muted: "#5E5148",
};

async function load(file) {
  const buf = await readFile(path.join(ROOT, "node_modules", file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

export const fonts = {
  display: await load("@fontsource/fraunces/files/fraunces-latin-500-normal.woff"),
  displaySemi: await load("@fontsource/fraunces/files/fraunces-latin-600-normal.woff"),
  text: await load("@fontsource/inter/files/inter-latin-400-normal.woff"),
  medium: await load("@fontsource/inter/files/inter-latin-500-normal.woff"),
  bold: await load("@fontsource/inter/files/inter-latin-600-normal.woff"),
};

/** Largeur d'un texte, interlettrage compris (tracking en em). */
export function width(font, text, size, tracking = 0) {
  return font.getAdvanceWidth(text, size) + tracking * size * (text.length - 1);
}

/** Texte en tracés SVG. anchor : start | middle | end. tracking en em. */
export function text(font, str, x, y, size, { fill = C.ink, anchor = "start", tracking = 0 } = {}) {
  const w = width(font, str, size, tracking);
  let cursor = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  let d = "";
  for (const ch of str) {
    d += font.getPath(ch, cursor, y, size).toPathData(2);
    cursor += font.getAdvanceWidth(ch, size) + tracking * size;
  }
  return `<path d="${d}" fill="${fill}"/>`;
}

/** Texte en arc au-dessus d'un centre (cx, cy), rayon r (ligne de base), centré sur le haut du cercle. */
export function arcText(font, str, cx, cy, r, size, { fill = C.cream, tracking = 0 } = {}) {
  const total = width(font, str, size, tracking);
  let s = -total / 2;
  let out = "";
  for (const ch of str) {
    const adv = font.getAdvanceWidth(ch, size);
    const mid = s + adv / 2;
    const angle = mid / r; // radians, 0 = haut du cercle
    const x = cx + r * Math.sin(angle);
    const y = cy - r * Math.cos(angle);
    const glyph = font.getPath(ch, -adv / 2, 0, size).toPathData(2);
    out += `<path d="${glyph}" fill="${fill}" transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${((angle * 180) / Math.PI).toFixed(2)})"/>`;
    s += adv + tracking * size;
  }
  return out;
}

// Le moulin à vent du logo, boîte 64 × 64 (mêmes tracés que components/Doodles.tsx).
const MILL = ["M23 58 27.2 30h9.6L41 58M17 58h30", "M25.6 30 32 21.5 38.4 30", "M29.4 58v-5.2a2.6 2.6 0 0 1 5.2 0V58M32 37.6v.1"];
const SAIL = "M32 22V5M32 6.5h5.2v13H32M32 11h5.2M32 15.2h5.2";

/** Moulin au trait en (x, y), taille s (côté de la boîte). */
export function mill(x, y, s, { stroke = C.crust, width = 2 } = {}) {
  const k = s / 64;
  const sails = [45, 135, 225, 315].map((a) => `<path d="${SAIL}" transform="rotate(${a} 32 24)"/>`).join("");
  return `<g transform="translate(${x} ${y}) scale(${k})" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${MILL.map((d) => `<path d="${d}"/>`).join("")}${sails}<circle cx="32" cy="24" r="1.7"/></g>`;
}

/** Logo horizontal : moulin + « LE MOULIN » + « de la Croix Nivert · Boulangerie ». x = gauche, y = haut, h = hauteur du moulin. */
export function wordmark(x, y, h, { mark = C.crust, word = C.slate, sub = C.crust } = {}) {
  const size = h * 0.5;
  return [
    mill(x, y, h, { stroke: mark, width: 2.2 }),
    text(fonts.displaySemi, "LE MOULIN", x + h * 1.02, y + h * 0.58, size, { fill: word, tracking: 0.12 }),
    text(fonts.medium, "de la Croix Nivert · Boulangerie", x + h * 1.04, y + h * 0.86, size * 0.36, { fill: sub, tracking: 0.12 }),
  ].join("");
}

export const wordmarkWidth = (h) => h * 1.02 + Math.max(width(fonts.displaySemi, "LE MOULIN", h * 0.5, 0.12), width(fonts.medium, "de la Croix Nivert · Boulangerie", h * 0.18, 0.12));

/** Logo empilé, centré sur cx : moulin, « LE MOULIN », sous-titre. y = haut, h = hauteur du moulin. */
export function stacked(cx, y, h, { mark = C.wheat, word = C.slate, sub = C.crust } = {}) {
  return [
    mill(cx - h / 2, y, h, { stroke: mark, width: 1.9 }),
    text(fonts.displaySemi, "LE MOULIN", cx, y + h * 1.62, h * 0.62, { fill: word, anchor: "middle", tracking: 0.14 }),
    text(fonts.medium, "DE LA CROIX NIVERT · BOULANGERIE", cx, y + h * 2.02, h * 0.17, { fill: sub, anchor: "middle", tracking: 0.28 }),
  ].join("");
}

/** Épi de blé, centré en (cx, cy), hauteur h. */
export function wheat(cx, cy, h, { stroke = C.wheat, width = 1.6 } = {}) {
  const s = h / 32;
  return `<g transform="translate(${cx - 16 * s} ${cy - 16 * s}) scale(${s})" fill="none" stroke="${stroke}" stroke-width="${width / s}" stroke-linecap="round" stroke-linejoin="round"><path d="M16 29V7"/><path d="M16 9c-2.2-1-3.2-3-3-5.3 2.2.6 3.4 2.6 3 5.3Zm0 0c2.2-1 3.2-3 3-5.3-2.2.6-3.4 2.6-3 5.3Z"/><path d="M16 14.5c-2.6-.8-4-2.9-4-5.4 2.5.5 4 2.6 4 5.4Zm0 0c2.6-.8 4-2.9 4-5.4-2.5.5-4 2.6-4 5.4Z"/><path d="M16 20c-2.6-.8-4-2.9-4-5.4 2.5.5 4 2.6 4 5.4Zm0 0c2.6-.8 4-2.9 4-5.4-2.5.5-4 2.6-4 5.4Z"/></g>`;
}
