/* SEO check for every page in the sitemap.
     npm run build && npm run seo:check            → checks the built site in out/
     npm run seo:check -- https://www.example.com  → checks the live site
   For each page: one title and one meta description (no duplicates across pages), a canonical link that
   points to the page itself, no "noindex", exactly one <h1>, valid JSON-LD, and alt text on every image.
   Also checks that robots.txt lists the sitemap and that the site address isn't still localhost. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const errors = [];
const warnings = [];
const target = process.argv[2]?.replace(/\/$/, "");

async function load(path) {
  if (target) {
    const res = await fetch(target + path, { redirect: "manual", signal: AbortSignal.timeout(15_000) });
    if (res.status !== 200) throw new Error(`${path}: HTTP ${res.status}`);
    return res.text();
  }
  // Built site: "/" → out/index.html, "/a/b" → out/a/b.html (how Cloudflare Pages serves them)
  const file = path.endsWith(".txt") || path.endsWith(".xml") ? path : path === "/" ? "/index.html" : `${path}.html`;
  try { return await readFile(join("out", file), "utf8"); }
  catch { throw new Error(`${path}: no file out${file} (run npm run build first)`); }
}

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) => {
  const attrs = {};
  for (const a of m[0].matchAll(/([\w:-]+)="([^"]*)"/g)) attrs[a[1].toLowerCase()] = decode(a[2]);
  return attrs;
});

function checkPage(path, url, html, seen) {
  const fail = (msg) => errors.push(`${path}: ${msg}`);
  const head = html.split(/<\/head>/i)[0];

  const titles = [...head.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map((m) => decode(m[1]).trim());
  const descs = tags(head, "meta").filter((t) => t.name?.toLowerCase() === "description").map((t) => t.content?.trim());
  const canon = tags(head, "link").filter((t) => t.rel?.toLowerCase() === "canonical").map((t) => t.href);
  const robots = tags(html, "meta").filter((t) => ["robots", "googlebot"].includes(t.name?.toLowerCase()));

  if (canon.length !== 1 || canon[0].replace(/\/$/, "") !== url.replace(/\/$/, "")) fail(`canonical should be ${url}, found ${canon.join(", ") || "none"}`);
  if (robots.some((t) => /noindex|none/i.test(t.content ?? ""))) fail("robots meta tag blocks indexing");

  for (const [label, values, used, [min, max]] of [["title", titles, seen.titles, [20, 65]], ["description", descs, seen.descs, [70, 160]]]) {
    if (values.length !== 1 || !values[0]) { fail(`expected one ${label}, found ${values.length}`); continue; }
    const key = values[0].toLowerCase();
    if (used.has(key)) fail(`same ${label} as ${used.get(key)}`); else used.set(key, path);
    if (values[0].length < min || values[0].length > max) warnings.push(`${path}: ${label} is ${values[0].length} characters (aim for ${min}–${max}): "${values[0]}"`);
  }

  const h1s = (html.match(/<h1\b/gi) ?? []).length;
  if (h1s !== 1) fail(`expected one <h1>, found ${h1s}`);
  if (!/<html[^>]*\blang="/i.test(html)) fail("missing <html lang>");
  if (!/<meta[^>]*name="viewport"/i.test(head)) fail("missing viewport meta tag (needed for phones)");

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(m[1]); } catch (e) { fail(`invalid JSON-LD: ${e.message}`); }
  }
  const noAlt = tags(html, "img").filter((t) => !("alt" in t)).length;
  if (noAlt) fail(`${noAlt} image(s) without alt text`);
}

try {
  const robots = await load("/robots.txt");
  const sitemapUrl = robots.match(/^\s*sitemap:\s*(\S+)/im)?.[1];
  if (!sitemapUrl) throw new Error("robots.txt: no Sitemap line");
  const origin = new URL(sitemapUrl).origin;
  if (origin.includes("localhost")) warnings.push(`Site address is ${origin}: set siteUrl in lib/config.ts (or NEXT_PUBLIC_SITE_URL) before going live`);

  const sitemap = await load("/sitemap.xml");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (!locs.length) throw new Error("sitemap.xml: no pages");
  const seen = { titles: new Map(), descs: new Map() };
  const paths = new Set();
  for (const loc of locs) {
    const url = new URL(loc);
    if (url.origin !== origin) { errors.push(`sitemap.xml: ${loc} is not on ${origin}`); continue; }
    const path = url.pathname.replace(/(.)\/$/, "$1");
    if (paths.has(path)) { errors.push(`sitemap.xml: duplicate ${loc}`); continue; }
    paths.add(path);
    try { checkPage(path, loc, await load(path), seen); } catch (e) { errors.push(e.message); }
  }
  console.log(`Checked ${paths.size} sitemap pages from ${target ?? "out/"} (site address ${origin}).`);
} catch (e) {
  errors.push(e.message);
}

for (const w of warnings) console.warn(`WARN ${w}`);
if (errors.length) {
  console.error(errors.map((e) => `FAIL ${e}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("SEO checks passed.");
}
