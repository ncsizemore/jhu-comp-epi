// Publication type definition
export interface Publication {
  id: string;
  shortAuthors?: string;
  authorNames?: { citation: string; name: string }[];
  sortDate?: string;
  preprint?: boolean;
  source?: string;
  verified?: string;
  version?: number;
  versionDate?: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi?: string;
  url?: string;
  abstract?: string;
  keyFindings?: string; // Optional 1-2 sentence key takeaway (requires author verification)
  projects: string[]; // Array of project IDs related to this publication
  tags: string[]; // Keywords or categories
  featured?: boolean;
  imageUrl?: string; // Optional image URL for the publication card (key figure from paper)
  imageCaption?: string; // Optional caption for the key figure
  additionalImages?: string[]; // Optional array of additional figure URLs (archived for future use)
  attentionGrabber?: string; // Optional short text for the publication card
  featuredStats?: {
    // Optional stats for stats-focused cards
    citations?: string;
    countries?: string;
    impact?: string;
  };
}

import records from "./publication-records.json";

/** Curated group archive. TB and PEARL are outside this group’s current scope. */
export const publications: Publication[] = records;
export const publicationYears = [
  ...new Set(publications.map((p) => p.year)),
].sort((a, b) => Number(b) - Number(a));
