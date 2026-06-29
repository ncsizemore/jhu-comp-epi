import MainLayout from '@/components/layout/MainLayout';
import PublicationsLead from '@/components/sections/publications/PublicationsLead';
import PublicationIndex from '@/components/sections/publications/PublicationIndex';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SectionErrorFallback } from '@/components/SectionErrorFallback';
import { getPublications, getPublicationYears } from '@/lib/data/publications';
import { SITE } from '@/lib/site';

export const metadata = {
  title: `Publications | ${SITE.name}`,
  description: 'Research publications from CIPHER Lab, covering infectious disease modeling, epidemiology, and public health interventions.',
};

// Enable Incremental Static Regeneration - regenerate every hour
export const revalidate = 3600;

export default async function PublicationsPage() {
  const publications = await getPublications();
  const publicationYears = await getPublicationYears();

  return (
    <MainLayout>
      <ErrorBoundary
        fallback={
          <SectionErrorFallback
            title="Publications unavailable"
            message="Unable to load featured publications. Please try refreshing the page."
          />
        }
      >
        <PublicationsLead publications={publications} />
      </ErrorBoundary>

      <PublicationIndex
        publications={publications}
        years={publicationYears}
      />
    </MainLayout>
  );
}
