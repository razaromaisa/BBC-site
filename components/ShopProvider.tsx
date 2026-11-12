"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PRODUCTS, productById, type Product } from "@/lib/data";

type Cart = Record<string, number>;
export type CatFilter = "all" | Product["cat"];
type Line = { p: Product; qty: number };

type ShopState = {
  cart: Cart;
  lines: Line[];
  count: number;
  total: number;
  add: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  remove: (id: string) => void;
  clear: () => void;

  cat: CatFilter;
  query: string;
  goTo: (cat: CatFilter, opts?: { query?: string; scroll?: boolean }) => void;
  clearQuery: () => void;

  cartOpen: boolean;
  menuOpen: boolean;
  openCart: () => void;
  openMenu: () => void;
  closeAll: () => void;

  toast: { product: Product; key: number } | null;
  hideToast: () => void;
};

const ShopContext = createContext<ShopState | null>(null);
const STORAGE_KEY = "bbc-cart";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [loaded, setLoaded] = useState(false);
  const [cat, setCat] = useState<CatFilter>("all");
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<ShopState["toast"]>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const router = useRouter();
  const pathname = usePathname();

  // Close drawers whenever the visitor moves to another page
  useEffect(() => { setCartOpen(false); setMenuOpen(false); }, [pathname]);

  // Load / persist cart (per visitor, in their browser)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch { /* storage unavailable */ }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch { /* storage unavailable */ }
  }, [cart, loaded]);

  // Lock page scroll while a drawer is open
  useEffect(() => {
    document.body.classList.toggle("locked", cartOpen || menuOpen);
  }, [cartOpen, menuOpen]);

  const lines = useMemo(
    () => Object.entries(cart).map(([id, qty]) => ({ p: productById(id)!, qty })).filter((l) => l.p && l.qty > 0),
    [cart]
  );
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.qty * l.p.price, 0);

  const add = useCallback((id: string) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    const product = PRODUCTS.find((p) => p.id === id);
    if (product) {
      setToast({ product, key: Date.now() });
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(null), 3200);
    }
  }, []);

  const changeQty = useCallback((id: string, delta: number) => {
    setCart((c) => {
      const next = { ...c, [id]: Math.max(0, (c[id] || 0) + delta) };
      if (!next[id]) delete next[id];
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => setCart(({ [id]: _, ...rest }) => rest), []);
  const clear = useCallback(() => setCart({}), []);

  const goTo = useCallback<ShopState["goTo"]>((c, opts = {}) => {
    setCat(c);
    setQuery(opts.query ?? "");
    setCartOpen(false);
    setMenuOpen(false);
    if (opts.scroll === false) return;
    const grid = document.getElementById("products");
    if (grid) {
      requestAnimationFrame(() => grid.scrollIntoView({ behavior: "smooth" }));
    } else {
      // Not on the home page: go there. The product grid reads this filter from the shared state.
      router.push("/#products");
    }
  }, [router]);

  const value: ShopState = {
    cart, lines, count, total, add, changeQty, remove, clear,
    cat, query, goTo, clearQuery: () => setQuery(""),
    cartOpen, menuOpen,
    openCart: () => { setMenuOpen(false); setCartOpen(true); setToast(null); },
    openMenu: () => { setCartOpen(false); setMenuOpen(true); },
    closeAll: () => { setCartOpen(false); setMenuOpen(false); },
    toast, hideToast: () => setToast(null),
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
}
