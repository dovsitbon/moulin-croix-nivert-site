import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import { getDict, isLocale, locales, ogLocale, type Dict, type Locale } from "@/lib/i18n";
import { pageJsonLd } from "@/lib/jsonld";
import { pageOfSlug, pagePath, PAGE_IDS, SLUGS, type PageId } from "@/lib/pages";
import { firstImg } from "@/lib/media";
import { MenuTabs } from "@/components/MenuTabs";
import { OrderForm } from "@/components/Forms";
import { Faq, Infos, TrustLine, Trays } from "@/components/Sections";
import { Pic } from "@/components/Pic";
import { Wheat } from "@/components/Doodles";
import { HoursTable } from "@/components/HoursTable";
import { PhoneIcon, PinIcon } from "@/components/icons";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => PAGE_IDS.map((id) => ({ lang, slug: SLUGS[id][lang] })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const id = pageOfSlug(slug, lang);
  if (!id) return {};
  const p = getDict(lang).pages[id];
  return {
    title: { absolute: p.metaTitle },
    description: p.metaDescription,
    alternates: {
      canonical: pagePath(id, lang),
      languages: { ...Object.fromEntries(locales.map((l) => [l, pagePath(id, l)])), "x-default": pagePath(id, "fr") },
    },
    openGraph: { type: "website", url: pagePath(id, lang), siteName: site.fullName, title: p.metaTitle, description: p.metaDescription, locale: ogLocale[lang], images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
    ...(id === "legal" ? { robots: { index: false, follow: true } } : {}),
  };
}

const best = (...paths: string[]) => firstImg(paths)?.src ?? paths[0];

function PageHead({ d, id, children }: { d: Dict; id: PageId; children?: React.ReactNode }) {
  const p = d.pages[id] as { h1: string; intro?: string };
  return (
    <header className="mx-auto max-w-7xl px-5 pt-12 md:px-8 md:pt-20">
      <p className="eyebrow flex items-center gap-2">
        <Wheat className="h-4 w-4 text-wheat" />
        {d.pageEyebrow}
      </p>
      <h1 className="display mt-3 max-w-4xl text-[2.75rem] md:text-[4.5rem]">{p.h1}</h1>
      {p.intro && <p className="lead mt-5 max-w-2xl">{p.intro}</p>}
      {children}
    </header>
  );
}

function Sections({ sections }: { sections: { h: string; p: string[] }[] }) {
  return (
    <div className="space-y-10">
      {sections.map((s) => (
        <section key={s.h}>
          <h2 className="display text-[1.75rem] md:text-[2.25rem]">{s.h}</h2>
          {s.p.map((t) => (
            <p key={t} className="lead mt-3">
              {t}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}

function Ctas({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href={pagePath("carte", lang)} className="btn">
        {d.hero.cta}
      </Link>
      <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-line">
        <PinIcon />
        {d.nav.directions}
      </a>
    </div>
  );
}

/** Pages locales « Boulangerie Paris 15 » et « Boulangerie Cambronne » : texte utile, photos, accès. */
function Local({ lang, d, id, photos }: { lang: Locale; d: Dict; id: "paris15" | "cambronne"; photos: string[] }) {
  return (
    <>
      <PageHead d={d} id={id}>
        <TrustLine lang={lang} d={d} />
      </PageHead>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="space-y-10">
          <Sections sections={d.pages[id].sections} />
          <Ctas lang={lang} d={d} />
        </div>
        <div className="grid grid-cols-2 gap-3 self-start">
          {photos.map((src, i) => (
            <Pic key={src} src={src} d={d} sizes="(min-width: 1024px) 20vw, 45vw" className={`rounded-[6px] ${i === 0 ? "col-span-2 aspect-[4/3]" : "aspect-[4/5]"}`} priority={i === 0} />
          ))}
        </div>
      </div>
      <Infos lang={lang} d={d} />
    </>
  );
}

/** Commande à retirer : le panier et le formulaire, à côté l'adresse, les horaires et l'appel. */
function Order({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <>
      <PageHead d={d} id="commander" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 md:px-8 md:py-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
        <OrderForm />
        <aside className="self-start rounded-[6px] bg-cream-deep p-6 lg:sticky lg:top-28">
          <h2 className="font-semibold">{d.infos.address}</h2>
          <p className="mt-1.5 text-muted">
            {site.address.street}, {site.address.postalCode} {site.address.city}
          </p>
          <div className="mt-5">
            <h2 className="font-semibold">{d.infos.hours}</h2>
            <div className="mt-1">
              <HoursTable lang={lang} d={d} />
            </div>
          </div>
          <p className="mt-5 text-[0.9375rem] text-muted">{d.order.aside}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`tel:${site.phoneIntl}`} className="btn-line">
              <PhoneIcon className="h-4 w-4" />
              {site.phone}
            </a>
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-line">
              <PinIcon />
              {d.nav.directions}
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}

function Legal({ d }: { d: Dict }) {
  const l = d.legal;
  const todo = <span className="text-red">{l.toFill}</span>;
  const rows: [string, React.ReactNode][] = [
    [
      l.editor,
      <span key="e">
        {site.legal.company}, {site.address.street}, {site.address.postalCode} {site.address.city} · {site.phone}
      </span>,
    ],
    [l.siret, site.legal.siret || todo],
    [l.director, site.legal.director || todo],
    [l.host, site.legal.host],
    [l.photos, l.photosText],
    [l.data, l.dataText],
  ];
  return (
    <>
      <PageHead d={d} id="legal" />
      <dl className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        {rows.map(([k, v]) => (
          <div key={k} className="border-b border-line py-5">
            <dt className="font-semibold">{k}</dt>
            <dd className="mt-1 text-muted">{v}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

export default async function Page({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const id = pageOfSlug(slug, lang);
  if (!id) notFound();
  const d = getDict(lang);

  let body: React.ReactNode;
  if (id === "carte")
    body = (
      <>
        <PageHead d={d} id="carte">
          <TrustLine lang={lang} d={d} />
        </PageHead>
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
          <MenuTabs />
        </div>
        <Faq lang={lang} d={d} />
      </>
    );
  else if (id === "commander") body = <Order lang={lang} d={d} />;
  else if (id === "plateaux")
    body = (
      <>
        <PageHead d={d} id="plateaux" />
        <div className="mt-10">
          <Trays lang={lang} d={d} />
        </div>
      </>
    );
  else if (id === "paris15")
    body = <Local lang={lang} d={d} id="paris15" photos={[best("/media/pains/baguette-tradition.jpg", "/media/boutique/rayons-pains.jpg"), "/media/viennoiseries/croissant-framboise-cruffin.jpg", "/media/patisseries/tarte-framboise.jpg"]} />;
  else if (id === "cambronne") body = <Local lang={lang} d={d} id="cambronne" photos={["/media/facade/facade.jpg", "/media/viennoiseries/panier-cappuccinos.jpg", "/media/patisseries/macarons-cafe.jpg"]} />;
  else body = <Legal d={d} />;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd(lang, id)) }} />
      {body}
    </>
  );
}
