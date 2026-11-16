import carte from "@/data/carte.json";
import saisons from "@/data/saisons.json";
import type { Locale } from "@/lib/locales";

// La carte (data/carte.json) et les saisons (data/saisons.json), typées.

export type Text = { name: string; desc: string };
export type Item = {
  id: string;
  price: number | null;
  from?: boolean;
  photo?: string;
  signature?: boolean;
  veg?: boolean;
  leadDays?: number;
  season?: string;
  orderable?: boolean;
  confirm?: boolean;
} & Record<Locale, Text>;
export type CategoryId = "pains" | "viennoiseries" | "patisseries" | "snacking" | "gateaux" | "boissons";
export type Category = { id: CategoryId; items: Item[] } & Record<Locale, string>;
export type Season = { id: string; from: string; to: string; orderFrom: string } & Record<Locale, { name: string; when: string }>;

export const CATEGORIES = carte.categories as Category[];
export const CHECKED = carte.checked;
export const SEASONS = saisons.items as Season[];

const all = new Map<string, Item>(CATEGORIES.flatMap((c) => c.items.map((i) => [i.id, i] as const)));
export const itemById = (id: string) => all.get(id) ?? null;
export const allItems = () => [...all.values()];
export const isItem = (v: unknown): v is string => typeof v === "string" && all.has(v);
export const seasonOf = (it: Item) => (it.season ? (SEASONS.find((s) => s.id === it.season) ?? null) : null);

/** L'article se commande-t-il en ligne aujourd'hui (iso = AAAA-MM-JJ, heure de Paris) ? */
export function isOrderable(id: string, today?: string) {
  const it = all.get(id);
  if (!it || it.orderable === false) return false;
  const s = seasonOf(it);
  if (s && today) return s.orderFrom <= today && today <= s.to;
  return true;
}

/** Premier et dernier jour de retrait possibles pour un article (délai de fabrication, saison). */
export function pickupWindow(id: string, today: string, addDays: (iso: string, n: number) => string) {
  const it = all.get(id);
  let min = addDays(today, it?.leadDays ?? 0);
  let max: string | null = null;
  const s = it ? seasonOf(it) : null;
  if (s) {
    if (s.from > min) min = s.from;
    max = s.to;
  }
  return { min, max };
}

export const unitPrice = (id: string) => all.get(id)?.price ?? null;
export const categoryOf = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)!;
