/* Small UI icons used across the site */
type P = { className?: string };

export const WaIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><use href="#i-wa" /></svg>
);

export const PhoneIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1L6.6 10.8Z" /></svg>
);

export const CartIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10" cy="20.5" r="1.4" fill="currentColor" /><circle cx="17" cy="20.5" r="1.4" fill="currentColor" /></svg>
);

export const PinIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
);

export const ClockIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path fillRule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 10.4V6h-2v7.2l5 3 1-1.7-4-2.1Z" /></svg>
);

export const CloseIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);

export const ShieldIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm-1.2 14.2-3.5-3.5 1.4-1.4 2.1 2.1 4.9-4.9 1.4 1.4-6.3 6.3Z" /></svg>
);

export const WrenchIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M22.7 19.3 13.6 10.2c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6.3 6 9.3 1.6 5C.4 7.4.9 10.4 2.9 12.4c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1 .1-1.4Z" /></svg>
);

export const ArrowIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export const SearchIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);

export const HomeIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1v-8.5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
);

export const GridIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
);

export const StarIcon =({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z" /></svg>
);

/* Shop logo shown next to the shop name (header, mobile menu, footer). File: public/images/bbc-logo.png */
export function BrandMark({ className = "brand-mark" }: { bg?: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src="/images/bbc-logo.png" alt="" aria-hidden="true" width={46} height={46} />;
}
