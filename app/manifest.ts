import type { MetadataRoute } from "next";
import { CONFIG } from "@/lib/config";

// Built once into a plain file at build time (needed for static hosting on Cloudflare Pages)
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: CONFIG.name,
    short_name: CONFIG.shortName,
    description: `Solar, batteries, UPS & home appliances in ${CONFIG.city}, Azad Kashmir`,
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0B1B33",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
