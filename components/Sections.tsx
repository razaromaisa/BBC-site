import Image from "next/image";
import Link from "next/link";
import { BATTERY_GUIDE, CATEGORIES, FAQS, PRODUCTS, REVIEWS, WARRANTY } from "@/lib/data";
import { CONFIG, telLink, waLink } from "@/lib/config";
import CatLink from "./CatLink";
import { Art, CategoryMedia, ProductMedia } from "./Art";
import { ArrowIcon, BrandMark, ClockIcon, PhoneIcon, PinIcon, ShieldIcon, WaIcon, WrenchIcon } from "./Icons";


/* ---------- Announcement bar ---------- */
export function Announcement() {
  return (
    <div className="announce">
      <div className="container announce-inner">
        <p><strong>150+ solar projects</strong> completed in {CONFIG.city} &amp; nearby &nbsp;·&nbsp; Free site survey for solar systems</p>
        <div className="announce-right">
          <span>{CONFIG.hours}</span>
          <a href={telLink()}>{CONFIG.phone}</a>
        </div>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */
export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <article className="hero-main">
          <Image className="hero-img" src="/images/site/hero.jpg" alt="Rows of solar panels on a large roof at sunset" fill priority sizes="(max-width: 1024px) 100vw, 900px" />
          <div className="hero-shade" />
          <div className="hero-content">
            <span className="hero-kicker">Bismillah Battery Center · {CONFIG.city}, AJK</span>
            <h1>Power your home with <span className="gold-text">clean solar energy</span></h1>
            <p className="hero-sub">Hybrid inverters, premium solar panels, lithium batteries and complete installation, all from one trusted name in {CONFIG.city}, Azad Kashmir.</p>
            <div className="hero-ctas">
              <a className="btn btn-gold" href={waLink("Assalam o Alaikum! I want a free quote for a solar system for my home.")} target="_blank" rel="noopener">
                Get Free Solar Quote <ArrowIcon />
              </a>
              <CatLink cat="solar" className="btn btn-glass">Shop Solar Products</CatLink>
            </div>
            <div className="hero-stats">
              <div><strong>150+</strong><span>Solar projects completed</span></div>
              <div><strong>Hybrid</strong><span>Inverters &amp; N-type panels</span></div>
              <div><strong>A–Z</strong><span>Survey, install &amp; service</span></div>
            </div>
          </div>
        </article>

        <div className="hero-side">
          <CatLink cat="ups" className="promo promo-bat">
            <div className="promo-text">
              <span className="promo-kicker">UPS &amp; Batteries</span>
              <h3>Lithium, tubular &amp; dry batteries</h3>
              <span className="promo-link">Shop now <b>→</b></span>
            </div>
            <div className="promo-art"><Art name="catBattery" /></div>
          </CatLink>
          <CatLink cat="cctv" className="promo promo-photo">
            <Image src="/images/site/cctv.jpg" alt="" fill sizes="(max-width: 1024px) 100vw, 380px" />
            <div className="promo-text">
              <span className="promo-kicker light">CCTV Security</span>
              <h3>Cameras installed &amp; configured</h3>
              <span className="promo-link">Explore <b>→</b></span>
            </div>
          </CatLink>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust strip ---------- */
export function TrustStrip() {
  const items = [
    { icon: <ShieldIcon />, title: "100% Genuine", sub: "Original, sealed products" },
    { icon: <svg viewBox="0 0 24 24"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-7 14-5-5 1.4-1.4 3.6 3.6 6.6-6.6L20 9l-8 8Z" /></svg>, title: "Official Warranty", sub: "We handle your claims" },
    { icon: <WrenchIcon />, title: "Expert Installation", sub: "Solar, UPS & CCTV" },
    { icon: <svg viewBox="0 0 24 24"><path d="M20 8h-3V4H3a2 2 0 0 0-2 2v11h2a3 3 0 0 0 6 0h6a3 3 0 0 0 6 0h2v-5l-3-4ZM6 18.5A1.5 1.5 0 1 1 6 15.5a1.5 1.5 0 0 1 0 3Zm13.5-9 2 2.5H17V9.5h2.5ZM18 18.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" /></svg>, title: "Home Delivery", sub: "Delivered to your door" },
  ];
  return (
    <section className="trust">
      <div className="container trust-grid">
        {items.map((it) => (
          <div className="trust-item" key={it.title}>
            <span className="t-ico">{it.icon}</span>
            <div><strong>{it.title}</strong><small>{it.sub}</small></div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Categories ---------- */
export function Categories() {
  return (
    <section className="section" id="categories">
      <div className="container">
        <div className="sec-head">
          <div>
            <p className="eyebrow">Shop by category</p>
            <h2>Everything for your home&apos;s power &amp; comfort</h2>
          </div>
          <CatLink cat="all" className="view-all">Browse all products <b>→</b></CatLink>
        </div>
        <div className="cat-grid">
          {CATEGORIES.map((c) => (
            <CatLink key={c.key} cat={c.key} className="cat-tile reveal">
              <span className="cat-art" style={{ background: c.tint }}><CategoryMedia c={c} decorative /></span>
              <span className="cat-info"><strong>{c.name}</strong><small>{PRODUCTS.filter((p) => p.cat === c.key).length} products</small></span>
              <span className="cat-arrow" aria-hidden="true">→</span>
            </CatLink>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Solar showcase ---------- */
export function SolarSection() {
  const items = [
    { t: "Hybrid Solar Inverters", d: "Run on solar, battery and grid, with or without batteries.", icon: "M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm1 3v5h10V5H7Zm1 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" },
    { t: "Solar Panels", d: "Mono PERC and N-type bifacial panels for maximum output.", icon: "M3 20 6 9h15l-3 11H3Zm5.4-9-.8 3h3.2l.8-3H8.4Zm4.8 0-.8 3h3.2l.8-3h-3.2ZM12 2h2v4h-2V2Z" },
    { t: "All Accessories", d: "Structures, DC cables, MC4, breakers, SPDs and earthing.", icon: "M7 2v6H4v4a8 8 0 0 0 7 7.9V22h2v-2.1a8 8 0 0 0 7-7.9V8h-3V2h-2v6H9V2H7Z" },
    { t: "Services & Installation", d: "Site survey, installation, net-metering help and maintenance.", icon: "M22.7 19.3 13.6 10.2c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6.3 6 9.3 1.6 5C.4 7.4.9 10.4 2.9 12.4c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1 .1-1.4Z" },
  ];
  return (
    <section className="solar" id="solar">
      <div className="container solar-grid">
        <div className="solar-media reveal">
          <Image src="/images/site/installer.jpg" alt="Installer lifting a solar panel into place on a house roof" width={1200} height={900} sizes="(max-width: 1024px) 100vw, 600px" />
          <div className="solar-badge">
            <strong>150<span>+</span></strong>
            <small>Solar projects<br />completed by BBC</small>
          </div>
        </div>

        <div className="solar-copy">
          <p className="eyebrow gold">Solar solutions</p>
          <h2>Complete solar systems, designed &amp; installed by our team</h2>
          <p className="solar-sub">From a single panel to a full hybrid system, we supply the equipment, install it properly and stay with you for service.</p>
          <div className="solar-list">
            {items.map((it) => (
              <div className="s-item reveal" key={it.t}>
                <span className="s-ico"><svg viewBox="0 0 24 24"><path d={it.icon} /></svg></span>
                <div><h4>{it.t}</h4><p>{it.d}</p></div>
              </div>
            ))}
          </div>
          <ol className="steps">
            <li><b>01</b>Site survey</li>
            <li><b>02</b>System design</li>
            <li><b>03</b>Installation</li>
            <li><b>04</b>After-sales</li>
          </ol>
          <div className="solar-ctas">
            <a className="btn btn-gold" href={waLink("Assalam o Alaikum! I want to book a free site survey for solar installation.")} target="_blank" rel="noopener">Book Free Site Survey</a>
            <a className="btn btn-glass" href={telLink()}><PhoneIcon /> Call an Expert</a>
            <a className="btn btn-glass" href="#calculator">Calculate Solar Output →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Battery guide ---------- */
export function BatteryGuide() {
  return (
    <section className="section" id="batteries">
      <div className="container">
        <div className="sec-head center">
          <div>
            <p className="eyebrow">Battery guide</p>
            <h2>Which battery is right for you?</h2>
            <p className="sec-sub">We stock lithium, acid (tubular) and dry batteries, plus car and bike batteries.</p>
          </div>
        </div>
        <div className="bat-grid">
          {BATTERY_GUIDE.map((b) => (
            <article className="bat-card reveal" key={b.name}>
              <div className="bat-art"><ProductMedia p={PRODUCTS.find((x) => x.art === b.art)!} sizes="(max-width: 640px) 90vw, 360px" /></div>
              <span className={`bat-tag ${b.tagClass}`}>{b.tag}</span>
              <h3>{b.name}</h3>
              <p className="bat-best"><span>Best for</span>{b.best}</p>
              <ul>{b.points.map((x) => <li key={x}>{x}</li>)}</ul>
              <CatLink as="button" cat="ups" query={b.search} className="btn btn-outline btn-block">Shop {b.short} batteries</CatLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Warranty ---------- */
export function Warranty() {
  return (
    <section className="section section-soft" id="warranty">
      <div className="container warranty">
        <div className="w-intro">
          <p className="eyebrow">Warranty &amp; support</p>
          <h2>Buy with confidence</h2>
          <p className="sec-sub">Every product comes with its official brand warranty. If anything goes wrong, bring it to BBC and we&apos;ll handle the claim with the company for you.</p>
          <ul className="w-points">
            <li>Keep your bill or warranty card safe</li>
            <li>We process claims on your behalf</li>
            <li>On-site checks for installed systems</li>
          </ul>
        </div>
        <div className="w-grid">
          {WARRANTY.map((w) => (
            <div className="w-card reveal" key={w.title}>
              <span className="w-ico"><svg viewBox="0 0 24 24"><path d={w.icon} /></svg></span>
              <small>{w.title}</small>
              <strong>{w.value}</strong>
              <p>{w.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ (also sent to Google as structured data, see JsonLd.tsx) ---------- */
export function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-wrap">
        <div className="faq-intro">
          <p className="eyebrow">Questions &amp; answers</p>
          <h2 id="faq-title">Solar &amp; battery FAQs</h2>
          <p className="sec-sub">Quick answers to what customers in {CONFIG.city} ask us most. Still unsure? Ask us on WhatsApp.</p>
          <a className="btn btn-wa" href={waLink("Assalam o Alaikum! I have a question about solar / batteries.")} target="_blank" rel="noopener"><WaIcon /> Ask a question</a>
        </div>
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
  );
}

/* ---------- Brands marquee ---------- */
export function Brands() {
  return (
    <section className="brands" aria-label="Brands we deal in">
      <div className="container">
        <h2 className="brands-title">Brands we deal in</h2>
        <ul className="brand-list">
          {CONFIG.brands.map((b) => <li key={b}>{b}</li>)}
        </ul>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
export function CtaBand() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-card">
          <Image src="/images/site/cta.jpg" alt="" fill sizes="100vw" />
          <div className="cta-shade" />
          <div className="cta-content">
            <h2>Tired of load-shedding and high bills?</h2>
            <p>Tell us your appliances and we&apos;ll suggest the right solar or UPS system, free.</p>
          </div>
          <div className="cta-actions">
            <a className="btn btn-gold" href={waLink("Assalam o Alaikum! I want a recommendation for solar / UPS for my home.")} target="_blank" rel="noopener">Get Recommendation</a>
            <a className="btn btn-glass" href={telLink()}>Call Now</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact info + map (form is a client component) ---------- */
export function ContactInfo() {
  return (
    <div className="contact-left">
      <div className="c-cards">
        <div className="c-card"><span className="c-ico"><PinIcon /></span><div><small>Shop address</small><strong>{CONFIG.address}</strong></div></div>
        <a className="c-card" href={telLink()}><span className="c-ico"><PhoneIcon /></span><div><small>Phone</small><strong>{CONFIG.phone}</strong></div></a>
        <a className="c-card" href={waLink("Assalam o Alaikum!")} target="_blank" rel="noopener"><span className="c-ico wa"><WaIcon /></span><div><small>WhatsApp</small><strong>Chat with us</strong></div></a>
        <div className="c-card"><span className="c-ico"><ClockIcon /></span><div><small>Opening hours</small><strong>{CONFIG.hours}</strong></div></div>
      </div>
      <div className="map">
        {CONFIG.mapQuery ? (
          <iframe title="Shop location" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(CONFIG.mapQuery)}&output=embed`} />
        ) : (
          <div className="map-ph">
            <div>
              <span className="map-pin" />
              <b>Visit our shop</b>
              <p>{CONFIG.address}</p>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.address)}`} target="_blank" rel="noopener">Open in Google Maps →</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container f-grid">
        <div className="f-brand">
          <Link href="/" className="brand brand-light" aria-label="BBC – Bismillah Battery Center, home"><BrandMark bg="#16294A" /><span className="brand-text"><strong>BBC</strong><small>Bismillah Battery Center</small></span></Link>
          <p>Solar systems, batteries, UPS, home appliances and CCTV, with honest advice, genuine products and reliable after-sales service.</p>
          <p className="urdu" lang="ur" dir="rtl">بسم اللہ بیٹری سینٹر</p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>{CATEGORIES.map((c) => <li key={c.key}><CatLink cat={c.key}>{c.name}</CatLink></li>)}</ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="/#solar">Solar Installation</a></li>
            <li><a href="/#calculator">Solar Calculator</a></li>
            <li><a href="/#faq">FAQs</a></li>
            <li><a href="/#batteries">Battery Guide</a></li>
            <li><a href="/#warranty">Warranty</a></li>
            {REVIEWS.length > 0 && <li><a href="/#reviews">Reviews</a></li>}
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="f-contact">
            <li><PinIcon /><span>{CONFIG.address}</span></li>
            <li><PhoneIcon /><a href={telLink()}>{CONFIG.phone}</a></li>
            <li><WaIcon /><a href={waLink("Assalam o Alaikum!")} target="_blank" rel="noopener">WhatsApp: {CONFIG.phone}</a></li>
            <li><ClockIcon /><span>{CONFIG.hours}</span></li>
          </ul>
        </div>
      </div>
      <div className="container f-bottom">
        <span>© {new Date().getFullYear()} BBC – Bismillah Battery Center. All rights reserved.</span>
        <span className="f-legal">
          Prices may change with market rates. · <Link href="/privacy-policy">Privacy Policy</Link> · <Link href="/photo-credits">Photo credits</Link>
        </span>
      </div>
    </footer>
  );
}
