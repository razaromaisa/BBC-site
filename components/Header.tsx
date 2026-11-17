"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, PRODUCTS, catName, categoryHref } from "@/lib/data";
import { CONFIG, rs, telLink, waLink } from "@/lib/config";
import { AJK_PAGE, PRICE_PAGE } from "@/lib/areas";
import { useShop } from "./ShopProvider";
import { ProductMedia } from "./Art";
import { BrandMark, CartIcon, PhoneIcon, SearchIcon, WaIcon } from "./Icons";

/* Extra links shown after the categories in the menu bar */
const EXTRA: { label: string; href: string }[] = [
  { label: "Solar Prices", href: PRICE_PAGE },
  { label: "Installation", href: AJK_PAGE },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const shop = useShop();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [text, setText] = useState("");
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const searchRef = useRef<HTMLFormElement>(null);

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
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setSuggestOpen(false); shop.closeAll(); } };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [shop]);

  // Keep the header search box in sync when a search is cleared elsewhere
  useEffect(() => { if (!shop.query) setText(""); }, [shop.query]);

  const matches = useMemo(() => {
    const words = text.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return PRODUCTS.filter((p) =>
      words.every((w) => `${p.name} ${p.spec} ${catName(p.cat)}`.toLowerCase().includes(w))).slice(0, 6);
  }, [text]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setSuggestOpen(false);
    (document.activeElement as HTMLElement | null)?.blur();
    shop.goTo("all", { query: text.trim() });
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
        <Link href="/" className="brand" aria-label="BBC – Bismillah Battery Center, home">
          <BrandMark />
          <span className="brand-text"><strong>BBC</strong><small>Bismillah Battery Center</small></span>
        </Link>

        <form className="search" role="search" autoComplete="off" ref={searchRef} onSubmit={submit}>
          <SearchIcon className="search-ico" />
          <label className="sr-only" htmlFor="searchInput">Search products</label>
          <input
            id="searchInput" type="search" enterKeyHint="search" placeholder="Search solar panels, batteries, fans…"
            value={text}
            onChange={(e) => { setText(e.target.value); setSuggestOpen(true); setActive(-1); }}
            onFocus={() => setSuggestOpen(true)}
            onKeyDown={onKeyDown}
          />
          <button type="submit" className="search-btn">Search</button>

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
            <span><small>Call or WhatsApp</small><strong>{CONFIG.phone}</strong></span>
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
          <ul className="nav-links">
            <li><Link href="/" aria-current={pathname === "/" ? "page" : undefined}>Home</Link></li>
            {CATEGORIES.map((c) => {
              const href = categoryHref(c.key);
              return (
                <li key={c.key}>
                  <Link href={href} aria-current={pathname === href ? "page" : undefined}>{c.short}</Link>
                </li>
              );
            })}
          </ul>
          <ul className="nav-links nav-extra">
            {EXTRA.map((n) => (
              <li key={n.label}>
                {n.href.startsWith("/#") ? <a href={n.href}>{n.label}</a>
                  : <Link href={n.href} aria-current={pathname === n.href ? "page" : undefined}>{n.label}</Link>}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
