// Project type definition
export interface ProjectStats {
  cities?: string;
  publications: string;
  scenarios?: string;
  countries?: string;
}

export interface Project {
  id: string;
  title: string;
  shortName: string;
  description: string;
  color: string;
  stats: ProjectStats;
}

// Projects data
export const projects: Project[] = [
  {
    id: 'jheem',
    title: 'Johns Hopkins Epidemiological and Economic Model',
    shortName: 'JHEEM',
    description: 'A comprehensive framework for simulating HIV transmission dynamics and evaluating the impact of prevention and treatment interventions across diverse populations.',
    color: 'bg-hopkins-blue',
    stats: { cities: '15', publications: '8' }
  },
  {
    id: 'shield',
    title: 'Syphilis and HIV Integrated Epidemiologic and Economic Dynamics',
    shortName: 'SHIELD',
    description: 'Modeling the complex interactions between syphilis and HIV transmission to optimize intervention strategies and resource allocation at the local level.',
    color: 'bg-gradient-to-br from-amber-500 to-orange-600',
    stats: { cities: '32', publications: '0' }
  }
];