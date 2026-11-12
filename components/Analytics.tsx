"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GA_ID } from "@/lib/config";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] }
}

/** Send a custom event to Google Analytics (does nothing if analytics is off). */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && window.gtag) window.gtag("event", event, params);
}

/**
 * Google Analytics 4. Only loads when a Measurement ID is set in lib/config.ts (gaId)
 * or in the NEXT_PUBLIC_GA_ID environment variable.
 * Page views (including moving between pages) are recorded automatically by GA4.
 * Also records clicks on Call and WhatsApp buttons, so you can see which pages bring in customers.
 */
export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("click_call", { link_location: location.pathname });
      else if (href.includes("wa.me/")) track("click_whatsapp", { link_location: location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(GA_ID)});`}
      </Script>
    </>
  );
}
