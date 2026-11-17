/* =========================================================
   ✏️  EDIT YOUR SHOP DETAILS HERE
   ========================================================= */
export const CONFIG = {
  /* 🔎 SEO: your website address, used for Google (sitemap, page links) and share previews.
     Put your Cloudflare address here, e.g. "https://bbc-site.pages.dev", and change it to your
     own domain once you have one, e.g. "https://www.bbckotli.pk".
     (Or leave it "" and set NEXT_PUBLIC_SITE_URL in Cloudflare → your project → Settings → Variables.) */
  siteUrl: "",
  name: "BBC – Bismillah Battery Center",
  /* 📍 The business name exactly as it appears on your Google Maps listing (Google Business Profile).
     Google matches the website to the listing by name, address and phone, so keep all three identical. */
  businessName: "Bismillah Battery Center",
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
  /* 📍 Link to your Google Maps listing: open it on Google Maps → Share → Copy link, and paste it here.
     The site then links to it (and tells Google they are the same business). Leave "" until you have it. */
  googleBusinessUrl: "",
  /* 📍 Exact map position of the shop. On Google Maps, right-click the shop's pin and click the numbers
     at the top to copy them, e.g. { lat: 33.51, lng: 73.90 }. Leave null until you have the real numbers. */
  geo: null as { lat: number; lng: number } | null,
  /* Other official pages of the shop, as full links, e.g. "https://www.facebook.com/yourpage". */
  socials: [] as string[],
  /* 🔎 Date the website's content last changed (year-month-day). Google reads it from the sitemap,
     so update it when you add products, change prices or add pages. */
  contentUpdated: "2026-11-17",
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
  "http://localhost:3000"
).replace(/\/$/, "");

export const GA_ID = (CONFIG.gaId || process.env.NEXT_PUBLIC_GA_ID || "").trim();

export const rs =(n: number) => "Rs " + Math.round(n).toLocaleString("en-US");
export const waLink = (msg: string) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
export const telLink = () => `tel:${CONFIG.phoneLink}`;
