/* Photo credits shown on /photo-credits.
   Creative Commons "BY" licences require crediting the photographer, so keep this list
   in sync with the photos in /public/images. When you replace a stock photo with your own,
   remove its line here. */
export type PhotoCredit = {
  file: string;
  usedFor: string;
  title: string;
  creator?: string;
  creatorUrl?: string;
  license: string;
  licenseVersion?: string;
  licenseUrl?: string;
  source: string;
  modified?: boolean;
};

export const PHOTO_CREDITS: PhotoCredit[] = [
  { file: "/images/site/hero.jpg", usedFor: "Home page banner", title: "Solar panels on a roof at sunset", license: "unsplash", licenseUrl: "https://unsplash.com/license", source: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d" },
  { file: "/images/site/installer.jpg", usedFor: "Solar installation section", title: "Installer carrying a solar panel", license: "unsplash", licenseUrl: "https://unsplash.com/license", source: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a" },
  { file: "/images/site/cctv.jpg", usedFor: "CCTV banner", title: "Security cameras on a wall", license: "unsplash", licenseUrl: "https://unsplash.com/license", source: "https://images.unsplash.com/photo-1557597774-9d273605dfa9" },
  { file: "/images/site/cta.jpg", usedFor: "Call-to-action banner", title: "Solar panel field", license: "unsplash", licenseUrl: "https://unsplash.com/license", source: "https://images.unsplash.com/photo-1509391366360-2e959784a276" },
];
