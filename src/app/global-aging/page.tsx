import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { SITE } from '@/lib/site';
import GlobalAgingApp from './GlobalAgingApp';

export const metadata: Metadata = {
  alternates: { canonical: '/global-aging' },
  title: `Global Aging Among People Living with HIV | ${SITE.name}`,
  description: 'Interactive projections of age distributions among people living with HIV across countries, income groups, and global estimates (2025–2040), from the GMHA model.',
};

export default function GlobalAgingPage() {
  return (
    <MainLayout>
      <GlobalAgingApp />
    </MainLayout>
  );
}
