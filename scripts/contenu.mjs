// CONTENU.md : tous les textes du site et la carte, en français et en anglais, pour relecture et validation.
//   npm run contenu
// Le fichier est régénéré à partir de locales/*.json et de data/*.json : corrigez les textes dans ces fichiers,
// pas dans CONTENU.md.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { ROOT } from "./draw.mjs";

const json = async (f) => JSON.parse(await readFile(path.join(ROOT, f), "utf8"));
const [fr, en, carte, site, horaires, annonces, saisons] = await Promise.all(["locales/fr.json", "locales/en.json", "data/carte.json", "data/site.json", "data/horaires.json", "data/annonces.json", "data/saisons.json"].map(json));
const L = { fr, en };

const out = [];
const h = (n, t) => out.push("", `${"#".repeat(n)} ${t}`, "");
const bi = (label, get) => out.push(`- **${label}**`, ...["fr", "en"].map((l) => `  - ${l.toUpperCase()} : ${get(L[l]) ?? ""}`));
const TODO = "**À REMPLIR**";
const eur = (n, from) => (n === null ? TODO : `${from ? "à partir de " : ""}${n.toFixed(2).replace(".", ",")} €`);
const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

out.push(
  "# Le Moulin de la Croix Nivert : contenu du site",
  "",
  "Tous les textes et la carte, pour validation. Ce qui est marqué « À REMPLIR » ou « à confirmer » manque encore : voir INFOS-A-DEMANDER.md.",
  "",
  `Relevé le ${carte.checked} à partir de sa fiche Google (${site.rating.value}/5, ${site.rating.count} avis, catégorie « Boulangerie », gamme 1–10 €) et des photos qui y sont publiées : façade (store « Maison Boullier », affichettes « Horaires » et « Salon de thé · Sandwichs · Salades · Snacking · Macarons · Pièces montées · Pain Nordik », autocollants « Artisan », « Boulanger de France », « Carte Titre-Restaurant »), étiquettes de la vitrine, ardoises des formules et des boissons. Aucun Instagram trouvé ; SIRET relevé sur l'annuaire SIRENE.`,
  "",
  "Les textes se corrigent dans `locales/fr.json` et `locales/en.json` ; la carte dans `data/carte.json` ; les horaires dans `data/horaires.json` ; le bandeau dans `data/annonces.json` ; les saisons dans `data/saisons.json`. Puis `npm run contenu` pour régénérer ce fichier.",
);

h(2, "Titre du hero : trois propositions");
out.push(
  "1. **« Le bon pain de la Croix Nivert. »** (retenu) : simple, local, et c'est la baguette que citent le plus les avis.",
  "2. « Baguette tradition et pur beurre. » : à n'utiliser que si toutes les viennoiseries sont au beurre (l'étiquette du « croissant ordinaire » mentionne de la margarine).",
  "3. « Votre boulangerie, du matin au soir. » : met en avant l'amplitude, 7 h – 20 h 30.",
);

h(2, "Référencement (balises title et description)");
bi("Title de l'accueil", (d) => d.meta.title);
bi("Description de l'accueil", (d) => d.meta.description);
for (const id of Object.keys(fr.pages)) {
  bi(`Title · ${fr.pages[id].title}`, (d) => d.pages[id].metaTitle);
  bi(`Description · ${fr.pages[id].title}`, (d) => d.pages[id].metaDescription);
}

h(2, "Bandeau du haut");
out.push(`- **Par défaut** : ${annonces.default.fr} / ${annonces.default.en}`);
for (const a of annonces.items) out.push(`- **${a.id}** (du ${a.from} au ${a.to}) : ${a.fr} / ${a.en}`);

h(2, "Accueil");
bi("Petite ligne", (d) => d.hero.eyebrow);
bi("Titre", (d) => d.hero.title);
bi("Sous-titre", (d) => d.hero.sub);
bi("Boutons", (d) => `${d.hero.cta} · ${d.nav.directions}`);
h(3, "Tuiles");
for (const k of Object.keys(fr.tiles.items)) bi(k, (d) => d.tiles.items[k]);
h(3, "Services (4 pictos)");
fr.services.items.forEach((_, i) => bi(`Picto ${i + 1}`, (d) => `${d.services.items[i].t} — ${d.services.items[i].p}`));
h(3, "Carte (intro)");
bi("Titre", (d) => d.carte.title);
bi("Texte", (d) => d.carte.intro);
bi("Gâteaux sur commande", (d) => d.carte.gateauxNote);
h(3, "Blocs alternés");
fr.blocks.forEach((_, i) => {
  bi(`Bloc ${i + 1} · titre`, (d) => d.blocks[i].title);
  bi(`Bloc ${i + 1} · texte`, (d) => d.blocks[i].text);
  bi(`Bloc ${i + 1} · bouton`, (d) => d.blocks[i].cta);
});
h(3, "Commandes");
bi("Titre", (d) => d.orders.title);
bi("Intro", (d) => d.orders.intro);
fr.orders.cards.forEach((_, i) => bi(`Carte ${i + 1}`, (d) => `${d.orders.cards[i].title} — ${d.orders.cards[i].text}`));
h(3, "Avis");
bi("Titre", (d) => d.reviews.title);
bi("Intro", (d) => d.reviews.intro);
out.push("", "Aucun avis inventé : trois emplacements vides `<!-- À REMPLIR avec de vrais avis clients -->` en attendant `data/avis.json` (avis Google recopiés avec l'accord de la boulangerie et de leurs auteurs).");
h(3, "Infos pratiques");
bi("Métro", (d) => d.infos.stations.map((s) => `${s.name} (${s.line}, ${s.walk})`).join(" ; "));
bi("Salon de thé", (d) => d.infos.onSiteText);
h(3, "FAQ");
fr.faq.items.forEach((_, i) => {
  bi(`Q${i + 1}`, (d) => d.faq.items[i].q);
  bi(`R${i + 1}`, (d) => d.faq.items[i].a);
});
h(3, "Pied de page");
bi("Phrase", (d) => d.footer.tagline);

h(2, "Pages");
for (const id of ["paris15", "cambronne", "plateaux", "commander"]) {
  h(3, fr.pages[id].title);
  bi("H1", (d) => d.pages[id].h1);
  bi("Intro", (d) => d.pages[id].intro);
  (fr.pages[id].sections ?? []).forEach((s, i) => {
    bi(`§${i + 1} titre`, (d) => d.pages[id].sections[i].h);
    bi(`§${i + 1} texte`, (d) => d.pages[id].sections[i].p.join(" "));
  });
}
h(3, "Plateaux : formulaire");
bi("Points", (d) => d.trays.points.join(" ; "));
bi("Occasions", (d) => Object.values(d.trays.kinds).join(", "));
bi("Souhaits", (d) => Object.values(d.trays.wants).join(", "));

h(2, "La carte");
out.push(`Prix relevés le ${carte.checked} sur les étiquettes et ardoises visibles sur les photos de la fiche Google. « à confirmer » : article ou recette deviné d'après une photo.`);
for (const c of carte.categories) {
  h(3, `${c.fr} / ${c.en}`);
  out.push("| Article | Prix | Description (FR) | Description (EN) | Notes |", "|---|---|---|---|---|");
  for (const it of c.items) {
    const notes = [it.confirm && "à confirmer", it.signature && "incontournable", it.leadDays && `${it.leadDays * 24} h à l'avance`, it.season && `saison : ${it.season}`, it.orderable === false && "pas de commande en ligne", it.photo && !it.photo.includes("pains/brioches") ? `photo : ${it.photo}` : ""].filter(Boolean).join(" · ");
    out.push(`| ${it.fr.name} / ${it.en.name} | ${eur(it.price, it.from)} | ${it.fr.desc || "—"} | ${it.en.desc || "—"} | ${notes} |`);
  }
}

h(2, "Saisons");
for (const s of saisons.items) out.push(`- **${s.fr.name}** : commandes en ligne du ${s.orderFrom} au ${s.to}, retrait du ${s.from} au ${s.to}.`);

h(2, "Horaires (data/horaires.json)");
for (let i = 1; i <= 7; i++) {
  const s = horaires.week[String(i)];
  out.push(`- ${DAYS[i - 1]} : ${s.length ? s.map(([a, b]) => `${a} – ${b}`).join(", ") : "fermé"}`);
}
out.push("", "⚠ L'affichette en vitrine (photo de la façade) dit « Fermé dimanche et lundi » ; la fiche Google indique le dimanche 7 h – 14 h. À trancher avec le boulanger.");

h(2, "Coordonnées");
out.push(`- Téléphone : ${site.phone} (fixe : pas de WhatsApp pour l'instant)`, `- Adresse : ${site.address.street}, ${site.address.postalCode} ${site.address.city}`, `- SIRET : ${site.legal.siret} (${site.legal.siretChecked})`, `- E-mail : ${site.email || TODO}`, `- Instagram : ${site.instagram || "aucun trouvé"}`, `- Facebook : ${site.facebook || "ancienne page « Boulangerie Boullier » liée à la fiche Google : adresse exacte à récupérer"}`);

await writeFile(path.join(ROOT, "CONTENU.md"), out.join("\n") + "\n");
console.log("CONTENU.md écrit");
