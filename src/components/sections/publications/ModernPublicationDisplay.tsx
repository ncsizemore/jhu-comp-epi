'use client';

import { useState, useEffect, useRef } from 'react';
import { Publication } from '@/data/publications';
import PublicationDetails from './PublicationDetails';
import PublicationMetrics from './PublicationMetrics';

interface ModernPublicationDisplayProps {
  publications: Publication[];
}

export default function ModernPublicationDisplay({ publications }: ModernPublicationDisplayProps) {
  const featuredPubs = publications.filter(pub => pub.featured).slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Navigate to a specific publication
  const goToPublication = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToNextPub = () => {
    const nextIndex = (currentIndex + 1) % featuredPubs.length;
    goToPublication(nextIndex);
  };

  const goToPrevPub = () => {
    const prevIndex = (currentIndex - 1 + featuredPubs.length) % featuredPubs.length;
    goToPublication(prevIndex);
  };

  // Auto-rotate publications
  useEffect(() => {
    if (!autoplay || isTransitioning) return;
    
    timerRef.current = setTimeout(() => {
      goToNextPub();
    }, 8000); // Change publication every 8 seconds
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [autoplay, isTransitioning, currentIndex, featuredPubs.length]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  return (
    <section 
      className="py-8 bg-gradient-to-b from-gray-50 to-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            <span className="relative inline-block">
              <span className="relative z-10">Featured Research</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-hopkins-gold opacity-20 rounded"></span>
            </span>
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-sm text-gray-500">
            Our most impactful publications advancing computational epidemiology
          </p>
        </div>
        
        {/* Thumbnail navigation */}
        <div className="mb-6 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex space-x-3 justify-center min-w-max px-2">
            {featuredPubs.map((pub, idx) => (
              <button
                key={idx}
                onClick={() => goToPublication(idx)}
                className={`relative flex-shrink-0 w-36 h-16 rounded-lg overflow-hidden shadow-sm transition-all duration-300 ${idx === currentIndex ? 'ring-2 ring-hopkins-blue scale-105' : 'opacity-80 hover:opacity-100'}`}
                disabled={isTransitioning}
              >
                {/* Thumbnail background - would be a real image in production */}
                <div className={`absolute inset-0 ${idx % 2 === 0 ? 'bg-gradient-to-br from-hopkins-spirit-blue to-blue-500' : 'bg-gradient-to-br from-hopkins-blue to-purple-700'}`}>
                  {/* Visual element - could be actual paper figure/graph */}
                  <div className="absolute inset-0 opacity-30 flex items-center justify-center">
                    {idx % 3 === 0 && (
                      <svg viewBox="0 0 100 60" className="w-full h-full" fill="none" stroke="white" strokeWidth="1">
                        <path d="M10,30 C20,10 30,50 40,30 C50,10 60,50 70,30 C80,10 90,50 100,30" />
                        <path d="M10,40 C20,20 30,60 40,40 C50,20 60,60 70,40 C80,20 90,60 100,40" />
                      </svg>
                    )}
                    {idx % 3 === 1 && (
                      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                        <circle cx="50" cy="50" r="25" fill="rgba(255,255,255,0.2)" />
                        <circle cx="50" cy="50" r="15" fill="rgba(255,255,255,0.4)" />
                        <circle cx="50" cy="50" r="5" fill="rgba(255,255,255,0.6)" />
                      </svg>
                    )}
                    {idx % 3 === 2 && (
                      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                        <rect x="20" y="20" width="20" height="60" fill="rgba(255,255,255,0.3)" />
                        <rect x="45" y="30" width="20" height="50" fill="rgba(255,255,255,0.5)" />
                        <rect x="70" y="40" width="20" height="40" fill="rgba(255,255,255,0.3)" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">                  
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <span className="relative text-xs text-white font-semibold px-2 text-center line-clamp-2">
                    {pub.title.split(' ').slice(0, 5).join(' ')}...
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Modern publication display */}
        <div className="relative">
          {/* Navigation arrows */}
          <div className="absolute inset-y-0 left-0 flex items-center z-20">
            <button 
              onClick={goToPrevPub}
              className="bg-white -ml-3 w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-hopkins-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hopkins-blue"
              disabled={isTransitioning}
              aria-label="Previous publication"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center z-20">
            <button 
              onClick={goToNextPub}
              className="bg-white -mr-3 w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-hopkins-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hopkins-blue"
              disabled={isTransitioning}
              aria-label="Next publication"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Publication cards container */}
          <div 
            className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          >
            <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-xl shadow-md border border-gray-200 bg-white publication-card">
              {/* Publication details card */}
              <div className="border-r border-gray-200">
                <PublicationDetails publication={featuredPubs[currentIndex]} />
              </div>
              
              {/* Publication metrics card */}
              <div>
                <PublicationMetrics publication={featuredPubs[currentIndex]} />
              </div>
            </div>
          </div>
          
          {/* Dot indicators - smaller and at the bottom */}
          <div className="flex justify-center mt-4 space-x-1.5">
            {featuredPubs.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPublication(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 focus:outline-none ${
                  idx === currentIndex ? 'bg-hopkins-blue' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to publication ${idx + 1}`}
                disabled={isTransitioning}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
