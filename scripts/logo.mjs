// Logo du Moulin de la Croix Nivert. L'enseigne de la façade est une écriture script sans logo dessiné :
// logo typographique, « LE MOULIN » en capitales à empattements (Fraunces), « de la Croix Nivert · Boulangerie »
// en petit, et un moulin à vent au trait.
//   npm run logo
// → public/logo.svg (empilé), public/logo-horizontal.svg (fond clair), public/logo-clair.svg (fond sombre),
//   app/icon.svg (favicon), app/apple-icon.png (180 px), public/icon-512.png, assets/logo-apercu.png.
// Pour mettre un vrai logo plus tard : remplacez public/logo.svg et public/logo-horizontal.svg (mêmes noms).
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { ROOT, C, mill, stacked, wordmark, wordmarkWidth } from "./draw.mjs";

const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>\n`;

await writeFile(path.join(ROOT, "public/logo.svg"), svg(440, 220, stacked(220, 14, 84)));
const ww = Math.ceil(wordmarkWidth(64)) + 8;
await writeFile(path.join(ROOT, "public/logo-horizontal.svg"), svg(ww, 72, wordmark(4, 4, 64)));
await writeFile(path.join(ROOT, "public/logo-clair.svg"), svg(ww, 72, wordmark(4, 4, 64, { mark: C.wheat, word: C.cream, sub: C.wheatSoft })));

// Favicon : le moulin doré sur l'ardoise de la façade
const mark = (size) => svg(size, size, `<g transform="scale(${size / 100})"><rect width="100" height="100" rx="18" fill="${C.slate}"/>${mill(10, 8, 80, { stroke: C.wheat, width: 3 })}</g>`);
await writeFile(path.join(ROOT, "app/icon.svg"), mark(100));
await sharp(Buffer.from(mark(512))).resize(180, 180).flatten({ background: C.slate }).png().toFile(path.join(ROOT, "app/apple-icon.png"));
await sharp(Buffer.from(mark(512))).png().toFile(path.join(ROOT, "public/icon-512.png"));

// Aperçu
await sharp(Buffer.from(svg(900, 240, `<rect width="900" height="240" fill="${C.cream}"/>${stacked(225, 20, 84)}${wordmark(480, 88, 64)}`)))
  .png()
  .toFile(path.join(ROOT, "assets/logo-apercu.png"));
console.log("logo.svg, logo-horizontal.svg, logo-clair.svg, icon.svg, apple-icon.png, icon-512.png écrits");
