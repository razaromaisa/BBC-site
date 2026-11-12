import Image from "next/image";
import { artSvg } from "@/lib/art";
import type { Category, Product } from "@/lib/data";

/** Renders one of the built-in product drawings.
 *  With a `label` it is announced to screen readers / Google like an image's alt text. */
export function Art({ name, className, label }: { name: string; className?: string; label?: string }) {
  return (
    <span
      className={`art ${className ?? ""}`}
      {...(label ? { role: "img", "aria-label": label } : {})}
      dangerouslySetInnerHTML={{ __html: artSvg(name) }}
    />
  );
}

/** Product picture: a real photo if `img` is set in lib/data.ts, otherwise the drawing. */
export function ProductMedia({ p, sizes = "300px", decorative = false }: { p: Product; sizes?: string; decorative?: boolean }) {
  if (p.img) {
    return (
      <span className="art art-photo">
        <Image src={p.img} alt={decorative ? "" : p.alt ?? p.name} fill sizes={sizes} />
      </span>
    );
  }
  return <Art name={p.art} label={decorative ? undefined : p.name} />;
}

/** Category picture (drawing). */
export function CategoryMedia({ c, decorative = false }: { c: Category; sizes?: string; decorative?: boolean }) {
  return <Art name={c.art} label={decorative ? undefined : c.name} />;
}
