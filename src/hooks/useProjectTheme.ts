import { useMemo } from 'react';
import { getProjectTheme, getProjectColor, PROJECT_THEME } from '@/lib/projects/config';

/**
 * React hook for accessing project theme configuration
 *
 * @param projectId - The project identifier
 * @returns Project theme configuration with memoization
 *
 * @example
 * ```tsx
 * const theme = useProjectTheme('jheem');
 * <div className={`bg-gradient-to-r ${theme.colors.gradient}`}>
 *   {theme.name}
 * </div>
 * ```
 */
export function useProjectTheme(projectId: string) {
  return useMemo(() => getProjectTheme(projectId), [projectId]);
}

/**
 * Get a specific color from project theme
 *
 * @param projectId - The project identifier
 * @param variant - The color variant
 * @returns Tailwind class string for the color
 *
 * @example
 * ```tsx
 * const borderColor = useProjectColor('jheem', 'border');
 * <div className={borderColor}>...</div>
 * ```
 */
export function useProjectColor(
  projectId: string,
  variant: keyof typeof PROJECT_THEME.pearl.colors
) {
  return useMemo(() => getProjectColor(projectId, variant), [projectId, variant]);
}
