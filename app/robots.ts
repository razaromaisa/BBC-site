import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    // The thank-you page is kept out of Google with a "noindex" tag instead of a Disallow rule,
    // because Google must be able to crawl a page to see its noindex tag.
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
