import Link from "next/link";
import { CONFIG } from "@/lib/config";
import { pageMeta } from "@/lib/seo";
import { PHOTO_CREDITS } from "@/lib/photo-credits";

export const metadata = pageMeta({
  title: "Photo credits",
  description: `Credits and licences for the photos used on the ${CONFIG.name} website.`,
  path: "/photo-credits",
});

const LICENSE_NAMES: Record<string, string> = {
  cc0: "CC0 (public domain)",
  pdm: "Public domain",
  by: "CC BY",
  "by-sa": "CC BY-SA",
  unsplash: "Unsplash License",
};

export default function PhotoCreditsPage() {
  return (
    <section className="section simple-page">
      <div className="container narrow prose">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">Photo credits</li>
          </ol>
        </nav>
        <h1>Photo credits</h1>
        <p>
          The banner photos on this website are stock photos. Product pictures are drawings that show the type of product;
          ask us on WhatsApp for a photo of the actual item. Thank you to these photographers:
        </p>
        <ul className="credits">
          {PHOTO_CREDITS.map((p) => (
            <li key={p.file}>
              <strong>{p.usedFor}</strong>: <a href={p.source} target="_blank" rel="noopener">&ldquo;{p.title}&rdquo;</a>
              {p.creator && <> by {p.creatorUrl ? <a href={p.creatorUrl} target="_blank" rel="noopener">{p.creator}</a> : p.creator}</>}
              {", "}
              {p.licenseUrl ? (
                <a href={p.licenseUrl} target="_blank" rel="noopener license">{LICENSE_NAMES[p.license] ?? p.license}{p.licenseVersion ? ` ${p.licenseVersion}` : ""}</a>
              ) : (LICENSE_NAMES[p.license] ?? p.license)}
              {p.modified && <>. Cropped and resized</>}.
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
