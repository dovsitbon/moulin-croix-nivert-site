import Link from "next/link";
import site from "@/data/site.json";
import avis from "@/data/avis.json";
import { Pic } from "@/components/Pic";
import { Reveal } from "@/components/Reveal";
import { Rating } from "@/components/Rating";
import { OpenStatus } from "@/components/OpenStatus";
import { HoursTable } from "@/components/HoursTable";
import { MapLoader } from "@/components/MapLoader";
import { TraysForm } from "@/components/Forms";
import { Baguette, CakeBox, Clock, Wheat } from "@/components/Doodles";
import { ArrowIcon, PhoneIcon, PinIcon, StarIcon } from "@/components/icons";
import { fill, type Dict, type Locale } from "@/lib/i18n";
import { formatDay, num } from "@/lib/format";
import { firstImg } from "@/lib/media";
import { SEASONS, type CategoryId } from "@/lib/carte";
import { pagePath } from "@/lib/pages";

type S = { lang: Locale; d: Dict };

/** Première photo disponible d'une liste : la photo prise sur place quand elle existe, sinon une photo de la fiche Google. */
const best = (...paths: string[]) => firstImg(paths)?.src ?? paths[0];

/** Titre de section : petite ligne brun croûte avec un épi, grand titre Fraunces. */
export function Heading({ eyebrow, title, id, className = "", children }: { eyebrow: string; title: string; id?: string; className?: string; children?: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="eyebrow flex items-center gap-2">
        <Wheat className="h-4 w-4 text-wheat" />
        {eyebrow}
      </p>
      <h2 id={id} className="display mt-3 text-[2.25rem] md:text-[3.25rem]">
        {title}
      </h2>
      {children}
    </div>
  );
}

/* 3. Hero plein écran : la vitrine des viennoiseries, deux boutons, la note Google et le statut en direct. */
export function Hero({ lang, d }: S) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[calc(100svh-6.5rem)] flex-col justify-end overflow-hidden bg-slate-deep md:min-h-[calc(100svh-7.5rem)]">
      <Pic src={best("/media/hero/hero-tradition.jpg", "/media/hero/hero.jpg")} d={d} alt={d.hero.alt} sizes="100vw" priority className="!absolute inset-0 -z-20" position="center 74%" />
      {/* Voile neutre en bas (mobile) ou côté texte (écrans larges), pour lire le texte sur la photo */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(26,22,19,0.9)_0%,rgba(26,22,19,0.72)_50%,rgba(26,22,19,0.35)_80%,rgba(26,22,19,0.1)_100%)] md:bg-[linear-gradient(to_right,rgba(26,22,19,0.82)_0%,rgba(26,22,19,0.45)_45%,rgba(26,22,19,0)_74%)]" />
      <div className="mx-auto w-full max-w-7xl px-5 pt-32 pb-8 text-paper md:px-8 md:pb-16">
        <div className="rise max-w-2xl">
          <p className="sign text-wheat-soft">{d.hero.eyebrow}</p>
          <h1 id="hero-title" className="display mt-4 text-[2.875rem] sm:text-[3.5rem] md:text-[5.5rem]">
            {d.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-[1.125rem] leading-relaxed text-paper/90">{d.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={pagePath("carte", lang)} className="btn-light max-sm:!px-4">
              {d.hero.cta}
            </Link>
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-line text-paper hover:!border-paper hover:!bg-paper hover:!text-slate max-sm:!px-4">
              <PinIcon />
              {d.nav.directions}
            </a>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9375rem]">
            <Rating lang={lang} d={d} />
            <OpenStatus />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 4. Tuiles de catégories en capitales sur photo, juste après le hero. */
const TILES: { id: CategoryId; photo: string; position?: string }[] = [
  { id: "pains", photo: best("/media/pains/baguette-tradition.jpg", "/media/boutique/rayons-pains.jpg"), position: "center 40%" },
  { id: "viennoiseries", photo: "/media/viennoiseries/croissant-framboise-cruffin.jpg" },
  { id: "patisseries", photo: best("/media/patisseries/flan.jpg", "/media/patisseries/vitrine-eclairs.jpg") },
  { id: "snacking", photo: best("/media/snacking/quiche.jpg", "/media/snacking/vitrine-fraiche.jpg") },
  { id: "gateaux", photo: "/media/patisseries/foret-noire.jpg" },
];

export function Tiles({ lang, d }: S) {
  return (
    <section aria-label={d.tiles.title} className="mx-auto max-w-7xl px-5 pt-6 md:px-8 md:pt-8">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
        {TILES.map((t, i) => (
          <Reveal as="li" key={t.id} delay={i * 0.04} className={i === TILES.length - 1 ? "col-span-2 md:col-span-1" : ""}>
            <Link href={`${pagePath("carte", lang)}#${t.id}`} className={`group relative block overflow-hidden rounded-[6px] ${i === TILES.length - 1 ? "aspect-[2/1] md:aspect-[3/4]" : "aspect-[3/4]"}`}>
              <Pic src={t.photo} d={d} alt="" sizes="(min-width: 768px) 19vw, 46vw" className="h-full" position={t.position} />
              <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,22,19,0.72),rgba(26,22,19,0)_58%)]" aria-hidden="true" />
              <span className="sign absolute inset-x-3 bottom-4 text-center !text-[0.8125rem] leading-snug text-paper">{d.tiles.items[t.id as keyof typeof d.tiles.items]}</span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* 5. Bande de services en 4 pictos. */
export function Services({ d }: S) {
  const icons = [Wheat, Clock, Baguette, CakeBox];
  return (
    <section aria-label={d.services.title} className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <ul className="grid grid-cols-2 gap-x-5 gap-y-8 border-y border-line py-8 md:grid-cols-4 md:py-10">
        {d.services.items.map((s, i) => {
          const Icon = icons[i];
          return (
            <li key={s.t} className="flex flex-col items-center text-center">
              <Icon className="h-9 w-9 text-crust" />
              <p className="mt-3 font-semibold">{s.t}</p>
              <p className="mt-0.5 max-w-[16rem] text-[0.9375rem] text-muted">{s.p}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* 7. Trois blocs alternés : photo, texte court, un seul bouton. */
export function Blocks({ lang, d }: S) {
  const carte = pagePath("carte", lang);
  const items = [
    { photo: best("/media/pains/baguette-tradition.jpg", "/media/boutique/rayons-pains.jpg"), href: `${carte}#pains`, label: d.photoSlots.tradition },
    { photo: best("/media/patisseries/flan.jpg", "/media/viennoiseries/panier-cafes.jpg"), href: `${carte}#viennoiseries`, label: d.photoSlots.flan },
    { photo: best("/media/snacking/quiche.jpg", "/media/viennoiseries/panier-cappuccinos.jpg"), href: `${carte}#snacking`, label: d.photoSlots.quiche },
  ];
  return (
    <section className="mx-auto max-w-7xl space-y-16 px-5 py-16 md:space-y-28 md:px-8 md:py-24">
      {d.blocks.map((b, i) => {
        const it = items[i];
        return (
          <div key={b.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
            <Reveal className={i % 2 ? "md:order-2" : ""}>
              <Pic src={it.photo} d={d} sizes="(min-width: 768px) 45vw, 92vw" className="aspect-[4/5] rounded-[6px]" label={it.label} tint={i} />
            </Reveal>
            <Reveal delay={0.08} className="max-w-md">
              <Heading eyebrow={b.eyebrow} title={b.title} />
              <p className="lead mt-5">{b.text}</p>
              <div className="mt-8">
                <Link href={it.href} className="btn">
                  {b.cta}
                  <ArrowIcon />
                </Link>
              </div>
            </Reveal>
          </div>
        );
      })}
    </section>
  );
}

/* 8. Commandes : gâteaux, galettes des rois, plateaux pour les bureaux. */
export function Orders({ lang, d }: S) {
  const carte = pagePath("carte", lang);
  const galettes = SEASONS.find((s) => s.id === "galettes");
  const cards = [
    { ...d.orders.cards[0], photo: "/media/patisseries/foret-noire.jpg", href: `${carte}#gateaux` },
    { ...d.orders.cards[1], photo: "/media/patisseries/galettes-des-rois.jpg", href: `${carte}#gateaux`, note: galettes ? fill(d.orders.season, { when: galettes[lang].when }) : "" },
    { ...d.orders.cards[2], photo: best("/media/snacking/plateau-bureau.jpg"), href: pagePath("plateaux", lang), label: d.photoSlots.plateau },
  ];
  return (
    <section id="commandes" aria-labelledby="commandes-title" className="bg-cream-deep py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Heading eyebrow={d.orders.eyebrow} title={d.orders.title} id="commandes-title">
          <p className="lead mt-4 max-w-2xl">{d.orders.intro}</p>
        </Heading>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.06}>
              <Link href={c.href} className="group flex h-full flex-col overflow-hidden rounded-[6px] border border-line bg-paper">
                <Pic src={c.photo} d={d} sizes="(min-width: 768px) 30vw, 92vw" className="aspect-[4/3]" label={"label" in c ? c.label : undefined} tint={i} />
                <span className="flex flex-1 flex-col p-6">
                  <span className="display text-[1.625rem]">{c.title}</span>
                  <span className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{c.text}</span>
                  {"note" in c && c.note && <span className="mt-3 text-[0.875rem] font-medium text-crust">{c.note}</span>}
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 font-semibold text-slate group-hover:underline">
                    {c.cta}
                    <ArrowIcon />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
        <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem]">
          {d.orders.callLine}
          <a href={`tel:${site.phoneIntl}`} className="link-line inline-flex min-h-11 items-center gap-2 font-semibold tabular-nums">
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>
        </p>
      </div>
    </section>
  );
}

/* Plateaux pour les bureaux : texte, photo, formulaire de demande (page dédiée). */
export function Trays({ d }: S) {
  return (
    <section id="plateaux" className="bg-cream-deep py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="space-y-6">
          <Pic src={best("/media/snacking/plateau-bureau.jpg", "/media/viennoiseries/panier-cafes.jpg")} d={d} sizes="(min-width: 1024px) 36vw, 92vw" className="aspect-[4/3] rounded-[6px]" />
          <ul className="space-y-3">
            {d.trays.points.map((p) => (
              <li key={p} className="flex gap-3">
                <Wheat className="mt-0.5 h-5 w-5 shrink-0 text-wheat" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[6px] bg-paper p-5 md:p-9">
          <TraysForm />
        </div>
      </div>
    </section>
  );
}

/* 9. Avis : aucun avis inventé. Emplacements tant que data/avis.json est vide, et le lien vers la fiche Google. */
type Review = { name: string; date: string; source: string; rating: number } & Record<Locale, string>;

export function Reviews({ lang, d }: S) {
  const items = avis.items as Review[];
  return (
    <section aria-labelledby="avis-title" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Heading eyebrow={d.reviews.eyebrow} title={d.reviews.title} id="avis-title">
          <p className="lead mt-4 max-w-xl">{fill(d.reviews.intro, { value: num(site.rating.value, lang, { minimumFractionDigits: 1 }), count: num(site.rating.count, lang) })}</p>
        </Heading>
        <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-line">
          <StarIcon className="h-4 w-4 text-wheat" />
          {d.reviews.google}
        </a>
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {items.length
          ? items.slice(0, 3).map((r) => (
              <li key={r.name + r.date} className="rounded-[6px] border border-line bg-paper p-6">
                <p className="flex gap-0.5 text-wheat" aria-label={`${num(r.rating, lang)}/5`}>
                  {Array.from({ length: r.rating }, (_, k) => (
                    <StarIcon key={k} className="h-4 w-4" />
                  ))}
                </p>
                <blockquote className="mt-3 leading-relaxed">{r[lang] || r.fr}</blockquote>
                <p className="mt-4 text-[0.875rem] text-muted">
                  {r.name} · {r.source} · {formatDay(r.date, lang, { month: "long", year: "numeric" })}
                </p>
              </li>
            ))
          : [0, 1, 2].map((k) => (
              <li key={k} className="flex min-h-44 flex-col items-center justify-center gap-2 rounded-[6px] border border-dashed border-line p-6 text-center text-muted" data-review-slot>
                <span dangerouslySetInnerHTML={{ __html: "<!-- À REMPLIR avec de vrais avis clients (data/avis.json), avec leur accord -->" }} />
                <Wheat className="h-6 w-6 text-wheat" />
                <span className="text-[0.9375rem]">{d.reviews.slot}</span>
              </li>
            ))}
      </ul>
    </section>
  );
}

/* 10. Infos pratiques : adresse, métro, horaires, téléphone, plan. */
export function Infos({ lang, d }: S) {
  const pay = site.paymentMethods[lang];
  return (
    <section id="infos" aria-labelledby="infos-title" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <Heading eyebrow={d.infos.eyebrow} title={d.infos.title} id="infos-title" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="grid content-start gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold">{d.infos.address}</h3>
            <address className="mt-2 text-muted not-italic">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </address>
            <OpenStatus className="mt-3 text-[0.9375rem]" />
          </div>
          <div>
            <h3 className="font-semibold">{d.infos.metro}</h3>
            <ul className="mt-2 space-y-1.5 text-[0.9375rem]">
              {d.infos.stations.map((s) => (
                <li key={s.name}>
                  <span className="font-medium">{s.name}</span> <span className="text-muted">· {s.line} · {s.walk}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2">
            <h3 className="font-semibold">{d.infos.hours}</h3>
            <div className="mt-2">
              <HoursTable lang={lang} d={d} />
            </div>
          </div>
          <div>
            <h3 className="font-semibold">{d.infos.phone}</h3>
            <a href={`tel:${site.phoneIntl}`} className="link-line mt-2 inline-flex min-h-11 items-center gap-2 font-medium tabular-nums">
              <PhoneIcon className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
          <div className="rounded-[6px] bg-wheat-soft p-5">
            <h3 className="font-semibold">{d.infos.onSite}</h3>
            <p className="mt-1.5 text-[0.9375rem] leading-snug text-muted">{d.infos.onSiteText}</p>
          </div>
          {pay ? (
            <p className="text-[0.9375rem] text-muted sm:col-span-2">{pay}</p>
          ) : (
            <span hidden dangerouslySetInnerHTML={{ __html: "<!-- À REMPLIR : moyens de paiement (data/site.json → paymentMethods) -->" }} />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <MapLoader src={site.mapsEmbed} title={d.infos.mapTitle} label={d.infos.mapLoad} note={d.infos.mapNote} className="aspect-[4/3] rounded-[6px] lg:aspect-[5/4]" />
          <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn self-start">
            <PinIcon />
            {d.nav.directions}
          </a>
        </div>
      </div>
    </section>
  );
}

/* 11. FAQ. */
export function Faq({ d }: S) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-paper py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Heading eyebrow={d.faq.eyebrow} title={d.faq.title} id="faq-title" />
        <div className="border-t border-line">
          {d.faq.items.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex min-h-16 items-center justify-between gap-4 py-4 text-[1.0625rem] font-semibold">
                {f.q}
                <span className="faq-plus flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-crust" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Petite ligne « 4,5/5 sur Google · ouvert » réutilisée dans les en-têtes de page. */
export function TrustLine({ lang, d }: S) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9375rem]">
      <Rating lang={lang} d={d} />
      <OpenStatus />
    </div>
  );
}
