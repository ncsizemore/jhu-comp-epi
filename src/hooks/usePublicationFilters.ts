import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
 * Custom hook for managing publication filtering logic with URL state persistence
 *
 * Provides memoized filtering and sorting of publications based on tags, years, and projects.
 * Syncs filter state with URL search params for bookmarking and sharing.
 * Optimizes performance by only recomputing when dependencies change.
 *
 * @param publications - Array of all publications
 * @returns Filter state, setters, and filtered results
 */
export function usePublicationFilters(publications: Publication[]): PublicationFiltersResult {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize state from URL params
  const [selectedTags, setSelectedTagsState] = useState<string[]>(() => {
    const tags = searchParams.get('tags');
    return tags ? tags.split(',') : [];
  });

  const [selectedYears, setSelectedYearsState] = useState<string[]>(() => {
    const years = searchParams.get('years');
    return years ? years.split(',') : [];
  });

  const [selectedProjects, setSelectedProjectsState] = useState<string[]>(() => {
    const projects = searchParams.get('projects');
    return projects ? projects.split(',') : [];
  });

  // Sync state to URL whenever filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','));
    }
    if (selectedYears.length > 0) {
      params.set('years', selectedYears.join(','));
    }
    if (selectedProjects.length > 0) {
      params.set('projects', selectedProjects.join(','));
    }

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : '/publications';

    router.replace(newUrl, { scroll: false });
  }, [selectedTags, selectedYears, selectedProjects, router]);

  // Wrapper setters to update state
  const setSelectedTags = (tagsOrUpdater: React.SetStateAction<string[]>) => {
    setSelectedTagsState(tagsOrUpdater);
  };

  const setSelectedYears = (yearsOrUpdater: React.SetStateAction<string[]>) => {
    setSelectedYearsState(yearsOrUpdater);
  };

  const setSelectedProjects = (projectsOrUpdater: React.SetStateAction<string[]>) => {
    setSelectedProjectsState(projectsOrUpdater);
  };

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
