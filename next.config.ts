import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles optimization automatically
  // Removed 'output: export' to enable hybrid rendering (SSR + Static)
  // Removed 'unoptimized: true' to enable Next.js Image optimization
};

export default nextConfig;
