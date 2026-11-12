import type { Metadata } from "next";
import { CONFIG } from "./config";

type PageMetaInput = {
  /** Page title. The shop name is appended automatically (see layout.tsx). */
  title: string;
  /** Google snippet, ideally 120–155 characters. */
  description: string;
  /** Path of the page, e.g. "/privacy-policy". */
  path: string;
  /** Preview picture for WhatsApp / Facebook / X. Defaults to the site preview image (app/opengraph-image.tsx). */
  image?: { url: string; width: number; height: number; alt: string };
  /** Keep the page out of Google (thank-you pages etc.). */
  noindex?: boolean;
};

/** Builds complete metadata for one page, so every page has its own title, description,
 *  canonical address and social preview. */
export function pageMeta({ title, description, path, image, noindex }: PageMetaInput): Metadata {
  const fullTitle = `${title} | ${CONFIG.titleSuffix}`;
  const img = image ?? { url: "/opengraph-image", width: 1200, height: 630, alt: `${CONFIG.name} in ${CONFIG.city}` };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_PK",
      siteName: CONFIG.name,
      url: path,
      title: fullTitle,
      description,
      images: [img],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
