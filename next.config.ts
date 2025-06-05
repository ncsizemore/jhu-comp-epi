import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/jhu-comp-epi',
  assetPrefix: '/jhu-comp-epi/',
};

export default nextConfig;
