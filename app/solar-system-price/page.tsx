import Link from "next/link";
import { CONFIG, rs, telLink, waLink } from "@/lib/config";
import { PRODUCTS, categoryHref } from "@/lib/data";
import { AJK_PAGE, PRICE_PAGE } from "@/lib/areas";
import { SUN, dailyUnits, fmtNum, middayWatts } from "@/lib/energy";
import { pageMeta } from "@/lib/seo";
import { CategoryGrid } from "@/components/Products";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { PhoneIcon, WaIcon } from "@/components/Icons";

/* Owns "solar system price in Kotli / AJK" and "3kW / 5kW / 10kW solar system price".
   Every price here comes from the products in lib/data.ts, so it updates when you edit them:
   - Complete systems: solar products with `watts` of 1000 or more (e.g. the 5kW system).
   - Panels: solar products under 1000 W. Inverters: products with `maxLoad`. Batteries: products with `batt`. */
const SYSTEMS = PRODUCTS.filter((p) => p.cat === "solar" && (p.watts ?? 0) >= 1000).sort((a, b) => a.watts! - b.watts!);
const PANELS = PRODUCTS.filter((p) => p.cat === "solar" && p.watts && p.watts < 1000);
const INVERTERS = PRODUCTS.filter((p) => p.cat === "solar" && p.maxLoad);
const LITHIUM = PRODUCTS.filter((p) => p.batt && p.batt.usable >= 0.9);

const REF_PANEL_W = PANELS[0]?.watts ?? 585;
const perWatt = PANELS.length ? Math.min(...PANELS.map((p) => p.price / p.watts!)) : 0;
const minPrice = (list: typeof PRODUCTS) => (list.length ? Math.min(...list.map((p) => p.price)) : 0);

/* Typical daytime use for each size (an inverter AC uses about 1,200 W, a ceiling fan about 80 W). */
const SIZES = [
  { kw: 3, runs: "Fans, lights, fridge, TV and a water pump" },
  { kw: 5, runs: "All of that plus one 1.5-ton inverter AC in the day" },
  { kw: 8, runs: "Two inverter ACs, fridge, pump and washing machine" },
  { kw: 10, runs: "Big homes: three inverter ACs and the full house" },
  { kw: 15, runs: "Shops, offices and large houses" },
];

const fiveKw = SYSTEMS.find((s) => s.watts === 5000);
const FAQS = [
  {
    q: `What is the price of a 5kW solar system in ${CONFIG.city}?`,
    a: fiveKw
      ? `Our complete 5kW solar system (${fiveKw.spec.toLowerCase()}) starts from ${rs(fiveKw.price)}. The final price depends on the panel and inverter brand, whether you add batteries, and your roof. We confirm it after the site survey.`
      : `It depends on the panel and inverter brand, whether you add batteries, and your roof. Send us your electricity bill and roof photos on WhatsApp for a quote.`,
  },
  {
    q: "How many solar panels do I need for a 5kW system?",
    a: `About ${Math.ceil(5000 / REF_PANEL_W)} panels of ${REF_PANEL_W} W, which together make roughly ${fmtNum(dailyUnits(5000), 0)} units (kWh) a day on average in ${CONFIG.city}.`,
  },
  {
    q: "Is a battery included in the solar system price?",
    a: "Each package lists exactly what is included. Batteries are optional: a hybrid inverter runs your home on solar and the grid without them, and you can add lithium or tubular batteries for backup during load-shedding.",
  },
  {
    q: "Why do solar prices change?",
    a: "Panel, inverter and battery prices follow the market and the dollar rate, so they can change from month to month. We confirm the final price on the day of your quote.",
  },
];

export const metadata = pageMeta({
  title: `Solar System Price in ${CONFIG.city}, AJK: 3kW to 15kW`,
  description: `Solar system prices in ${CONFIG.city} and Azad Kashmir: complete packages, panel price per watt, inverters and batteries, and what 3kW to 15kW systems run.`,
  path: PRICE_PAGE,
});

export default function SolarPricePage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li aria-current="page">Solar system prices</li>
            </ol>
          </nav>
          <h1>Solar system prices in {CONFIG.city} &amp; Azad Kashmir</h1>
          <p className="page-intro">
            Current prices for complete solar systems, panels, inverters and batteries at {CONFIG.businessName}, plus a guide to what each
            system size can run. Prices are in PKR and follow market rates; we confirm the final price after a free site survey.
          </p>
          <div className="page-ctas">
            <a className="btn btn-wa" href={waLink("Assalam o Alaikum! I want a price for a solar system. My electricity bill / appliances: ")} target="_blank" rel="noopener">
              <WaIcon /> Get my price on WhatsApp
            </a>
            <a className="btn btn-outline" href={telLink()}><PhoneIcon /> {CONFIG.phone}</a>
          </div>

          <div className="price-stats">
            {perWatt > 0 && (
              <Link href={categoryHref("solar")} className="price-stat">
                <small>Solar panels</small><strong>{rs(perWatt)}<span> / watt</span></strong><em>from, A-grade panels</em>
              </Link>
            )}
            {INVERTERS.length > 0 && (
              <Link href={categoryHref("solar")} className="price-stat">
                <small>Hybrid inverters</small><strong>{rs(minPrice(INVERTERS))}</strong><em>from</em>
              </Link>
            )}
            {LITHIUM.length > 0 && (
              <Link href={categoryHref("ups")} className="price-stat">
                <small>Lithium batteries</small><strong>{rs(minPrice(LITHIUM))}</strong><em>from</em>
              </Link>
            )}
          </div>
        </div>
      </section>

      {SYSTEMS.length > 0 && (
        <section className="section section-soft" aria-labelledby="packages">
          <div className="container">
            <div className="sec-head">
              <div>
                <p className="eyebrow">Installed packages</p>
                <h2 id="packages">Complete solar systems</h2>
                <p className="sec-sub">Packages include the equipment listed on each card. Add batteries if you want backup at night and during load-shedding.</p>
              </div>
            </div>
            <CategoryGrid products={SYSTEMS} />
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="sizes">
        <div className="container">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Size guide</p>
              <h2 id="sizes">Which size solar system do you need?</h2>
              <p className="sec-sub">Estimates for {CONFIG.city} with {REF_PANEL_W} W panels and about {SUN.avg} hours of strong sun a day.</p>
            </div>
          </div>
          <div className="size-grid">
            {SIZES.map(({ kw, runs }) => {
              const w = kw * 1000;
              const system = SYSTEMS.find((s) => s.watts === w);
              return (
                <article className="size-card" key={kw}>
                  <h3>{kw} kW solar system</h3>
                  <p className="size-runs">{runs}</p>
                  <dl>
                    <div><dt>Panels</dt><dd>{Math.ceil(w / REF_PANEL_W)} × {REF_PANEL_W} W</dd></div>
                    <div><dt>Units a day</dt><dd>≈ {fmtNum(dailyUnits(w), 0)}</dd></div>
                    <div><dt>Units a month</dt><dd>≈ {fmtNum(dailyUnits(w) * 30, 0)}</dd></div>
                    <div><dt>Power at noon</dt><dd>≈ {fmtNum(middayWatts(w))} W</dd></div>
                  </dl>
                  {system
                    ? <p className="size-price">From <strong>{rs(system.price)}</strong> installed</p>
                    : <a className="size-quote" href={waLink(`Assalam o Alaikum! What is the price of a ${kw}kW solar system?`)} target="_blank" rel="noopener">Ask for {kw} kW price →</a>}
                </article>
              );
            })}
          </div>
          <p className="cat-note">
            Want an exact size? Use the <a href="/#calculator">solar &amp; backup calculator</a>. We install across{" "}
            <Link href={AJK_PAGE}>all of Azad Kashmir</Link>.
          </p>

          <h2 className="sub-title">What affects the price</h2>
          <ul className="tick-list wide">
            <li><strong>Panel type and brand:</strong> Mono PERC or N-type bifacial, and Tier-1 brands like Longi or Jinko.</li>
            <li><strong>Inverter:</strong> hybrid inverter size and brand, with or without Wi-Fi monitoring.</li>
            <li><strong>Batteries:</strong> none, tubular or lithium, and how many hours of backup you want.</li>
            <li><strong>Roof and structure:</strong> flat roof, slanted roof or raised structure, and cable length.</li>
            <li><strong>Market rates:</strong> prices follow the dollar rate, so we confirm them on the day of your quote.</li>
          </ul>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="price-faq">
        <div className="container narrow">
          <h2 id="price-faq" className="sub-title">Solar price questions</h2>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <details className="faq-item" key={f.q} open={i === 0}>
                <summary><h3>{f.q}</h3><span className="faq-plus" aria-hidden="true" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <BreadcrumbJsonLd items={[{ name: "Solar system prices", path: PRICE_PAGE }]} />
      <FaqJsonLd faqs={FAQS} />
    </>
  );
}
