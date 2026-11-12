"use client";

import { useEffect, useState } from "react";
import { lastWhatsApp } from "@/lib/whatsapp";
import { track } from "@/components/Analytics";
import { WaIcon } from "@/components/Icons";

/** The part of the thank-you page that depends on what the visitor just did. */
export default function ThankYouDetails() {
  const [type, setType] = useState<"order" | "inquiry" | null>(null);
  const [wa, setWa] = useState<string | null>(null);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    const kind = t === "order" ? "order" : t === "inquiry" ? "inquiry" : null;
    setType(kind);
    setWa(lastWhatsApp());
    // Conversion for Google Analytics (mark "generate_lead" as a key event in GA).
    if (kind) track("generate_lead", { lead_type: kind });
  }, []);

  return (
    <>
      <p className="lead">
        {type === "order"
          ? "Your order has opened in WhatsApp. Press Send there and we'll confirm the price, stock and delivery."
          : "Your inquiry has opened in WhatsApp. Press Send there and we'll get back to you shortly."}
      </p>
      {wa && (
        <p>
          <a className="btn btn-wa" href={wa} target="_blank" rel="noopener"><WaIcon /> WhatsApp didn&apos;t open? Open it again</a>
        </p>
      )}
    </>
  );
}
