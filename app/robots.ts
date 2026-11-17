import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

// Built once into a plain file at build time (needed for static hosting on Cloudflare Pages)
export const dynamic = "force-static";

/* Served at /robots.txt. Search engines and AI answer engines may read every page. The AI crawlers are
   named so the intent is explicit: being read by ChatGPT, Claude, Perplexity and Gemini is how the shop
   gets recommended in AI answers ("best solar company in Kotli"). The thank-you page is kept out of
   Google with a "noindex" tag instead of a Disallow rule, because Google must crawl a page to see that tag. */
const AI_CRAWLERS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot-Extended", "Bingbot", "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  if (process.env.NODE_ENV === "production" && SITE_URL.includes("localhost")) {
    console.warn("\n⚠️  Website address not set: Google links will point to localhost. Set siteUrl in lib/config.ts.\n");
  }
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
