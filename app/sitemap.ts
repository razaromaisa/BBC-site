import type { MetadataRoute } from "next";
import { CONFIG, SITE_URL } from "@/lib/config";
import { CATEGORIES, PRODUCTS, categoryHref } from "@/lib/data";
import { AJK_PAGE, PRICE_PAGE } from "@/lib/areas";

// Built once into a plain file at build time (needed for static hosting on Cloudflare Pages)
export const dynamic = "force-static";

/* Served at /sitemap.xml and listed in robots.txt: every public page, so Google can find them all.
   (The thank-you page is left out on purpose.) lastModified is the real date the content last changed,
   from `contentUpdated` in lib/config.ts. Google ignores dates that change on every build. */
const updated = new Date(`${CONFIG.contentUpdated}T12:00:00Z`);
const abs = (path: string) => `${SITE_URL}${path}`;
const photos = (cat: string) => PRODUCTS.filter((p) => p.cat === cat && p.img).map((p) => abs(p.img!));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: abs("/"), lastModified: updated, changeFrequency: "weekly", priority: 1,
      images: [abs("/images/site/hero.jpg"), abs("/images/site/installer.jpg")] },
    { url: abs(AJK_PAGE), lastModified: updated, changeFrequency: "monthly", priority: 0.9,
      images: [abs("/images/site/installer.jpg")] },
    { url: abs(PRICE_PAGE), lastModified: updated, changeFrequency: "weekly", priority: 0.9 },
    ...CATEGORIES.map((c) => ({
      url: abs(categoryHref(c.key)),
      lastModified: updated,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      ...(photos(c.key).length ? { images: photos(c.key) } : {}),
    })),
    { url: abs("/privacy-policy"), lastModified: new Date(`${CONFIG.privacyUpdated} 12:00 UTC`), changeFrequency: "yearly", priority: 0.2 },
    { url: abs("/photo-credits"), lastModified: updated, changeFrequency: "yearly", priority: 0.1 },
  ];
}
