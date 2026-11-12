import Link from "next/link";
import { CONFIG, telLink } from "@/lib/config";
import { pageMeta } from "@/lib/seo";
import { CATEGORIES, categoryHref } from "@/lib/data";
import ThankYouDetails from "./ThankYouDetails";
import { PhoneIcon } from "@/components/Icons";

export const metadata = pageMeta({
  title: "Thank you",
  description: `Thank you for contacting ${CONFIG.name}. We usually reply on WhatsApp within working hours.`,
  path: "/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <section className="section simple-page">
      <div className="container narrow center-text">
        <span className="done-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <h1>Thank you, we&apos;ve got your message ready</h1>
        <ThankYouDetails />
        <p className="muted">
          We reply during shop hours ({CONFIG.hours}). For anything urgent, call us on{" "}
          <a href={telLink()}><PhoneIcon className="inline-ico" /> {CONFIG.phone}</a>.
        </p>

        <div className="ty-links">
          <Link className="btn btn-dark" href="/">Back to home</Link>
          <a className="btn btn-outline" href="/#calculator">Try the solar calculator</a>
        </div>

        <p className="ty-browse">
          Keep browsing:{" "}
          {CATEGORIES.map((c, i) => (
            <span key={c.key}>
              <Link href={categoryHref(c.key)}>{c.name}</Link>{i < CATEGORIES.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
