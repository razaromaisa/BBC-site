import { CATEGORIES, FAQS, PRODUCTS, categoryHref, type Category } from "@/lib/data";
import { CONFIG, SITE_URL, rs } from "@/lib/config";

/* Structured data so Google understands the shop: local business, opening hours, products & FAQs. */

function Ld({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here except for "</", which we escape.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Shop details: included on every page. */
export function BusinessJsonLd() {
  const prices = PRODUCTS.map((p) => p.price);
  const business = {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    "@id": `${SITE_URL}/#store`,
    name: CONFIG.name,
    alternateName: ["Bismillah Battery Center", "BBC Kotli", "بسم اللہ بیٹری سینٹر"],
    description:
      "Solar panels, hybrid inverters, lithium, tubular and dry batteries, UPS, fans, ACs, home appliances and CCTV cameras, with solar installation and after-sales service.",
    url: SITE_URL,
    image: [`${SITE_URL}/opengraph-image`, `${SITE_URL}/images/site/hero.jpg`],
    logo: `${SITE_URL}/icon.svg`,
    telephone: CONFIG.phoneLink,
    priceRange: `${rs(Math.min(...prices))} – ${rs(Math.max(...prices))}`,
    currenciesAccepted: "PKR",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Link Road, Larri Adda",
      addressLocality: CONFIG.city,
      addressRegion: CONFIG.region,
      addressCountry: "PK",
    },
    areaServed: [CONFIG.city, CONFIG.region],
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "21:00",
    }],
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.mapQuery || CONFIG.address)}`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONFIG.phoneLink,
      contactType: "sales",
      availableLanguage: ["English", "Urdu"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Solar, batteries & home appliances",
      itemListElement: CATEGORIES.map((c) => ({
        "@type": "OfferCatalog",
        name: c.name,
        url: `${SITE_URL}${categoryHref(c.key)}`,
        itemListElement: PRODUCTS.filter((p) => p.cat === c.key).map((p) => ({
          "@type": "Offer",
          price: p.price,
          priceCurrency: "PKR",
          availability: "https://schema.org/InStock",
          itemOffered: { "@type": "Product", name: p.name, description: p.spec, ...(p.img ? { image: `${SITE_URL}${p.img}` } : {}) },
        })),
      })),
    },
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Solar system installation", description: "Free site survey, system design, installation and after-sales service." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CCTV camera installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "UPS & battery installation" } },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: CONFIG.name,
    inLanguage: "en-PK",
    publisher: { "@id": `${SITE_URL}/#store` },
  };

  return <Ld data={[business, website]} />;
}

/** FAQ answers: home page only (where the FAQs are shown). */
export function FaqJsonLd() {
  return (
    <Ld data={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    }} />
  );
}

/** Breadcrumb trail ("Home › Page") that Google can show under the page title. */
export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <Ld data={{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        item: it.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${it.path}`,
      })),
    }} />
  );
}

/** Products listed on a category page. */
export function CategoryJsonLd({ c }: { c: Category }) {
  const items = PRODUCTS.filter((p) => p.cat === c.key);
  return (
    <Ld data={{
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: c.name,
      url: `${SITE_URL}${categoryHref(c.key)}`,
      numberOfItems: items.length,
      itemListElement: items.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          description: p.spec,
          ...(p.img ? { image: `${SITE_URL}${p.img}` } : {}),
          offers: {
            "@type": "Offer",
            price: p.price,
            priceCurrency: "PKR",
            availability: "https://schema.org/InStock",
            seller: { "@id": `${SITE_URL}/#store` },
          },
        },
      })),
    }} />
  );
}
