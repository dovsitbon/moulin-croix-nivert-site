// Affichette A5 à poser en vitrine et près de la caisse, avec deux QR codes : le site et la page de commande.
//   npm run affichette
// → print/affichette-a5.pdf (148 × 210 mm, 300 dpi) et print/affichette-a5.png (aperçu).
// Les adresses des QR codes viennent de data/site.json → url : relancez le script si le nom de domaine change.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import QRCode from "qrcode";
import { PDFDocument } from "pdf-lib";
import { ROOT, C, fonts, text, stacked, wheat } from "./draw.mjs";

const site = JSON.parse(await readFile(path.join(ROOT, "data/site.json"), "utf8"));
const W = 1748;
const H = 2480;
const cx = W / 2;

// QR code dessiné en carrés (correction élevée : il reste lisible même un peu taché)
function qr(url, x, y, size, color) {
  const q = QRCode.create(url, { errorCorrectionLevel: "H" });
  const n = q.modules.size;
  const cell = size / n;
  let out = "";
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.modules.get(r, c)) out += `<rect x="${(x + c * cell).toFixed(2)}" y="${(y + r * cell).toFixed(2)}" width="${(cell + 0.5).toFixed(2)}" height="${(cell + 0.5).toFixed(2)}"/>`;
  return `<g fill="${color}">${out}</g>`;
}

// Trois photos : la vitrine du matin, les viennoiseries, les galettes
const tile = async (file, w, h, position = "centre") => {
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="14" fill="#fff"/></svg>`);
  return sharp(path.join(ROOT, file)).rotate().resize(w, h, { fit: "cover", position }).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
};
const PW = 480;
const PH = 560;
const gap = 34;
const px = (W - (PW * 3 + gap * 2)) / 2;
const py = 590;
const photos = await Promise.all([
  tile("assets/viennoiseries/croissant-framboise-cruffin.jpg", PW, PH),
  tile("assets/hero/hero.jpg", PW, PH, "south"),
  tile("assets/patisseries/vitrine-eclairs.jpg", PW, PH),
]);

const siteUrl = `${site.url}/fr`;
const orderUrl = `${site.url}/fr/commander`;
const Q = 400;
const qy = 1600;
const q1 = cx - Q - 110;
const q2 = cx + 110;
const host = site.url.replace(/^https?:\/\//, "");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="${C.cream}"/>
<rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none" stroke="${C.wheat}" stroke-width="3"/>
${stacked(cx, 120, 170)}
${text(fonts.display, "Commandez, on prépare.", cx, py + PH + 150, 92, { anchor: "middle", fill: C.slate })}
${text(fonts.text, "Pains, viennoiseries, quiches, gâteaux et galettes : choisissez en ligne,", cx, py + PH + 230, 36, { anchor: "middle", fill: C.muted })}
${text(fonts.text, "passez prendre à l'heure qui vous arrange.", cx, py + PH + 282, 36, { anchor: "middle", fill: C.muted })}
<rect x="${q1 - 36}" y="${qy - 36}" width="${Q + 72}" height="${Q + 72}" rx="16" fill="#FFFFFF"/>
<rect x="${q2 - 36}" y="${qy - 36}" width="${Q + 72}" height="${Q + 72}" rx="16" fill="#FFFFFF"/>
${qr(siteUrl, q1, qy, Q, C.slate)}
${qr(orderUrl, q2, qy, Q, C.crust)}
${text(fonts.bold, "LE SITE", q1 + Q / 2, qy + Q + 100, 36, { anchor: "middle", fill: C.slate, tracking: 0.2 })}
${text(fonts.text, "carte, horaires, accès", q1 + Q / 2, qy + Q + 148, 30, { anchor: "middle", fill: C.muted })}
${text(fonts.bold, "COMMANDER", q2 + Q / 2, qy + Q + 100, 36, { anchor: "middle", fill: C.crust, tracking: 0.2 })}
${text(fonts.text, "retrait en boutique", q2 + Q / 2, qy + Q + 148, 30, { anchor: "middle", fill: C.muted })}
${wheat(cx, qy + Q / 2, 90, { width: 3 })}
${text(fonts.medium, host, cx, H - 200, 34, { anchor: "middle", fill: C.crust })}
${text(fonts.text, "39 rue de la Croix Nivert, Paris 15  ·  01 47 83 30 10", cx, H - 140, 32, { anchor: "middle", fill: C.ink })}
${text(fonts.text, "Du mardi au samedi 7 h – 20 h 30  ·  le dimanche 7 h – 14 h", cx, H - 92, 30, { anchor: "middle", fill: C.muted })}
</svg>`;

const png = await sharp(Buffer.from(svg))
  .composite(photos.map((input, i) => ({ input, left: Math.round(px + i * (PW + gap)), top: py })))
  .png()
  .toBuffer();

await mkdir(path.join(ROOT, "print"), { recursive: true });
await sharp(png).resize({ width: 874 }).png().toFile(path.join(ROOT, "print/affichette-a5.png"));

const pdf = await PDFDocument.create();
pdf.setTitle("Le Moulin de la Croix Nivert, affichette A5");
const page = pdf.addPage([419.53, 595.28]); // A5 en points
const jpg = await pdf.embedJpg(await sharp(png).jpeg({ quality: 94 }).toBuffer());
page.drawImage(jpg, { x: 0, y: 0, width: 419.53, height: 595.28 });
await writeFile(path.join(ROOT, "print/affichette-a5.pdf"), await pdf.save());
console.log(`affichette A5 écrite, QR codes → ${siteUrl} et ${orderUrl}`);
