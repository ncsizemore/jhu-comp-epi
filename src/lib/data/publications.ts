/**
 * Publications Data Access Layer
 *
 * Abstraction layer for publication data access.
 * This layer separates data fetching from presentation components,
 * enabling easier testing, caching, and future migration to APIs/databases.
 */

import { publications as publicationsData, publicationYears as yearsData, Publication } from '@/data/publications';

// Re-export types
export type { Publication };

/**
 * Get all publications
 * @returns Promise resolving to all publications
 */
export async function getPublications(): Promise<Publication[]> {
  // Future: This could fetch from an API or database
  return publicationsData;
}

/**
 * Get featured publications (marked with featured: true)
 * @param limit Optional limit on number of featured publications
 * @returns Promise resolving to featured publications
 */
export async function getFeaturedPublications(limit?: number): Promise<Publication[]> {
  const featured = publicationsData.filter(p => p.featured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Get publications by project ID
 * @param projectId The project identifier (jheem, shield, pearl)
 * @returns Promise resolving to publications for the project
 */
export async function getPublicationsByProject(projectId: string): Promise<Publication[]> {
  return publicationsData.filter(p => p.projects.includes(projectId));
}

/**
 * Get publications by year
 * @param year The publication year
 * @returns Promise resolving to publications from that year
 */
export async function getPublicationsByYear(year: string): Promise<Publication[]> {
  return publicationsData.filter(p => p.year === year);
}

/**
 * Get publications by tag
 * @param tag The tag to filter by
 * @returns Promise resolving to publications with that tag
 */
export async function getPublicationsByTag(tag: string): Promise<Publication[]> {
  return publicationsData.filter(p => p.tags.includes(tag));
}

/**
 * Get all unique publication years, sorted descending
 * @returns Promise resolving to array of years
 */
export async function getPublicationYears(): Promise<string[]> {
  return yearsData;
}

/**
 * Get all unique tags from publications
 * @returns Promise resolving to array of unique tags
 */
export async function getPublicationTags(): Promise<string[]> {
  const tagsSet = new Set<string>();
  publicationsData.forEach(pub => {
    pub.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

/**
 * Get recent publications
 * @param limit Number of recent publications to return (default: 5)
 * @returns Promise resolving to recent publications
 */
export async function getRecentPublications(limit: number = 5): Promise<Publication[]> {
  return [...publicationsData]
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
    .slice(0, limit);
}

/**
 * Search publications by title or authors
 * @param query Search query string
 * @returns Promise resolving to matching publications
 */
export async function searchPublications(query: string): Promise<Publication[]> {
  const lowerQuery = query.toLowerCase();
  return publicationsData.filter(pub =>
    pub.title.toLowerCase().includes(lowerQuery) ||
    pub.authors.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get publication by ID
 * @param id Publication ID
 * @returns Promise resolving to publication or undefined
 */
export async function getPublicationById(id: string): Promise<Publication | undefined> {
  return publicationsData.find(p => p.id === id);
}
