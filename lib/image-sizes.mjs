/* Image widths (in pixels) the site makes for every photo in public/images.
   Shared by next.config.mjs (which picks the right one for each screen) and
   scripts/optimize-images.mjs (which creates them before every build). */
export const DEVICE_SIZES = [480, 828, 1200, 1920];
export const IMAGE_SIZES = [64, 128, 256, 384];
export const ALL_SIZES = [...IMAGE_SIZES, ...DEVICE_SIZES];
