import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, PRODUCTS, categoryBySlug, categoryHref } from "@/lib/data";
import { CONFIG, telLink, waLink } from "@/lib/config";
import { pageMeta } from "@/lib/seo";
import { CategoryGrid } from "@/components/Products";
import { BreadcrumbJsonLd, CategoryJsonLd } from "@/components/JsonLd";
import { CategoryMedia } from "@/components/Art";
import { PhoneIcon, PinIcon, WaIcon } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false; // unknown categories show the 404 page

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const c = categoryBySlug((await params).slug);
  if (!c) return {};
  return pageMeta({
    title: c.metaTitle,
    description: c.metaDesc,
    path: categoryHref(c.key),
  });
}

export default async function CategoryPage({ params }: Props) {
  const c = categoryBySlug((await params).slug);
  if (!c) notFound();
  const items = PRODUCTS.filter((p) => p.cat === c.key);
  const others = CATEGORIES.filter((o) => o.key !== c.key);

  return (
    <>
      <section className="page-head">
        <div className="container page-head-grid">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/#products">Products</Link></li>
                <li aria-current="page">{c.name}</li>
              </ol>
            </nav>
            <h1>{c.h1}</h1>
            <p className="page-intro">{c.intro}</p>
            <div className="page-ctas">
              <a className="btn btn-wa" href={waLink(`Assalam o Alaikum! I'd like to ask about ${c.name}.`)} target="_blank" rel="noopener">
                <WaIcon /> Ask on WhatsApp
              </a>
              <a className="btn btn-outline" href={telLink()}><PhoneIcon /> {CONFIG.phone}</a>
            </div>
          </div>
          <div className="page-head-art" style={{ background: c.tint }}>
            <CategoryMedia c={c} />
          </div>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="cat-products">
        <div className="container">
          <div className="sec-head">
            <div>
              <h2 id="cat-products">{c.name}: {items.length} products in stock</h2>
              <p className="sec-sub">Prices in PKR. Add to cart and send the order on WhatsApp, or visit the shop on {CONFIG.address}.</p>
            </div>
          </div>
          <CategoryGrid products={items} />
          {c.key === "solar" && (
            <p className="cat-note">
              Not sure what size you need? Try the <a href="/#calculator">solar &amp; backup calculator</a>, or read the{" "}
              <a href="/#faq">solar FAQs</a>.
            </p>
          )}
          {c.key === "ups" && (
            <p className="cat-note">
              Lithium, tubular or dry? See the <a href="/#batteries">battery guide</a> or work out your backup time with the{" "}
              <a href="/#calculator">backup calculator</a>.
            </p>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="more-cats">
        <div className="container">
          <h2 id="more-cats" className="more-title">More from our shop</h2>
          <div className="more-cats">
            {others.map((o) => (
              <Link key={o.key} href={categoryHref(o.key)} className="more-cat">
                <span className="more-cat-photo" style={{ background: o.tint }}><CategoryMedia c={o} decorative /></span>
                <span>{o.name}</span>
              </Link>
            ))}
          </div>

          <div className="visit">
            <span className="c-ico"><PinIcon /></span>
            <p><strong>Visit the shop:</strong> {CONFIG.address}. {CONFIG.hours}.</p>
            <a href="/#contact">Directions &amp; contact →</a>
          </div>
        </div>
      </section>

      <BreadcrumbJsonLd items={[{ name: c.name, path: categoryHref(c.key) }]} />
      <CategoryJsonLd c={c} />
    </>
  );
}
