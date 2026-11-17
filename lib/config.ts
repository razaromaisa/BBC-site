/* =========================================================
   ✏️  EDIT YOUR SHOP DETAILS HERE
   ========================================================= */
export const CONFIG = {
  /* 🔎 SEO: put your real website address here once you have a domain, e.g. "https://www.bbckotli.pk".
     If left "", Vercel's address is used automatically (or localhost while developing). */
  siteUrl: "",
  name: "BBC – Bismillah Battery Center",
  shortName: "BBC",
  titleSuffix: "BBC Kotli", // added after every page title: "Page name | BBC Kotli"
  city: "Kotli",
  region: "Azad Jammu & Kashmir",
  phone: "0342 5044061", // shown on the site (same number for calls & WhatsApp)
  phoneLink: "+923425044061", // used for the "Call" buttons: +92 then the number without the first 0
  whatsapp: "923425044061", // digits only: 92 + number without the first 0, no "+" or spaces
  address: "Link Road, Larri Adda, Kotli, Azad Kashmir",
  hours: "Mon – Sun: 9:00 AM – 9:00 PM",
  mapQuery: "Link Road, Larri Adda, Kotli, Azad Kashmir", // what the Google Map shows – leave "" to hide the map
  /* 📈 Google Analytics 4 "Measurement ID" (looks like "G-ABC123XYZ").
     Get it from analytics.google.com → Admin → Data streams → Web. Leave "" to turn analytics off. */
  gaId: "",
  /* Date shown at the top of the Privacy Policy. Update it whenever you change the policy. */
  privacyUpdated: "12 November 2026",
  brands: [
    "Longi", "Jinko", "Canadian Solar", "JA Solar", "Inverex", "Growatt", "Knox", "Homage",
    "Exide", "AGS", "Osaka", "Phoenix", "Dawlance", "Haier", "Orient", "Gree", "Pak Fan",
    "Hikvision", "Dahua",
  ],
};

/* ---------- helpers ---------- */
export const SITE_URL = (
  CONFIG.siteUrl ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "http://localhost:3000"
).replace(/\/$/, "");

export const GA_ID = (CONFIG.gaId || process.env.NEXT_PUBLIC_GA_ID || "").trim();

export const rs =(n: number) => "Rs " + Math.round(n).toLocaleString("en-US");
export const waLink = (msg: string) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
export const telLink = () => `tel:${CONFIG.phoneLink}`;
