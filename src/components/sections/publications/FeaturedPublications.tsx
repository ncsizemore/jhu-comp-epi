'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Publication } from '@/lib/data/publications';
import { getProjectTheme, projectsMap } from '@/lib/projects/config';
import { HeroBackground } from '@/components/ui/HeroBackground';
import { useCarousel } from '@/hooks/useCarousel';
import CarouselControls from '@/components/ui/CarouselControls';
import { formatAuthors } from '@/lib/utils/authors';

interface FeaturedPublicationsProps {
  publications: Publication[];
}

export default function FeaturedPublications({ publications }: FeaturedPublicationsProps) {
  // Memoize expensive filtering operation
  const featuredPubs = useMemo(
    () => publications.filter(pub => pub.featured).slice(0, 3),
    [publications]
  );

  // Use custom carousel hook for all carousel logic
  const { currentSlide, isAutoPlaying, goToSlide, nextSlide, prevSlide, pause, resume, toggleAutoPlay } =
    useCarousel({
      itemCount: featuredPubs.length,
      autoPlayInterval: 6000,
      pauseDuration: 10000,
    });

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <HeroBackground />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Minimal Elegant Header */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Featured Research
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-hopkins-gold via-amber-400 to-orange-400 mx-auto rounded-full mb-8"></div>
            <p className="text-xl font-medium text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Computational epidemiology driving global health policy
            </p>
          </div>
        </div>

        {/* Space-Efficient Carousel - Optimized Width */}
        <div
          className="relative group max-w-5xl mx-auto"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <div className="relative h-[520px] overflow-hidden rounded-3xl border border-white/10 mx-8 transition-all duration-500 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-black/20">
            {featuredPubs.map((publication, index) => {
              const projectId = publication.projects[0] || 'pearl';
              const project = projectsMap[projectId as keyof typeof projectsMap];
              const projectTheme = getProjectTheme(projectId);

              const gradientClass = projectTheme.colors.gradientDark;
              
              return (
                <div
                  key={publication.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-out ${
                    index === currentSlide 
                      ? 'opacity-100 translate-x-0 scale-100' 
                      : index < currentSlide 
                        ? 'opacity-0 -translate-x-full scale-95' 
                        : 'opacity-0 translate-x-full scale-95'
                  }`}
                >
                  <div className={`h-full bg-gradient-to-br ${gradientClass} backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden relative`}>
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-8 right-8 w-32 h-32 border border-white/20 rounded-full"></div>
                      <div className="absolute bottom-8 left-8 w-24 h-24 border border-white/20 rounded-lg rotate-45"></div>
                      <div className="absolute top-1/2 left-1/4 w-2 h-16 bg-white/30 rounded-full"></div>
                    </div>
                    
                    <div className="relative h-full flex flex-col">
                      {/* Compact Header - 20% of space */}
                      <div className="flex items-center justify-between p-6 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gradient-to-br from-hopkins-gold to-amber-400 rounded-full animate-pulse shadow-sm"></div>
                            <span className="text-hopkins-gold font-bold text-sm uppercase tracking-wide">
                              {project.name}
                            </span>
                          </div>
                          <span className="text-gray-400 text-xs">•</span>
                          <span className="text-white text-xs font-bold uppercase tracking-wider bg-white/20 border border-white/30 px-3 py-1 rounded-lg backdrop-blur-sm">
                            {publication.attentionGrabber || "Featured Research"}
                          </span>
                        </div>
                        <div className="text-white/80 text-sm font-bold bg-white/10 px-3 py-1 rounded-lg">
                          {publication.year}
                        </div>
                      </div>
                      
                      {/* Title + Meta - Compact */}
                      <div className="px-6 pb-4">
                        <h2 className="text-xl font-bold text-white mb-2 leading-tight line-clamp-2">
                          {publication.title}
                        </h2>
                        <p className="text-gray-300 text-sm">
                          <span className="font-medium">{formatAuthors(publication.authors)}</span>
                          <span className="text-gray-400 mx-2">•</span>
                          <span className="italic">{publication.journal}</span>
                        </p>
                      </div>
                      
                      {/* Main Content Zone - 60% of space */}
                      <div className="flex-1 px-6">
                        {publication.imageUrl ? (
                          /* Image-focused layout - Two Column */
                          <div className="h-full flex flex-col">
                            <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                              <div className="h-full flex gap-6">
                                {/* Image column - narrower */}
                                <div className="w-2/5 flex flex-col">
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 bg-gradient-to-r from-gray-300 to-white rounded-full"></div>
                                    <span className="text-gray-300 text-xs font-bold uppercase tracking-wider">Research Visualization</span>
                                  </div>
                                  <div className="flex-1 bg-white/10 rounded-xl overflow-hidden relative">
                                    <Image
                                      src={publication.imageUrl!}
                                      alt={publication.title}
                                      fill
                                      className="object-cover"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                  </div>
                                </div>
                                
                                {/* Content column */}
                                <div className="w-3/5 flex flex-col justify-center">
                                  {(publication.keyFindings || publication.abstract) && (
                                    <div>
                                      <div className="flex items-center gap-2 mb-4">
                                        <div className="w-2 h-2 bg-gradient-to-r from-hopkins-gold to-amber-400 rounded-full animate-pulse"></div>
                                        <span className="text-gray-300 text-xs font-bold uppercase tracking-wider">Key Findings</span>
                                      </div>
                                      <p className="text-gray-200 leading-relaxed font-medium text-base">
                                        {publication.keyFindings || publication.abstract}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : publication.featuredStats ? (
                          /* Stats-focused layout - Centered */
                          <div className="h-full flex flex-col">
                            <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                              <div className="h-full flex flex-col justify-center max-w-md mx-auto">
                                <div className="flex items-center justify-center gap-2 mb-8">
                                  <div className="w-2 h-2 bg-gradient-to-r from-hopkins-gold to-amber-400 rounded-full animate-pulse"></div>
                                  <span className="text-gray-300 text-xs font-bold uppercase tracking-wider">Research Impact</span>
                                </div>
                                <div className="grid grid-cols-2 gap-8 mb-6">
                                  <div className="text-center">
                                    <div className="text-5xl font-black text-hopkins-gold mb-3">
                                      {publication.featuredStats.citations || '1,247'}
                                    </div>
                                    <div className="text-sm text-gray-300 uppercase tracking-wide font-semibold">Citations</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-5xl font-black text-emerald-400 mb-3">
                                      {publication.featuredStats.countries || '12'}
                                    </div>
                                    <div className="text-sm text-gray-300 uppercase tracking-wide font-semibold">Countries</div>
                                  </div>
                                </div>
                                {(publication.keyFindings || publication.abstract) && (
                                  <p className="text-gray-200 leading-relaxed font-medium text-sm text-center">
                                    {publication.keyFindings || (publication.abstract ? `${publication.abstract.substring(0, 120)}...` : '')}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (publication.keyFindings || publication.abstract) ? (
                          /* Text-focused layout - Centered with optimal reading width */
                          <div className="h-full flex flex-col">
                            <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                              <div className="h-full flex flex-col justify-center max-w-xl mx-auto">
                                <div className="flex items-center justify-center gap-2 mb-6">
                                  <div className="w-2 h-2 bg-gradient-to-r from-hopkins-gold to-amber-400 rounded-full animate-pulse"></div>
                                  <span className="text-gray-300 text-xs font-bold uppercase tracking-wider">
                                    {publication.keyFindings ? 'Key Findings' : 'Research Overview'}
                                  </span>
                                </div>
                                <div className="text-center">
                                  <p className="text-gray-200 leading-relaxed font-medium text-lg">
                                    {publication.keyFindings || publication.abstract}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      
                      {/* Footer CTA - 20% of space */}
                      <div className="flex items-center justify-between p-6 pt-4">
                        <Link 
                          href={publication.url || `https://doi.org/${publication.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/cta inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl text-white hover:bg-white/30 transition-all duration-300 font-bold hover:shadow-2xl hover:shadow-white/20 transform hover:scale-105"
                        >
                          <span>Explore Research</span>
                          <svg className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                        
                        {/* Context badges */}
                        <div className="text-right text-white/70">
                          <div className="flex items-center gap-4 text-xs">
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Peer Reviewed
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              High Impact
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Carousel Controls */}
          <CarouselControls
            currentIndex={currentSlide}
            totalItems={featuredPubs.length}
            isAutoPlaying={isAutoPlaying}
            onPrevious={prevSlide}
            onNext={nextSlide}
            onGoToSlide={goToSlide}
            onToggleAutoPlay={toggleAutoPlay}
          />
        </div>
      </div>
    </section>
  );
}
