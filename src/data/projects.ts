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
    stats: { cities: '15', publications: '24' }
  },
  {
    id: 'shield',
    title: 'Syphilis and HIV Integrated Epidemiologic and Economic Dynamics',
    shortName: 'SHIELD',
    description: 'Modeling the complex interactions between syphilis and HIV transmission to optimize intervention strategies and resource allocation at the local level.',
    color: 'bg-hopkins-gold',
    stats: { cities: '8', publications: '13' }
  },
  {
    id: 'pearl',
    title: 'ProjEcting Age, multimoRbidity, and poLypharmacy',
    shortName: 'PEARL',
    description: 'A novel modeling approach to understand and forecast age-related comorbidities and medication interactions in populations living with HIV.',
    color: 'bg-hopkins-spirit-blue',
    stats: { scenarios: '10+', publications: '9' }
  },
  {
    id: 'tbmte',
    title: 'TB Modeling and Translational Epidemiology',
    shortName: 'TBMTE',
    description: 'Applying mathematical modeling and data science to address critical questions in tuberculosis epidemiology, transmission dynamics, and control strategies worldwide.',
    color: 'bg-emerald-600',
    stats: { countries: '12', publications: '18' }
  }
];