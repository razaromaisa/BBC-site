"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/data";
import { waLink } from "@/lib/config";
import { rememberWhatsApp } from "@/lib/whatsapp";

const INTERESTS = ["Complete Solar System", ...CATEGORIES.map((c) => c.name), "Repair / Service"];

/* ---------- Spam protection ----------
   1. Honeypot: a hidden field people never see. Bots fill every field, so if it has a value we ignore the form.
   2. Time check: real people take more than a few seconds to fill the form; instant submissions are bots.
   3. Link filter: inquiries containing web links are almost always spam.
   4. Cool-down: one inquiry every 30 seconds per browser.
   The form itself only opens WhatsApp; nothing is stored or emailed by the website. */
const MIN_FILL_MS = 3000;
const COOLDOWN_MS = 30_000;
const LAST_SENT_KEY = "bbc-inquiry-sent";
const HAS_LINK = /(https?:\/\/|www\.|\.(com|net|org|ru|xyz|info|top)\b)/i;

type Errors = Partial<Record<"name" | "phone" | "message" | "form", string>>;

export default function ContactForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const startedAt = useRef(0);
  useEffect(() => { startedAt.current = Date.now(); }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();

    // Bot checks: fail silently so bots get no hint about what tripped them.
    if (String(f.get("contact_ref") ?? "") !== "" || Date.now() - startedAt.current < MIN_FILL_MS) {
      router.push("/thank-you");
      return;
    }

    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter your name.";
    const digits = phone.replace(/[\s\-()+]/g, "");
    if (phone && !/^\d{10,13}$/.test(digits)) next.phone = "Please enter a valid phone number, e.g. 0310 1234567.";
    if (HAS_LINK.test(message) || HAS_LINK.test(name)) next.message = "Please remove web links from your message.";
    try {
      const last = Number(sessionStorage.getItem(LAST_SENT_KEY) || 0);
      if (Date.now() - last < COOLDOWN_MS) next.form = "You just sent an inquiry. Please wait a few seconds before sending another.";
    } catch { /* storage blocked: skip the cool-down */ }

    setErrors(next);
    if (Object.keys(next).length) {
      const first = (["name", "phone", "message"] as const).find((k) => next[k]);
      if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    const text =
      `Assalam o Alaikum! New inquiry from the website.\n\n` +
      `Name: ${name}\nPhone: ${phone || "-"}\n` +
      `Interested in: ${f.get("interest")}\nMessage: ${message || "-"}`;
    const url = waLink(text);
    try { sessionStorage.setItem(LAST_SENT_KEY, String(Date.now())); } catch { /* ignore */ }
    rememberWhatsApp(url);
    window.open(url, "_blank", "noopener");
    router.push("/thank-you?type=inquiry");
  };

  const clear = (k: keyof Errors) => errors[k] && setErrors(({ [k]: _, ...rest }) => rest);

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <h3>Send an inquiry</h3>
      <p className="form-sub">Your message opens in WhatsApp so we can reply quickly.</p>
      <div className="f-row">
        <div className="field"><label htmlFor="fName">Your name</label>
          <input id="fName" name="name" type="text" autoComplete="name" placeholder="e.g. Ahmed Khan" maxLength={60} required
            aria-invalid={!!errors.name} aria-describedby={errors.name ? "fName-err" : undefined}
            className={errors.name ? "invalid" : ""} onChange={() => clear("name")} />
          {errors.name && <p className="form-error" id="fName-err">{errors.name}</p>}
        </div>
        <div className="field"><label htmlFor="fPhone">Phone <span className="opt">(optional)</span></label>
          <input id="fPhone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="03XX XXXXXXX" maxLength={20}
            aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "fPhone-err" : undefined}
            className={errors.phone ? "invalid" : ""} onChange={() => clear("phone")} />
          {errors.phone && <p className="form-error" id="fPhone-err">{errors.phone}</p>}
        </div>
      </div>
      <div className="field"><label htmlFor="fInterest">Interested in</label>
        <select id="fInterest" name="interest">{INTERESTS.map((i) => <option key={i}>{i}</option>)}</select>
      </div>
      <div className="field"><label htmlFor="fMsg">Message</label>
        <textarea id="fMsg" name="message" rows={4} maxLength={1000} placeholder="e.g. I need a 5kW solar system with lithium battery"
          aria-invalid={!!errors.message} aria-describedby={errors.message ? "fMsg-err" : undefined}
          className={errors.message ? "invalid" : ""} onChange={() => clear("message")} />
        {errors.message && <p className="form-error" id="fMsg-err">{errors.message}</p>}
      </div>

      {/* Honeypot: hidden from people and screen readers, bots fill it in. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="fRef">Leave this field empty</label>
        <input id="fRef" name="contact_ref" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {errors.form && <p className="form-error" role="alert">{errors.form}</p>}
      <button type="submit" className="btn btn-dark btn-block">Send via WhatsApp</button>
      <p className="form-legal">By sending, you agree to our <a href="/privacy-policy">Privacy Policy</a>.</p>
    </form>
  );
}
