// Project type definition
export interface ProjectStats {
  cities?: string;
  states?: string;
  publications: string;
  scenarios?: string;
  countries?: string;
}

export interface Project {
  id: string;
  title: string;
  shortName: string;
  description: string;
  fullDescription: string;
  color: string;
  stats: ProjectStats;
  challenge: string;
  keyFeatures: string[];
  externalUrl: string;
  externalLabel: string;
}

// Projects data
export const projects: Project[] = [
  {
    id: 'jheem',
    title: 'Johns Hopkins Epidemiological and Economic Model',
    shortName: 'JHEEM',
    description: 'Flexible HIV transmission modeling framework for intervention impact and policy evaluation across diverse geographic scales.',
    fullDescription: "JHEEM employs mathematical modeling to understand and predict HIV transmission and the impact of interventions across local populations. The simulated population is stratified by age, race, sex, sexual behavior, and drug use to capture population diversity. Calibrated to real-world HIV surveillance data from 32 U.S. cities under the Ending the HIV Epidemic Initiative, JHEEM enables precise projections of how interventions may influence future transmission and inform evidence-based public health strategies.",
    color: 'bg-hopkins-blue',
    stats: { cities: '32', states: '30', publications: '8' },
    challenge: 'HIV epidemic modeling & intervention evaluation',
    keyFeatures: [
      "Real-time intervention modeling",
      "Testing, PrEP & viral suppression",
      "Demographic targeting"
    ],
    externalUrl: "https://jheem-portal.vercel.app",
    externalLabel: "Access JHEEM Portal"
  },
  {
    id: 'shield',
    title: 'Syphilis and HIV Integrated Epidemiologic and Economic Dynamics',
    shortName: 'SHIELD',
    description: 'Models HIV-syphilis co-epidemic strategies across high-burden urban jurisdictions.',
    fullDescription: "SHIELD employs mathematical modeling to study the transmission and control of HIV and syphilis across local populations. The models cover 32 U.S. cities, encompassing all Ending the HIV Epidemic (EHE) urban jurisdictions, which account for approximately 60% of both HIV and syphilis diagnoses. SHIELD simulates populations stratified by demographic and behavioral factors to capture population diversity and enables projections of disease spread and intervention impact, supporting evidence-based public health planning and policy decisions.",
    color: 'bg-gradient-to-br from-amber-500 to-orange-600',
    stats: { cities: '32', publications: '0' },
    challenge: 'Dual STI epidemics at crisis levels',
    keyFeatures: [
      "Doxy-PEP innovation",
      "Point-of-care testing",
      "At-home diagnostics",
      "Cost-effectiveness analysis"
    ],
    externalUrl: "https://ncsizemore.github.io/shield-project/",
    externalLabel: "Visit SHIELD Site"
  }
];

// Helper functions
export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function getAllProjects(): Project[] {
  return projects;
}