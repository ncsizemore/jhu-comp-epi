'use client';

import { useMemo, useState } from 'react';
import { Publication } from '@/lib/data/publications';
import { getProjectTheme, projectsMap } from '@/lib/projects/config';

interface PublicationsTimelineProps {
  publications: Publication[];
}

export default function PublicationsTimeline({ publications }: PublicationsTimelineProps) {
  const [hoveredPub, setHoveredPub] = useState<Publication | null>(null);

  // Group publications by year
  const timelineData = useMemo(() => {
    const pubsByYear = publications.reduce((acc, pub) => {
      const year = parseInt(pub.year);
      if (!acc[year]) acc[year] = [];
      acc[year].push(pub);
      return acc;
    }, {} as Record<number, Publication[]>);

    const years = Object.keys(pubsByYear).map(Number).sort((a, b) => a - b);
    const minYear = years[0];
    const maxYear = years[years.length - 1];

    return { pubsByYear, years, minYear, maxYear };
  }, [publications]);

  const getYearPosition = (yearIndex: number) => {
    // Equal spacing - each year gets same horizontal space regardless of gap
    const numYears = timelineData.years.length;
    return (yearIndex / (numYears - 1)) * 100; // Percentage
  };

  const handleDotClick = (publicationId: string) => {
    const element = document.getElementById(`pub-${publicationId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('highlight-flash');
      setTimeout(() => element.classList.remove('highlight-flash'), 2000);
    }
  };

  // Calculate max stack height
  const maxStackHeight = Math.max(...Object.values(timelineData.pubsByYear).map(pubs => pubs.length));
  const dotSize = 32; // Diameter in pixels
  const dotSpacing = dotSize + 4; // Small spacing between icons
  const timelineHeight = maxStackHeight * dotSpacing + 80;

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-hopkins-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-hopkins-spirit-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Research Timeline
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-hopkins-blue via-hopkins-spirit-blue to-hopkins-gold mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-sm">
            {publications.length} publications from {timelineData.minYear} to {timelineData.maxYear}
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="relative" style={{ height: `${timelineHeight}px` }}>
            {/* Timeline bar - dramatic gradient with depth */}
            <div className="absolute left-0 right-0 top-12 h-2 bg-gradient-to-r from-hopkins-blue/20 via-hopkins-spirit-blue/30 to-hopkins-blue/20 rounded-full"></div>
            <div className="absolute left-0 right-0 top-12 h-1 bg-gradient-to-r from-hopkins-blue/40 via-hopkins-spirit-blue/60 to-hopkins-blue/40 rounded-full shadow-lg"></div>

            {/* Glow effect */}
            <div className="absolute left-0 right-0 top-12 h-1 bg-gradient-to-r from-transparent via-hopkins-gold/20 to-transparent rounded-full blur-sm"></div>

            {/* Year markers and dots */}
            {timelineData.years.map((year, yearIndex) => {
              const position = getYearPosition(yearIndex);
              const yearPubs = timelineData.pubsByYear[year];

              // Map project IDs to their hex colors
              const projectColors: Record<string, string> = {
                'jheem': '#002D72', // hopkins-blue
                'pearl': '#68ACE5', // hopkins-spirit-blue
                'shield': '#F2C413', // hopkins-gold
              };

              // Check if any publication in this year is hovered
              const isYearHovered = yearPubs.some(pub => hoveredPub?.id === pub.id);

              return (
                <div
                  key={year}
                  className="absolute"
                  style={{ left: `${position}%`, top: 0, transform: 'translateX(-50%)', zIndex: isYearHovered ? 100 : 10 }}
                >
                  {/* Year label with card-like background - larger */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1.5 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-lg shadow-lg">
                      <span className="text-base font-black text-gray-800">{year}</span>
                    </div>
                  </div>

                  {/* Year marker on timeline - larger diamond shape */}
                  <div
                    className="absolute left-0 w-4 h-4 bg-gradient-to-br from-hopkins-blue to-hopkins-spirit-blue rotate-45 border-2 border-white shadow-lg z-10"
                    style={{ top: 'calc(3rem - 8px)', left: '-8px' }}
                  ></div>

                  {/* Publication icons stacked - centered under diamond */}
                  <div
                    className="absolute"
                    style={{ top: 'calc(3rem + 12px)', left: '-8px' }}
                  >
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
                            onClick={() => handleDotClick(pub.id)}
                            onMouseEnter={() => setHoveredPub(pub)}
                            onMouseLeave={() => setHoveredPub(null)}
                            className="relative group"
                            aria-label={`${pub.title} (${pub.year})`}
                          >
                            {/* Minimal paper/document icon */}
                            <svg
                              className={`w-8 h-8 transition-all duration-200 cursor-pointer ${
                                isHovered ? 'scale-125 drop-shadow-lg' : 'drop-shadow-md'
                              }`}
                              viewBox="0 0 16 16"
                            >
                              {/* Paper shape with folded corner */}
                              <path
                                d="M3 1.5C3 1.22386 3.22386 1 3.5 1H10L13 4V14.5C13 14.7761 12.7761 15 12.5 15H3.5C3.22386 15 3 14.7761 3 14.5V1.5Z"
                                fill={iconColor}
                              />
                              {/* Folded corner */}
                              <path
                                d="M10 1V3.5C10 3.77614 10.2239 4 10.5 4H13L10 1Z"
                                fill="white"
                                fillOpacity="0.4"
                              />
                              {/* Lines on paper */}
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
                                      <span className="font-bold text-xs uppercase text-gray-300">
                                        {project.name}
                                      </span>
                                      <span className="text-gray-500">•</span>
                                      <span className="font-bold text-gray-300">{pub.year}</span>
                                    </div>
                                    <h3 className="font-bold text-sm mb-1 leading-tight line-clamp-2">
                                      {pub.title}
                                    </h3>
                                    <p className="text-gray-400 text-xs line-clamp-1">
                                      {pub.authors.split(',')[0]} et al. • <span className="italic">{pub.journal}</span>
                                    </p>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-700">
                                  Click to view in list
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
      </div>
    </section>
  );
}
