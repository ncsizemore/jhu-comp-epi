'use client';

import { useState, useMemo } from 'react';
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
  const [showAllTags, setShowAllTags] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  
  const toggleCardExpansion = (id: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

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
  
  // Memoize expensive filtering and sorting operations
  const { sortedPublications } = useMemo(() => {
    const filtered = publications.filter(pub => {
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => pub.tags.includes(tag));
      
      const matchesYears = selectedYears.length === 0 || 
        selectedYears.includes(pub.year);
      
      const matchesProjects = selectedProjects.length === 0 || 
        selectedProjects.some(project => pub.projects.includes(project));
      
      return matchesTags && matchesYears && matchesProjects;
    });

    const sorted = [...filtered].sort((a, b) => {
      return parseInt(b.year) - parseInt(a.year);
    });

    return { sortedPublications: sorted };
  }, [publications, selectedTags, selectedYears, selectedProjects]);

  // Get display tags for collapsed state - memoize this too
  const { displayTags, hasMoreTags } = useMemo(() => {
    const display = showAllTags ? tags : tags.slice(0, 16);
    const hasMore = tags.length > 16;
    return { displayTags: display, hasMoreTags: hasMore };
  }, [tags, showAllTags]);

  const hasActiveFilters = selectedTags.length > 0 || selectedYears.length > 0 || selectedProjects.length > 0;

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-slate-50 to-white relative overflow-hidden">
      {/* Optimized background for cohesion */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-hopkins-blue/6 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-hopkins-spirit-blue/4 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-hopkins-gold/4 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Streamlined Header */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
              All Publications
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-hopkins-blue via-hopkins-spirit-blue to-hopkins-gold mx-auto rounded-full"></div>
          </div>
          
          {/* Compact Filters */}
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-hopkins-blue/10 text-hopkins-blue text-xs rounded font-medium">
                    <div className="w-1 h-1 bg-hopkins-blue rounded-full"></div>
                    Active
                  </span>
                )}
              </span>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span>{sortedPublications.length} of {publications.length}</span>
                {hasActiveFilters && (
                  <button 
                    onClick={clearFilters}
                    className="text-xs text-hopkins-blue hover:text-hopkins-blue/80 font-medium underline decoration-dotted hover:no-underline"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Year Filter */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-hopkins-blue rounded-full"></div>
                  Year
                </label>
                <div className="flex flex-wrap gap-1">
                  {years.map(year => (
                    <button 
                      key={year}
                      onClick={() => toggleYear(year)}
                      className={`px-2 py-1 text-xs font-medium rounded transition-all duration-200 border ${
                        selectedYears.includes(year)
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Project Filter */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-hopkins-gold rounded-full"></div>
                  Project
                </label>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(projectsMap).map(([key, project]) => (
                    <button 
                      key={key}
                      onClick={() => toggleProject(key)}
                      className={`px-2 py-1 text-xs font-medium rounded transition-all duration-200 border ${
                        selectedProjects.includes(key)
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {project.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Topics Filter */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  Topics
                </label>
                <div className="space-y-1">
                  <div className="flex flex-wrap gap-1">
                    {displayTags.map(tag => (
                      <button 
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-2 py-1 text-xs font-medium rounded transition-all duration-200 border ${
                          selectedTags.includes(tag)
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  {hasMoreTags && (
                    <button
                      onClick={() => setShowAllTags(!showAllTags)}
                      className="text-xs text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
                    >
                      {showAllTags ? (
                        <>
                          <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                          Fewer
                        </>
                      ) : (
                        <>
                          <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          +{tags.length - 16}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Compact Two-Column Publications List */}
        {sortedPublications.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {sortedPublications.map((publication) => (
              <PublicationListItem 
                key={publication.id} 
                publication={publication}
                isExpanded={expandedCards.has(publication.id)}
                onToggleExpansion={() => toggleCardExpansion(publication.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-sm mx-auto">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No publications found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
              <button 
                onClick={clearFilters}
                className="px-6 py-2 bg-hopkins-blue text-white rounded-lg hover:bg-hopkins-blue/90 transition-all duration-200 font-medium"
              >
                Reset filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PublicationListItem({ 
  publication, 
  isExpanded, 
  onToggleExpansion 
}: { 
  publication: Publication; 
  isExpanded: boolean;
  onToggleExpansion: () => void;
}) {
  const [showCitationToast, setShowCitationToast] = useState(false);
  
  // Get the project info
  const projectId = publication.projects[0] || 'pearl';
  const projectInfo = projectsMap[projectId as keyof typeof projectsMap] || projectsMap.pearl;
  
  const projectColors = {
    pearl: 'from-hopkins-spirit-blue to-blue-600',
    jheem: 'from-hopkins-blue to-indigo-600',

    shield: 'from-amber-500 to-orange-600'
  };
  
  const projectBorders = {
    pearl: 'border-l-hopkins-spirit-blue',
    jheem: 'border-l-hopkins-blue',

    shield: 'border-l-amber-500'
  };
  
  const borderClass = projectBorders[projectId as keyof typeof projectBorders] || projectBorders.pearl;
  const colorClass = projectColors[projectId as keyof typeof projectColors] || projectColors.pearl;
  
  const handleCitationCopy = async () => {
    const citation = `${publication.authors.split(',')[0]} et al. (${publication.year}). ${publication.title} ${publication.journal}.`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(citation);
        setShowCitationToast(true);
        setTimeout(() => setShowCitationToast(false), 2000);
      } else {
        console.warn('Clipboard API not available');
      }
    } catch (error) {
      console.error('Failed to copy citation:', error);
    }
  };

  return (
    <div className="relative">
      {/* Citation Toast */}
      {showCitationToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-200">
          ✓ Citation copied to clipboard!
        </div>
      )}
      
      <div className={`border-l-4 ${borderClass} bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-r-xl transition-all duration-200 hover:shadow-md group`}>
        <div className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Main content */}
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${colorClass} flex-shrink-0`}></div>
                <span className="text-xs font-medium text-gray-600">
                  {projectInfo.name}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-xs font-medium text-gray-600">
                  {publication.year}
                </span>
              </div>
              
              <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-2 group-hover:text-gray-700 transition-colors duration-200 line-clamp-2">
                {publication.title}
              </h3>
              
              <div className="text-xs text-gray-600 mb-2 line-clamp-1">
                <span className="font-medium">
                  {publication.authors.split(',')[0].trim()}
                  {publication.authors.split(',').length > 1 && ' et al.'}
                </span>
                <span className="text-gray-400 mx-1">•</span>
                <span className="italic">{publication.journal}</span>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-2">
                {publication.tags.slice(0, 3).map(tag => (
                  <span 
                    key={tag} 
                    className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {publication.tags.length > 3 && (
                  <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded font-medium">
                    +{publication.tags.length - 3}
                  </span>
                )}
              </div>
              
              {/* Expandable Abstract */}
              {publication.abstract && (
                <>
                  <button
                    onClick={onToggleExpansion}
                    className="text-xs text-hopkins-blue hover:text-hopkins-blue/80 font-medium flex items-center gap-1 mb-2 transition-colors duration-200"
                  >
                    <svg className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span>{isExpanded ? 'Hide' : 'Show'} abstract</span>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${
                    isExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="bg-gray-50 rounded p-2 border border-gray-200 mt-2">
                      <p className="text-xs text-gray-700 leading-relaxed line-clamp-4">
                        {publication.abstract}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Link 
                href={publication.url || `https://doi.org/${publication.doi}`} 
                target="_blank"
                rel="noopener noreferrer" 
                className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-700 rounded border border-gray-300 hover:border-gray-700 transition-all duration-200"
                title="View Publication"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
              
              <button 
                onClick={handleCitationCopy}
                className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-700 rounded border border-gray-300 hover:border-gray-700 transition-all duration-200"
                title="Copy Citation"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
