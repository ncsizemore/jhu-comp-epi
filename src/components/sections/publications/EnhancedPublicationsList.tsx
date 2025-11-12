'use client';

import { useState, useMemo } from 'react';
import { Publication } from '@/lib/data/publications';
import { getProjectTheme, projectsMap } from '@/lib/projects/config';
import PublicationListItem from '@/components/publications/PublicationListItem';
import { usePublicationFilters } from '@/hooks/usePublicationFilters';

interface EnhancedPublicationsListProps {
  publications: Publication[];
  years: string[];
}

export default function EnhancedPublicationsList({ publications, years }: EnhancedPublicationsListProps) {
  const [displayCount, setDisplayCount] = useState(20);
  const [hoveredPub, setHoveredPub] = useState<Publication | null>(null);

  // Use custom hook for filtering logic
  const {
    filters: { selectedTags, selectedYears, selectedProjects },
    setSelectedTags,
    setSelectedYears,
    setSelectedProjects,
    filteredPublications,
    clearFilters,
    hasActiveFilters,
    totalCount,
    filteredCount,
  } = usePublicationFilters(publications);

  // Timeline data
  const timelineData = useMemo(() => {
    const pubsByYear = publications.reduce((acc, pub) => {
      const year = parseInt(pub.year);
      if (!acc[year]) acc[year] = [];
      acc[year].push(pub);
      return acc;
    }, {} as Record<number, Publication[]>);

    const timelineYears = Object.keys(pubsByYear).map(Number).sort((a, b) => a - b);
    const minYear = timelineYears[0];
    const maxYear = timelineYears[timelineYears.length - 1];

    return { pubsByYear, years: timelineYears, minYear, maxYear };
  }, [publications]);

  const getYearPosition = (yearIndex: number) => {
    const numYears = timelineData.years.length;
    return (yearIndex / (numYears - 1)) * 100;
  };

  const handleYearClick = (year: number) => {
    const yearString = year.toString();
    setSelectedYears(prev =>
      prev.includes(yearString) ? prev.filter(y => y !== yearString) : [yearString]
    );
  };

  const handlePaperClick = (year: number, projectId: string) => {
    const yearString = year.toString();
    // Filter by both year and project
    setSelectedYears([yearString]);
    setSelectedProjects([projectId]);
  };

  // Memoize sorting and pagination
  const sortedPublications = useMemo(() => {
    return [...filteredPublications]
      .sort((a, b) => parseInt(b.year) - parseInt(a.year))
      .slice(0, displayCount);
  }, [filteredPublications, displayCount]);

  // Timeline sizing
  const maxStackHeight = Math.max(...Object.values(timelineData.pubsByYear).map(pubs => pubs.length));
  const dotSize = 32;
  const dotSpacing = dotSize + 4;
  const timelineHeight = maxStackHeight * dotSpacing + 80;

  return (
    <>
      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-hopkins-blue/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-hopkins-spirit-blue/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Explore Research Archive
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-hopkins-blue via-hopkins-spirit-blue to-hopkins-gold mx-auto rounded-full mb-4"></div>
            <p className="text-gray-300 text-base max-w-3xl mx-auto leading-relaxed">
              Browse {publications.length} publications spanning {timelineData.minYear}–{timelineData.maxYear}.
              Click years or papers on the timeline to filter by year and project.
            </p>
          </div>
        </div>
      </section>

      {/* Publications List Section */}
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
          {/* Timeline and Filters */}
          <div className="mb-12">

          {/* Research Timeline */}
          <div className="mb-8 max-w-6xl mx-auto">
            <div className="relative" style={{ height: `${timelineHeight}px` }}>
              {/* Timeline bar */}
              <div className="absolute left-0 right-0 top-12 h-2 bg-gradient-to-r from-hopkins-blue/20 via-hopkins-spirit-blue/30 to-hopkins-blue/20 rounded-full"></div>
              <div className="absolute left-0 right-0 top-12 h-1 bg-gradient-to-r from-hopkins-blue/40 via-hopkins-spirit-blue/60 to-hopkins-blue/40 rounded-full shadow-lg"></div>
              <div className="absolute left-0 right-0 top-12 h-1 bg-gradient-to-r from-transparent via-hopkins-gold/20 to-transparent rounded-full blur-sm"></div>

              {/* Year markers and publication icons */}
              {timelineData.years.map((year, yearIndex) => {
                const position = getYearPosition(yearIndex);
                const yearPubs = timelineData.pubsByYear[year];
                const projectColors: Record<string, string> = {
                  'jheem': '#002D72',
                  'pearl': '#68ACE5',
                  'shield': '#F2C413',
                };
                const isYearHovered = yearPubs.some(pub => hoveredPub?.id === pub.id);
                const isYearSelected = selectedYears.includes(year.toString());

                return (
                  <div
                    key={year}
                    className="absolute"
                    style={{ left: `${position}%`, top: 0, transform: 'translateX(-50%)', zIndex: isYearHovered ? 100 : 10 }}
                  >
                    {/* Year label - clickable */}
                    <button
                      onClick={() => handleYearClick(year)}
                      className={`absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-200 ${
                        isYearSelected ? 'scale-110' : 'hover:scale-105'
                      }`}
                    >
                      <div className={`px-4 py-1.5 bg-gradient-to-b rounded-lg shadow-lg border-2 transition-all duration-200 ${
                        isYearSelected
                          ? 'from-gray-900 to-gray-800 border-gray-900 text-white'
                          : 'from-white to-gray-50 border-gray-200 text-gray-800 hover:border-gray-300'
                      }`}>
                        <span className="text-base font-black">{year}</span>
                      </div>
                    </button>

                    {/* Year marker diamond */}
                    <div
                      className="absolute left-0 w-4 h-4 bg-gradient-to-br from-hopkins-blue to-hopkins-spirit-blue rotate-45 border-2 border-white shadow-lg z-10"
                      style={{ top: 'calc(3rem - 8px)', left: '-8px' }}
                    ></div>

                    {/* Publication icons */}
                    <div className="absolute" style={{ top: 'calc(3rem + 12px)', left: '-8px' }}>
                      {yearPubs.map((pub, index) => {
                        const projectId = pub.projects[0] || 'pearl';
                        const projectTheme = getProjectTheme(projectId);
                        const project = projectsMap[projectId as keyof typeof projectsMap];
                        const isHovered = hoveredPub?.id === pub.id;
                        const iconColor = projectColors[projectId] || projectColors['pearl'];

                        return (
                          <div
                            key={pub.id}
                            className="absolute"
                            style={{ top: `${index * dotSpacing}px`, zIndex: isHovered ? 100 : 10 }}
                          >
                            <button
                              onClick={() => handlePaperClick(year, projectId)}
                              onMouseEnter={() => setHoveredPub(pub)}
                              onMouseLeave={() => setHoveredPub(null)}
                              className="relative group"
                              aria-label={`${pub.title} (${pub.year})`}
                            >
                              <svg
                                className={`w-8 h-8 transition-all duration-200 cursor-pointer ${
                                  isHovered ? 'scale-125 drop-shadow-lg' : 'drop-shadow-md'
                                }`}
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M3 1.5C3 1.22386 3.22386 1 3.5 1H10L13 4V14.5C13 14.7761 12.7761 15 12.5 15H3.5C3.22386 15 3 14.7761 3 14.5V1.5Z"
                                  fill={iconColor}
                                />
                                <path
                                  d="M10 1V3.5C10 3.77614 10.2239 4 10.5 4H13L10 1Z"
                                  fill="white"
                                  fillOpacity="0.4"
                                />
                                <line x1="5" y1="7" x2="11" y2="7" stroke="white" strokeWidth="0.5" strokeOpacity="0.6" />
                                <line x1="5" y1="9" x2="11" y2="9" stroke="white" strokeWidth="0.5" strokeOpacity="0.6" />
                                <line x1="5" y1="11" x2="9" y2="11" stroke="white" strokeWidth="0.5" strokeOpacity="0.6" />
                              </svg>
                            </button>

                            {/* Tooltip */}
                            {isHovered && (
                              <div className={`absolute top-0 w-80 pointer-events-none ${
                                yearIndex > timelineData.years.length / 2 ? 'right-8' : 'left-8'
                              }`}>
                                <div className="bg-gray-900 text-white p-3 rounded-lg shadow-2xl text-xs">
                                  <div className="flex items-start gap-2 mb-2">
                                    <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 bg-gradient-to-br ${projectTheme.colors.gradient}`}></div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-xs uppercase text-gray-300">{project.name}</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="font-bold text-gray-300">{pub.year}</span>
                                      </div>
                                      <h3 className="font-bold text-sm mb-1 leading-tight line-clamp-2">{pub.title}</h3>
                                      <p className="text-gray-400 text-xs line-clamp-1">
                                        {pub.authors.split(',')[0]} et al. • <span className="italic">{pub.journal}</span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-700">
                                    Click to filter by {year} + {project.name}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
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
                <span>{filteredCount} of {totalCount}</span>
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
          {sortedPublications.map((publication, index) => (
            <div key={publication.id} id={`pub-${publication.id}`}>
              <PublicationListItem
                publication={publication}
                index={index}
              />
            </div>
          ))}
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
    </>
  );
}
