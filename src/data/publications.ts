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
  featuredStats?: { // Optional stats for stats-focused cards
    citations?: string;
    countries?: string;
    impact?: string;
  };
}

// Publications array - Updated by CLI script
export const publications: Publication[] = [
  {
    id: "ryckmants-2025",
    title: "Modeling the impact of case finding for tuberculosis: The role of infection dynamics.",
    authors: "Ryckman TS, Shrestha S, Fojo AT, Kasaie P, Dowdy DW, Kendall EA",
    journal: "medRxiv : the preprint server for health sciences",
    year: "2025",
    doi: "10.1101/2025.04.15.25325877",
    url: "https://pubmed.ncbi.nlm.nih.gov/40321291/",
    projects: ["tbmte"],
    tags: ["tuberculosis", "modeling"],
    featured: false
  },

  {
    id: "brmmerle-2025",
    title: "Importance of confirmatory test characteristics in optimizing community-based screening for tuberculosis: An epidemiological modeling analysis.",
    authors: "Brümmer LE, Ryckman TS, Shrestha S, Marx FM, Worodria W, Christopher DJ, Theron G, Cattamanchi A, Denkinger CM, Dowdy DW, Kendall EA",
    journal: "medRxiv : the preprint server for health sciences",
    year: "2025",
    doi: "10.1101/2025.05.09.25327330",
    url: "https://pubmed.ncbi.nlm.nih.gov/40385422/",
    projects: ["tbmte"],
    tags: ["tuberculosis", "modeling"],
    featured: false
  },

  {
    id: "shresthas-2025",
    title: "Model-Based Analysis of Impact, Costs, and Cost-effectiveness of Tuberculosis Outbreak Investigations, United States.",
    authors: "Shrestha S, Cilloni L, Asay GRB, Kammerer JS, Raz K, Shaw T, Cilnis M, Wortham J, Marks SM, Dowdy D",
    journal: "Emerging infectious diseases",
    year: "2025",
    doi: "10.3201/eid3103.240633",
    url: "https://pubmed.ncbi.nlm.nih.gov/40023804/",
    projects: ["tbmte"],
    tags: ["tuberculosis", "modeling", "cost-effectiveness"],
    featured: false
  },

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
    imageUrl: "/images/placeholder-pub-1.svg",
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
    projects: ["pearl"],
    tags: ["HIV", "MSM", "aging", "microsimulation", "modeling"],
    featured: true,
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
    id: "kasaie-2023-mdrtb-impact",
    title: "The Impact of Preventive Treatment for Multidrug- and Rifampin-Resistant Tuberculosis Exceeds Trial-Based Estimates",
    authors: "Kasaie P",
    journal: "Clinical Infectious Diseases",
    year: "2023",
    doi: "10.1093/cid/ciad557",
    url: "https://doi.org/10.1093/cid/ciad557",
    abstract: "Several clinical trials of tuberculosis preventive treatment (TPT) for household contacts of patients with multidrug- or rifampin-resistant tuberculosis (MDR/RR-TB) are nearing completion. The potential benefits of delivering TPT to MDR/RR-TB contacts extend beyond the outcomes that clinical trials can measure.",
    projects: ["tbmte"],
    tags: ["tuberculosis", "MDR-TB", "preventive treatment", "contact tracing", "India", "simulation"],
    featured: false
  },

  {
    id: "kasaie-2023-mdrtb-trials",
    title: "Trials underestimate the impact of preventive treatment for household contacts exposed to multidrug-resistant tuberculosis: a simulation study",
    authors: "Kasaie P",
    journal: "medRxiv",
    year: "2023",
    projects: ["tbmte"],
    tags: ["tuberculosis", "MDR-TB", "household contacts", "simulation", "preventive treatment"],
    featured: false
  },

  {
    id: "zallalc-2023",
    title: "Evaluating Clinic-Based Interventions to Reduce Racial Differences in Mortality Among People With Human Immunodeficiency Virus in the United States.",
    authors: "Zalla LC, Cole SR, Eron JJ, Adimora AA, Vines AI, Althoff KN, Marconi VC, Gill MJ, Horberg MA, Silverberg MJ, Rebeiro PF, Lang R, Kasaie P, Moore RD, Edwards JK",
    journal: "The Journal of infectious diseases",
    year: "2023",
    doi: "10.1093/infdis/jiad263",
    url: "https://pubmed.ncbi.nlm.nih.gov/37437108/",
    projects: ["tbmte"],
    tags: ["epidemiology"],
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
    projects: ["tbmte"],
    tags: ["treatment"],
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
    imageUrl: "/images/placeholder-pub-3.png",
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
    id: "cattamanchi-2021",
    title: "Digital adherence technology for tuberculosis treatment supervision: A stepped-wedge cluster-randomized trial in Uganda",
    authors: "Cattamanchi A, Crowder R, Kityamuwesi A, Kiwanuka N, Lamunu M, Namale C, Tinka LK, Nakate AS, Ggita J, Turimumahoro P, Babirye D, Oyuku D, Berger C, Tucker A, Patel D, Sammann A, Turyahabwe S, Dowdy D, Katamba A",
    journal: "PLoS medicine",
    year: "2021",
    doi: "10.1371/journal.pmed.1003628",
    url: "https://doi.org/10.1371/journal.pmed.1003628",
    abstract: "Adherence to and completion of tuberculosis (TB) treatment remain problematic in many high-burden countries. 99DOTS is a low-cost digital adherence technology that could increase TB treatment completion. We conducted a pragmatic stepped-wedge cluster-randomized trial including all adults treated for drug-susceptible pulmonary TB at 18 health facilities across Uganda over 8 months.",
    projects: ["tbmte"],
    tags: ["tuberculosis", "digital health", "adherence", "Uganda", "randomized trial"],
    featured: true,
    attentionGrabber: "Digital technology improving TB treatment adherence in Uganda."
  },

  {
    id: "ricks-2021",
    title: "Quantifying the potential value of antigen-detection rapid diagnostic tests for COVID-19: a modelling analysis",
    authors: "Ricks S, Kendall EA, Dowdy DW, Sacks JA, Schumacher SG, Arinaminpathy N",
    journal: "BMC medicine",
    year: "2021",
    doi: "10.1186/s12916-021-01948-z",
    url: "https://doi.org/10.1186/s12916-021-01948-z",
    abstract: "Testing plays a critical role in treatment and prevention responses to the COVID-19 pandemic. Compared to nucleic acid tests (NATs), antigen-detection rapid diagnostic tests (Ag-RDTs) can be more accessible, but typically have lower sensitivity and specificity. By quantifying these trade-offs, we aimed to inform decisions about when an Ag-RDT would offer greater public health value than reliance on NAT.",
    projects: ["tbmte"],
    tags: ["COVID-19", "diagnostic testing", "modeling", "public health", "antigen testing"],
    featured: false
  },

  {
    id: "shrestha-2021",
    title: "Quantifying geographic heterogeneity in TB incidence and the potential impact of geographically targeted interventions in South and North City Corporations of Dhaka, Bangladesh: a model-based study",
    authors: "Shrestha S, Reja M, Gomes I, Baik Y, Pennington J, Islam S, Jamil Faisel A, Cordon O, Roy T, Suarez PG, Hussain H, Dowdy DW",
    journal: "Epidemiology and infection",
    year: "2021",
    doi: "10.1017/S0950268821000911",
    url: "https://doi.org/10.1017/S0950268821000911",
    abstract: "In rapidly growing and high-burden urban centres, identifying tuberculosis (TB) transmission hotspots and understanding the potential impact of interventions can inform future control and prevention strategies. Using data on local demography, TB reports and patient reporting patterns in Dhaka South City Corporation (DSCC) and Dhaka North City Corporation (DNCC), Bangladesh, between 2010 and 2017, we developed maps of TB reporting rates across wards in DSCC and DNCC.",
    projects: ["tbmte"],
    tags: ["tuberculosis", "geographic modeling", "Bangladesh", "urban health", "transmission"],
    featured: false
  },

  {
    id: "jo-2021",
    title: "Cost-effectiveness of scaling up short course preventive therapy for tuberculosis among children across 12 countries",
    authors: "Jo Y, Gomes I, Flack J, Salazar-Austin N, Churchyard G, Chaisson RE, Dowdy DW",
    journal: "EClinicalMedicine",
    year: "2021",
    doi: "10.1016/j.eclinm.2021.100707",
    url: "https://doi.org/10.1016/j.eclinm.2021.100707",
    abstract: "While household contact investigation is widely recommended as a means to reduce the burden of tuberculosis (TB) among children, only 27% of eligible pediatric household contacts globally received preventive treatment in 2018. We assessed the cost-effectiveness of household contact investigation for TB treatment and short-course preventive therapy provision for children under 15 years old across 12 high TB burden countries.",
    projects: ["tbmte"],
    tags: ["tuberculosis", "children", "preventive therapy", "cost-effectiveness", "contact investigation"],
    featured: false
  },

  {
    id: "sohn-2021",
    title: "Determining the value of TB active case-finding: current evidence and methodological considerations",
    authors: "Sohn H, Sweeney S, Mudzengi D, Creswell J, Menzies NA, Fox GJ, MacPherson P, Dowdy DW",
    journal: "The international journal of tuberculosis and lung disease",
    year: "2021",
    doi: "10.5588/ijtld.20.0565",
    url: "https://doi.org/10.5588/ijtld.20.0565",
    abstract: "Active case-finding (ACF) is an important component of the End TB Strategy. However, ACF is resource-intensive, and the economics of ACF are not well-understood. Data on the costs of ACF are limited, with little consistency in the units and methods used to estimate and report costs.",
    projects: ["tbmte"],
    tags: ["tuberculosis", "active case finding", "cost-effectiveness", "methodology"],
    featured: false
  },

  {
    id: "kendall-2021",
    title: "Reply to Pierce: Subclinical Tuberculosis: Some Flies in the Ointment",
    authors: "Kendall EA, Shrestha S, Dowdy DW",
    journal: "American journal of respiratory and critical care medicine",
    year: "2021",
    doi: "10.1164/rccm.202012-4481LE",
    url: "https://doi.org/10.1164/rccm.202012-4481LE",
    abstract: "Reply discussing subclinical tuberculosis and methodological considerations in TB research.",
    projects: ["tbmte"],
    tags: ["tuberculosis", "subclinical TB", "methodology"],
    featured: false
  },

  {
    id: "fojo-2021-end-hiv",
    title: "What Will It Take to End HIV in the United States? A Comprehensive, Local-Level Modeling Study",
    authors: "Fojo AT, Schnure M, Kasaie P, Dowdy DW, Shah M",
    journal: "Clinical Infectious Diseases",
    year: "2021",
    projects: ["jheem"],
    tags: ["HIV", "prevention", "PrEP", "health disparities", "metropolitan areas", "structural racism"],
    featured: true,
    attentionGrabber: "Comprehensive local-level modeling to understand what it takes to end HIV in the US."
  },

  {
    id: "shresthas-2021",
    title: "Achieving a \"step change\" in the tuberculosis epidemic through comprehensive community-wide intervention: a model-based analysis.",
    authors: "Shrestha S, Kendall EA, Chang R, Joseph R, Kasaie P, Gillini L, Fojo AT, Campbell M, Arinaminpathy N, Dowdy DW",
    journal: "BMC medicine",
    year: "2021",
    doi: "10.1186/s12916-021-02110-5",
    url: "https://pubmed.ncbi.nlm.nih.gov/34645429/",
    projects: ["tbmte"],
    tags: ["tuberculosis", "modeling"],
    featured: false
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
    projects: ["tbmte"],
    tags: ["modeling", "cost-effectiveness"],
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

  {
    id: "kendall-2017",
    title: "Priority-Setting for Novel Drug Regimens to Treat Tuberculosis: An Epidemiologic Model",
    authors: "Kendall EA, Shrestha S, Cohen T, Nuermberger E, Dooley KE, Gonzalez-Angulo L, Churchyard GJ, Nahid P, Rich ML, Bansbach C, Forissier T, Lienhardt C, Dowdy DW",
    journal: "PLoS medicine",
    year: "2017",
    doi: "10.1371/journal.pmed.1002202",
    url: "https://doi.org/10.1371/journal.pmed.1002202",
    abstract: "Novel drug regimens are needed for tuberculosis (TB) treatment. New regimens aim to improve on characteristics such as duration, efficacy, and safety profile, but no single regimen is likely to be ideal in all respects. By linking these regimen characteristics to a novel regimen",
    projects: ["tbmte"],
    tags: ["tuberculosis", "drug regimens", "modeling", "treatment", "priority setting"],
    featured: true,
    attentionGrabber: "Using epidemiologic modeling to prioritize TB drug regimen characteristics."
  },

  {
    id: "kendall-2017-mdr",
    title: "MDR-TB treatment as prevention: The projected population-level impact of expanded treatment for multidrug-resistant tuberculosis",
    authors: "Kendall EA, Azman AS, Cobelens FG, Dowdy DW",
    journal: "PloS one",
    year: "2017",
    doi: "10.1371/journal.pone.0172748",
    url: "https://doi.org/10.1371/journal.pone.0172748",
    abstract: "In 2013, approximately 480,000 people developed active multidrug-resistant tuberculosis (MDR-TB), while only 97,000 started MDR-TB treatment. We sought to estimate the impact of improving access to MDR-TB diagnosis and treatment, under multiple diagnostic algorithm and treatment regimen scenarios, on ten-year projections of MDR-TB incidence and mortality.",
    projects: ["tbmte"],
    tags: ["tuberculosis", "MDR-TB", "treatment", "modeling", "drug resistance"],
    featured: false
  }
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
  "tuberculosis",
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

// Project mappings
export const projectsMap = {
  jheem: { name: "JHEEM", color: "bg-hopkins-blue" },
  shield: { name: "SHIELD", color: "bg-hopkins-gold" },
  pearl: { name: "PEARL", color: "bg-hopkins-spirit-blue" },
  tbmte: { name: "TBMTE", color: "bg-emerald-600" }
};
