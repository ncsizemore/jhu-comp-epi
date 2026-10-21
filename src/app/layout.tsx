import type { Metadata } from "next";
import localFont from "next/font/local";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SITE } from "@/lib/site";
import "./globals.css";

const geistSans = localFont({ src: '../../public/brand/geist-latin.woff2', variable: '--font-geist-sans', display: 'swap' });
const sourceSerif = localFont({ src: '../../public/brand/source-serif-4-latin.woff2', variable: '--font-source-serif', display: 'swap' });

const DEFAULT_SITE_URL = "https://cipher-epi.vercel.app";

function getMetadataBase() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;

  try {
    return new URL(siteUrl);
  } catch {
    return undefined;
  }
}

const metadataBase = getMetadataBase();

export const metadata: Metadata = {
  ...(metadataBase
    ? {
        metadataBase,
      }
    : {}),
  title: SITE.fullName,
  description:
    "CIPHER Lab develops policy-relevant models of infectious disease dynamics to support public health decision-making in the United States and globally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${sourceSerif.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
