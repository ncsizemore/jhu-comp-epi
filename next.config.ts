import type { NextConfig } from "next";

// Use basePath only for GitHub Pages deployment
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  ...(isGitHubPages && {
    basePath: '/jhu-comp-epi',
    assetPrefix: '/jhu-comp-epi/',
  }),
};

export default nextConfig;
