import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // required for GH Pages, since it can't run the image optimizer
  },
  experimental: {
  },
  // Exclude heavy native binaries from serverless function bundles
  outputFileTracingExcludes: {
    'node_modules/sharp': ['**/*'],
    'node_modules/@next/swc-win32-x64-msvc': ['**/*'],
    'node_modules/lightningcss-win32-x64-msvc': ['**/*']
  },

  // other options if needed
  reactStrictMode: true,
};

export default nextConfig;
