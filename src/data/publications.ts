// Publication type definition
export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi?: string;
  url?: string;
  abstract?: string;
  projects: string[]; // Array of project IDs related to this publication
  tags: string[]; // Keywords or categories
  featured?: boolean;
  imageUrl?: string; // Optional image URL for the publication card
  attentionGrabber?: string; // Optional short text for the publication card
}

// Publications array populated with PEARL project publications
export const publications: Publication[] = [
  {
    id: "althoff-2024",
    title: "The forecasted prevalence of comorbidities and multimorbidity in people with HIV in the United States through the year 2030: A modeling study",
    authors: "Althoff KN, Stewart C, Humes E, Gerace L, Boyd C, Gebo K, Hyle EP, Coburn SB, Silverberg MJ, Horberg MA, Lima VD, Gill MJ, Karris K, Rebeiro PF, Kasaie P",
    journal: "PLoS medicine",
    year: "2024",
    doi: "10.1371/journal.pmed.1004325",
    url: "https://doi.org/10.1371/journal.pmed.1004325",
    abstract: "This modeling study forecasts a significant increase in comorbidities and multimorbidity among people with HIV in the United States through 2030, highlighting the growing healthcare needs of this aging population.",
    projects: ["pearl"],
    tags: ["HIV", "comorbidities", "multimorbidity", "aging", "modeling"],
    featured: true,
    imageUrl: "/images/placeholder-pub-1.png", // Placeholder
    attentionGrabber: "Forecasting the rise of multimorbidity in aging HIV populations." // Placeholder
  },
  {
    id: "hyle-2023",
    title: "A growing number of men who have sex with men aging with HIV (2021–2031): a comparison of two microsimulation models",
    authors: "EP Hyle, P Kasaie, T Stanic, E Humes, KP Reddy, P Rebeiro, E Schwamm, J Zhang, P Pei, C Stewart, KA Freedberg, A Mayor, L Yu, J Margolick, FM Shebl, M Silverberg, RP Walensky, KN Althoff",
    journal: "The Journal of Infectious Diseases",
    year: "2023",
    doi: "10.1093/infdis/jiac473",
    url: "https://doi.org/10.1093/infdis/jiac473",
    abstract: "This study compares two microsimulation models projecting the aging of men who have sex with men living with HIV from 2021 to 2031, providing important insights for healthcare planning and resource allocation.",
    projects: ["pearl"],
    tags: ["HIV", "MSM", "aging", "microsimulation", "modeling"],
    featured: true,
    imageUrl: "/images/placeholder-pub-2.png", // Placeholder
    attentionGrabber: "Comparing models to project the future of HIV care for MSM." // Placeholder
  },
  {
    id: "hyle-2022",
    title: "A growing number of men who have sex with men aging with HIV (2021-2031): a comparison of two microsimulation models",
    authors: "Hyle EP, Kasaie P, Schwamm E, Stewart CN, Humes E, Reddy KP, Rebeiro PF, Stanic T, Pei PP, Gerace L, Ang L, Gebo KA, Yu L, Shebl FM, Freedberg KA, Althoff KN",
    journal: "Journal of Infectious Diseases",
    year: "2022",
    doi: "10.1093/infdis/jiac473",
    url: "https://pubmed.ncbi.nlm.nih.gov/36478076/",
    abstract: "This study validates findings across two independent microsimulation models, projecting an aging population of men who have sex with men living with HIV through 2031.",
    projects: ["pearl"],
    tags: ["HIV", "MSM", "aging", "microsimulation", "validation"],
    featured: false
  },
  {
    id: "althoff-2022-med",
    title: "The projected prevalence of comorbidities and multimorbidity in people with HIV in the United States through the year 2030",
    authors: "Althoff KN, Stewart CN, Humes E, Gerace L, Boyd CM, Gebo K, Justice AC, Hyle E, Coburn S, Lang R, Silverberg MJ, Horberg M, Lima VD, Gill MJ, Karris M, Rebeiro PF, Thorne J, Rich AJ, Crane H, Kitahata M, Rubtsova A, Wong C, Leng S, Marconi VC, D'Souza G, Kim HN, Napravnik S, McGinnis K, Kirk GD, Sterling TR, Moore RD, Kasaie P",
    journal: "medRxiv",
    year: "2022",
    doi: "10.11010/2022.11.04.22281891",
    url: "https://doi.org/10.11010/2022.11.04.22281891",
    abstract: "This preprint describes projections of comorbidities and multimorbidity prevalence in people with HIV in the US through 2030, highlighting the increasing healthcare complexity of this population.",
    projects: ["pearl"],
    tags: ["HIV", "comorbidities", "multimorbidity", "aging", "modeling", "preprint"],
    featured: false
  },
  {
    id: "althoff-2021",
    title: "The shifting age distribution of people with HIV using antiretroviral therapy in the United States, 2020 to 2030",
    authors: "Althoff KN, Stewart CN, Humes E, Zhang J, Gerace L, Boyd CM, Wong C, Justice AC, Gebo K, Thorne JE, Rubtsova AA, Horberg MA, Silverberg MJ Leng SX, Rebeiro PF, Moore RD, Buchacz K, Kasaie P",
    journal: "AIDS",
    year: "2021",
    doi: "10.1097/QAD.0000000000003128",
    url: "https://pubmed.ncbi.nlm.nih.gov/34750289/",
    abstract: "This study projects significant shifts in the age distribution of people with HIV using antiretroviral therapy in the United States from 2020 to 2030, with important implications for healthcare planning.",
    projects: ["pearl"],
    tags: ["HIV", "aging", "ART", "epidemiology", "modeling"],
    featured: true,
    imageUrl: "/images/placeholder-pub-3.png", // Placeholder
    attentionGrabber: "Understanding the shifting age dynamics of HIV patients on ART." // Placeholder
  },
  {
    id: "kasaie-2021",
    title: "Projecting the age-distribution of men who have sex with men receiving HIV treatment in the United States",
    authors: "Kasaie P, Stewart C, Humes E, Gerace L, Zhang J, Silverberg MJ, Horberg, MA, Rebeiro PF, Hyle EP, Lima VD, Wong C, Gill MJ, Gebo K, Moore R, Kitahata MM, Althoff KN",
    journal: "Annals of Epidemiology",
    year: "2021",
    doi: "10.1016/j.annepidem.2021.08.021",
    url: "https://pubmed.ncbi.nlm.nih.gov/34627998/",
    abstract: "This study projects the age distribution of men who have sex with men receiving HIV treatment in the United States, providing valuable data for future healthcare planning and resource allocation.",
    projects: ["pearl"],
    tags: ["HIV", "MSM", "aging", "epidemiology", "modeling"],
    featured: false
  }
];

// Extract unique tags and years for filters
export const publicationTags: string[] = [
  "HIV",
  "comorbidities",
  "multimorbidity",
  "aging",
  "modeling",
  "MSM",
  "microsimulation",
  "validation",
  "preprint",
  "ART",
  "epidemiology"
];

export const publicationYears: string[] = [
  "2024",
  "2023",
  "2022",
  "2021"
];

// Project mappings
export const projectsMap = {
  jheem: { name: "JHEEM", color: "bg-hopkins-blue" },
  shield: { name: "SHIELD", color: "bg-hopkins-gold" },
  pearl: { name: "PEARL", color: "bg-hopkins-spirit-blue" },
  tbmte: { name: "TBMTE", color: "bg-emerald-600" }
};
