"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import site from "@/data/site.json";
import { Logo } from "@/components/Logo";
import { LangSwitch } from "@/components/LangSwitch";
import { BagIcon, CloseIcon, MenuIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { useCart, useLocale } from "@/components/providers";
import { num } from "@/lib/format";
import { pagePath } from "@/lib/pages";

/** Bouton « Commander » avec le nombre d'articles du panier. */
function OrderButton({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  const { lang, d } = useLocale();
  const { count, ready } = useCart();
  return (
    <Link href={pagePath("commander", lang)} onClick={onClick} className={`btn ${className}`}>
      <BagIcon className="h-[18px] w-[18px]" />
      {d.nav.orderCta}
      {ready && count > 0 && (
        <span key={count} className="pop ms-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-wheat px-1.5 text-[0.8125rem] font-semibold text-ink tabular-nums">
          {num(count, lang)}
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const { lang, d } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const home = `/${lang}`;
  const carte = pagePath("carte", lang);
  const links = [
    { href: `${carte}#pains`, label: d.nav.pains },
    { href: `${carte}#viennoiseries`, label: d.nav.viennoiseries },
    { href: `${carte}#patisseries`, label: d.nav.patisseries },
    { href: `${carte}#snacking`, label: d.nav.snacking },
    { href: pagePath("commander", lang), label: d.nav.order },
    { href: `${home}#infos`, label: d.nav.infos },
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 bg-cream/95 backdrop-blur-sm transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_0_var(--color-line)]" : ""}`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-10 focus:bg-paper focus:px-4 focus:py-2">
          {d.nav.skip}
        </a>
        <div className="flex h-16 items-center gap-2 px-4 md:h-20 md:px-6 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:px-8">
          <nav aria-label={d.nav.main} className="hidden items-center gap-5 text-[0.9375rem] font-medium xl:flex 2xl:gap-7">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="py-2 whitespace-nowrap decoration-crust decoration-[1.5px] underline-offset-[0.45em] hover:underline">
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href={home} title={`${site.name}, ${d.nav.home}`} className="me-auto xl:me-0">
            <Logo />
          </Link>
          <div className="flex items-center gap-1 md:gap-3 xl:justify-end">
            <LangSwitch lang={lang} label={d.nav.lang} className="hidden md:flex" />
            <a href={`tel:${site.phoneIntl}`} className="hidden h-11 items-center gap-2 px-2 text-[0.9375rem] font-medium tabular-nums hover:text-crust lg:inline-flex" aria-label={`${d.nav.call} ${site.phone}`}>
              <PhoneIcon className="h-[18px] w-[18px]" />
              <span className="hidden 2xl:inline">{site.phone}</span>
            </a>
            <OrderButton className="!min-h-11 !px-5 max-md:hidden" />
            <button type="button" className="flex h-11 w-11 items-center justify-center xl:hidden" aria-label={d.nav.openMenu} aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen(true)}>
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="menu-mobile" role="dialog" aria-modal="true" aria-label={d.nav.main} className="fade-in fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-cream px-5 pb-8">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <Logo />
            <button type="button" autoFocus className="flex h-11 w-11 items-center justify-center" aria-label={d.nav.close} onClick={() => setOpen(false)}>
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
          <nav aria-label={d.nav.main} className="mt-2 flex flex-col border-t border-line">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="display border-b border-line py-3.5 text-[1.625rem]">
                {l.label}
              </Link>
            ))}
          </nav>
          {/* Raccourcis : Menu, Commander, Itinéraire */}
          <p className="sign mt-8 text-muted">{d.nav.shortcuts}</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Link href={carte} onClick={() => setOpen(false)} className="btn-line">
              {d.nav.seeMenu}
            </Link>
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-line">
              <PinIcon />
              {d.nav.directions}
            </a>
            <OrderButton className="col-span-2" onClick={() => setOpen(false)} />
            <a href={`tel:${site.phoneIntl}`} className="btn-line col-span-2">
              <PhoneIcon className="h-[18px] w-[18px]" />
              {d.nav.call} {site.phone}
            </a>
          </div>
          <div className="mt-auto flex items-center justify-end pt-8">
            <LangSwitch lang={lang} label={d.nav.lang} />
          </div>
        </div>
      )}
    </>
  );
}

/** Barre fixée en bas de l'écran sur mobile : « Commander » toujours sous le pouce, « Itinéraire » et l'appel à côté. */
export function MobileBar() {
  const { lang, d } = useLocale();
  const pathname = usePathname() ?? "";
  const onOrder = pathname.startsWith(pagePath("commander", lang));
  return (
    <>
      <div className="h-[4.5rem] md:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-cream/97 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
        <a href={`tel:${site.phoneIntl}`} className="btn-line !h-12 !w-12 shrink-0 !p-0" aria-label={`${d.nav.call} ${site.phone}`}>
          <PhoneIcon className="h-5 w-5" />
        </a>
        <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-line flex-1 !px-3">
          <PinIcon />
          {d.nav.directions}
        </a>
        {onOrder ? (
          <Link href={pagePath("carte", lang)} className="btn flex-[1.3] !px-3">
            {d.nav.seeMenu}
          </Link>
        ) : (
          <OrderButton className="flex-[1.3] !px-3" />
        )}
      </div>
    </>
  );
}
