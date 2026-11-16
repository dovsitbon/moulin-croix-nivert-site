import type { Locale } from "@/lib/locales";

// Pages secondaires et leurs adresses dans chaque langue.
export const PAGE_IDS = ["carte", "commander", "plateaux", "paris15", "cambronne", "legal"] as const;
export type PageId = (typeof PAGE_IDS)[number];

export const SLUGS: Record<PageId, Record<Locale, string>> = {
  carte: { fr: "carte", en: "menu" },
  commander: { fr: "commander", en: "order" },
  plateaux: { fr: "plateaux-entreprises", en: "office-platters" },
  paris15: { fr: "boulangerie-paris-15", en: "bakery-paris-15" },
  cambronne: { fr: "boulangerie-cambronne", en: "bakery-cambronne" },
  legal: { fr: "mentions-legales", en: "legal" },
};

export const pagePath = (id: PageId, lang: Locale) => `/${lang}/${SLUGS[id][lang]}`;

export const pageOfSlug = (slug: string, lang: Locale) => PAGE_IDS.find((id) => SLUGS[id][lang] === slug) ?? null;

export const isPageId = (v: unknown): v is PageId => typeof v === "string" && (PAGE_IDS as readonly string[]).includes(v);
