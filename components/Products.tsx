"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, PRODUCTS, catName, type Product } from "@/lib/data";
import { CONFIG, rs, waLink } from "@/lib/config";
import { energyNote } from "@/lib/energy";
import { useShop, type CatFilter } from "./ShopProvider";
import { ProductMedia } from "./Art";
import { CartIcon, WaIcon } from "./Icons";

const PAGE = 12;

export function ProductCard({ p, i, onAdd }: { p: Product; i: number; onAdd: (id: string) => void }) {
  const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const energy = energyNote(p);
  return (
    <article className="card" style={{ "--d": `${Math.min(i, 11) * 35}ms` } as React.CSSProperties}>
      <div className="card-media">
        {off > 0 ? <span className="badge badge-off">-{off}%</span> : p.badge && <span className="badge">{p.badge}</span>}
        {off > 0 && p.badge && <span className="badge badge-2">{p.badge}</span>}
        <ProductMedia p={p} sizes="(max-width: 640px) 50vw, 300px" />
        <a className="quick-wa" href={waLink(`Assalam o Alaikum! I'm interested in: ${p.name} (${rs(p.price)}). Is it available?`)}
          target="_blank" rel="noopener" aria-label={`Ask about ${p.name} on WhatsApp`}>
          <WaIcon />
        </a>
      </div>
      <div className="card-body">
        <span className="card-cat">{catName(p.cat)}</span>
        <h3>{p.name}</h3>
        <p className="card-spec">{p.spec}</p>
        {energy && (
          <a className="card-energy" href="/#calculator" title="Open the solar & backup calculator">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>
            {energy}
          </a>
        )}
        <div className="card-foot">
          <div className="price">
            {p.from && <small>From</small>}
            <strong>{rs(p.price)}</strong>
            {p.old && <s>{rs(p.old)}</s>}
          </div>
          <button className="add-btn" onClick={() => onAdd(p.id)} aria-label={`Add ${p.name} to cart`}>
            <CartIcon /><span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Products() {
  const { cat, query, goTo, clearQuery, add } = useShop();
  const [limit, setLimit] = useState(PAGE);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLimit(PAGE);
    // Centre the active tab inside the (horizontally scrolling) tab strip on phones
    const strip = tabsRef.current;
    const tab = strip?.querySelector<HTMLElement>(".tab.active");
    if (strip && tab) strip.scrollTo({ left: tab.offsetLeft - strip.clientWidth / 2 + tab.clientWidth / 2, behavior: "smooth" });
  }, [cat, query]);

  const list = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return PRODUCTS.filter((p) => {
      if (cat !== "all" && p.cat !== cat) return false;
      if (!words.length) return true;
      const hay = `${p.name} ${p.spec} ${catName(p.cat)} ${p.badge ?? ""}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [cat, query]);

  const showAll = cat !== "all" || !!query;
  const visible = showAll ? list : list.slice(0, limit);
  const tabs: { key: CatFilter; name: string }[] = [{ key: "all", name: "All" }, ...CATEGORIES];

  return (
    <section className="section section-soft" id="products">
      <div className="container">
        <div className="sec-head">
          <div>
            <p className="eyebrow">Products &amp; prices</p>
            <h2>What we sell at the {CONFIG.city} shop</h2>
            <p className="sec-sub">Prices in PKR and updated with market rates. Add items to your cart and send the order to us on WhatsApp.</p>
          </div>
        </div>

        <div className="tabs" role="tablist" aria-label="Product categories" ref={tabsRef}>
          {tabs.map((t) => (
            <button key={t.key} role="tab" aria-selected={cat === t.key}
              className={`tab${cat === t.key ? " active" : ""}`}
              onClick={() => goTo(t.key, { query, scroll: false })}>
              {t.name}
            </button>
          ))}
        </div>

        {query && (
          <div className="search-note">
            {list.length} result{list.length === 1 ? "" : "s"} for “<strong>{query}</strong>”
            {cat !== "all" && <> in {catName(cat)}</>}
            <button className="chip-clear" onClick={clearQuery}>Clear ✕</button>
          </div>
        )}

        <div className="product-grid" aria-live="polite">
          {visible.map((p, i) => <ProductCard key={p.id} p={p} i={i} onAdd={add} />)}
        </div>

        {list.length === 0 && (
          <div className="empty">
            <p>We couldn&apos;t find that product online, but we probably have it in the shop.</p>
            <a className="btn btn-wa" href={waLink(`Assalam o Alaikum! Do you have: ${query}?`)} target="_blank" rel="noopener"><WaIcon /> Ask on WhatsApp</a>
          </div>
        )}

        {!showAll && list.length > limit && (
          <div className="more-wrap">
            <button className="btn btn-outline" onClick={() => setLimit((l) => l + PAGE)}>
              Show more products ({list.length - limit} more)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/** Product grid for a single category page. */
export function CategoryGrid({ products }: { products: Product[] }) {
  const { add } = useShop();
  return (
    <div className="product-grid">
      {products.map((p, i) => <ProductCard key={p.id} p={p} i={i} onAdd={add} />)}
    </div>
  );
}
