import { useMemo } from 'react';
import { getProjectTheme, PROJECT_THEME } from '@/lib/projects/config';

/**
 * Custom hook for accessing project theme configuration
 *
 * Provides convenient access to project colors, names, and metadata.
 * Memoizes the result to prevent unnecessary recalculations.
 *
 * @param projectId - The project identifier (jheem, shield)
 * @returns Memoized project theme configuration
 *
 * @example
 * ```tsx
 * const theme = useProjectTheme('jheem');
 * <div className={theme.colors.border}>
 *   <span className={theme.colors.text}>{theme.name}</span>
 * </div>
 * ```
 */
export function useProjectTheme(projectId: string | undefined | null) {
  return useMemo(() => {
    if (!projectId) return PROJECT_THEME.jheem;
    return getProjectTheme(projectId);
  }, [projectId]);
}

/**
 * Hook to get a specific color variant from a project theme
 *
 * @param projectId - The project identifier
 * @param variant - The color variant to retrieve
 * @returns The color class name
 *
 * @example
 * ```tsx
 * const borderColor = useProjectColor('shield', 'border');
 * <div className={borderColor}>...</div>
 * ```
 */
export function useProjectColor(
  projectId: string | undefined | null,
  variant: keyof typeof PROJECT_THEME.jheem.colors
) {
  const theme = useProjectTheme(projectId);
  return useMemo(() => theme.colors[variant], [theme, variant]);
}
