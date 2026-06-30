import type { NextConfig } from "next";

const DEFAULT_SITE_URL = "https://cipher-epi.vercel.app";
const DEFAULT_LEGACY_SITE_HOSTS = [
  "jhu-comp-epi.vercel.app",
  "jhu-comp-epi-pvip.vercel.app",
];

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const canonicalSiteUrl = (configuredSiteUrl || DEFAULT_SITE_URL).replace(/\/$/, "");
const canonicalHost = canonicalSiteUrl
  ? (() => {
      try {
        return new URL(canonicalSiteUrl).host;
      } catch {
        return undefined;
      }
    })()
  : undefined;
const configuredLegacyHosts = process.env.SITE_LEGACY_HOSTS?.trim();
const legacySiteHosts = (configuredLegacyHosts || DEFAULT_LEGACY_SITE_HOSTS.join(","))
  .split(",")
  .map(host => host.trim())
  .filter(host => host && host !== canonicalHost);

const nextConfig: NextConfig = {
  // Vercel handles optimization automatically
  // Removed 'output: export' to enable hybrid rendering (SSR + Static)
  // Removed 'unoptimized: true' to enable Next.js Image optimization

  async redirects() {
    const domainRedirects =
      canonicalSiteUrl && canonicalHost
        ? legacySiteHosts.map(host => ({
            source: '/:path*',
            has: [
              {
                type: 'host' as const,
                value: host,
              },
            ],
            destination: `${canonicalSiteUrl}/:path*`,
            permanent: false,
          }))
        : [];

    return [
      ...domainRedirects,
      {
        source: '/projects/gmha',
        destination: '/global-aging',
        permanent: false,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires unsafe-inline/eval
              "style-src 'self' 'unsafe-inline'", // Tailwind requires unsafe-inline
              "img-src 'self' data: https:", // Allow images from HTTPS sources
              "font-src 'self' data:",
              "connect-src 'self' https://cdn.jsdelivr.net", // Allow map data from CDN
              "frame-ancestors 'none'", // Prevent clickjacking
            ].join('; ')
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
