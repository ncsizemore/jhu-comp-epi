// Publication type definition
export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi?: string;
  url?: string;
  abstract?: string;
  projects: string[]; // Array of project IDs related to this publication
  tags: string[]; // Keywords or categories
  featured?: boolean;
}

// Empty publications array - will be populated with real data later
export const publications: Publication[] = [];

// Export empty arrays for filters - will be populated with real data later
export const publicationTags: string[] = [];
export const publicationYears: string[] = [];