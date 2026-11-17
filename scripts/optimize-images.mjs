/* Makes resized WebP copies of every photo in public/images, in public/_img
   (e.g. images/site/hero.jpg → _img/site/hero-828.webp). Runs automatically before
   `npm run dev` and `npm run build`; copies that are already up to date are skipped.
   The widths come from lib/image-sizes.mjs. */
import { copyFile, mkdir, readdir, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { ALL_SIZES } from "../lib/image-sizes.mjs";

const SRC = "public/images";
const OUT = "public/_img";
const PHOTO = /\.(jpe?g|png|webp)$/i;

let sharp = null;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("⚠️  sharp is not installed: photos are copied at full size instead of resized.");
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (PHOTO.test(entry.name)) yield path;
  }
}

const upToDate = async (out, src) => {
  try { return (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs; } catch { return false; }
};

let made = 0;
for await (const src of walk(SRC)) {
  const base = relative(SRC, src).replace(PHOTO, "");
  for (const width of ALL_SIZES) {
    const out = join(OUT, `${base}-${width}.webp`);
    if (await upToDate(out, src)) continue;
    await mkdir(dirname(out), { recursive: true });
    if (sharp) {
      await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 74 }).toFile(out);
    } else {
      await copyFile(src, out);
    }
    made++;
  }
}
console.log(`Images: ${made ? `${made} resized copies made` : "all resized copies up to date"} in ${OUT}.`);
