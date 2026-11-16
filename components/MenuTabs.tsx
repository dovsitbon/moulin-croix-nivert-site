"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useCart, useLocale } from "@/components/providers";
import { MillMark } from "@/components/Doodles";
import { CheckIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { CATEGORIES, CHECKED, isOrderable, seasonOf, type CategoryId, type Item } from "@/lib/carte";
import { fill, altOf } from "@/lib/text";
import { formatDay, isoDay, num, price } from "@/lib/format";
import { has, img } from "@/lib/media";
import { pagePath } from "@/lib/pages";

const TINTS = ["bg-wheat-soft text-crust", "bg-slate-soft text-slate", "bg-cream-deep text-crust"];

/** Date du jour (heure de Paris), connue côté navigateur après hydratation. */
function useToday() {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- horloge du navigateur
    setToday(isoDay(new Date()));
  }, []);
  return today;
}

function PriceLabel({ item, className = "" }: { item: Item; className?: string }) {
  const { lang, d } = useLocale();
  if (item.price === null) return <span className={`text-[0.875rem] text-muted ${className}`}>{d.carte.priceOnSite}</span>;
  return (
    <span className={`text-[1.0625rem] font-semibold tabular-nums ${className}`}>
      {item.from && <span className="me-1 text-[0.8125rem] font-normal text-muted">{d.carte.from}</span>}
      {price(item.price, lang)}
    </span>
  );
}

/** Ajouter / quantité : un bouton « Ajouter », puis − 1 + une fois dans la commande. Rien pour les articles hors saison. */
function AddControl({ item, today }: { item: Item; today: string | null }) {
  const { lang, d } = useLocale();
  const { cart, add, ready } = useCart();
  const qty = ready ? (cart[item.id] ?? 0) : 0;
  const name = item[lang].name;
  if (item.orderable === false) return null;
  if (today && !isOrderable(item.id, today)) {
    const s = seasonOf(item);
    return s ? <span className="text-[0.875rem] text-muted">{fill(d.carte.seasonLater, { when: s[lang].when })}</span> : null;
  }
  if (!qty)
    return (
      <button type="button" onClick={() => add(item.id, 1)} className="inline-flex min-h-11 items-center gap-1.5 rounded-[4px] border-[1.5px] border-slate px-4 text-[0.9375rem] font-semibold text-slate transition-colors hover:bg-slate hover:text-paper" aria-label={fill(d.carte.addAria, { name })}>
        <PlusIcon className="h-4 w-4" />
        {d.carte.add}
      </button>
    );
  return (
    <span className="pop inline-flex min-h-11 items-center rounded-[4px] bg-slate text-paper" role="group" aria-label={`${name} · ${d.carte.inCart}`}>
      <button type="button" onClick={() => add(item.id, -1)} className="flex h-11 w-10 items-center justify-center" aria-label={fill(d.carte.removeAria, { name })}>
        <MinusIcon className="h-4 w-4" />
      </button>
      <span className="min-w-5 text-center font-semibold tabular-nums" aria-live="polite">
        {num(qty, lang)}
      </span>
      <button type="button" onClick={() => add(item.id, 1)} className="flex h-11 w-10 items-center justify-center" aria-label={fill(d.carte.addAria, { name })}>
        <PlusIcon className="h-4 w-4" />
      </button>
    </span>
  );
}

function Tags({ item }: { item: Item }) {
  const { lang, d } = useLocale();
  const s = seasonOf(item);
  return (
    <div className="absolute start-3 top-3 flex flex-wrap gap-1.5">
      {item.signature && <span className="tag bg-slate text-paper">{d.carte.signature}</span>}
      {s && <span className="tag bg-wheat text-ink">{s[lang].name}</span>}
      {!!item.leadDays && <span className="tag bg-paper text-ink">{fill(d.carte.lead, { n: num(item.leadDays * 24, lang) })}</span>}
    </div>
  );
}

/** Carte produit complète : photo (ou emplacement), nom, description, prix, Ajouter. */
export function ItemCard({ item, index = 0, priority = false, today }: { item: Item; index?: number; priority?: boolean; today: string | null }) {
  const { lang, d } = useLocale();
  const t = item[lang];
  const photo = item.photo && has(item.photo) ? img(item.photo) : null;
  return (
    <article className="group flex flex-col overflow-hidden rounded-[6px] border border-line bg-paper">
      <div className="relative aspect-[4/3]">
        {photo ? (
          <div className="zoom h-full">
            <Image src={photo.src} alt={altOf(d, photo.src) || t.name} width={photo.width} height={photo.height} sizes="(min-width: 1280px) 22rem, (min-width: 768px) 45vw, 92vw" quality={70} priority={priority} className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className={`flex h-full flex-col items-center justify-center gap-2 ${TINTS[index % TINTS.length]}`} data-photo-slot={item.id}>
            <MillMark className="h-12 w-12 opacity-55" strokeWidth={1.6} />
            <span className="text-[0.8125rem] font-medium opacity-80">{d.carte.photoSoon}</span>
          </div>
        )}
        <Tags item={item} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="display text-[1.375rem]">{t.name}</h3>
        {t.desc && <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{t.desc}</p>}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <PriceLabel item={item} />
          <AddControl item={item} today={today} />
        </div>
      </div>
    </article>
  );
}

/** Ligne de carte sans photo (boissons, formules) : nom, description, pointillés, prix. */
function ItemRow({ item }: { item: Item }) {
  const { lang } = useLocale();
  const t = item[lang];
  return (
    <li className="py-4">
      <div className="flex items-baseline gap-3">
        <h3 className="font-[family-name:var(--font-display)] text-[1.1875rem] font-medium">{t.name}</h3>
        <span className="mb-1 flex-1 border-b border-dotted border-muted/40" aria-hidden="true" />
        <PriceLabel item={item} />
      </div>
      {t.desc && <p className="mt-1 max-w-xl text-[0.9375rem] leading-relaxed text-muted">{t.desc}</p>}
    </li>
  );
}

/**
 * La carte en onglets (pains, viennoiseries, pâtisseries, snacking, gâteaux sur commande, boissons).
 * `limit` : nombre d'articles par onglet sur l'accueil (avec un lien vers la carte complète).
 * L'onglet suit l'ancre de l'adresse (#viennoiseries…), pour que les tuiles et le menu ouvrent la bonne rubrique.
 */
export function MenuTabs({ limit }: { limit?: number }) {
  const { lang, d } = useLocale();
  const today = useToday();
  const [tab, setTab] = useState<CategoryId>("viennoiseries");
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.slice(1) as CategoryId;
      if (CATEGORIES.some((c) => c.id === h)) setTab(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const select = (id: CategoryId) => {
    setTab(id);
    if (!limit) history.replaceState(null, "", `#${id}`);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = CATEGORIES.findIndex((c) => c.id === tab);
    let j = -1;
    if (e.key === "ArrowRight") j = (i + 1) % CATEGORIES.length;
    else if (e.key === "ArrowLeft") j = (i - 1 + CATEGORIES.length) % CATEGORIES.length;
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = CATEGORIES.length - 1;
    if (j < 0) return;
    e.preventDefault();
    select(CATEGORIES[j].id);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[j]?.focus();
  };

  const cat = CATEGORIES.find((c) => c.id === tab)!;
  const cards = cat.items.filter((it) => it.photo);
  const rows = cat.items.filter((it) => !it.photo);
  // Sur l'accueil : d'abord les signatures et les articles qui ont déjà leur photo
  const score = (it: Item) => (it.photo && has(it.photo) ? 2 : 0) + (it.signature ? 1 : 0);
  const shown = limit ? [...cards].sort((a, b) => score(b) - score(a)).slice(0, limit) : cards;
  const more = limit ? cat.items.length - shown.length : 0;

  return (
    <div>
      <div ref={tabsRef} role="tablist" aria-label={d.carte.tablist} onKeyDown={onKey} className="tabs -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
        {CATEGORIES.map((c) => {
          const on = c.id === tab;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={on}
              aria-controls={`panel-${c.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(c.id)}
              className={`min-h-11 shrink-0 rounded-[4px] border px-5 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors ${on ? "border-slate bg-slate text-paper" : "border-line bg-paper text-ink hover:border-slate"}`}
            >
              {c[lang]}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`panel-${cat.id}`} aria-labelledby={`tab-${cat.id}`} className="fade-in mt-8" key={cat.id}>
        {cat.id === "gateaux" && <p className="mb-6 max-w-2xl text-[0.9375rem] text-muted">{d.carte.gateauxNote}</p>}
        {shown.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shown.map((it, i) => (
              <ItemCard key={it.id} item={it} index={i} today={today} />
            ))}
          </div>
        )}
        {rows.length > 0 && (!limit || !shown.length) && (
          <ul className={`max-w-3xl divide-y divide-line border-y border-line ${shown.length ? "mt-10" : ""}`}>
            {rows.map((it) => (
              <ItemRow key={it.id} item={it} />
            ))}
          </ul>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[0.875rem] text-muted">{fill(d.carte.checked, { date: formatDay(CHECKED, lang, { day: "numeric", month: "long", year: "numeric" }) })}</p>
          {limit && more > 0 && (
            <Link href={`${pagePath("carte", lang)}#${cat.id}`} className="btn-line">
              {d.carte.seeAll} · {cat[lang]}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/** Rappel flottant (écrans larges) dès qu'un article est ajouté : « 3 articles · Voir ma commande ». */
export function CartBar() {
  const { lang, d } = useLocale();
  const { count, last } = useCart();
  const [onOrder, setOnOrder] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- adresse connue côté navigateur
    setOnOrder(window.location.pathname.startsWith(pagePath("commander", lang)));
  }, [lang]);
  if (!count || !last || onOrder) return null;
  return (
    <Link href={pagePath("commander", lang)} className="fade-in fixed end-6 bottom-6 z-40 hidden items-center gap-3 rounded-[6px] bg-ink py-2 ps-5 pe-2 text-paper shadow-[0_8px_30px_rgba(42,33,28,0.25)] md:flex">
      <span className="text-[0.9375rem]">{fill(d.cartBar.items, { n: num(count, lang) })}</span>
      <span className="inline-flex min-h-10 items-center gap-1.5 rounded-[4px] bg-wheat px-4 text-[0.9375rem] font-semibold text-ink">
        <CheckIcon className="h-4 w-4" />
        {d.cartBar.view}
      </span>
    </Link>
  );
}
