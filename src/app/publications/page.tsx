import MainLayout from '@/components/layout/MainLayout';
import FeaturedPublications from '@/components/sections/publications/FeaturedPublications'; // Import the updated component
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
      {/* Enhanced header with impact stats */}
      <section className="bg-hopkins-spirit-blue py-10 relative overflow-hidden">
        {/* Enhanced background patterns */}
        <div className="absolute inset-0 bg-[url('/graph-pattern.svg')] bg-[length:24px_24px] opacity-[0.07] z-0"></div>

        {/* Geometric decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-white/[0.03] clip-path-polygon-tr z-0"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-white/[0.03] clip-path-polygon-bl z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:max-w-2xl">
              <h1 className="text-3xl font-bold text-white mb-2 leading-tight drop-shadow-sm flex items-center">
                <span className="mr-2">Research Impact</span>
                <div className="w-10 h-px bg-hopkins-gold opacity-80"></div>
              </h1>

              <p className="text-lg text-white/90 leading-relaxed mb-4">
                Our most influential publications advancing computational epidemiology methods with significant real-world impact.
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="text-white text-xl font-bold">300+</div>
                  <div className="text-white/80 text-xs">Publications</div>
                </div>

                <div className="bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="text-white text-xl font-bold">12K+</div>
                  <div className="text-white/80 text-xs">Citations</div>
                </div>

                <div className="bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="text-white text-xl font-bold">15+</div>
                  <div className="text-white/80 text-xs">Policy Changes</div>
                </div>
              </div>
            </div>

            {/* Publication categories */}
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm min-w-56">
              <h3 className="text-white text-sm font-semibold mb-3">Research Areas</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/90 text-sm">HIV Modeling</span>
                  <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-hopkins-gold rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/90 text-sm">Public Health</span>
                  <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-hopkins-gold rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/90 text-sm">Data Science</span>
                  <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-hopkins-gold rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      <FeaturedPublications publications={publications} /> {/* Use the updated component */}

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
