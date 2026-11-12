"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, PRODUCTS, catName, categoryHref } from "@/lib/data";
import { CONFIG, rs, telLink, waLink } from "@/lib/config";
import { useShop, type CatFilter } from "./ShopProvider";
import { CategoryMedia, ProductMedia } from "./Art";
import { BrandMark, CartIcon, PhoneIcon, ShieldIcon, WaIcon } from "./Icons";

const NAV: { label: string; href: string }[] = [
  { label: "Solar", href: categoryHref("solar") },
  { label: "Calculator", href: "/#calculator" },
  { label: "UPS & Batteries", href: categoryHref("ups") },
  { label: "Fans & AC", href: categoryHref("cooling") },
  { label: "Home Appliances", href: categoryHref("home") },
  { label: "CCTV", href: categoryHref("cctv") },
  { label: "Installation", href: "/#solar" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const shop = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [text, setText] = useState("");
  const [selCat, setSelCat] = useState<CatFilter>("all");
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const searchRef = useRef<HTMLFormElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close popovers on outside click / Escape
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!searchRef.current?.contains(e.target as Node)) setSuggestOpen(false);
      if (!catRef.current?.contains(e.target as Node)) setCatOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setSuggestOpen(false); setCatOpen(false); shop.closeAll(); } };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [shop]);

  // Keep the header search box in sync when a search is cleared elsewhere
  useEffect(() => { if (!shop.query) setText(""); }, [shop.query]);

  const matches = useMemo(() => {
    const words = text.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return PRODUCTS.filter((p) => (selCat === "all" || p.cat === selCat) &&
      words.every((w) => `${p.name} ${p.spec} ${catName(p.cat)}`.toLowerCase().includes(w))).slice(0, 6);
  }, [text, selCat]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setSuggestOpen(false);
    shop.goTo(selCat, { query: text.trim() });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!suggestOpen || !matches.length) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i + (e.key === "ArrowDown" ? 1 : -1) + matches.length) % matches.length);
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      pick(matches[active].name);
    }
  };

  const pick = (name: string) => {
    setText(name);
    setSuggestOpen(false);
    shop.goTo("all", { query: name });
  };

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="container head-main">
        <button className="icon-btn menu-toggle" aria-label="Open menu" onClick={shop.openMenu}>
          <svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>

        <Link href="/" className="brand" aria-label="BBC – Bismillah Battery Center, home">
          <BrandMark />
          <span className="brand-text"><strong>BBC</strong><small>Bismillah Battery Center</small></span>
        </Link>

        <form className="search" role="search" autoComplete="off" ref={searchRef} onSubmit={submit}>
          <label className="sr-only" htmlFor="searchCat">Category</label>
          <select id="searchCat" className="search-cat" value={selCat} onChange={(e) => { setSelCat(e.target.value as CatFilter); setSuggestOpen(true); }}>
            <option value="all">All</option>
            {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.name}</option>)}
          </select>
          <label className="sr-only" htmlFor="searchInput">Search products</label>
          <input
            id="searchInput" type="search" placeholder="Search solar panels, batteries, ACs, TVs…"
            value={text}
            onChange={(e) => { setText(e.target.value); setSuggestOpen(true); setActive(-1); }}
            onFocus={() => setSuggestOpen(true)}
            onKeyDown={onKeyDown}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>

          {suggestOpen && text.trim() && (
            <div className="suggest" role="listbox">
              {matches.length ? (
                <>
                  {matches.map((p, i) => (
                    <button type="button" key={p.id} role="option" aria-selected={i === active}
                      className={`sg-item${i === active ? " on" : ""}`} onClick={() => pick(p.name)}>
                      <span className="sg-art"><ProductMedia p={p} sizes="46px" decorative /></span>
                      <span className="sg-txt"><strong>{p.name}</strong><small>{catName(p.cat)}</small></span>
                      <span className="sg-price">{rs(p.price)}</span>
                    </button>
                  ))}
                  <button type="submit" className="sg-all">See all results for “{text.trim()}” →</button>
                </>
              ) : (
                <div className="sg-none">
                  No match. <a href={waLink(`Assalam o Alaikum! Do you have: ${text.trim()}?`)} target="_blank" rel="noopener">Ask us on WhatsApp</a>
                </div>
              )}
            </div>
          )}
        </form>

        <div className="head-actions">
          <a className="head-call" href={telLink()}>
            <span className="head-call-ico"><PhoneIcon /></span>
            <span><small>Call us</small><strong>{CONFIG.phone}</strong></span>
          </a>
          <a className="icon-btn icon-wa" href={waLink("Assalam o Alaikum! I want to ask about your products.")} target="_blank" rel="noopener" aria-label="WhatsApp us">
            <WaIcon />
          </a>
          <button className="icon-btn cart-btn" aria-label={`Open cart (${shop.count} items)`} onClick={shop.openCart}>
            <CartIcon />
            <span key={shop.count} className={`cart-count${shop.count ? " show pop" : ""}`}>{shop.count}</span>
          </button>
        </div>
      </div>

      <nav className="head-nav" aria-label="Main">
        <div className="container nav-row">
          <div className="cat-menu" ref={catRef}>
            <button className="cat-btn" aria-expanded={catOpen} onClick={() => setCatOpen((o) => !o)}>
              <svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" /></svg>
              All Categories
              <svg className="chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
            {catOpen && (
              <div className="cat-dropdown">
                {CATEGORIES.map((c) => (
                  <Link key={c.key} href={categoryHref(c.key)} onClick={() => setCatOpen(false)}>
                    <span className="dd-art" style={{ background: c.tint }}><CategoryMedia c={c} decorative /></span>
                    <span><strong>{c.name}</strong><small>{PRODUCTS.filter((p) => p.cat === c.key).length} products</small></span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <ul className="nav-links">
            {NAV.map((n) => (
              <li key={n.label}>
                {n.href.startsWith("/#") ? <a href={n.href}>{n.label}</a> : <Link href={n.href}>{n.label}</Link>}
              </li>
            ))}
          </ul>
          <span className="nav-badge"><ShieldIcon /> Genuine products · Official warranty</span>
        </div>
      </nav>
    </header>
  );
}
