import Link from "next/link";
import site from "@/data/site.json";
import { LogoStacked } from "@/components/Logo";
import { FacebookIcon, InstagramIcon, PhoneIcon } from "@/components/icons";
import { LangSwitch } from "@/components/LangSwitch";
import { WheatRule } from "@/components/Doodles";
import { formatTime, num } from "@/lib/format";
import { weekHours } from "@/lib/hours";
import type { Dict, Locale } from "@/lib/i18n";
import { pagePath } from "@/lib/pages";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const w = weekHours();
  const slot = (s: string[][]) => (s.length ? s.map(([a, b]) => `${formatTime(a, lang)} – ${formatTime(b, lang)}`).join(", ") : d.infos.closed);
  const links = [
    { href: pagePath("carte", lang), label: d.pages.carte.title },
    { href: pagePath("commander", lang), label: d.pages.commander.title },
    { href: pagePath("plateaux", lang), label: d.pages.plateaux.title },
    { href: pagePath("paris15", lang), label: d.pages.paris15.title },
    { href: pagePath("cambronne", lang), label: d.pages.cambronne.title },
  ];
  return (
    <footer className="bg-slate-deep text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:px-8 md:py-16">
        <div className="flex flex-col items-start">
          <LogoStacked />
          <p className="mt-5 max-w-xs text-paper/80">{d.footer.tagline}</p>
        </div>
        <div>
          <h2 className="text-[0.9375rem] font-semibold text-wheat">{d.infos.address}</h2>
          <address className="mt-3 leading-relaxed not-italic">
            {site.name}
            <br />
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
          <a href={`tel:${site.phoneIntl}`} className="mt-3 inline-flex min-h-11 items-center gap-2 tabular-nums hover:underline">
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>
          <br />
          <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline decoration-paper/40 underline-offset-4 hover:decoration-paper">
            {d.nav.directions}
          </a>
        </div>
        <div>
          <h2 className="text-[0.9375rem] font-semibold text-wheat">{d.footer.hours}</h2>
          <p className="mt-3 leading-relaxed">
            {d.footer.tueSat}
            <br />
            <span className="tabular-nums">{slot(w[1])}</span>
          </p>
          <p className="mt-2 leading-relaxed">
            {d.footer.sunday}
            <br />
            <span className="tabular-nums">{slot(w[6])}</span>
          </p>
          <p className="mt-2 leading-relaxed text-paper/75">
            {d.footer.monday} : {slot(w[0])}
          </p>
        </div>
        <div>
          <h2 className="text-[0.9375rem] font-semibold text-wheat">{d.footer.pages}</h2>
          <ul className="mt-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-10 items-center hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <WheatRule className="mx-auto max-w-7xl px-5 !text-wheat/60 md:px-8" />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 text-[0.875rem] md:px-8">
        <div className="flex items-center gap-5">
          {site.instagram && (
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:underline">
              <InstagramIcon className="h-5 w-5" />
              {site.instagramHandle}
            </a>
          )}
          {site.facebook && (
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:underline">
              <FacebookIcon className="h-5 w-5" />
              Facebook
            </a>
          )}
          {!site.instagram && !site.facebook && <span hidden dangerouslySetInnerHTML={{ __html: "<!-- À REMPLIR : Instagram / Facebook (data/site.json) -->" }} />}
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:underline">
            {d.footer.googleListing}
          </a>
        </div>
        <div className="flex items-center gap-6">
          <Link href={pagePath("legal", lang)} className="inline-flex min-h-11 items-center hover:underline">
            {d.footer.legal}
          </Link>
          <LangSwitch lang={lang} label={d.nav.lang} />
        </div>
        <p className="w-full text-paper/70">
          © {num(new Date().getFullYear(), lang, { useGrouping: false })} {d.footer.rights}
        </p>
      </div>
    </footer>
  );
}
