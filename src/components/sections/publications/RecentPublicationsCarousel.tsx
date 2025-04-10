'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Publication, projectsMap } from '@/data/publications';

interface RecentPublicationsCarouselProps {
  publications: Publication[];
}

export default function RecentPublicationsCarousel({ publications }: RecentPublicationsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Sort publications by year (most recent first)
  const recentPublications = [...publications]
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
    .slice(0, 5); // Get the 5 most recent
  
  useEffect(() => {
    // Auto-rotate slides
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % recentPublications.length);
      }, 5000); // Rotate every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [isPaused, recentPublications.length]);

  return (
    <section 
      className="py-10 bg-gray-50 border-y border-gray-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center mb-2">
              <div className="w-1.5 h-8 bg-hopkins-gold rounded mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-900">Latest Research</h2>
            </div>
            <p className="text-gray-600">
              Our most recent contributions to the field
            </p>
          </div>
          
          <div className="hidden md:flex space-x-2">
            {recentPublications.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentSlide ? 'bg-hopkins-gold' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>
        
        <div className="relative bg-white rounded-xl shadow-md overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
            <div 
              className="h-full bg-hopkins-gold transition-all duration-5000 ease-linear"
              style={{ 
                width: `${(currentSlide + 1) / recentPublications.length * 100}%`, 
                transitionDuration: isPaused ? '0ms' : '5000ms'
              }}
            ></div>
          </div>
          
          <div className="relative h-48">
            {recentPublications.map((publication, idx) => (
              <div 
                key={publication.id}
                className={`absolute inset-0 p-8 transition-opacity duration-500 ${
                  idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div className="flex h-full">
                  <div className="flex-grow pr-8">
                    <div className="mb-2 text-sm text-gray-600 flex items-center gap-4">
                      <span>{publication.journal}</span>
                      <span className="text-hopkins-gold font-medium">{publication.year}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {publication.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-1">
                      {publication.authors.split(',')[0]} et al.
                    </p>
                    
                    <div className="mt-auto">
                      <Link 
                        href={publication.url || `https://doi.org/${publication.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-hopkins-blue hover:underline flex items-center text-sm"
                      >
                        View Publication
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-24 h-24">
                    {/* This could be a small journal icon or paper icon */}
                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-400">{publication.year.slice(-2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex border-t border-gray-100">
            {recentPublications.map((pub, idx) => {
              const projectId = pub.projects[0] || 'pearl';
              const project = projectsMap[projectId as keyof typeof projectsMap];
              
              return (
                <button 
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`flex-1 py-3 text-xs font-medium transition-colors ${
                    idx === currentSlide 
                      ? `${project.color} text-white`
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {project.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
