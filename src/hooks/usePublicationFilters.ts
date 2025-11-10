import { useState, useMemo } from 'react';
import { Publication } from '@/lib/data/publications';

export interface PublicationFilters {
  selectedTags: string[];
  selectedYears: string[];
  selectedProjects: string[];
}

export interface PublicationFiltersResult {
  // Filter state
  filters: PublicationFilters;

  // Setter functions
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedYears: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedProjects: React.Dispatch<React.SetStateAction<string[]>>;

  // Filtered results
  filteredPublications: Publication[];

  // Utility functions
  clearFilters: () => void;
  hasActiveFilters: boolean;
  totalCount: number;
  filteredCount: number;
}

/**
 * Custom hook for managing publication filtering logic
 *
 * Provides memoized filtering and sorting of publications based on tags, years, and projects.
 * Optimizes performance by only recomputing when dependencies change.
 *
 * @param publications - Array of all publications
 * @returns Filter state, setters, and filtered results
 */
export function usePublicationFilters(publications: Publication[]): PublicationFiltersResult {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  // Memoize the filtering logic - only recompute when filters or publications change
  const filteredPublications = useMemo(() => {
    return publications.filter(pub => {
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some(tag => pub.tags.includes(tag));

      const matchesYears =
        selectedYears.length === 0 ||
        selectedYears.includes(pub.year);

      const matchesProjects =
        selectedProjects.length === 0 ||
        selectedProjects.some(project => pub.projects.includes(project));

      return matchesTags && matchesYears && matchesProjects;
    });
  }, [publications, selectedTags, selectedYears, selectedProjects]);

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedYears([]);
    setSelectedProjects([]);
  };

  const hasActiveFilters =
    selectedTags.length > 0 ||
    selectedYears.length > 0 ||
    selectedProjects.length > 0;

  return {
    filters: {
      selectedTags,
      selectedYears,
      selectedProjects,
    },
    setSelectedTags,
    setSelectedYears,
    setSelectedProjects,
    filteredPublications,
    clearFilters,
    hasActiveFilters,
    totalCount: publications.length,
    filteredCount: filteredPublications.length,
  };
}
