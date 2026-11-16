"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import annonces from "@/data/annonces.json";
import { ArrowIcon, CloseIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { isoDay } from "@/lib/format";
import { upcomingClosure } from "@/lib/hours";
import { isPageId, pagePath } from "@/lib/pages";

type Item = { id: string; from?: string; to?: string; href?: string; fr: string; en: string };

/**
 * Message du moment, refermable et mémorisé pour la session :
 * 1. une fermeture en cours ou dans les 14 jours (data/horaires.json → closures) ;
 * 2. une annonce datée de data/annonces.json (galettes des rois, nouveauté…) ;
 * 3. sinon le message par défaut : « Ouvert jusqu'à 20 h 30… ».
 */
function current(today: string): Item {
  const closure = upcomingClosure(today);
  if (closure) return closure;
  const dated = (annonces.items as Item[]).find((a) => (!a.from || a.from <= today) && (!a.to || today <= a.to));
  return dated ?? (annonces.default as Item);
}

export function AnnounceBar() {
  const { lang, d } = useLocale();
  const [item, setItem] = useState<Item>(() => current(isoDay(new Date())));
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const it = current(isoDay(new Date()));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- date du navigateur, connue seulement après hydratation
    setItem(it);
    try {
      if (sessionStorage.getItem(`moulin-bandeau-${it.id}`) === "1") setClosed(true);
    } catch {}
  }, []);

  if (closed) return null;
  const text = <span suppressHydrationWarning>{item[lang]}</span>;
  return (
    <div className="relative z-[51] flex min-h-10 items-center justify-center bg-slate px-12 py-2 text-center text-[0.875rem] leading-snug text-paper md:text-[0.9375rem]">
      {item.href && isPageId(item.href) ? (
        <Link href={pagePath(item.href, lang)} className="inline-flex items-center gap-2 underline-offset-4 hover:underline">
          {text}
          <ArrowIcon className="h-4 w-4 shrink-0" />
        </Link>
      ) : (
        <p>{text}</p>
      )}
      <button
        type="button"
        onClick={() => {
          setClosed(true);
          try {
            sessionStorage.setItem(`moulin-bandeau-${item.id}`, "1");
          } catch {}
        }}
        className="absolute end-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center opacity-75 transition-opacity hover:opacity-100"
        aria-label={d.announce.close}
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
