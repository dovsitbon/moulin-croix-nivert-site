import fr from "@/locales/fr.json";
import en from "@/locales/en.json";
import type { Locale } from "@/lib/locales";

export { defaultLocale, intlLocale, isLocale, langNames, langShort, locales, ogLocale, type Locale } from "@/lib/locales";
export type Dict = typeof fr;

const dictionaries: Record<Locale, Dict> = { fr, en };

export const getDict = (lang: Locale): Dict => dictionaries[lang];

export { fill, altOf } from "@/lib/text";
