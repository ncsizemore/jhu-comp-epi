'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Publication, projectsMap } from '@/data/publications';

interface FeaturedPublicationsProps {
  publications: Publication[];
}

export default function FeaturedPublications({ publications }: FeaturedPublicationsProps) {
  const featuredPubs = publications.filter(pub => pub.featured).slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate slides
  useEffect(() => {
    if (!isAutoPlaying || featuredPubs.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredPubs.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredPubs.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % featuredPubs.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + featuredPubs.length) % featuredPubs.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Bold geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-hopkins-blue/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-hopkins-spirit-blue/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-hopkins-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Strong geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-hopkins-gold/20 to-amber-400/30 transform rotate-45 rounded-2xl animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-tr from-emerald-400/25 to-teal-500/35 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-20 w-16 h-64 bg-gradient-to-b from-hopkins-blue/15 to-transparent rounded-full" style={{ animationDelay: '3s' }}></div>
      </div>
      
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
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative h-[520px] overflow-hidden rounded-3xl border border-white/10 mx-8 transition-all duration-500 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-black/20">
            {featuredPubs.map((publication, index) => {
              const projectId = publication.projects[0] || 'pearl';
              const project = projectsMap[projectId as keyof typeof projectsMap];
              
              const projectGradients = {
                pearl: 'from-hopkins-spirit-blue/30 to-blue-900/30',
                jheem: 'from-hopkins-blue/30 to-indigo-900/30',
                tbmte: 'from-emerald-500/30 to-teal-900/30',
                shield: 'from-amber-500/30 to-orange-900/30'
              };
              
              const gradientClass = projectGradients[projectId as keyof typeof projectGradients] || projectGradients.pearl;
              
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
                          <span className="font-medium">{publication.authors.split(',')[0]}</span>
                          {publication.authors.split(',').length > 1 && <span className="text-gray-400"> et al.</span>}
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
                                  <div className="flex-1 bg-white/10 rounded-xl overflow-hidden">
                                    <img 
                                      src={publication.imageUrl} 
                                      alt={publication.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                                
                                {/* Content column */}
                                <div className="w-3/5 flex flex-col justify-center">
                                  {publication.abstract && (
                                    <div>
                                      <div className="flex items-center gap-2 mb-4">
                                        <div className="w-2 h-2 bg-gradient-to-r from-hopkins-gold to-amber-400 rounded-full animate-pulse"></div>
                                        <span className="text-gray-300 text-xs font-bold uppercase tracking-wider">Key Findings</span>
                                      </div>
                                      <p className="text-gray-200 leading-relaxed font-medium text-base">
                                        {publication.abstract}
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
                                {publication.abstract && (
                                  <p className="text-gray-200 leading-relaxed font-medium text-sm text-center">
                                    {publication.abstract.substring(0, 120)}...
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : publication.abstract ? (
                          /* Abstract-focused layout - Centered with optimal reading width */
                          <div className="h-full flex flex-col">
                            <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                              <div className="h-full flex flex-col justify-center max-w-xl mx-auto">
                                <div className="flex items-center justify-center gap-2 mb-6">
                                  <div className="w-2 h-2 bg-gradient-to-r from-gray-300 to-white rounded-full"></div>
                                  <span className="text-gray-300 text-xs font-bold uppercase tracking-wider">Research Overview</span>
                                </div>
                                <div className="text-center">
                                  <p className="text-gray-200 leading-relaxed font-medium text-lg">
                                    {publication.abstract}
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
          
          {/* Enhanced Navigation */}
          {featuredPubs.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl group/nav"
              >
                <svg className="w-6 h-6 group-hover/nav:-translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl group/nav"
              >
                <svg className="w-6 h-6 group-hover/nav:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Progress bar */}
              <div className="absolute bottom-0 left-8 right-8 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-hopkins-gold to-amber-400 rounded-full transition-all duration-6000 ease-linear"
                  style={{ 
                    width: `${(currentSlide + 1) / featuredPubs.length * 100}%`
                  }}
                ></div>
              </div>
            </>
          )}
          
          {/* Enhanced Dots Navigation */}
          {featuredPubs.length > 1 && (
            <div className="flex justify-center gap-3 mt-12">
              {featuredPubs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`group relative transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-12 h-4' 
                      : 'w-4 h-4 hover:scale-110'
                  }`}
                >
                  <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-hopkins-gold to-amber-400 shadow-2xl shadow-hopkins-gold/50' 
                      : 'bg-white/40 group-hover:bg-white/60'
                  }`}></div>
                  
                  {/* Active slide progress indicator */}
                  {index === currentSlide && (
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-white/30 to-transparent rounded-full transition-all duration-6000 ease-linear"
                        style={{ 
                          width: isAutoPlaying ? '100%' : '0%',
                          transitionDuration: isAutoPlaying ? '6000ms' : '300ms'
                        }}
                      ></div>
                    </div>
                  )}
                </button>
              ))}
              
              {/* Auto-play toggle */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`ml-4 w-8 h-8 rounded-full border-2 border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-white/50 ${
                  isAutoPlaying ? 'bg-white/20 text-white' : 'bg-white/10 text-white/60'
                }`}
                title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isAutoPlaying ? (
                  <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
