# Bismillah Battery Center: local SEO roadmap

**Kotli, Azad Kashmir · solar installation · plan dated 17 November 2026**

The goal is simple: when someone in Azad Kashmir searches for solar on their phone, they find Bismillah Battery Center on **Google Maps** and in the **first results**, and then **call or WhatsApp**. Calls and WhatsApp chats are the result that matters, not traffic.

Most local searches are answered by the Google Maps "local pack" (the three shops shown on a map) before any website. So the **Google Business Profile matters as much as the website**. The two work together: the website proves what the business does and where; the profile turns that into a map listing.

---

## 1. Already done in the website code

| Area | What was done |
| --- | --- |
| Home page | Title and H1 now say **Solar installation in Kotli & Azad Kashmir**. Description mentions 150+ systems and the free site survey. |
| New page `/solar-installation-azad-kashmir` | Covers all 10 districts in 3 groups (Kotli/Mirpur/Bhimber, Poonch division, Muzaffarabad division) with towns, solar advice specific to each area (heat, snow, valley shade), what's included, how it works and FAQs. |
| New page `/solar-system-price` | Panel price per watt, inverter and lithium battery "from" prices, complete packages, and a 3–15 kW size guide (panels, units per day/month). **All numbers come from `lib/data.ts`**, so the page updates itself when real products are added. |
| Structured data | Business is marked up as an electronics store + home improvement contractor named **Bismillah Battery Center**, serving every AJK district, with hours, phone and address. Solar installation is marked up as a Service. FAQs and breadcrumbs on each page. Fixed a broken logo link. |
| robots.txt | Allows all search engines and names the AI crawlers (ChatGPT, Claude, Perplexity, Gemini), so the shop can be recommended in AI answers. |
| sitemap.xml | Lists all 12 public pages with a real "last updated" date (`contentUpdated` in `lib/config.ts`) and photos. |
| Internal links | New pages linked from the menu bar, phone menu, footer, home page "Areas we cover" section and each other. |
| Phone performance | Photos are resized at build time: the hero photo is **37 KB on a phone instead of 375 KB**. Urdu font no longer loads up front. Form fields use 16px text so iPhones don't zoom. Bottom bar has **Call** and **WhatsApp**. |
| Checking | `npm run build && npm run seo:check` checks every sitemap page (title, description, canonical, one H1, valid structured data, image alt text). |

---

## 2. Before going live (must do)

1. **Set the website address.** In `lib/config.ts` set `siteUrl` (e.g. `https://bbc-site.pages.dev`, later your own domain), or set `NEXT_PUBLIC_SITE_URL` in Cloudflare → project → Settings → Variables. Until then, Google links point to `localhost`. The build prints a warning while it's missing.
2. **Link the Google Maps listing.** On Google Maps open the listing → **Share** → copy link → paste into `googleBusinessUrl` in `lib/config.ts`. This adds a "Find us & review us on Google Maps" link and tells Google the website and listing are the same business.
3. **Add the exact map position.** Right-click the shop pin on Google Maps, click the numbers to copy them, and fill in `geo: { lat: …, lng: … }`.
4. **Make name, address and phone identical everywhere.** Google compares the website, the Maps listing and any other listings. Use exactly:
   - Name: **Bismillah Battery Center**
   - Address: **Link Road, Larri Adda, Kotli, Azad Kashmir**
   - Phone: **0342 5044061**
   If the Maps listing shows something different (old phone number, "BBC Solar Energy", different spelling), change one side so they match.
5. **Check the claims on the new pages are true.** The installation page says things like "we leave an air gap under panels", "steeper angle where it snows", "inverter app set up on your phone", "help with net-metering paperwork", and "free survey in Kotli; other districts arranged when you message". Change anything that isn't how BBC works (text is in `lib/areas.ts` and `app/solar-installation-azad-kashmir/page.tsx`).
6. **Replace the dummy products** with real ones. Prices on the price page, structured data and cards all come from `lib/data.ts`. Then update `contentUpdated`.

---

## 3. Which search belongs to which page

One page per search intent, so pages don't compete with each other.

| Searches (examples) | Page that should rank |
| --- | --- |
| solar installation Kotli, solar company Kotli, solar panels Kotli, solar shop Kotli | **Home page** `/` |
| solar installation Azad Kashmir / AJK, solar company Mirpur, solar Muzaffarabad, solar Rawalakot, solar Bagh | `/solar-installation-azad-kashmir` |
| solar system price Kotli, 5kW solar system price, 10kW solar price, solar panel price per watt | `/solar-system-price` |
| solar panel price Kotli, hybrid inverter price, Longi / Jinko panels | `/products/solar-panels-inverters` |
| lithium battery price, tubular battery Kotli, UPS Kotli | `/products/ups-batteries` |
| CCTV installation Kotli | `/products/cctv-cameras` |
| Bismillah Battery Center, BBC Kotli | Home page + Google Maps listing |

**Don't** create one page per town ("solar Mirpur", "solar Bhimber"…) with the same text: Google treats that as spam (doorway pages). Add a separate town page only when there is something genuinely different to show, e.g. real installation photos and a customer story from that town.

---

## 4. Google Business Profile (biggest local win)

Do this in the first week. Open [business.google.com](https://business.google.com) with the account that owns the listing.

- **Categories:** primary category as close to solar installation as Google offers (e.g. *Solar energy company*), plus extra categories such as *Solar energy equipment supplier*, *Battery store* and *Electronics store*.
- **Service areas:** add the AJK districts you cover (Kotli, Mirpur, Bhimber, Muzaffarabad, Poonch, Bagh, Sudhnoti, Haveli, Neelum, Jhelum Valley). Keep the shop address visible, since customers visit.
- **Website link:** the home page. **Appointment / booking link:** the WhatsApp link.
- **Services:** add "Solar panel installation", "Hybrid inverter installation", "Lithium battery installation", "UPS installation", "CCTV installation", each with a one-line description.
- **Products:** add the main packages (e.g. 5 kW system) with photo and "from" price, matching the website.
- **Photos:** upload real photos every month: the shop front (helps people find it), the team, and **finished installations with the town name in the description** ("10 kW system, Mirpur"). Real installation photos are the strongest local proof you have.
- **Hours:** Mon–Sun 9:00 AM – 9:00 PM (same as the website). Add special hours for Eid and other holidays.
- **Posts:** one short post a week or two: a finished project, a price update, a winter/summer solar tip.
- **Q&A:** add and answer common questions yourself (do you install outside Kotli? do you do net metering?).

### Reviews

Reviews are the main thing that moves a shop up the Maps list.

- After every installation, send the customer the review link on WhatsApp (Google Business Profile → **Ask for reviews** gives a short link). Ask them to mention the system size and town, e.g. "5 kW system in Khuiratta".
- Reply to every review, good or bad, within a few days.
- Never buy reviews or write them yourself: Google removes them and can suspend the listing.
- Once there are real reviews, add a few (with permission) to `REVIEWS` in `lib/data.ts`; the reviews section on the website appears automatically.

---

## 5. Google Search Console & Bing

1. Go to [search.google.com/search-console](https://search.google.com/search-console), add the website (a **Domain** property if you have your own domain, otherwise a **URL prefix** property for the pages.dev address) and verify it.
2. **Sitemaps** → submit `sitemap.xml`.
3. **URL Inspection** → request indexing for `/`, `/solar-installation-azad-kashmir` and `/solar-system-price`.
4. Check **Pages** (indexing) after a week; fix anything listed as not indexed.
5. Do the same in [Bing Webmaster Tools](https://www.bing.com/webmasters) (it can import from Search Console). Bing also feeds ChatGPT search and Copilot.
6. If the domain changes later, add the new one, submit the sitemap again, and keep the old address redirecting to the new one.

---

## 6. Other listings (citations)

Google trusts a business more when the same name, address and phone appear on other trusted sites. Quality over quantity:

- **Facebook page** (very important in AJK): same name, address, phone, hours, link to the website. Add its link to `socials` in `lib/config.ts`.
- **Instagram / TikTok:** short videos of installations do well; put the website and WhatsApp in the bio. Add the links to `socials`.
- **Apple Business Connect** and **Bing Places**: free, same details.
- **WhatsApp Business profile:** address, hours, website link and a catalogue of main products.
- **Brand dealer pages:** if BBC is an authorised dealer for Inverex, Growatt, Longi etc., ask to be listed on their dealer locator with a link to the website. These links are worth far more than directory listings.
- Avoid paid "1000 directory submissions" offers: they don't help and can hurt.

---

## 7. Content plan (next 3 months)

Each guide answers one real question customers ask, links to the price page or the matching products, and ends with a WhatsApp button. Use real photos from your own installations. Write a guide only when you have something first-hand to say.

| When | Guide | Why |
| --- | --- | --- |
| Weeks 1–4 | **Lithium vs tubular battery for solar in AJK** | Most-asked comparison; links to batteries and the battery guide. |
| Weeks 3–6 | **How many solar panels to run a 1.5-ton inverter AC** | Very common search; answer with the calculator maths. |
| Weeks 5–8 | **Net metering in Azad Kashmir: how it works and what papers you need** | Only publish once you've confirmed the current process and documents with the electricity department; high value if accurate. |
| Weeks 7–10 | **Solar in winter and snow: Rawalakot, Bagh and Neelum** | Supports the AJK page with real photos and output numbers from customers' systems. |
| Weeks 9–12 | **Project gallery: recent installations across AJK** | Size, town, panels, inverter, battery and a photo for each. The strongest proof for both Google and customers. |

When guides are added: create `app/guides/[slug]/page.tsx` (or ask Claude to set it up), add each guide to the sitemap, and link it from the related pages.

**Urdu / Roman Urdu:** many people search in Urdu or Roman Urdu ("solar system ki qeemat", "سولر سسٹم قیمت"). Once the English pages are indexed, consider a short Urdu summary on the price and installation pages. Watch Search Console for which wording people actually use before investing more.

---

## 8. AI answers (ChatGPT, Gemini, Perplexity)

People increasingly ask AI "best solar company in Kotli". AI tools quote pages that state facts clearly:

- Keep facts consistent across the website, Google listing and Facebook (name, phone, areas, 150+ projects).
- Each page opens with a direct one-paragraph answer (done on the new pages).
- robots.txt already lets AI crawlers read the site.
- Once a month, ask ChatGPT, Gemini and Perplexity "best solar installer in Kotli Azad Kashmir" and note whether BBC is mentioned and whether the details are right.

---

## 9. Measuring progress

| How often | What to check |
| --- | --- |
| Weekly (first month) | Search Console: are the three main pages indexed? Any errors? |
| Monthly | Search Console **Performance**: clicks and impressions for "solar" searches, which towns/queries appear. Google Business Profile **Performance**: calls, website clicks, direction requests, and searches that showed the listing. |
| Monthly | Number of new Google reviews and average rating. |
| Monthly | Ask new customers "how did you find us?" and keep a simple tally (Google Maps, website, Facebook, word of mouth). |
| Every 3 months | Re-run `npm run build && npm run seo:check`; update `contentUpdated`; refresh prices; pick the next two guides from the questions customers actually ask. |

Optional: set `gaId` in `lib/config.ts` to turn on Google Analytics. The site already records taps on WhatsApp and Call buttons (events `click_whatsapp` and `click_call`, with the page they came from); mark both as **key events** in GA4 to see which pages bring in customers.
