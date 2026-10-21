import {
  publications,
  publicationYears,
  type Publication,
} from "@/data/publications";
import { filterPublications } from "@/lib/publication-search";
export type { Publication };

// Every access path uses the same curated, date-ordered group archive.
export async function getPublications() {
  return publications;
}
export async function getFeaturedPublications(limit?: number) {
  const result = publications.filter((p) => p.featured);
  return limit === undefined ? result : result.slice(0, limit);
}
export async function getPublicationsByProject(id: string) {
  return publications.filter((p) => p.projects.includes(id));
}
export async function getPublicationsByYear(year: string) {
  return publications.filter((p) => p.year === year);
}
export async function getPublicationsByTag(tag: string) {
  return publications.filter((p) => p.tags.includes(tag));
}
export async function getPublicationYears() {
  return publicationYears;
}
export async function getPublicationTags() {
  return [...new Set(publications.flatMap((p) => p.tags))].sort();
}
export async function getRecentPublications(limit = 5) {
  return publications.slice(0, limit);
}
export async function searchPublications(query: string) {
  return filterPublications(publications, query);
}
export async function getPublicationById(id: string) {
  return publications.find((p) => p.id === id);
}
