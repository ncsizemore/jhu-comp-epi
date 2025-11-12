import MainLayout from '@/components/layout/MainLayout';
import FeaturedPublicationsGrid from '@/components/sections/publications/FeaturedPublicationsGrid';
import PublicationsTimeline from '@/components/sections/publications/PublicationsTimeline';
import EnhancedPublicationsList from '@/components/sections/publications/EnhancedPublicationsList';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SectionErrorFallback } from '@/components/SectionErrorFallback';
import { getPublications, getPublicationYears } from '@/lib/data/publications';
import './publications.css';

export const metadata = {
  title: 'Publications | JHU Computational Epidemiology',
  description: 'Research publications from the Johns Hopkins Computational Epidemiology Group, covering HIV modeling, epidemiology, and public health interventions.',
};

// Enable Incremental Static Regeneration - regenerate every hour
export const revalidate = 3600;

export default async function PublicationsPage() {
  // Fetch data using the data access layer
  const publications = await getPublications();
  const publicationYears = await getPublicationYears();

  return (
    <MainLayout>
      {/* Featured Publications */}
      <ErrorBoundary fallback={<SectionErrorFallback title="Featured publications unavailable" message="Unable to load featured publications. Please try refreshing the page." />}>
        <FeaturedPublicationsGrid publications={publications} />
      </ErrorBoundary>

      {/* Research Timeline */}
      <ErrorBoundary fallback={<SectionErrorFallback title="Timeline unavailable" message="Unable to load research timeline. Please try refreshing the page." />}>
        <PublicationsTimeline publications={publications} />
      </ErrorBoundary>

      {/* Enhanced Publications List */}
      <EnhancedPublicationsList
        publications={publications}
        years={publicationYears}
      />
    </MainLayout>
  );
}