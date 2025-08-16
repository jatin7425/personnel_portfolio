import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
      unoptimized: true, // required for GH Pages, since it can't run the image optimizer
    },
    basePath: '/personnel_portfolio',
};

export default nextConfig;
