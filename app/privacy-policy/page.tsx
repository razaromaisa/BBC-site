import Link from "next/link";
import { CONFIG, GA_ID, SITE_URL, telLink, waLink } from "@/lib/config";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: `How ${CONFIG.name} in ${CONFIG.city} handles the details you share through our website, WhatsApp and phone.`,
  path: "/privacy-policy",
});

/* ✏️ Plain-language policy written for how this website works today.
   If you add online payments, email newsletters or a new tracking tool, update this page. */
export default function PrivacyPolicyPage() {
  const site = SITE_URL.replace(/^https?:\/\//, "");
  return (
    <section className="section simple-page">
      <div className="container narrow prose">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">Privacy Policy</li>
          </ol>
        </nav>
        <h1>Privacy Policy</h1>
        <p className="muted">Last updated: {CONFIG.privacyUpdated}</p>

        <p>
          This policy explains what information {CONFIG.name} (&quot;BBC&quot;, &quot;we&quot;) collects when you use {site},
          and what we do with it. In short: the website itself does not collect or store your personal details. When you
          contact us, you do it through WhatsApp or a phone call, and we only use what you send us to help you.
        </p>

        <h2>Who we are</h2>
        <p>{CONFIG.name}, {CONFIG.address}. Phone and WhatsApp: <a href={telLink()}>{CONFIG.phone}</a>.</p>

        <h2>Information you send us</h2>
        <ul>
          <li>
            <strong>Inquiry form and cart orders.</strong> When you press &quot;Send via WhatsApp&quot; or &quot;Place order on
            WhatsApp&quot;, your message (name, phone number if you typed it, what you&apos;re interested in, and your cart) is
            written into a WhatsApp message on your own phone or computer. Nothing is sent until you press Send in WhatsApp.
            The website does not save, email or keep a copy of it.
          </li>
          <li>
            <strong>WhatsApp and phone calls.</strong> Messages you send us on WhatsApp are handled by WhatsApp (Meta) under
            the <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener">WhatsApp Privacy Policy</a>.
            We keep the chat on our business phone for as long as we need it for your order, delivery, installation and warranty.
          </li>
        </ul>

        <h2>How we use it</h2>
        <p>
          Only to answer your question, send you a quote, arrange delivery or installation, and handle warranty claims.
          We do not sell or rent your details, and we don&apos;t send marketing messages unless you ask us to.
          For warranty claims we may share your bill details with the product&apos;s manufacturer.
        </p>

        <h2>Information stored in your browser</h2>
        <ul>
          <li>
            <strong>Your cart</strong> is saved in your browser (local storage) so it is still there when you come back.
            It never leaves your device unless you send it to us on WhatsApp. Pressing &quot;Clear cart&quot; removes it.
          </li>
          <li>
            The inquiry form remembers, for this browser tab only, when you last sent a message (to stop spam) and the
            last WhatsApp link (so the thank-you page can reopen it).
          </li>
        </ul>

        {GA_ID && (
          <>
            <h2>Website statistics (Google Analytics)</h2>
            <p>
              We use Google Analytics to count visits and see which pages are useful, for example how many people use the
              solar calculator or tap the WhatsApp button. Google Analytics uses cookies and collects information such as the
              pages you view, your device and browser type, and your approximate city. It does not tell us who you are.
              Google handles this data under the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a>.
              You can block it with your browser&apos;s cookie settings or the{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics opt-out add-on</a>.
            </p>
          </>
        )}

        <h2>Google Maps</h2>
        <p>
          The map on our contact section is provided by Google Maps. When it loads, Google may set cookies and receive your
          IP address, as described in the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a>.
        </p>

        <h2>Security</h2>
        <p>
          The website is served over a secure HTTPS connection. We do not ask for or accept card or bank details on this website.
          We will never ask for your password, OTP or PIN.
        </p>

        <h2>Your choices</h2>
        <p>
          You can ask us at any time to delete your WhatsApp chat and contact details from our phone, unless we need them for an
          open order or warranty. Just message us on <a href={waLink("Assalam o Alaikum! Please delete my details.")} target="_blank" rel="noopener">WhatsApp</a> or call {CONFIG.phone}.
        </p>

        <h2>Children</h2>
        <p>Our website is meant for adults buying for their home or business. We do not knowingly collect information from children.</p>

        <h2>Changes to this policy</h2>
        <p>If we change how we handle information, we will update this page and the date at the top.</p>
      </div>
      <BreadcrumbJsonLd items={[{ name: "Privacy Policy", path: "/privacy-policy" }]} />
    </section>
  );
}
