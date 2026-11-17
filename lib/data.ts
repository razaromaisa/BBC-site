/* =========================================================
   CATEGORIES & PRODUCTS: edit names, prices (PKR) and add your own.
   price: current price · old: crossed-out price (optional)
   from: true shows "From Rs …" · badge: small label (optional)
   img: "/images/products/photo.jpg" (optional: put the file in /public/images/products)
        to show a real photo instead of the drawing. Leave it out to keep the drawing.
   alt: short description of that photo for Google & screen readers (optional)
   watts: solar panel / system rating, shows "≈ units per day" on the card
   batt: battery energy in Wh (volts × Ah) + usable share (lithium 0.9, acid/dry 0.5)
   maxLoad: max load an inverter / UPS can run, in watts
   ========================================================= */
import { CONFIG } from "./config";

export type CategoryKey = "solar" | "ups" | "cooling" | "lights" | "irons" | "home" | "cctv";

export type Category = {
  key: CategoryKey;
  /** Web address of the category page: /products/<slug> */
  slug: string;
  name: string;
  /** Short label for the menu bar */
  short: string;
  art: string;
  tint: string;
  /** Main heading on the category page */
  h1: string;
  /** Browser-tab & Google title (the shop name is added automatically) */
  metaTitle: string;
  /** Google search snippet: keep it under ~155 characters */
  metaDesc: string;
  /** Intro paragraph at the top of the category page */
  intro: string;
};

export type Product = {
  id: string;
  cat: CategoryKey;
  art: string;
  name: string;
  spec: string;
  price: number;
  old?: number;
  from?: boolean;
  badge?: string;
  img?: string;
  alt?: string;
  watts?: number;
  batt?: { wh: number; usable: number };
  maxLoad?: number;
};

export const CATEGORIES: Category[] = [
  {
    key: "solar", slug: "solar-panels-inverters", name: "Solar Panels & Systems", short: "Solar", art: "panel", tint: "linear-gradient(160deg,#EEF4FF,#DCE7FF)",
    h1: `Solar panels, inverters & complete solar systems in ${CONFIG.city}`,
    metaTitle: `Solar Panels & Hybrid Inverters in ${CONFIG.city}, AJK`,
    metaDesc: `Mono PERC and N-type bifacial solar panels, hybrid inverters and complete installed solar systems in ${CONFIG.city}, Azad Kashmir. Free site survey, prices in PKR.`,
    intro: `We supply A-grade solar panels and hybrid inverters from brands like Longi, Jinko, Inverex and Growatt, and install complete systems in ${CONFIG.city} and nearby areas. Every job starts with a free site survey, so the system is sized to your roof and to the appliances you actually run.`,
  },
  {
    key: "ups", slug: "ups-batteries", name: "UPS & Batteries", short: "UPS & Batteries", art: "catBattery", tint: "linear-gradient(160deg,#EAFBF2,#D3F3E3)",
    h1: `UPS & batteries in ${CONFIG.city}: lithium, tubular & dry`,
    metaTitle: `Lithium, Tubular & Dry Batteries and UPS in ${CONFIG.city}`,
    metaDesc: `LiFePO4 lithium, tubular, dry and car batteries plus pure sine wave home UPS in ${CONFIG.city}, AJK. Old battery exchange and warranty claims handled at our shop.`,
    intro: "Batteries are where we started. We stock lithium (LiFePO4) packs for solar, deep-cycle tubular batteries for home UPS, sealed dry batteries and maintenance-free car batteries. Bring your old battery for an exchange price, and we will take care of warranty claims with the company for you.",
  },
  {
    key: "cooling", slug: "fans-coolers-ac", name: "Fans, Coolers & AC", short: "Fans & AC", art: "pedestalFan", tint: "linear-gradient(160deg,#ECF7FD,#D8EDF8)",
    h1: `Fans, air coolers & inverter ACs in ${CONFIG.city}`,
    metaTitle: `Ceiling Fans, Air Coolers & Inverter AC in ${CONFIG.city}`,
    metaDesc: `Energy-saving ceiling fans, DC inverter fans that run on solar and UPS, pedestal fans, room air coolers and DC inverter ACs in ${CONFIG.city}, Azad Kashmir.`,
    intro: "If you run on solar or UPS, the fan you choose matters. A DC inverter fan uses about 35 W against roughly 80 W for a standard ceiling fan, which nearly doubles your backup time. We also keep pedestal fans, room coolers and 1.5-ton DC inverter ACs.",
  },
  {
    key: "lights", slug: "lights-bulbs", name: "Lights & Bulbs", short: "Lights", art: "bulb", tint: "linear-gradient(160deg,#FFF8E6,#FFEDC2)",
    h1: "LED bulbs, tube lights, solar street lights & emergency lights",
    metaTitle: `LED Bulbs, Tube Lights & Solar Street Lights in ${CONFIG.city}`,
    metaDesc: `LED bulbs and tube lights, rechargeable emergency lights and solar street lights with built-in battery, available at our shop in ${CONFIG.city}, AJK.`,
    intro: "Low-wattage LED bulbs and tube lights for homes and shops, rechargeable emergency lights for load-shedding, and solar street lights with a built-in battery for streets, gates and boundary walls. They switch on by themselves at dusk.",
  },
  {
    key: "irons", slug: "irons-hair-styling", name: "Irons & Curlers", short: "Irons & Curlers", art: "steamIron", tint: "linear-gradient(160deg,#F5F0FF,#E7DDFF)",
    h1: "Irons, steam press & hair styling tools",
    metaTitle: `Irons, Hair Straighteners & Curlers in ${CONFIG.city}`,
    metaDesc: `Dry irons, steam irons, a standing steam press for clothes, and ceramic hair straighteners and curlers at ${CONFIG.shortName} in ${CONFIG.city}, Azad Kashmir.`,
    intro: "Dry irons and steam irons for everyday ironing, a standing steam press for suits and curtains, and ceramic hair straighteners and curlers with temperature control.",
  },
  {
    key: "home", slug: "home-appliances", name: "Home Appliances", short: "Home Appliances", art: "tv", tint: "linear-gradient(160deg,#FFF1EC,#FFE0D5)",
    h1: `Home appliances in ${CONFIG.city}`,
    metaTitle: `Home Appliances, TVs & Fridges in ${CONFIG.city}`,
    metaDesc: `Smart LED TVs, refrigerators, washing machines, microwaves, air fryers and kitchen appliances with official warranty in ${CONFIG.city}, AJK. Home delivery available.`,
    intro: `Smart LED TVs, refrigerators, washing machines and everyday kitchen appliances, all with the official brand warranty. Ask us about delivery to your home in ${CONFIG.city}.`,
  },
  {
    key: "cctv", slug: "cctv-cameras", name: "CCTV Cameras", short: "CCTV", art: "cctvPack", tint: "linear-gradient(160deg,#F1F3F7,#E1E6EE)",
    h1: `CCTV cameras & installation in ${CONFIG.city}`,
    metaTitle: `CCTV Cameras & Installation in ${CONFIG.city}, AJK`,
    metaDesc: `CCTV camera packages installed for homes, shops and offices in ${CONFIG.city}, with mobile viewing set up. Wi-Fi, bullet and dome cameras and DVR/NVR recorders.`,
    intro: "Complete CCTV packages for homes, shops and offices, installed by our team with live viewing set up on your phone. We also sell Wi-Fi cameras, outdoor bullet cameras, indoor dome cameras and DVR/NVR recorders on their own.",
  },
];

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const categoryHref = (key: string) => `/products/${CATEGORIES.find((c) => c.key === key)?.slug ?? ""}`;

export const PRODUCTS: Product[] = [
  // ── Solar
  { id: "panel-585", cat: "solar", art: "panel", name: "Mono PERC Solar Panel 585W", spec: "A-grade · Tier-1 · 585 watt", price: 16999, old: 18500, badge: "Best Seller", watts: 585 },
  { id: "panel-620", cat: "solar", art: "panelDark", name: "N-Type Bifacial Solar Panel 620W", spec: "Double glass · Both-side generation", price: 19500, badge: "New Tech", watts: 620 },
  { id: "inv-6kw", cat: "solar", art: "inverter6", name: "Hybrid Solar Inverter 6kW", spec: "Works with or without battery · Wi-Fi", price: 189000, old: 205000, badge: "Top Pick", maxLoad: 6000 },
  { id: "inv-4kw", cat: "solar", art: "inverter4", name: "Hybrid Solar Inverter 4kW", spec: "Pure sine wave · Dual MPPT", price: 139000, maxLoad: 4000 },
  { id: "sys-5kw", cat: "solar", art: "system", name: "Complete 5kW Solar System", spec: "Panels + inverter + structure + installation", price: 650000, from: true, badge: "Installed", watts: 5000 },
  { id: "solar-acc", cat: "solar", art: "accessories", name: "Solar Accessories Kit", spec: "DC cable · MC4 · DC breaker · SPD", price: 8500, from: true },

  // ── UPS & Batteries
  { id: "li-48", cat: "ups", art: "lithium48", name: "Lithium Battery 48V 100Ah (LiFePO4)", spec: "5.12 kWh · 6000+ cycles · Smart BMS", price: 265000, old: 285000, badge: "Premium", batt: { wh: 5120, usable: 0.9 } },
  { id: "li-24", cat: "ups", art: "lithium24", name: "Lithium Battery 24V 100Ah", spec: "2.56 kWh · Maintenance-free", price: 145000, batt: { wh: 2560, usable: 0.9 } },
  { id: "tub-200", cat: "ups", art: "tubular200", name: "Tubular Acid Battery 12V 200Ah", spec: "Deep cycle · For UPS & solar", price: 59500, badge: "Best Seller", batt: { wh: 2400, usable: 0.5 } },
  { id: "acid-150", cat: "ups", art: "tubular150", name: "Lead Acid Battery 12V 150Ah", spec: "Long backup · Value pick", price: 44000, batt: { wh: 1800, usable: 0.5 } },
  { id: "dry-100", cat: "ups", art: "dry100", name: "Dry Battery 12V 100Ah (Sealed)", spec: "No water top-up · Spill-proof", price: 38500, batt: { wh: 1200, usable: 0.5 } },
  { id: "dry-7", cat: "ups", art: "dry7", name: "Dry Battery 12V 7Ah", spec: "For computer UPS, alarms & lights", price: 3200, batt: { wh: 84, usable: 0.5 } },
  { id: "car-bat", cat: "ups", art: "car", name: "Car Battery 12V (Maintenance-Free)", spec: "All cars · Old battery exchange", price: 22500 },
  { id: "ups-1000", cat: "ups", art: "ups", name: "Home UPS 1000W Pure Sine Wave", spec: "Silent · Fast charging · LCD", price: 28500, old: 31000, maxLoad: 1000 },

  // ── Fans, Coolers & AC
  { id: "fan-ceiling", cat: "cooling", art: "ceilingFan", name: 'Ceiling Fan 56" Energy Saver', spec: "Copper winding · Low noise", price: 14500 },
  { id: "fan-dc", cat: "cooling", art: "ceilingFanDC", name: "DC Inverter Ceiling Fan", spec: "~35W · Runs on solar / UPS · Remote", price: 17900, badge: "Energy Saver" },
  { id: "fan-ped", cat: "cooling", art: "pedestalFan", name: 'Pedestal Fan 24"', spec: "3 speeds · Strong airflow", price: 11500 },
  { id: "cooler", cat: "cooling", art: "cooler", name: "Room Air Cooler", spec: "Honeycomb pads · Large water tank", price: 32000 },
  { id: "ac-15", cat: "cooling", art: "ac", name: "DC Inverter AC 1.5 Ton", spec: "Heat & cool · Low power use", price: 189000, old: 199000, badge: "Summer Deal" },

  // ── Lights & Bulbs
  { id: "led-bulb", cat: "lights", art: "bulb", name: "LED Bulb 20W (Pack of 4)", spec: "Cool daylight · Long life", price: 1800 },
  { id: "tube", cat: "lights", art: "tube", name: "LED Tube Light 40W", spec: "Flicker-free · Energy saving", price: 1250 },
  { id: "street", cat: "lights", art: "streetLight", name: "Solar Street Light 100W", spec: "Auto on/off · Built-in battery", price: 12500 },
  { id: "emergency", cat: "lights", art: "emergency", name: "Rechargeable Emergency Light", spec: "Long backup · Portable", price: 3200 },

  // ── Irons & Curlers
  { id: "iron-dry", cat: "irons", art: "iron", name: "Dry Iron 1000W", spec: "Non-stick soleplate", price: 4200 },
  { id: "iron-steam", cat: "irons", art: "steamIron", name: "Steam Iron 2200W", spec: "Vertical steam · Anti-drip", price: 8900, badge: "New" },
  { id: "curler", cat: "irons", art: "curler", name: "Hair Curler", spec: "Ceramic barrel · Fast heat-up", price: 4500 },
  { id: "straightener", cat: "irons", art: "straightener", name: "Hair Straightener", spec: "Ceramic plates · Temperature control", price: 4800 },
  { id: "steam-press", cat: "irons", art: "steamPress", name: "Digital Steam Press with Stand", spec: "500ml water tank · Digital display · Vertical steaming", price: 14500, badge: "New" },

  // ── Home Appliances
  { id: "tv-43", cat: "home", art: "tv", name: 'Smart LED TV 43"', spec: "Full HD · Android · Wi-Fi", price: 78000, old: 84000, badge: "Hot Deal" },
  { id: "fridge", cat: "home", art: "fridge", name: "Refrigerator 12 cu ft", spec: "Double door · Low noise", price: 125000 },
  { id: "washer", cat: "home", art: "washer", name: "Washing Machine", spec: "Twin tub & automatic options", price: 42000, from: true },
  { id: "humidifier", cat: "home", art: "humidifier", name: "Ultrasonic Air Humidifier 3L", spec: "3L water capacity · LED screen · Silent mist", price: 7500, badge: "New" },
  { id: "microwave", cat: "home", art: "microwave", name: "Microwave Oven 25L", spec: "Grill · Auto-cook menus", price: 32000 },
  { id: "oven", cat: "home", art: "oven", name: "Electric Oven 45L", spec: "Bake · Grill · Rotisserie", price: 24000 },
  { id: "airfryer", cat: "home", art: "airfryer", name: "Air Fryer 5L", spec: "Less oil · Digital controls", price: 19500, badge: "Trending" },
  { id: "vacuum", cat: "home", art: "vacuum", name: "Vacuum Cleaner", spec: "Powerful suction · HEPA filter", price: 17500 },
  { id: "juicer", cat: "home", art: "juicer", name: "Juicer Blender", spec: "3-in-1 · Stainless blades", price: 9500 },
  { id: "kettle", cat: "home", art: "kettle", name: "Electric Kettle 1.7L", spec: "Auto shut-off · Fast boil", price: 4800 },
  { id: "toaster", cat: "home", art: "toaster", name: "2-Slice Toaster", spec: "6 browning levels", price: 5500 },
  { id: "lamp", cat: "home", art: "lamp", name: "Table Lamp", spec: "Warm light · Elegant design", price: 3500 },

  // ── CCTV
  { id: "cctv-4", cat: "cctv", art: "cctvPack", name: "4-Camera CCTV Package", spec: "Cameras + DVR + installation", price: 45000, from: true, badge: "Installed" },
  { id: "cam-wifi", cat: "cctv", art: "wifiCam", name: "Wi-Fi Smart Camera 360°", spec: "Mobile app · Night vision · 2-way audio", price: 6500 },
  { id: "cam-bullet", cat: "cctv", art: "bulletCam", name: "Outdoor Bullet Camera 4MP", spec: "Weatherproof · Night vision", price: 7800 },
  { id: "cam-dome", cat: "cctv", art: "domeCam", name: "Indoor Dome Camera", spec: "Wide angle · Night vision", price: 5500 },
  { id: "nvr-8", cat: "cctv", art: "dvr", name: "8-Channel DVR / NVR", spec: "Mobile viewing · HDD support", price: 14500 },
];

export const catName = (k: string) => CATEGORIES.find((c) => c.key === k)?.name ?? "";
export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);

/* =========================================================
   BATTERY GUIDE, WARRANTY & REVIEWS
   ========================================================= */
export const BATTERY_GUIDE = [
  { art: "lithium48", name: "Lithium (LiFePO4)", short: "Lithium", tag: "Premium", tagClass: "green", search: "lithium",
    best: "Solar systems & long daily backup",
    points: ["Lasts 10+ years · 6000+ cycles", "Zero maintenance, no water", "Fast charging, compact & light"] },
  { art: "tubular200", name: "Acid / Tubular", short: "Acid", tag: "Most Popular", tagClass: "gold", search: "acid",
    best: "Home UPS & budget solar backup",
    points: ["Best value for money", "Deep-cycle, long backup hours", "Needs water top-up every few months"] },
  { art: "dry100", name: "Dry (Sealed)", short: "Dry", tag: "Easy Care", tagClass: "", search: "dry",
    best: "Computer UPS, alarms & small loads",
    points: ["Sealed and spill-proof", "No water top-up needed", "Install indoors safely"] },
];

/* ⚠️ Check these against the actual warranty terms of the brands you sell. */
export const WARRANTY = [
  { title: "Solar Panels", value: "Up to 25 yrs", note: "Manufacturer performance warranty", icon: "M3 20 6 9h15l-3 11H3Zm5.4-9-.8 3h3.2l.8-3H8.4Zm4.8 0-.8 3h3.2l.8-3h-3.2ZM12 2h2v4h-2V2Z" },
  { title: "Hybrid Inverters", value: "1 – 5 yrs", note: "Brand warranty, depends on model", icon: "M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm1 3v5h10V5H7Z" },
  { title: "Lithium Batteries", value: "Up to 5 yrs", note: "As per brand terms", icon: "M16 4h-2V2h-4v2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-5 15v-5.5H9L13 7v5.5h2L11 19Z" },
  { title: "Acid & Dry Batteries", value: "6 – 24 months", note: "Depends on brand & capacity", icon: "M16 4h-2V2h-4v2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-5 15v-5.5H9L13 7v5.5h2L11 19Z" },
  { title: "Home Appliances", value: "Official", note: "Brand warranty card included", icon: "M21 3H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5v2h8v-2h5a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm0 14H3V5h18v12Z" },
  { title: "Installation", value: "After-sales", note: "Service checks for installed systems", icon: "M22.7 19.3 13.6 10.2c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6.3 6 9.3 1.6 5C.4 7.4.9 10.4 2.9 12.4c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1 .1-1.4Z" },
];

/* ⭐ CUSTOMER REVIEWS
   The reviews section stays HIDDEN until you add at least one real review here.
   Only use genuine reviews from real customers (with their permission), for example
   copied from your Google Business Profile or Facebook page. Format:
   { name: "Ahmed K.", city: "Kotli", rating: 5, item: "5kW Hybrid Solar System", text: "What the customer said…" },
*/
export type Review = { name: string; city: string; rating: number; item: string; text: string };
export const REVIEWS: Review[] = [];

/* =========================================================
   FAQ: shown on the page AND sent to Google as structured data.
   Keep answers short, honest and specific to your shop.
   ========================================================= */
export const FAQS = [
  { q: "How many units does a 5kW solar system produce per day in Kotli?",
    a: "A 5kW solar system in Kotli and AJK makes about 20 units (kWh) per day on average: around 24 units on clear summer days and 14 in winter. Use the solar calculator on this page to check any system size." },
  { q: "How many watts does one 585W solar panel actually produce?",
    a: "A 585W panel gives roughly 450–480 watts at midday in good sun, because heat, dust and wiring reduce output. Over a full day it produces about 2.3 units (kWh)." },
  { q: "How long will a lithium battery give backup?",
    a: "A 48V 100Ah (5.12 kWh) lithium battery runs a 500 W load (a few fans, lights, a TV and a fridge) for about 8 hours. A 12V 200Ah tubular battery gives about 2 hours on the same load. Backup depends on how many appliances you run." },
  { q: "Lithium or tubular battery: which is better for solar?",
    a: "Lithium (LiFePO4) lasts 10+ years, needs no maintenance and gives almost double the usable energy, so it is best for daily solar use. Tubular acid batteries cost less upfront and are a good value choice for home UPS backup." },
  { q: "Do you install solar systems outside Kotli?",
    a: "Yes. BBC has completed 150+ solar projects and installs across Azad Kashmir, including Mirpur, Bhimber, Muzaffarabad, Rawalakot and Bagh. We survey the site, design the system, install it and provide after-sales service. We also install CCTV camera packages and home UPS systems." },
  { q: "Where is Bismillah Battery Center located?",
    a: `Our shop is on ${CONFIG.address}. Opening hours: ${CONFIG.hours}. Call or WhatsApp ${CONFIG.phone}.` },
];
