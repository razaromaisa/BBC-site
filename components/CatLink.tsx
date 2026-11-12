"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { categoryHref } from "@/lib/data";
import { useShop, type CatFilter } from "./ShopProvider";

/**
 * Link to a product category.
 * - A plain category link goes to that category's own page (/products/…), which Google can crawl.
 * - "all", or a category + search word, filters the product grid on the home page instead.
 */
export default function CatLink({
  cat, query, className, children, as = "a",
}: { cat: CatFilter; query?: string; className?: string; children: ReactNode; as?: "a" | "button" }) {
  const { goTo } = useShop();

  if (cat !== "all" && !query && as === "a") {
    return <Link href={categoryHref(cat)} className={className}>{children}</Link>;
  }

  const onClick = (e: React.MouseEvent) => { e.preventDefault(); goTo(cat, { query }); };
  if (as === "button") {
    return <button type="button" className={className} onClick={onClick}>{children}</button>;
  }
  return <a href="/#products" className={className} onClick={onClick}>{children}</a>;
}
