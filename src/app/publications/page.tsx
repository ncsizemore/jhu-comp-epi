import MainLayout from '@/components/layout/MainLayout';
import FeaturedPublications from '@/components/sections/publications/FeaturedPublications';
import RecentPublicationsHighlight from '@/components/sections/publications/RecentPublicationsHighlight';
import PublicationsList from '@/components/sections/publications/PublicationsList';
import { publications, publicationTags, publicationYears } from '@/data/publications';
import './publications.css';

export const metadata = {
  title: 'Publications | JHU Computational Epidemiology',
  description: 'Research publications from the Johns Hopkins University Computational Epidemiology Research Group',
};

export default function PublicationsPage() {
  return (
    <MainLayout>
      {/* Featured Publications - Now the hero section */}
      <FeaturedPublications publications={publications} />

      {/* Recent Publications */}
      <RecentPublicationsHighlight publications={publications} />

      {/* All Publications with Filters */}
      <PublicationsList
        publications={publications}
        tags={publicationTags}
        years={publicationYears}
      />
    </MainLayout>
  );
}
