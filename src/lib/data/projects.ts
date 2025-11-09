/**
 * Projects Data Access Layer
 *
 * Abstraction layer for project data access.
 * This layer separates data fetching from presentation components,
 * enabling easier testing, caching, and future migration to APIs/databases.
 */

import { projects as projectsData, Project, ProjectStats } from '@/data/projects';

// Re-export types
export type { Project, ProjectStats };

/**
 * Get all projects
 * @returns Promise resolving to all projects
 */
export async function getProjects(): Promise<Project[]> {
  // Future: This could fetch from an API or database
  return projectsData;
}

/**
 * Get project by ID
 * @param id Project ID (jheem, shield, pearl)
 * @returns Promise resolving to project or undefined
 */
export async function getProjectById(id: string): Promise<Project | undefined> {
  return projectsData.find(p => p.id === id);
}

/**
 * Get projects by short name
 * @param shortName The short name to search for
 * @returns Promise resolving to matching projects
 */
export async function getProjectByShortName(shortName: string): Promise<Project | undefined> {
  return projectsData.find(p => p.shortName.toLowerCase() === shortName.toLowerCase());
}

/**
 * Search projects by title or description
 * @param query Search query string
 * @returns Promise resolving to matching projects
 */
export async function searchProjects(query: string): Promise<Project[]> {
  const lowerQuery = query.toLowerCase();
  return projectsData.filter(project =>
    project.title.toLowerCase().includes(lowerQuery) ||
    project.shortName.toLowerCase().includes(lowerQuery) ||
    project.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get project IDs
 * @returns Promise resolving to array of project IDs
 */
export async function getProjectIds(): Promise<string[]> {
  return projectsData.map(p => p.id);
}

/**
 * Validate if a project ID exists
 * @param id Project ID to validate
 * @returns Promise resolving to boolean
 */
export async function isValidProjectId(id: string): Promise<boolean> {
  return projectsData.some(p => p.id === id);
}
