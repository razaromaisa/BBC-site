/** @type {import('next').NextConfig} */
import { DEVICE_SIZES, IMAGE_SIZES } from "./lib/image-sizes.mjs";

/* Hosting: Cloudflare Pages (free plan).
   `npm run build` turns the whole site into plain files in the `out/` folder, which Cloudflare serves directly.
   Because there is no server:
   - Security headers live in public/_headers, and redirects in public/_redirects (Cloudflare reads both).
   - Photos can't be resized on the fly, so scripts/optimize-images.mjs makes small, medium and large WebP
     copies of everything in public/images before each build, and lib/image-loader.ts points <Image> at the
     right one for the screen. Phones get the small copy. */
const nextConfig = {
  output: "export",
  poweredByHeader: false,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: DEVICE_SIZES,
    imageSizes: IMAGE_SIZES,
  },
};

export default nextConfig;
