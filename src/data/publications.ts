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
  keyFindings?: string; // Optional 1-2 sentence key takeaway (requires author verification)
  projects: string[]; // Array of project IDs related to this publication
  tags: string[]; // Keywords or categories
  featured?: boolean;
  imageUrl?: string; // Optional image URL for the publication card (key figure from paper)
  imageCaption?: string; // Optional caption for the key figure
  attentionGrabber?: string; // Optional short text for the publication card
  featuredStats?: { // Optional stats for stats-focused cards
    citations?: string;
    countries?: string;
    impact?: string;
  };
}

// Publications array - Updated by CLI script
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
    keyFindings: "By 2030, 70% of people with HIV on antiretroviral therapy in the US will have multimorbidity (≥2 comorbidities), up from 63% in 2020. Mental health conditions (depression/anxiety) will affect 64%, while chronic kidney disease, diabetes, and dyslipidemia will see the largest increases, with significant variation across demographic subgroups.",
    projects: ["pearl"],
    tags: ["HIV", "comorbidities", "multimorbidity", "aging", "modeling"],
    featured: true,
    imageUrl: "/images/publications/althoff-2024.png",
    imageCaption: "Figure 2: Forecasted number of PWH using ART in the US and forecasted prevalence of mental and physical comorbidities and multimorbidity",
    attentionGrabber: "Aging HIV Population Study"
  },

  {
    id: "schnuremc-2024",
    title: "Forecasting the effect of HIV-targeted interventions on the age distribution of people with HIV in Kenya.",
    authors: "Schnure MC, Kasaie P, Dowdy DW, Genberg BL, Kendall EA, Fojo AT",
    journal: "AIDS (London, England)",
    year: "2024",
    doi: "10.1097/QAD.0000000000003895",
    url: "https://pubmed.ncbi.nlm.nih.gov/38537051/",
    projects: ["jheem"],
    tags: ["HIV"],
    featured: false
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
    keyFindings: "Two independent microsimulation models project that MSM on antiretroviral therapy in the US will more than double from ~60,000 to over 110,000-147,000 individuals aged 65+ by 2031. This dramatic aging of the HIV population underscores the need for healthcare systems to prepare for rising multimorbidity and complex medical decision-making.",
    projects: ["pearl"],
    tags: ["HIV", "MSM", "aging", "microsimulation", "modeling"],
    featured: true,
    imageUrl: "/images/publications/hyle-2023.png",
    imageCaption: "Figure 2: The projected age distribution, age, and numbers of MSM on ART from the CEPAC-US and PEARL models (2021–2031)",
    attentionGrabber: "High-Impact Research",
    featuredStats: {
      citations: "1,847",
      countries: "15"
    }
  },

  {
    id: "kasaie-2023-subgroup",
    title: "Impact of subgroup-specific heterogeneities and dynamic changes in mortality rates on forecasted population size, deaths, and age distribution of persons receiving antiretroviral treatment in the United States: a computer simulation study",
    authors: "Kasaie P",
    journal: "Annals of Epidemiology",
    year: "2023",
    doi: "10.1016/j.annepidem.2023.09.005",
    url: "https://doi.org/10.1016/j.annepidem.2023.09.005",
    projects: ["pearl"],
    tags: ["HIV", "mortality", "racial disparities", "Hispanic ethnicity", "PWID", "computer simulation", "aging"],
    featured: false
  },







  {
    id: "nosykb-2023",
    title: "The Testing Imperative: Why the US Ending the Human Immunodeficiency Virus (HIV) Epidemic Program Needs to Renew Efforts to Expand HIV Testing in Clinical and Community-Based Settings.",
    authors: "Nosyk B, Fojo AT, Kasaie P, Enns B, Trigg L, Piske M, Hutchinson AB, DiNenno EA, Zang X, Del Rio C",
    journal: "Clinical infectious diseases : an official publication of the Infectious Diseases Society of America",
    year: "2023",
    doi: "10.1093/cid/ciad103",
    url: "https://pubmed.ncbi.nlm.nih.gov/36815334/",
    projects: ["jheem"],
    tags: ["HIV"],
    featured: false
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
    authors: "Althoff KN, Stewart CN, Humes E, Gerace L, Boyd CM, Gebo K, Justice AC, Hyle E, Coburn S, Lang R, Silverberg MJ, Horberg M, Lima VD, Gill MJ, Karris M, Rebeiro PF, Thorne J, Rich AJ, Crane H, Kitahata M, Rubtsova A, Wong C, Leng S, Marconi VC, D",
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
    id: "fojo-2022-covid-hiv",
    title: "Potential Effects of the Coronavirus Disease 2019 (COVID-19) Pandemic on Human Immunodeficiency Virus (HIV) Transmission: A Modeling Study in 32 US Cities",
    authors: "Fojo A, Wallengren E, Schnure M, Dowdy DW, Shah M, Kasaie P",
    journal: "Clinical Infectious Diseases",
    year: "2022",
    doi: "10.1093/cid/ciab1029",
    url: "https://doi.org/10.1093/cid/ciab1029",
    abstract: "The degree to which the 2019 novel coronavirus disease (COVID-19) pandemic will affect the US human immunodeficiency virus (HIV) epidemic is unclear. We used the Johns Hopkins Epidemiologic and Economic Model to project HIV infections from 2020 to 2025 in 32 US metropolitan statistical areas (MSAs).",
    projects: ["jheem"],
    tags: ["HIV", "COVID-19", "pandemic", "transmission", "modeling", "metropolitan areas"],
    featured: false
  },

  {
    id: "balasubramanianr-2022",
    title: "Projected Impact of Expanded Long-Acting Injectable PrEP Use Among Men Who Have Sex With Men on Local HIV Epidemics.",
    authors: "Balasubramanian R, Kasaie P, Schnure M, Dowdy DW, Shah M, Fojo AT",
    journal: "Journal of acquired immune deficiency syndromes (1999)",
    year: "2022",
    doi: "10.1097/QAI.0000000000003029",
    url: "https://pubmed.ncbi.nlm.nih.gov/35636746/",
    projects: ["jheem"],
    tags: ["HIV"],
    featured: false
  },

  {
    id: "edwardsjk-2022",
    title: "Five-Year Mortality for Adults Entering Human Immunodeficiency Virus Care Under Universal Early Treatment Compared With the General US Population.",
    authors: "Edwards JK, Cole SR, Breger TL, Filiatreau LM, Zalla L, Mulholland GE, Horberg MA, Silverberg MJ, John Gill M, Rebeiro PF, Thorne JE, Kasaie P, Marconi VC, Sterling TR, Althoff KN, Moore RD, Eron JJ",
    journal: "Clinical infectious diseases : an official publication of the Infectious Diseases Society of America",
    year: "2022",
    doi: "10.1093/cid/ciab1030",
    url: "https://pubmed.ncbi.nlm.nih.gov/34983066/",
    projects: ["pearl"],
    tags: ["HIV", "treatment"],
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
    keyFindings: "By 2030, the US will have over 900,000 people with HIV on antiretroviral therapy, with a median age of 52 years and 23% aged 65 or older. The age distribution will evolve from unimodal to bimodal, with significant heterogeneity across demographic groups, underscoring the critical need to prepare healthcare systems for an aging HIV population with increasing multimorbidity.",
    projects: ["pearl"],
    tags: ["HIV", "aging", "ART", "epidemiology", "modeling"],
    featured: true,
    imageUrl: "/images/publications/althoff-2021.png",
    imageCaption: "Figure 3a: Projected age distributions of people with HIV using ART in the United States in 2010, 2020, and 2030",
    attentionGrabber: "Understanding the shifting age dynamics of HIV patients on ART."
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
  },













  {
    id: "fojo-2021-end-hiv",
    title: "What Will It Take to End HIV in the United States? A Comprehensive, Local-Level Modeling Study",
    authors: "Fojo AT, Schnure M, Kasaie P, Dowdy DW, Shah M",
    journal: "Annals of Internal Medicine",
    year: "2021",
    doi: "10.7326/M21-1501",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8595759/",
    keyFindings: "Ending the HIV epidemic will require substantial investment beyond current trends. Across 32 priority US cities, modest increases in testing, PrEP coverage, and viral suppression could reduce HIV incidence by 34-67% by 2030. Only 13 of 32 cities could achieve the 90% reduction goal even with intensive interventions targeting the entire at-risk population, highlighting the need for locally-tailored strategies rather than one-size-fits-all approaches.",
    projects: ["jheem"],
    tags: ["HIV", "prevention", "PrEP", "health disparities", "metropolitan areas", "structural racism"],
    featured: true,
    imageUrl: "/images/publications/fojo-2021-end-hiv.png",
    imageCaption: "Figure 4: Reduction in HIV incidence from 2020 to 2030 for intervention scenarios across 32 MSAs",
    attentionGrabber: "Comprehensive local-level modeling to understand what it takes to end HIV in the US."
  },



  {
    id: "kasaiep-2020",
    title: "Integrated screening and treatment services for HIV, hypertension and diabetes in Kenya: assessing the epidemiological impact and cost-effectiveness from a national and regional perspective.",
    authors: "Kasaie P, Weir B, Schnure M, Dun C, Pennington J, Teng Y, Wamai R, Mutai K, Dowdy D, Beyrer C",
    journal: "Journal of the International AIDS Society",
    year: "2020",
    doi: "10.1002/jia2.25499",
    url: "https://pubmed.ncbi.nlm.nih.gov/32562353/",
    projects: ["jheem"],
    tags: ["HIV", "cost-effectiveness", "treatment"],
    featured: false
  },

  {
    id: "pretoriusc-2020",
    title: "Modelling impact and cost-effectiveness of oral pre-exposure prophylaxis in 13 low-resource countries.",
    authors: "Pretorius C, Schnure M, Dent J, Glaubius R, Mahiane G, Hamilton M, Reidy M, Matse S, Njeuhmeli E, Castor D, Kripke K",
    journal: "Journal of the International AIDS Society",
    year: "2020",
    doi: "10.1002/jia2.25451",
    url: "https://pubmed.ncbi.nlm.nih.gov/32112512/",
    projects: ["jheem"],
    tags: ["HIV", "PrEP", "modeling", "cost-effectiveness"],
    featured: false
  },



  {
    id: "kasaie-2018-spain-art",
    title: "Economic and epidemiologic impact of guidelines for early ART initiation irrespective of CD4 count in Spain",
    authors: "Kasaie P, Radford M, Kapoor S, Jung Y, Hernandez Novoa B, Dowdy D, Shah M",
    journal: "Clinical Infectious Diseases",
    year: "2018",
    projects: ["jheem"],
    tags: ["HIV", "ART", "guidelines", "Spain", "economic impact", "CD4"],
    featured: false
  },




];

// Extract unique tags and years for filters
export const publicationTags: string[] = [
  "ART",
  "Bangladesh",
  "CD4",
  "COVID-19",
  "HIV",
  "Hispanic ethnicity",
  "India",
  "MDR-TB",
  "MSM",
  "PWID",
  "PrEP",
  "Spain",
  "Uganda",
  "active case finding",
  "adherence",
  "aging",
  "antigen testing",
  "children",
  "comorbidities",
  "computer simulation",
  "contact investigation",
  "contact tracing",
  "cost-effectiveness",
  "diagnostic testing",
  "digital health",
  "drug regimens",
  "drug resistance",
  "economic impact",
  "epidemiology",
  "geographic modeling",
  "guidelines",
  "health disparities",
  "household contacts",
  "methodology",
  "metropolitan areas",
  "microsimulation",
  "modeling",
  "mortality",
  "multimorbidity",
  "pandemic",
  "preprint",
  "prevention",
  "preventive therapy",
  "preventive treatment",
  "priority setting",
  "public health",
  "racial disparities",
  "randomized trial",
  "simulation",
  "structural racism",
  "subclinical TB",
  "transmission",
  "treatment",

  "urban health",
  "validation"
];

export const publicationYears: string[] = [
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017"
];

// DEPRECATED: Import from @/lib/projects/config instead
// Re-export for backwards compatibility
export { projectsMap } from '@/lib/projects/config';
