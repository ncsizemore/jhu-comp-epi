'use client';

import { useState, useMemo } from 'react';
import { Publication } from '@/lib/data/publications';
import { projectsMap } from '@/lib/projects/config';

interface EnhancedPublicationsListProps {
  publications: Publication[];
  years: string[];
}

export default function EnhancedPublicationsList({ publications, years }: EnhancedPublicationsListProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [displayCount, setDisplayCount] = useState(20);

  // Memoized filtering for better performance
  const filteredPublications = useMemo(() => {
    return publications.filter(pub => {
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => pub.tags.includes(tag));
      const matchesYears = selectedYears.length === 0 || selectedYears.includes(pub.year);
      const matchesProjects = selectedProjects.length === 0 || selectedProjects.some(project => pub.projects.includes(project));
      return matchesTags && matchesYears && matchesProjects;
    });
  }, [publications, selectedTags, selectedYears, selectedProjects]);

  const sortedPublications = useMemo(() => {
    return [...filteredPublications]
      .sort((a, b) => parseInt(b.year) - parseInt(a.year))
      .slice(0, displayCount);
  }, [filteredPublications, displayCount]);

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedYears([]);
    setSelectedProjects([]);
  };

  const hasActiveFilters = selectedTags.length > 0 || selectedYears.length > 0 || selectedProjects.length > 0;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-slate-50 to-white relative overflow-hidden">
      {/* Sophisticated background matching projects page */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-hopkins-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-hopkins-spirit-blue/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-hopkins-gold/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Enhanced geometric shapes with animations */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-hopkins-blue/20 rounded-2xl rotate-12 animate-pulse hover:rotate-45 transition-transform duration-1000"></div>
        <div className="absolute bottom-32 left-16 w-20 h-20 border-2 border-hopkins-gold/25 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-40 h-3 bg-gradient-to-r from-hopkins-blue/15 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 left-1/2 w-6 h-40 bg-gradient-to-b from-emerald-400/10 to-transparent rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 border border-amber-400/20 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
              All Publications
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-hopkins-blue via-hopkins-spirit-blue to-hopkins-gold mx-auto rounded-full"></div>
          </div>

          {/* Enhanced Filters with glass morphism */}
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-hopkins-blue/10 text-hopkins-blue text-xs rounded font-medium">
                    <div className="w-1 h-1 bg-hopkins-blue rounded-full"></div>
                    Active
                  </span>
                )}
              </span>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span>{sortedPublications.length} of {publications.length}</span>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-xs text-hopkins-blue hover:text-hopkins-blue/80 font-medium underline decoration-dotted hover:no-underline">
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Year Filter */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-hopkins-blue rounded-full"></div>
                  Year
                </label>
                <div className="flex flex-wrap gap-1">
                  {years.slice(0, 8).map(year => (
                    <button
                      key={year}
                      onClick={() => setSelectedYears(prev =>
                        prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
                      )}
                      className={`px-2 py-1 text-xs font-medium rounded transition-all duration-200 border ${selectedYears.includes(year)
                          ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-sm'
                        }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Filter */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-hopkins-gold rounded-full"></div>
                  Project
                </label>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(projectsMap).map(([key, project]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedProjects(prev =>
                        prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]
                      )}
                      className={`px-2 py-1 text-xs font-medium rounded transition-all duration-200 border ${selectedProjects.includes(key)
                          ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-sm'
                        }`}
                    >
                      {project.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Top Tags Filter */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  Topics
                </label>
                <div className="flex flex-wrap gap-1">
                  {['HIV', 'modeling', 'epidemiology', 'cost-effectiveness', 'prevention'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTags(prev =>
                        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                      )}
                      className={`px-2 py-1 text-xs font-medium rounded transition-all duration-200 border ${selectedTags.includes(tag)
                          ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-sm'
                        }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Publications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {sortedPublications.map((publication, index) => {
            const projectId = publication.projects[0] || 'pearl';
            const project = projectsMap[projectId as keyof typeof projectsMap] || projectsMap.pearl;

            const projectColors = {
              pearl: 'border-l-hopkins-spirit-blue',
              jheem: 'border-l-hopkins-blue',
              shield: 'border-l-amber-500'
            };

            const borderClass = projectColors[projectId as keyof typeof projectColors] || projectColors.pearl;

            return (
              <div
                key={publication.id}
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
                        <div className={`w-2 h-2 rounded-full ${projectId === 'pearl' ? 'bg-hopkins-spirit-blue' : projectId === 'jheem' ? 'bg-hopkins-blue' : 'bg-amber-500'}`}></div>
                        <span className="text-xs font-medium text-gray-600">{project.name}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-xs font-medium text-gray-600">{publication.year}</span>
                      </div>

                      <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-2 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
                        {publication.title}
                      </h3>

                      <div className="text-xs text-gray-600 mb-2 line-clamp-1">
                        <span className="font-medium">
                          {publication.authors.split(',')[0].trim()}
                          {publication.authors.split(',').length > 1 && ' et al.'}
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
          })}
        </div>

        {/* Enhanced Load More */}
        <div className="text-center mt-12">
          {displayCount < filteredPublications.length ? (
            <button
              onClick={() => setDisplayCount(prev => prev + 20)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-hopkins-blue to-hopkins-spirit-blue text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-hopkins-blue/25 transition-all duration-500 transform hover:scale-105 relative overflow-hidden"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

              <span className="relative">Load More</span>
              <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          ) : filteredPublications.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No publications found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-hopkins-blue text-white rounded-lg hover:bg-hopkins-blue/90 transition-all duration-200 font-medium"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500">All {filteredPublications.length} publications loaded</p>
          )}
        </div>
      </div>
    </section>
  );
}
