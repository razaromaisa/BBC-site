import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { CONFIG } from "@/lib/config";

// Built once into a plain file at build time (needed for static hosting on Cloudflare Pages)
export const dynamic = "force-static";

/* The preview picture shown when the site is shared on WhatsApp, Facebook, X, etc.
   Built from a real photo (public/images/site/hero.jpg) with the shop name on top. */
export const alt = `${CONFIG.name}: solar panels, batteries & UPS in ${CONFIG.city}, AJK`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const photo = await readFile(join(process.cwd(), "public/images/site/hero.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", color: "#fff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex", backgroundImage: "linear-gradient(90deg, rgba(8,18,36,.95) 0%, rgba(8,18,36,.85) 55%, rgba(8,18,36,.35) 100%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <svg width="72" height="72" viewBox="0 0 44 44">
              <rect width="44" height="44" rx="10" fill="#0B1B33" />
              <path d="M25 7 12 25h9l-3 12 14-19h-9l2-11Z" fill="#F5A300" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 40, fontWeight: 800 }}>BBC</span>
              <span style={{ fontSize: 24, color: "#C9D3E3" }}>Bismillah Battery Center</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <span style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1 }}>
              {`Solar panels, batteries & UPS in ${CONFIG.city}`}
            </span>
            <span style={{ fontSize: 30, color: "#FFC233" }}>150+ solar projects · Free site survey · Official warranty</span>
          </div>

          <div style={{ display: "flex", fontSize: 26, color: "#E6ECF5" }}>
            {`Call / WhatsApp ${CONFIG.phone}  ·  ${CONFIG.address}`}
          </div>
        </div>
      </div>
    ),
    size
  );
}
