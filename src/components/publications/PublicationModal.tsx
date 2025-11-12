'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Publication } from '@/lib/data/publications';
import { getProjectTheme, projectsMap } from '@/lib/projects/config';
import { formatAuthors } from '@/lib/utils/authors';

interface PublicationModalProps {
  publication: Publication;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function PublicationModal({
  publication,
  onClose,
  onNext,
  onPrevious
}: PublicationModalProps) {
  const projectId = publication.projects[0] || 'pearl';
  const project = projectsMap[projectId as keyof typeof projectsMap];
  const projectTheme = getProjectTheme(projectId);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation arrows */}
        {onPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200"
            aria-label="Previous publication"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {onNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200"
            aria-label="Next publication"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Content */}
        <div className="p-8">
          {/* Header with badges and CTA */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${projectTheme.colors.gradient} text-white text-sm font-bold uppercase tracking-wider rounded-lg shadow-lg`}>
                <div className="w-2 h-2 bg-white rounded-full"></div>
                {project.name}
              </div>
              <div className="px-3 py-1 bg-gray-100 border border-gray-300 text-gray-700 text-sm font-bold rounded-lg">
                {publication.year}
              </div>
            </div>

            {/* CTA Button - Top Right */}
            <Link
              href={publication.url || `https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-hopkins-blue to-hopkins-spirit-blue text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <span>View Publication</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {publication.title}
          </h2>

          {/* Authors & Journal */}
          <div className="mb-6 text-base">
            <p className="text-gray-700 font-medium mb-1">
              {formatAuthors(publication.authors)}
            </p>
            <p className="text-gray-600 italic">
              {publication.journal}
            </p>
          </div>

          {/* Image (full size if available) */}
          {publication.imageUrl && (
            <div className="mb-6 bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
              <div className="relative w-full" style={{ paddingBottom: '60%' }}>
                <Image
                  src={publication.imageUrl}
                  alt={publication.imageCaption || publication.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              {publication.imageCaption && (
                <div className="p-4 bg-white border-t border-gray-200">
                  <p className="text-sm text-gray-600 italic">
                    {publication.imageCaption}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Key Findings - Full text */}
          {(publication.keyFindings || publication.abstract) && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Key Findings</h3>
              <p className="text-gray-700 leading-relaxed">
                {publication.keyFindings || publication.abstract}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
