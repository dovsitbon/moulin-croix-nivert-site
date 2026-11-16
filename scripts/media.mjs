// Photos du site.
//   npm run media
//
// 1. Prépare pour le web toutes les photos de assets/<dossier>/ dans public/media/<dossier>/
//    (next/image sert ensuite AVIF/WebP à la bonne taille) et note leurs dimensions dans data/media-sizes.json.
// 2. Fabrique l'image de partage public/og.jpg (1200 × 630).
//
// Pour ajouter une photo prise sur place : déposez-la sous le nom attendu (voir assets/A-PHOTOGRAPHIER.md),
// par ex. assets/pains/baguette-tradition.jpg, puis relancez « npm run media » : l'emplacement dessiné disparaît.
// assets/raw/ : images brutes de la fiche Google (non publiées telles quelles), triées et recadrées dans les dossiers
// ci-dessus (personnel en caisse et passants écartés).
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { ROOT, C, fonts, text, stacked, wheat } from "./draw.mjs";

const CATS = ["hero", "pains", "viennoiseries", "patisseries", "snacking", "boutique", "facade"];

const sizes = {};
await rm(path.join(ROOT, "public/media"), { recursive: true, force: true });
for (const cat of CATS) {
  const dir = path.join(ROOT, "assets", cat);
  await mkdir(dir, { recursive: true });
  await mkdir(path.join(ROOT, "public/media", cat), { recursive: true });
  for (const f of (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp|heic)$/i.test(f))) {
    const name = f.replace(/\.\w+$/, "").toLowerCase();
    const max = cat === "hero" ? 2400 : 1600;
    const info = await sharp(path.join(dir, f))
      .rotate()
      .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(path.join(ROOT, "public/media", cat, `${name}.jpg`));
    sizes[`/media/${cat}/${name}.jpg`] = [info.width, info.height];
  }
}
await writeFile(path.join(ROOT, "data/media-sizes.json"), JSON.stringify(sizes, null, 1) + "\n");

// Image de partage : à droite la vitrine des viennoiseries, à gauche le logo et l'essentiel
const right = await sharp(path.join(ROOT, "assets/hero/hero.jpg")).rotate().resize(560, 630, { fit: "cover", position: "south" }).toBuffer();
const left = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="630">
${stacked(320, 70, 110)}
${wheat(320, 380, 30)}
${text(fonts.display, "Le bon pain de la Croix Nivert", 320, 448, 40, { anchor: "middle", fill: C.slate })}
${text(fonts.text, "Boulangerie · Pâtisserie · Paris 15", 320, 498, 24, { anchor: "middle", fill: C.muted })}
${text(fonts.medium, "39 rue de la Croix Nivert", 320, 540, 24, { anchor: "middle", fill: C.crust })}
${text(fonts.text, "Ouvert jusqu'à 20 h 30 du mardi au samedi", 320, 578, 22, { anchor: "middle", fill: C.muted })}
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: C.cream } })
  .composite([
    { input: right, left: 640, top: 0 },
    { input: left, left: 0, top: 0 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));

console.log(`${Object.keys(sizes).length} photos prêtes, og.jpg écrit`);
