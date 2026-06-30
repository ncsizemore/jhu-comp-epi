import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SITE } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

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
        alternates: {
          canonical: '/',
        },
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
