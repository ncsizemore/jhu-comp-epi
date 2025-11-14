'use client';

import { useState, useMemo, useEffect } from 'react';
import { Publication } from '@/lib/data/publications';
import { getProjectTheme, projectsMap } from '@/lib/projects/config';
import PublicationListItem from '@/components/publications/PublicationListItem';
import PublicationModal from '@/components/publications/PublicationModal';
import { usePublicationFilters } from '@/hooks/usePublicationFilters';

interface EnhancedPublicationsListProps {
  publications: Publication[];
  years: string[];
}

export default function EnhancedPublicationsList({ publications, years }: EnhancedPublicationsListProps) {
  const [displayCount, setDisplayCount] = useState(20);
  const [hoveredPub, setHoveredPub] = useState<Publication | null>(null);
  const [focusedYearIndex, setFocusedYearIndex] = useState<number>(-1);
  const [focusedPubIndex, setFocusedPubIndex] = useState<number>(-1);
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

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

  // Keyboard navigation for timeline
  const handleTimelineKeyDown = (e: React.KeyboardEvent, yearIndex: number, pubIndex: number = -1) => {
    const year = timelineData.years[yearIndex];
    const yearPubs = timelineData.pubsByYear[year];

    // If on a year label (no pub selected)
    if (pubIndex === -1) {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          if (yearIndex < timelineData.years.length - 1) {
            setFocusedYearIndex(yearIndex + 1);
            setFocusedPubIndex(-1);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (yearIndex > 0) {
            setFocusedYearIndex(yearIndex - 1);
            setFocusedPubIndex(-1);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (yearPubs.length > 0) {
            setFocusedYearIndex(yearIndex);
            setFocusedPubIndex(0);
          }
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleYearClick(year);
          break;
      }
    } else {
      // On a publication icon
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          if (pubIndex > 0) {
            setFocusedPubIndex(pubIndex - 1);
          } else {
            setFocusedYearIndex(yearIndex);
            setFocusedPubIndex(-1);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (pubIndex < yearPubs.length - 1) {
            setFocusedPubIndex(pubIndex + 1);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (yearIndex > 0) {
            const prevYear = timelineData.years[yearIndex - 1];
            const prevYearPubs = timelineData.pubsByYear[prevYear];
            setFocusedYearIndex(yearIndex - 1);
            setFocusedPubIndex(Math.min(pubIndex, prevYearPubs.length - 1));
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (yearIndex < timelineData.years.length - 1) {
            const nextYear = timelineData.years[yearIndex + 1];
            const nextYearPubs = timelineData.pubsByYear[nextYear];
            setFocusedYearIndex(yearIndex + 1);
            setFocusedPubIndex(Math.min(pubIndex, nextYearPubs.length - 1));
          }
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          const pub = yearPubs[pubIndex];
          handlePaperClick(year, pub.projects[0] || 'pearl');
          break;
      }
    }
  };

  // Effect to focus the appropriate element when keyboard navigation state changes
  useEffect(() => {
    if (focusedYearIndex !== -1) {
      const elementId = focusedPubIndex === -1
        ? `timeline-year-${focusedYearIndex}`
        : `timeline-pub-${focusedYearIndex}-${focusedPubIndex}`;
      const element = document.getElementById(elementId);
      element?.focus();
    }
  }, [focusedYearIndex, focusedPubIndex]);

  // Memoize sorting and pagination
  const sortedPublications = useMemo(() => {
    return [...filteredPublications]
      .sort((a, b) => parseInt(b.year) - parseInt(a.year))
      .slice(0, displayCount);
  }, [filteredPublications, displayCount]);

  // Modal handlers
  const handleCardClick = (publication: Publication, index: number) => {
    setSelectedPub(publication);
    setSelectedIndex(index);
  };

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % sortedPublications.length;
    setSelectedIndex(nextIndex);
    setSelectedPub(sortedPublications[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = (selectedIndex - 1 + sortedPublications.length) % sortedPublications.length;
    setSelectedIndex(prevIndex);
    setSelectedPub(sortedPublications[prevIndex]);
  };

  // Timeline sizing
  const maxStackHeight = Math.max(...Object.values(timelineData.pubsByYear).map(pubs => pubs.length));
  const dotSize = 32;
  const dotSpacing = dotSize + 4;
  const timelineHeight = maxStackHeight * dotSpacing + 80;

  return (
    <>
      {/* Publications List Section - streamlined without redundant hero */}
      <section className="pt-12 pb-20 bg-gradient-to-br from-gray-50 via-slate-50 to-white relative">
        {/* Subtle background - simplified */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-hopkins-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-hopkins-spirit-blue/8 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          {/* Timeline and Filters */}
          <div className="mb-12 relative">

          {/* Mobile Year Selector (visible on mobile only) */}
          <div className="lg:hidden mb-8">
            <label htmlFor="mobile-year-select" className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Year
            </label>
            <select
              id="mobile-year-select"
              value={selectedYears.length === 1 ? selectedYears[0] : ''}
              onChange={(e) => {
                const year = e.target.value;
                if (year) {
                  setSelectedYears([year]);
                } else {
                  setSelectedYears([]);
                }
              }}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 font-medium focus:outline-none focus:border-hopkins-blue focus:ring-2 focus:ring-hopkins-blue/20 transition-all"
            >
              <option value="">All Years ({publications.length} publications)</option>
              {timelineData.years.sort((a, b) => b - a).map(year => {
                const count = timelineData.pubsByYear[year].length;
                return (
                  <option key={year} value={year}>
                    {year} ({count} {count === 1 ? 'publication' : 'publications'})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Research Timeline (desktop only) */}
          <div className="hidden lg:block mb-8 max-w-6xl mx-auto">
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
                      id={`timeline-year-${yearIndex}`}
                      onClick={() => handleYearClick(year)}
                      onKeyDown={(e) => handleTimelineKeyDown(e, yearIndex)}
                      onFocus={() => {
                        setFocusedYearIndex(yearIndex);
                        setFocusedPubIndex(-1);
                      }}
                      className={`timeline-year-button absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-200 ${
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
                              id={`timeline-pub-${yearIndex}-${index}`}
                              onClick={() => handlePaperClick(year, projectId)}
                              onKeyDown={(e) => handleTimelineKeyDown(e, yearIndex, index)}
                              onFocus={() => {
                                setFocusedYearIndex(yearIndex);
                                setFocusedPubIndex(index);
                                setHoveredPub(pub);
                              }}
                              onBlur={() => setHoveredPub(null)}
                              onMouseEnter={() => setHoveredPub(pub)}
                              onMouseLeave={() => setHoveredPub(null)}
                              className="timeline-paper-button relative group"
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
          </div> {/* Close mb-12 relative */}

          {/* Enhanced Filters - redesigned to match page visual language */}
          <div className="sticky top-[6.5rem] z-20 bg-gradient-to-br from-white via-gray-50 to-white backdrop-blur-md border-2 border-gray-200 rounded-2xl p-6 shadow-2xl shadow-gray-900/10 mb-8">
            {/* Header with gradient accent */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b-2 border-gradient-to-r from-hopkins-blue/20 via-hopkins-gold/20 to-hopkins-spirit-blue/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-hopkins-blue to-hopkins-spirit-blue flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Filter Publications
                  </h3>
                  {hasActiveFilters && (
                    <span className="text-xs text-gray-600 font-medium">
                      {filteredCount} of {totalCount} publications
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!hasActiveFilters && (
                  <span className="text-sm text-gray-600 font-medium">
                    {totalCount} publications
                  </span>
                )}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-all duration-200 border border-gray-300 hover:border-gray-400"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Year Filter (desktop only - mobile uses dropdown above) */}
              <div className="space-y-3 hidden lg:block">
                <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-hopkins-blue rounded-full"></div>
                  Year
                </label>
                <div className="flex flex-wrap gap-2">
                  {years.slice(0, 8).map(year => (
                    <button
                      key={year}
                      onClick={() => setSelectedYears(prev =>
                        prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
                      )}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 border-2 ${selectedYears.includes(year)
                          ? 'bg-gradient-to-br from-hopkins-blue to-hopkins-spirit-blue text-white border-hopkins-blue shadow-lg'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-hopkins-blue hover:shadow-md'
                        }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Filter */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-hopkins-gold rounded-full"></div>
                  Project
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(projectsMap).map(([key, project]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedProjects(prev =>
                        prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]
                      )}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 border-2 ${selectedProjects.includes(key)
                          ? 'bg-gradient-to-br from-hopkins-gold to-amber-400 text-gray-900 border-hopkins-gold shadow-lg'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-hopkins-gold hover:shadow-md'
                        }`}
                    >
                      {project.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Top Tags Filter */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  Topics
                </label>
                <div className="flex flex-wrap gap-2">
                  {['HIV', 'modeling', 'epidemiology', 'cost-effectiveness', 'prevention'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTags(prev =>
                        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                      )}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 border-2 ${selectedTags.includes(tag)
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white border-emerald-500 shadow-lg'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-500 hover:shadow-md'
                        }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Publications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedPublications.map((publication, index) => (
              <div key={publication.id} id={`pub-${publication.id}`}>
                <PublicationListItem
                  publication={publication}
                  index={index}
                  onClick={() => handleCardClick(publication, index)}
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
        </div> {/* Close max-w-6xl */}
      </section>

      {/* Publication Modal */}
      {selectedPub && (
        <PublicationModal
          publication={selectedPub}
          onClose={() => setSelectedPub(null)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </>
  );
}
