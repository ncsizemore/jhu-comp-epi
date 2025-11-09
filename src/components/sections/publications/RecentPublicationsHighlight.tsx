'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Publication } from '@/lib/data/publications';
import { projectsMap } from '@/lib/projects/config';

interface RecentPublicationsHighlightProps {
  publications: Publication[];
}

export default function RecentPublicationsHighlight({ 
  publications
}: RecentPublicationsHighlightProps) {
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const handlePillClick = (publication: Publication) => {
    if (selectedPub?.id === publication.id) {
      setSelectedPub(null);
    } else if (selectedPub) {
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedPub(publication);
        setIsTransitioning(false);
      }, 150);
    } else {
      setSelectedPub(publication);
    }
  };
  
  // Memoize expensive data processing
  const { publicationsByYear, years } = useMemo(() => {
    const currentYear = 2025;
    const recentPublications = publications
      .filter(pub => parseInt(pub.year) >= currentYear - 2)
      .sort((a, b) => parseInt(a.year) - parseInt(b.year))
      .slice(0, 12);

    const publicationsByYear = recentPublications.reduce((acc, pub) => {
      const year = pub.year;
      if (!acc[year]) acc[year] = [];
      acc[year].push(pub);
      return acc;
    }, {} as Record<string, Publication[]>);

    const years = Object.keys(publicationsByYear).sort().reverse();
    
    return { publicationsByYear, years };
  }, [publications]);
  
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Simplified background - reduce animation load */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-hopkins-blue/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-hopkins-spirit-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-hopkins-gold/8 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Recent Work
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-hopkins-gold via-amber-400 to-orange-400 mx-auto rounded-full mb-8"></div>
          <p className="text-lg font-medium text-gray-300 max-w-lg mx-auto leading-relaxed">
            Our latest research contributions
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {years.map((year) => {
              const yearPubs = publicationsByYear[year];
              const isCurrentYear = parseInt(year) === 2025;
              
              return (
                <div 
                  key={year}
                  className={`relative bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/8 hover:border-white/20 group ${
                    isCurrentYear 
                      ? 'ring-1 ring-hopkins-gold/30 bg-hopkins-gold/5' 
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-6 relative">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        isCurrentYear ? 'bg-hopkins-gold' : 'bg-gray-400'
                      }`}></div>
                      <h3 className={`text-xl font-bold ${
                        isCurrentYear ? 'text-hopkins-gold' : 'text-white'
                      }`}>{year}</h3>
                    </div>
                    <span className="text-sm font-medium text-gray-400">
                      {yearPubs.length} publication{yearPubs.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {yearPubs.map((publication) => {
                      const projectId = publication.projects[0] || 'pearl';
                      const project = projectsMap[projectId as keyof typeof projectsMap];
                      const projectColors = {
                        pearl: 'from-hopkins-spirit-blue to-blue-600',
                        jheem: 'from-hopkins-blue to-indigo-600',

                        shield: 'from-amber-500 to-orange-600'
                      };
                      const colorClass = projectColors[projectId as keyof typeof projectColors] || projectColors.pearl;
                      
                      return (
                        <div
                          key={publication.id}
                          className="relative group/pill cursor-pointer"
                          onClick={() => handlePillClick(publication)}
                        >
                          <div className={`bg-gradient-to-r ${colorClass} px-3 py-2 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-lg border-2 transition-all duration-300 whitespace-nowrap transform hover:scale-105 ${
                            selectedPub?.id === publication.id 
                              ? 'scale-110 border-white/60 ring-2 ring-white/30' 
                              : 'border-white/20 hover:border-white/40'
                          }`}>
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-white/80 rounded-full"></div>
                              {project.name}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Simplified details panel */}
          <div className={`transition-all duration-500 ease-out overflow-hidden ${
            selectedPub ? 'max-h-[800px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'
          }`}>
            {selectedPub && (
              <div className={`bg-white/10 border border-white/20 rounded-3xl p-8 transition-all duration-300 ${
                isTransitioning ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'
              }`}>
                <div className="flex items-start justify-between gap-8 relative">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      {(() => {
                        const projectId = selectedPub.projects[0] || 'pearl';
                        const project = projectsMap[projectId as keyof typeof projectsMap];
                        const projectColors = {
                          pearl: 'from-hopkins-spirit-blue to-blue-600',
                          jheem: 'from-hopkins-blue to-indigo-600',
  
                          shield: 'from-amber-500 to-orange-600'
                        };
                        const colorClass = projectColors[projectId as keyof typeof projectColors] || projectColors.pearl;
                        
                        return (
                          <>
                            <span className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${colorClass} text-white text-sm font-bold uppercase tracking-wider rounded-lg shadow-lg`}>
                              <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                              {project.name}
                            </span>
                            <span className="px-3 py-1 bg-white/20 border border-white/30 text-gray-200 text-sm font-medium rounded-lg">
                              {selectedPub.year}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                      {selectedPub.title}
                    </h3>
                    
                    <div className="mb-6">
                      <p className="text-gray-300 text-base font-medium mb-1">
                        {selectedPub.authors}
                      </p>
                      <p className="text-gray-400 italic text-base">
                        {selectedPub.journal}
                      </p>
                    </div>
                    
                    {selectedPub.abstract && (
                      <div className="mb-6">
                        <h4 className="text-white font-semibold text-lg mb-3">Abstract</h4>
                        <p className="text-gray-300 text-base leading-relaxed">
                          {selectedPub.abstract}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0 flex flex-col gap-3">
                    <Link 
                      href={selectedPub.url || `https://doi.org/${selectedPub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta inline-flex items-center gap-3 px-6 py-3 bg-white/20 border-2 border-white/30 rounded-2xl text-white hover:bg-white/30 transition-all duration-300 font-bold transform hover:scale-105"
                    >
                      <span>Explore Research</span>
                      <svg className="w-5 h-5 group-hover/cta:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                    
                    <button 
                      onClick={() => setSelectedPub(null)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-white/30 text-white rounded-2xl transition-all duration-300 text-base font-medium transform hover:scale-105"
                    >
                      <span>Close</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
