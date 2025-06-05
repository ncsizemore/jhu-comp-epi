/**
 * Get the correct path for assets in both development and GitHub Pages deployment
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In GitHub Pages deployment, we need the basePath prefix
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true') {
    return `/jhu-comp-epi/${cleanPath}`;
  }
  
  // For development and regular production, use the path as-is
  return `/${cleanPath}`;
}
