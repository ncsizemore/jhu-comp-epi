'use client';

import dynamic from 'next/dynamic';

// Dynamic import for map component to reduce initial bundle size
const ResearchAtScaleSection = dynamic(
  () => import('./ResearchAtScaleSection'),
  { ssr: false }
);

export default function MapSectionWrapper() {
  return <ResearchAtScaleSection />;
}
