import { memo } from 'react';
import { Publication } from '@/lib/data/publications';
import { getProjectTheme } from '@/lib/projects/config';
import { formatAuthors } from '@/lib/utils/authors';

interface PublicationListItemProps {
  publication: Publication;
  index: number;
}

function PublicationListItem({ publication, index }: PublicationListItemProps) {
  const projectId = publication.projects[0] || 'pearl';
  const theme = getProjectTheme(projectId);

  const borderClass = theme.colors.border;
  const dotClass = theme.colors.solid;

  return (
    <div
      className={`border-l-4 ${borderClass} bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200/50 hover:border-gray-300/70 rounded-r-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group`}
      style={{
        animationName: 'fadeIn',
        animationDuration: '0.5s',
        animationTimingFunction: 'ease-out',
        animationFillMode: 'forwards',
        animationDelay: `${index * 50}ms`
      }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${dotClass}`}></div>
              <span className="text-xs font-medium text-gray-600">{theme.name}</span>
              <span className="text-gray-400">•</span>
              <span className="text-xs font-medium text-gray-600">{publication.year}</span>
            </div>

            <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-2 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
              {publication.title}
            </h3>

            <div className="text-xs text-gray-600 mb-2 line-clamp-1">
              <span className="font-medium">
                {formatAuthors(publication.authors)}
              </span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="italic">{publication.journal}</span>
            </div>

            {/* Enhanced Tags */}
            <div className="flex flex-wrap gap-1 mb-2">
              {publication.tags.slice(0, 3).map((tag: string) => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md font-medium transition-colors duration-200">
                  {tag}
                </span>
              ))}
              {publication.tags.length > 3 && (
                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md font-medium">
                  +{publication.tags.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Enhanced Actions */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105">
            <a
              href={publication.url || `https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-white hover:bg-gray-700 rounded-lg border border-gray-300 hover:border-gray-700 transition-all duration-300 hover:shadow-md"
              title="View Publication"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders when parent state changes
export default memo(PublicationListItem);
