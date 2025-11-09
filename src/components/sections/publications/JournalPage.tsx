'use client';

import Link from 'next/link';
import { Publication } from '@/lib/data/publications';

interface JournalPageProps {
  publication: Publication;
  isLeftPage?: boolean;
}

export default function JournalPage({ publication, isLeftPage = false }: JournalPageProps) {
  return (
    <div className={`p-4 sm:p-6 md:p-8 bg-white relative h-full ${isLeftPage ? 'rounded-l-lg' : ''}`}>
      {/* Subtle page shadow/fold effect */}
      <div className={`absolute top-0 bottom-0 ${isLeftPage ? 'right-0 w-8 page-fold-right' : 'left-0 w-8 page-fold-left'} opacity-50`}></div>
      
      {/* Page texture overlay */}
      <div className="absolute inset-0 paper-texture pointer-events-none"></div>
      
      {/* Journal header */}
      <div className="mb-6 relative z-10">
        <div className="text-xs text-gray-500 flex justify-between items-center mb-1 font-serif">
          <div>Johns Hopkins University • Computational Epidemiology</div>
          <div>{new Date().getFullYear()}</div>
        </div>
        <div className="border-b border-gray-300 w-full"></div>
      </div>
      
      {/* Publication content */}
      <article className={`${isLeftPage ? 'pr-2 sm:pr-4 md:pr-6' : 'pl-2 sm:pl-4 md:pl-6'} relative z-10 journal-page`}>
        <h1 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-3 sm:mb-4 leading-tight tracking-tight journal-title">
          {publication.title}
        </h1>
        
        <div className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-5 font-serif italic">
          {publication.authors}
        </div>
        
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-3 sm:mb-5 text-xs sm:text-sm">
          <span className="font-medium text-gray-800">{publication.journal}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-500">{publication.year}</span>
          {publication.doi && (
            <>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500 font-mono text-xs">DOI: {publication.doi}</span>
            </>
          )}
        </div>
        
        {/* Abstract */}
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-800 mb-2 uppercase tracking-wider border-b border-gray-200 pb-1">Abstract</h2>
          <p className="text-xs sm:text-sm leading-relaxed text-gray-700 font-serif line-clamp-6">
            {publication.abstract || "This publication presents groundbreaking research in computational epidemiology, with significant implications for public health policy and practice."}
          </p>
        </div>
        
        {/* Keywords */}
        <div className="mt-6">
          <h2 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider border-b border-gray-200 pb-1">Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {publication.tags.map(tag => (
              <span 
                key={tag} 
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200 hover:bg-gray-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Read more link */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <Link 
            href={publication.url || `https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-hopkins-spirit-blue hover:underline group"
          >
            Read Full Publication
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
        
        {/* Page number */}
        <div className="absolute bottom-4 left-4 text-xs text-gray-400 font-serif">
          {Math.floor(Math.random() * 100) + 1}
        </div>
        
        {/* Journal section indicator */}
        <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-serif">
          Research Publications
        </div>
      </article>
    </div>
  );
}
