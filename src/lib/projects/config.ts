/**
 * Centralized Project Theme Configuration
 *
 * Single source of truth for all project theming, colors, and metadata.
 * Eliminates duplicate project theme definitions across the codebase.
 */

export const PROJECT_THEME = {
  jheem: {
    id: 'jheem',
    name: 'JHEEM',
    fullName: 'Johns Hopkins Epidemiological and Economic Model',
    description: 'A comprehensive framework for simulating HIV transmission dynamics and evaluating the impact of prevention and treatment interventions across diverse populations.',
    colors: {
      // Solid background colors for badges and pills
      solid: 'bg-hopkins-blue',
      solidHover: 'hover:bg-hopkins-blue/90',

      // Text colors
      text: 'text-hopkins-blue',

      // Gradient backgrounds for cards
      gradient: 'from-hopkins-blue to-indigo-600',

      // Dark gradient backgrounds for overlays
      gradientDark: 'from-hopkins-blue/30 to-indigo-900/30',

      // Border colors
      border: 'border-l-hopkins-blue',
      borderFull: 'border-hopkins-blue',
    }
  },
  shield: {
    id: 'shield',
    name: 'SHIELD',
    fullName: 'Syphilis and HIV Integrated Epidemiologic and Economic Dynamics',
    description: 'Modeling the complex interactions between syphilis and HIV transmission to optimize intervention strategies and resource allocation at the local level.',
    colors: {
      solid: 'bg-amber-500',
      solidHover: 'hover:bg-amber-600',
      text: 'text-amber-500',
      gradient: 'from-amber-500 to-orange-600',
      gradientDark: 'from-amber-500/30 to-orange-900/30',
      border: 'border-l-amber-500',
      borderFull: 'border-amber-500',
    }
  },
} as const;

export type ProjectId = keyof typeof PROJECT_THEME;

/**
 * Get theme configuration for a specific project
 * Falls back to JHEEM theme if project not found
 */
export function getProjectTheme(projectId: string) {
  const theme = PROJECT_THEME[projectId as ProjectId];
  return theme || PROJECT_THEME.jheem;
}

/**
 * Get a specific color variant for a project
 * @param projectId - The project identifier
 * @param variant - The color variant to retrieve
 */
export function getProjectColor(
  projectId: string,
  variant: keyof typeof PROJECT_THEME.jheem.colors
) {
  const theme = getProjectTheme(projectId);
  return theme.colors[variant];
}

/**
 * Get project name
 */
export function getProjectName(projectId: string): string {
  return getProjectTheme(projectId).name;
}

/**
 * Get full project name
 */
export function getProjectFullName(projectId: string): string {
  return getProjectTheme(projectId).fullName;
}

/**
 * Get all project IDs
 */
export function getAllProjectIds(): ProjectId[] {
  return Object.keys(PROJECT_THEME) as ProjectId[];
}

/**
 * Legacy projectsMap for backwards compatibility
 * @deprecated Use getProjectTheme() instead
 */
export const projectsMap = {
  jheem: { name: PROJECT_THEME.jheem.name, color: PROJECT_THEME.jheem.colors.solid },
  shield: { name: PROJECT_THEME.shield.name, color: PROJECT_THEME.shield.colors.solid },
} as const;
