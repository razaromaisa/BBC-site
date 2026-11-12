import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, categoryHref } from "@/lib/data";
import { CONFIG, waLink } from "@/lib/config";
import { CategoryMedia } from "@/components/Art";
import { WaIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Page not found",
  description: `This page doesn't exist on the ${CONFIG.name} website. Browse solar panels, batteries, UPS and home appliances instead.`,
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className="section simple-page">
      <div className="container narrow center-text">
        <p className="err-code">404</p>
        <h1>We couldn&apos;t find that page</h1>
        <p className="lead">
          The link may be old or mistyped. The product you&apos;re looking for is probably still in the shop. Try one of these:
        </p>

        <div className="nf-cats">
          {CATEGORIES.map((c) => (
            <Link key={c.key} href={categoryHref(c.key)} className="more-cat">
              <span className="more-cat-photo" style={{ background: c.tint }}><CategoryMedia c={c} decorative /></span>
              <span>{c.name}</span>
            </Link>
          ))}
        </div>

        <div className="ty-links">
          <Link className="btn btn-dark" href="/">Go to the home page</Link>
          <a className="btn btn-wa" href={waLink("Assalam o Alaikum! I couldn't find something on your website. I'm looking for: ")} target="_blank" rel="noopener">
            <WaIcon /> Ask us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
