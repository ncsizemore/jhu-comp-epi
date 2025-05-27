import Link from 'next/link';
import { Publication, projectsMap } from '@/data/publications';

interface RecentPublicationsHighlightProps {
  publications: Publication[];
  count?: number; // How many recent publications to show (default: 3)
}

export default function RecentPublicationsHighlight({ 
  publications, 
  count = 3 
}: RecentPublicationsHighlightProps) {
  // Sort publications by year (most recent first) and take the specified count
  const recentPublications = [...publications]
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
    .slice(0, count);

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-px bg-hopkins-gold mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-900">Recent Publications</h2>
            <div className="w-12 h-px bg-hopkins-gold ml-3"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our latest contributions to computational epidemiology and public health research
          </p>
        </div>

        {/* Publications Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {recentPublications.map((publication) => {
            const projectId = publication.projects[0] || 'pearl';
            const project = projectsMap[projectId as keyof typeof projectsMap];
            
            return (
              <div 
                key={publication.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
              >
                {/* Project Badge */}
                <div className={`${project.color} px-4 py-2`}>
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium">
                      {project.name}
                    </span>
                    <span className="text-white/80 text-sm">
                      {publication.year}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight line-clamp-3 group-hover:text-hopkins-blue transition-colors">
                    {publication.title}
                  </h3>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">{publication.authors.split(',')[0]}</span>
                      {publication.authors.split(',').length > 1 && ' et al.'}
                    </p>
                    <p className="text-sm text-gray-500 italic">
                      {publication.journal}
                    </p>
                  </div>

                  {/* Abstract preview (if available) */}
                  {publication.abstract && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {publication.abstract}
                    </p>
                  )}

                  {/* Link */}
                  <div className="pt-3 border-t border-gray-100">
                    <Link 
                      href={publication.url || `https://doi.org/${publication.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-hopkins-blue hover:text-hopkins-gold transition-colors text-sm font-medium"
                    >
                      Read Publication
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link 
            href="#all-publications"
            className="inline-flex items-center px-6 py-3 bg-hopkins-blue text-white rounded-lg hover:bg-hopkins-gold transition-colors font-medium"
          >
            View All Publications
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
