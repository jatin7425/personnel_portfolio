import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // required for GH Pages, since it can't run the image optimizer
  },
  experimental: {
    // for future versions, add experimental options here if needed
  },
};

export default nextConfig;
