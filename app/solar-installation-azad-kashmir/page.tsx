import Image from "next/image";
import Link from "next/link";
import { CONFIG, telLink, waLink } from "@/lib/config";
import { categoryHref } from "@/lib/data";
import { AJK_PAGE, PRICE_PAGE, REGIONS } from "@/lib/areas";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbJsonLd, FaqJsonLd, SolarServiceJsonLd } from "@/components/JsonLd";
import { PhoneIcon, PinIcon, WaIcon } from "@/components/Icons";

/* Owns the searches "solar installation Azad Kashmir / AJK" and "solar company" + a district or town
   (Mirpur, Muzaffarabad, Rawalakot…). The home page owns "solar installation Kotli". */
const LEAD =
  `${CONFIG.businessName} is a solar company based in ${CONFIG.city} that supplies and installs complete solar systems across Azad Jammu & Kashmir, from Mirpur and Bhimber to Muzaffarabad, Rawalakot, Bagh and the Neelum Valley.`;

export const metadata = pageMeta({
  title: "Solar Installation in Azad Kashmir (AJK)",
  description: `Solar panel installation across Azad Kashmir: Kotli, Mirpur, Bhimber, Muzaffarabad, Rawalakot, Bagh & more. Site survey, design, install & after-sales.`,
  path: AJK_PAGE,
});

const INCLUDED = [
  { t: "Site survey", d: "We check your roof, shading, sun path and wiring, and list the appliances you want to run." },
  { t: "System design & quote", d: "Panel count, inverter size and battery bank sized for your load and your area's sun hours." },
  { t: "Equipment", d: "A-grade panels, a hybrid inverter and lithium or tubular batteries if you want backup." },
  { t: "Mounting & wiring", d: "Mounting structure, DC cables, MC4 connectors, DC breakers, surge protection and earthing." },
  { t: "Installation & testing", d: "Fitted by our team, tested, and the inverter app set up on your phone." },
  { t: "After-sales service", d: "Service checks, warranty claims handled for you, and help with net-metering paperwork." },
];

const STEPS = [
  { t: "Send your details", d: "WhatsApp us your location, a photo of the roof, a recent electricity bill and the appliances you want to run." },
  { t: "Site survey", d: `Free in ${CONFIG.city}. For other districts we arrange the visit with you when you message us.` },
  { t: "Design & quote", d: "You get a clear quote with the equipment list, so you can compare options." },
  { t: "Installation", d: "Our team installs and tests the system, then shows you how to monitor it." },
];

const FAQS = [
  { q: "Do you install solar systems outside Kotli?",
    a: `Yes. We are based in ${CONFIG.city} and install across Azad Kashmir, including Mirpur, Bhimber, Muzaffarabad, Rawalakot, Bagh, Pallandri and the Neelum and Jhelum valleys. Message us your location on WhatsApp to arrange a site survey.` },
  { q: "How can I get a solar quote if I live far from Kotli?",
    a: "Send us photos of your roof, a recent electricity bill and a list of the appliances you want to run on WhatsApp. We will suggest a system size and an estimate, then confirm everything at the site survey." },
  { q: "Do solar panels work in cold and snowy areas like Rawalakot and Neelum?",
    a: "Yes. Panels produce more power per hour of sun when they are cold. Output is lower in winter because days are shorter and snow can cover the panels, so we fit panels at a steeper angle and size the system for your winter sun hours." },
  { q: "Do you help with net metering?",
    a: "Yes. We help you with the net-metering paperwork for your system, so you can send extra solar power to the grid." },
];

export default function AjkInstallationPage() {
  return (
    <>
      <section className="page-head">
        <div className="container page-head-grid">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li aria-current="page">Solar installation in Azad Kashmir</li>
              </ol>
            </nav>
            <h1>Solar installation across Azad Kashmir</h1>
            <p className="page-intro">{LEAD}</p>
            <div className="page-ctas">
              <a className="btn btn-wa" href={waLink("Assalam o Alaikum! I want a solar system installed. My location is: ")} target="_blank" rel="noopener">
                <WaIcon /> Get a quote on WhatsApp
              </a>
              <a className="btn btn-outline" href={telLink()}><PhoneIcon /> {CONFIG.phone}</a>
            </div>
          </div>
          <div className="page-head-photo">
            <Image src="/images/site/installer.jpg" alt="Installer fitting a solar panel on a house roof" fill sizes="(max-width: 900px) 100vw, 480px" priority />
          </div>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="areas-title">
        <div className="container">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Areas we cover</p>
              <h2 id="areas-title">Every district of Azad Kashmir</h2>
              <p className="sec-sub">Solar works differently in the hot plains and the cold valleys. Here is what we look at in each part of AJK.</p>
            </div>
          </div>
          <div className="region-list">
            {REGIONS.map((r) => (
              <article className="region" id={r.id} key={r.id}>
                <h3>{r.name}</h3>
                <ul className="district-list">
                  {r.districts.map((d) => (
                    <li key={d.name}><strong>{d.name} district</strong><span>{d.towns.join(", ")}</span></li>
                  ))}
                </ul>
                <ul className="tick-list">{r.notes.map((n) => <li key={n}>{n}</li>)}</ul>
              </article>
            ))}
          </div>
          <p className="cat-note">Don&apos;t see your town? We still cover it. <a href={waLink("Assalam o Alaikum! Do you install solar in my area? My location is: ")} target="_blank" rel="noopener">Ask us on WhatsApp</a>.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="incl-title">
        <div className="container">
          <div className="sec-head">
            <div>
              <p className="eyebrow">What you get</p>
              <h2 id="incl-title">What every installation includes</h2>
            </div>
          </div>
          <div className="incl-grid">
            {INCLUDED.map((it) => (
              <div className="incl" key={it.t}><h3>{it.t}</h3><p>{it.d}</p></div>
            ))}
          </div>

          <h2 className="sub-title">How it works</h2>
          <ol className="step-list">
            {STEPS.map((s) => <li key={s.t}><strong>{s.t}</strong><span>{s.d}</span></li>)}
          </ol>

          <p className="cat-note">
            See <Link href={PRICE_PAGE}>solar system prices and sizes</Link>, browse <Link href={categoryHref("solar")}>solar panels &amp; inverters</Link> and{" "}
            <Link href={categoryHref("ups")}>lithium batteries</Link>, or work out your system with the <a href="/#calculator">solar calculator</a>.
          </p>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="ajk-faq">
        <div className="container narrow">
          <h2 id="ajk-faq" className="sub-title">Questions about solar installation in AJK</h2>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <details className="faq-item" key={f.q} open={i === 0}>
                <summary><h3>{f.q}</h3><span className="faq-plus" aria-hidden="true" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <div className="visit">
            <span className="c-ico"><PinIcon /></span>
            <p><strong>Visit the shop:</strong> {CONFIG.address}. {CONFIG.hours}.</p>
            <a href="/#contact">Directions &amp; contact →</a>
          </div>
        </div>
      </section>

      <BreadcrumbJsonLd items={[{ name: "Solar installation in Azad Kashmir", path: AJK_PAGE }]} />
      <SolarServiceJsonLd description={LEAD} />
      <FaqJsonLd faqs={FAQS} />
    </>
  );
}
