"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CATEGORIES, REVIEWS, categoryHref } from "@/lib/data";
import { CONFIG, rs, telLink, waLink } from "@/lib/config";
import { AJK_PAGE, PRICE_PAGE } from "@/lib/areas";
import { rememberWhatsApp } from "@/lib/whatsapp";
import { useShop } from "./ShopProvider";
import { CategoryMedia, ProductMedia } from "./Art";
import { BrandMark, CartIcon, CloseIcon, GridIcon, HomeIcon, PhoneIcon, WaIcon } from "./Icons";

export function MobileMenu() {
  const { menuOpen, closeAll } = useShop();
  return (
    <aside className={`drawer drawer-left${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} aria-label="Menu">
      <div className="drawer-head">
        <span className="brand brand-sm">
          <BrandMark />
          <span className="brand-text"><strong>BBC</strong><small>Bismillah Battery Center</small></span>
        </span>
        <button className="icon-btn" onClick={closeAll} aria-label="Close menu"><CloseIcon /></button>
      </div>
      <p className="drawer-label">Shop by category</p>
      <div className="m-cats">
        {CATEGORIES.map((c) => (
          <Link key={c.key} href={categoryHref(c.key)} onClick={closeAll}>
            <span className="dd-art" style={{ background: c.tint }}><CategoryMedia c={c} decorative /></span>
            {c.name}
          </Link>
        ))}
      </div>
      <p className="drawer-label">Explore</p>
      <nav className="m-links" onClick={closeAll}>
        <Link href="/">Home</Link>
        <Link href={AJK_PAGE}>Solar Installation in AJK</Link>
        <Link href={PRICE_PAGE}>Solar System Prices</Link>
        <a href="/#calculator">Solar &amp; Backup Calculator</a>
        <a href="/#batteries">Battery Guide</a>
        <a href="/#warranty">Warranty</a>
        {REVIEWS.length > 0 && <a href="/#reviews">Reviews</a>}
        <a href="/#faq">FAQs</a>
        <a href="/#contact">Contact</a>
      </nav>
      <a className="btn btn-wa btn-block" href={waLink("Assalam o Alaikum! I want to ask about your products.")} target="_blank" rel="noopener">
        <WaIcon /> Chat on WhatsApp
      </a>
    </aside>
  );
}

export function CartDrawer() {
  const { cartOpen, closeAll, lines, count, total, changeQty, remove, clear } = useShop();
  const router = useRouter();

  const message =
    `Assalam o Alaikum! I'd like to order from your website:\n\n` +
    lines.map(({ p, qty }) => `• ${qty} × ${p.name} (${p.from ? "from " : ""}${rs(p.price)})`).join("\n") +
    `\n\nEstimated total: ${rs(total)}\n\nPlease confirm price, availability and delivery.`;

  return (
    <aside className={`drawer drawer-right${cartOpen ? " open" : ""}`} aria-hidden={!cartOpen} aria-label="Shopping cart">
      <div className="drawer-head">
        <h3>Your cart {count > 0 && <span>({count})</span>}</h3>
        <button className="icon-btn" onClick={closeAll} aria-label="Close cart"><CloseIcon /></button>
      </div>

      <div className="cart-body">
        {lines.length ? lines.map(({ p, qty }) => (
          <div className="c-line" key={p.id}>
            <span className="c-art"><ProductMedia p={p} sizes="76px" decorative /></span>
            <div className="c-info">
              <strong>{p.name}</strong>
              <small>{p.from ? "From " : ""}{rs(p.price)}</small>
              <div className="qty">
                <button onClick={() => changeQty(p.id, -1)} aria-label={`One less ${p.name}`}>−</button>
                <span>{qty}</span>
                <button onClick={() => changeQty(p.id, 1)} aria-label={`One more ${p.name}`}>+</button>
              </div>
            </div>
            <div className="c-right">
              <strong>{rs(p.price * qty)}</strong>
              <button className="c-remove" onClick={() => remove(p.id)} aria-label={`Remove ${p.name}`}>Remove</button>
            </div>
          </div>
        )) : (
          <div className="cart-empty">
            <span className="cart-empty-ico"><CartIcon /></span>
            <strong>Your cart is empty</strong>
            <p>Browse our products and add what you need.</p>
            <a className="btn btn-dark" href="/#products" onClick={closeAll}>Start shopping</a>
          </div>
        )}
      </div>

      {lines.length > 0 && (
        <div className="cart-foot">
          <div className="cart-total"><span>Subtotal</span><strong>{rs(total)}</strong></div>
          <p className="cart-note">Final price, delivery and installation charges are confirmed on WhatsApp.</p>
          <a className="btn btn-wa btn-block" href={waLink(message)} target="_blank" rel="noopener"
            onClick={() => { rememberWhatsApp(waLink(message)); setTimeout(() => router.push("/thank-you?type=order"), 400); }}>
            <WaIcon /> Place order on WhatsApp
          </a>
          <button className="link-btn" onClick={clear}>Clear cart</button>
        </div>
      )}
    </aside>
  );
}

export function Backdrop() {
  const { cartOpen, menuOpen, closeAll } = useShop();
  const open = cartOpen || menuOpen;
  return <div className={`overlay${open ? " show" : ""}`} hidden={!open} onClick={closeAll} />;
}

export function Toast() {
  const { toast, openCart } = useShop();
  return (
    <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">
      {toast && (
        <>
          <span className="toast-art"><ProductMedia p={toast.product} sizes="48px" decorative /></span>
          <span><strong>Added to cart</strong><small>{toast.product.name}</small></span>
          <button className="toast-btn" onClick={openCart}>View cart</button>
        </>
      )}
    </div>
  );
}

export function WhatsAppFloat() {
  return (
    <a className="wa-float" href={waLink("Assalam o Alaikum! I want to ask about your products.")} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <WaIcon />
    </a>
  );
}

/** App-style navigation bar fixed to the bottom of the screen on phones & small tablets. */
export function BottomNav() {
  const { count, menuOpen, cartOpen, openMenu, openCart, closeAll } = useShop();
  const pathname = usePathname();
  const onHome = pathname === "/" && !menuOpen && !cartOpen;
  return (
    <nav className="bottom-nav" aria-label="Quick links">
      <Link href="/" className={onHome ? "on" : ""} aria-current={pathname === "/" ? "page" : undefined}
        onClick={() => { closeAll(); if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" }); }}>
        <HomeIcon /><span>Home</span>
      </Link>
      <button type="button" className={menuOpen ? "on" : ""} aria-expanded={menuOpen} onClick={menuOpen ? closeAll : openMenu}>
        <GridIcon /><span>Categories</span>
      </button>
      <button type="button" className={cartOpen ? "on" : ""} aria-expanded={cartOpen} onClick={cartOpen ? closeAll : openCart}>
        <span className="bn-ico">
          <CartIcon />
          {count > 0 && <b key={count} className="bn-count">{count}</b>}
        </span>
        <span>Cart</span>
      </button>
      <a className="bn-call" href={telLink()} aria-label={`Call ${CONFIG.phone}`}>
        <PhoneIcon /><span>Call</span>
      </a>
      <a className="bn-wa" href={waLink("Assalam o Alaikum! I want to ask about your products.")} target="_blank" rel="noopener">
        <WaIcon /><span>WhatsApp</span>
      </a>
    </nav>
  );
}
