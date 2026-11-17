import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Noto_Nastaliq_Urdu } from "next/font/google";
import { ShopProvider } from "@/components/ShopProvider";
import SvgDefs from "@/components/SvgDefs";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Analytics from "@/components/Analytics";
import { BusinessJsonLd } from "@/components/JsonLd";
import { Backdrop, BottomNav, CartDrawer, MobileMenu, Toast, WhatsAppFloat } from "@/components/Overlays";
import { Footer } from "@/components/Sections";
import { CONFIG, SITE_URL } from "@/lib/config";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
// Only used for one line in the footer, so it isn't downloaded up front (saves data on phones)
const urdu = Noto_Nastaliq_Urdu({ subsets: ["arabic"], weight: ["600"], variable: "--font-urdu", display: "swap", preload: false });

/* Home page: owns the main local search, "solar installation in Kotli". Keep the title under ~60 characters
   and the description under ~155 so Google shows them in full on phones. */
const TITLE = `Solar Installation in ${CONFIG.city}, AJK | ${CONFIG.businessName}`;
const DESCRIPTION =
  `Solar panel installation in ${CONFIG.city} and across Azad Kashmir. Hybrid inverters, lithium batteries & UPS. 150+ systems installed. Free site survey.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${CONFIG.titleSuffix}` },
  description: DESCRIPTION,
  applicationName: CONFIG.name,
  keywords: [
    "solar installation Kotli", "solar panels Kotli", "solar company Kotli", "solar system price in Kotli",
    "solar installation Azad Kashmir", "solar company AJK", "solar Mirpur", "solar Muzaffarabad", "solar Rawalakot",
    "lithium battery Kotli", "hybrid inverter", "5kW solar system price", "UPS Kotli", "Bismillah Battery Center", "BBC Kotli",
  ],
  category: "shopping",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName: CONFIG.name,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${CONFIG.name}: solar panels, batteries & UPS in ${CONFIG.city}` }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
  other: { "geo.region": "PK-JK", "geo.placename": `${CONFIG.city}, Azad Kashmir` },
};

export const viewport: Viewport = { themeColor: "#0B1B33" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${urdu.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SvgDefs />
        <ShopProvider>
          <Header />
          <MobileMenu />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <Backdrop />
          <Toast />
          <WhatsAppFloat />
          <BottomNav />
          <RevealObserver />
        </ShopProvider>
        <BusinessJsonLd />
        <Analytics />
      </body>
    </html>
  );
}
