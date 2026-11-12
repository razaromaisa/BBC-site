import Products from "@/components/Products";
import Reviews from "@/components/Reviews";
import ContactForm from "@/components/ContactForm";
import SolarCalculator from "@/components/SolarCalculator";
import { FaqJsonLd } from "@/components/JsonLd";
import {
  Hero, TrustStrip, Categories, SolarSection, BatteryGuide,
  Warranty, Brands, CtaBand, ContactInfo, Faq,
} from "@/components/Sections";

/* Title, description and preview image for the home page come from app/layout.tsx
   and app/opengraph-image.tsx. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Categories />
      <Products />
      <SolarSection />
      <SolarCalculator />
      <BatteryGuide />
      <Warranty />
      <Reviews />
      <Faq />
      <Brands />
      <CtaBand />

      <section className="section" id="contact">
        <div className="container">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Visit or contact us</p>
              <h2>We&apos;re here to help</h2>
            </div>
          </div>
          <div className="contact">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      <FaqJsonLd />
    </>
  );
}
