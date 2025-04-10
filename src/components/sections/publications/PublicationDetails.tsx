'use client';

import Link from 'next/link';
import { Publication, projectsMap } from '@/data/publications';

interface PublicationDetailsProps {
  publication: Publication;
}

export default function PublicationDetails({ publication }: PublicationDetailsProps) {
  // Get the project color for the publication
  const projectId = publication.projects[0] || 'pearl';
  const projectColor = projectsMap[projectId as keyof typeof projectsMap]?.color || 'bg-hopkins-spirit-blue';
  const projectName = projectsMap[projectId as keyof typeof projectsMap]?.name || 'PEARL';
  
  return (
    <div className="h-full flex flex-col">
      {/* Header with project indicator */}
      <div className={`${projectColor} px-6 py-4 text-white`}>
        <div className="flex justify-between items-center">
          <span className="font-medium text-sm">{projectName} Project</span>
          <span className="text-sm opacity-75">{publication.year}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4">
        {/* Publication title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
          {publication.title}
        </h3>
        
        {/* Authors */}
        <div className="text-xs text-gray-600 mb-3">
          {publication.authors}
        </div>
        
        {/* Publication details */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-xs">
          <span className="font-medium">{publication.journal}</span>
          
          {publication.doi && (
            <Link 
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-hopkins-blue hover:underline"
            >
              DOI: {publication.doi}
            </Link>
          )}
        </div>
        
        {/* Abstract */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-700 mb-1">Abstract</h4>
          <p className="text-xs leading-relaxed text-gray-600 line-clamp-4">
            {publication.abstract || "This publication presents groundbreaking research in computational epidemiology, with significant implications for public health policy and practice."}
          </p>
        </div>
        
        {/* Tags */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-700 mb-1">Keywords</h4>
          <div className="flex flex-wrap gap-1">
            {publication.tags.map(tag => (
              <span 
                key={tag} 
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-opacity-10 ${
                  tag.toLowerCase().includes('hiv') ? 'bg-red-100 text-red-800' :
                  tag.toLowerCase().includes('model') ? 'bg-blue-100 text-blue-800' :
                  tag.toLowerCase().includes('epidemio') ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
          <Link
            href={publication.url || `https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-medium text-hopkins-blue hover:text-hopkins-spirit-blue transition-colors group"
          >
            Read Publication
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
          
          <button
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(`${publication.authors}. (${publication.year}). ${publication.title}. ${publication.journal}. https://doi.org/${publication.doi}`);
                // Would add a toast notification here in a real implementation
              }
            }}
          >
            <span className="sr-only">Copy Citation</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
