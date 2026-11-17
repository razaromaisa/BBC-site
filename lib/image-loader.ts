/* Tells <Image> where the resized copy of a photo is for a given width.
   The copies are made before every build by scripts/optimize-images.mjs (Cloudflare Pages
   can't resize images on the fly), so a phone downloads a small WebP instead of the full photo. */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const m = src.match(/^\/images\/(.+)\.(jpe?g|png|webp)$/i);
  return m ? `/_img/${m[1]}-${width}.webp` : src;
}
