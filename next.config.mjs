/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

/* Content-Security-Policy: the browser only runs scripts / loads files from the sources listed here,
   which blocks injected scripts (XSS) from other sites.
   - Google Tag Manager / Analytics: only used when gaId is set in lib/config.ts.
   - www.google.com: the shop-location map on the home page.
   - 'unsafe-inline' scripts: needed by Next.js for its page data on a static site.
   - Dev only: 'unsafe-eval' and ws: are needed by the local test server (npm run dev). */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://*.googletagmanager.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self'",
  `connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com${isDev ? " ws:" : ""}`,
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

/* Security headers sent with every page.
   - Strict-Transport-Security: browsers always use HTTPS for this site (your host must serve HTTPS – Vercel does automatically).
   - X-Content-Type-Options / X-Frame-Options / Referrer-Policy / Permissions-Policy: standard hardening. */
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/products", destination: "/#products", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
    ];
  },
};

export default nextConfig;
