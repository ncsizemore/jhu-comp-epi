/**
 * Utility functions for formatting publication author names
 */

/**
 * Parses author string and returns formatted display with first and last authors
 * @param authorString - Comma-separated author names
 * @returns Formatted string showing first and last authors
 * @example
 * "Smith A, Jones B, Brown C" => "Smith A, ... Brown C"
 * "Smith A" => "Smith A"
 * "Smith A, Jones B" => "Smith A, Jones B"
 */
export function formatAuthors(authorString: string): string {
  if (!authorString) return '';

  const authors = authorString.split(',').map(a => a.trim()).filter(Boolean);

  // Single author
  if (authors.length === 1) {
    return authors[0];
  }

  // Two authors
  if (authors.length === 2) {
    return `${authors[0]}, ${authors[1]}`;
  }

  // Three or more authors
  return `${authors[0]}, ... ${authors[authors.length - 1]}`;
}

/**
 * Gets the first author from author string
 * @param authorString - Comma-separated author names
 * @returns First author name
 */
export function getFirstAuthor(authorString: string): string {
  if (!authorString) return '';
  return authorString.split(',')[0].trim();
}

/**
 * Gets the last author from author string
 * @param authorString - Comma-separated author names
 * @returns Last author name
 */
export function getLastAuthor(authorString: string): string {
  if (!authorString) return '';
  const authors = authorString.split(',').map(a => a.trim()).filter(Boolean);
  return authors[authors.length - 1];
}
