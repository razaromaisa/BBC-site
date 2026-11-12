import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { CATEGORIES, categoryHref } from "@/lib/data";

/* Every public page, so Google can find them all. (The thank-you page is left out on purpose.) */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...CATEGORIES.map((c) => ({
      url: `${SITE_URL}${categoryHref(c.key)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/photo-credits`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];
}
