'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Publication, projectsMap } from '@/data/publications';

interface PublicationsListProps {
  publications: Publication[];
  tags: string[];
  years: string[];
}

export default function PublicationsList({ publications, tags, years }: PublicationsListProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  const toggleYear = (year: string) => {
    setSelectedYears(prev => 
      prev.includes(year) 
        ? prev.filter(y => y !== year) 
        : [...prev, year]
    );
  };
  
  const toggleProject = (project: string) => {
    setSelectedProjects(prev => 
      prev.includes(project) 
        ? prev.filter(p => p !== project) 
        : [...prev, project]
    );
  };
  
  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedYears([]);
    setSelectedProjects([]);
  };
  

  
  // Filter publications based on selected filters
  const filteredPublications = publications.filter(pub => {
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => pub.tags.includes(tag));
    
    const matchesYears = selectedYears.length === 0 || 
      selectedYears.includes(pub.year);
    
    const matchesProjects = selectedProjects.length === 0 || 
      selectedProjects.some(project => pub.projects.includes(project));
    
    return matchesTags && matchesYears && matchesProjects;
  });
  
  // Sort publications by year (most recent first)
  const sortedPublications = [...filteredPublications].sort((a, b) => {
    return parseInt(b.year) - parseInt(a.year);
  });

  return (
    <section id="all-publications" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-hopkins-blue rounded mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-900">All Publications</h2>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-8">
            <div className="grid md:grid-cols-12 gap-6">
              {/* Year Filter */}
              <div className="md:col-span-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Filter by Year</h3>
                <div className="flex flex-wrap gap-2">
                  {years.map(year => (
                    <button 
                      key={year}
                      onClick={() => toggleYear(year)}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                        selectedYears.includes(year)
                          ? 'bg-hopkins-blue text-white border-hopkins-blue'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Project Filter */}
              <div className="md:col-span-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Filter by Project</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(projectsMap).map(([key, project]) => (
                    <button 
                      key={key}
                      onClick={() => toggleProject(key)}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                        selectedProjects.includes(key)
                          ? `${project.color} text-white border-transparent`
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {project.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tags Filter */}
              <div className="md:col-span-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Filter by Topic</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button 
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-hopkins-gold text-white border-hopkins-gold'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Clear Filters */}
            {(selectedTags.length > 0 || selectedYears.length > 0 || selectedProjects.length > 0) && (
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={clearFilters}
                  className="text-xs text-gray-600 hover:text-hopkins-blue flex items-center transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Publications List */}
        <div className="space-y-6">
          {sortedPublications.length > 0 ? (
            sortedPublications.map((publication) => (
              <PublicationListItem 
                key={publication.id} 
                publication={publication} 
              />
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No publications match your current filters.</p>
              <button 
                onClick={clearFilters}
                className="mt-2 text-hopkins-blue hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PublicationListItem({ publication }: { publication: Publication }) {
  // Get the project color
  const projectId = publication.projects[0] || 'pearl';
  const projectColor = projectsMap[projectId as keyof typeof projectsMap]?.color || 'bg-hopkins-spirit-blue';
  const textColor = projectId === 'shield' ? 'text-amber-700' : 
                   projectId === 'tbmte' ? 'text-emerald-800' : 
                   projectId === 'jheem' ? 'text-hopkins-blue' : 
                   'text-hopkins-spirit-blue';
  
  return (
    <div className="border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors">
      <div className="flex flex-wrap items-center gap-4">
        {/* Year Badge */}
        <div className="hidden md:flex flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
          <span className="text-sm font-bold text-gray-500">{publication.year}</span>
        </div>
        
        <div className="flex-grow">
          {/* Publication Title */}
          <h3 className="text-base font-medium text-gray-900 mb-1">
            {publication.title}
          </h3>
          
          {/* Publication Details in one line */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
            <span className="text-gray-600">{publication.authors.split(',')[0]} et al.</span>
            <span className="text-gray-500">{publication.journal}</span>
            <span className="md:hidden text-gray-500">{publication.year}</span>
            
            {/* Tags as colored pills */}
            <div className="flex flex-wrap gap-2">
              {publication.tags.slice(0, 2).map(tag => (
                <span 
                  key={tag} 
                  className={`px-2 py-0.5 text-xs rounded-full ${projectColor}/10 ${textColor}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Project Badge & Action Buttons */}
        <div className="flex items-center gap-3 ml-auto">
          <span className={`flex-shrink-0 ${projectColor} text-white text-xs font-semibold px-2 py-1 rounded-md`}>
            {projectsMap[projectId as keyof typeof projectsMap]?.name || 'PEARL'}
          </span>
          
          <Link 
            href={publication.url || `https://doi.org/${publication.doi}`} 
            target="_blank"
            rel="noopener noreferrer" 
            className={`${textColor} text-sm hover:underline flex items-center`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="sr-only">View Publication</span>
          </Link>
          
          <button 
            onClick={() => alert(`Citation information for: ${publication.title}`)}
            className={`${textColor} text-sm hover:underline flex items-center`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            <span className="sr-only">Cite</span>
          </button>
        </div>
      </div>
    </div>
  );
