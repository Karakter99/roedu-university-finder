import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Tells Next.js to produce a static 'out' folder for Firebase
  output: "export",

  // 2. Disables Image Optimization (required for static export)
  images: {
    unoptimized: true,
  },

  // 3. Creates folders (e.g., /about/index.html) to fix the "404" error on Firebase
  trailingSlash: true,
};

export default nextConfig;
