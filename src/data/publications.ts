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
  additionalImages?: string[]; // Optional array of additional figure URLs (archived for future use)
  attentionGrabber?: string; // Optional short text for the publication card
  featuredStats?: { // Optional stats for stats-focused cards
    citations?: string;
    countries?: string;
    impact?: string;
  };
}

// Publications array - Updated by CLI script
export const publications: Publication[] = [

  // 2025 Policy Research Trilogy - All JHEEM model studies examining HIV program disruptions
  {
    id: "forster-2025",
    title: "Potential Impact of Ending the Ryan White HIV/AIDS Program on HIV Incidence in the United States: A Modeling Study",
    authors: "Forster RJ, Kasaie P, Schnure MC, Dowdy DW, Shah M, Fojo AT",
    journal: "Annals of Internal Medicine",
    year: "2025",
    doi: "10.7326/ANNALS-25-01737",
    url: "https://doi.org/10.7326/ANNALS-25-01737",
    abstract: "This modeling study examines the potential impact of ending the Ryan White HIV/AIDS Program on HIV incidence across 31 high-burden U.S. cities, demonstrating critical public health consequences and wide geographic variation in program dependency.",
    keyFindings: "Ending the Ryan White HIV/AIDS Program could result in 75,436 additional HIV infections (95% CrI, 19,251 to 134,175) across 31 high-burden U.S. cities from 2025 to 2030—a 49% increase. Even temporary interruptions lasting 18-42 months would cause 19-38% more infections. The impact varies dramatically by city, from 9% increase in Riverside, CA to 110% in Baltimore, MD, highlighting the critical public health value of Ryan White services.",
    projects: ["jheem"],
    tags: ["HIV", "Ryan White", "policy", "modeling", "health disparities", "public health"],
    featured: true,
    imageUrl: "/images/publications/forster-2025-fig2.png",
    imageCaption: "Figure 2: Projected HIV incidence if Ryan White programs end or are interrupted"
  },

  {
    id: "zalesak-2025",
    title: "Impact of Proposed Cuts to the Ryan White HIV/AIDS Program on HIV Incidence: A State-Level Analysis",
    authors: "Zalesak A, Kasaie P, Schnure MC, Dowdy DW, Shah M, Fojo AT",
    journal: "medRxiv (preprint)",
    year: "2025",
    doi: "10.1101/2025.10.14.25337745",
    url: "https://doi.org/10.1101/2025.10.14.25337745",
    abstract: "This preprint examines the potential impact of proposed cuts to Ryan White Parts C, D, Minority AIDS Initiative, and Ending the HIV Epidemic funding on HIV incidence across 30 U.S. states and Washington, DC.",
    keyFindings: "Proposed cuts to Ryan White Parts C/D, Minority AIDS Initiative, and Ending the HIV Epidemic programs could result in 23,883 additional HIV infections (17.6% increase) across 30 states and DC from 2025 to 2030. The impact would be largest in states with high Ryan White dependency, with rural and underserved communities experiencing disproportionate effects.",
    projects: ["jheem"],
    tags: ["HIV", "Ryan White", "policy", "modeling", "health disparities", "preprint"],
    featured: false
  },

  {
    id: "balasubramanian-2025",
    title: "Potential Effect of Ending CDC Funding for HIV Testing on HIV Incidence in the United States: A Modeling Study",
    authors: "Balasubramanian R, Kasaie P, Schnure MC, Dowdy DW, Shah M, Fojo AT",
    journal: "medRxiv (preprint)",
    year: "2025",
    doi: "10.1101/2025.09.19.25336182",
    url: "https://doi.org/10.1101/2025.09.19.25336182",
    abstract: "This preprint models the potential impact of ending CDC funding for HIV testing across 18 U.S. states, examining how reduced testing capacity could affect HIV incidence and diagnosis rates.",
    keyFindings: "Ending CDC funding for HIV testing could result in 12,719 additional HIV infections (9.6% increase) across 18 states from 2025 to 2030. Testing reductions would delay HIV diagnoses by an average of 0.5-1.5 years, increasing onward transmission and worsening health outcomes, with disproportionate impacts in rural and underserved communities.",
    projects: ["jheem"],
    tags: ["HIV", "testing", "CDC", "policy", "modeling", "health disparities", "preprint"],
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
    keyFindings: "By 2030, 70% of people with HIV on antiretroviral therapy in the US will have multimorbidity (≥2 comorbidities), up from 63% in 2020. Mental health conditions (depression/anxiety) will affect 64%, while chronic kidney disease, diabetes, and dyslipidemia will see the largest increases, with significant variation across demographic subgroups.",
    projects: [],
    tags: ["HIV", "comorbidities", "multimorbidity", "aging", "modeling"],
    featured: true,
    imageUrl: "/images/publications/althoff-2024-fig2.png",
    imageCaption: "Figure 2: Forecasted number of PWH using ART in the US and forecasted prevalence of mental and physical comorbidities and multimorbidity",
    additionalImages: [
      "/images/publications/althoff-2024-fig1.png"
    ],
    attentionGrabber: "Aging HIV Population Study"
  },

  {
    id: "schnuremc-2024",
    title: "Forecasting the effect of HIV-targeted interventions on the age distribution of people with HIV in Kenya",
    authors: "Schnure MC, Kasaie P, Dowdy DW, Genberg BL, Kendall EA, Fojo AT",
    journal: "AIDS",
    year: "2024",
    doi: "10.1097/QAD.0000000000003895",
    url: "https://doi.org/10.1097/QAD.0000000000003895",
    abstract: "This modeling study forecasts changes in the age distribution of people with HIV in Kenya from 2025 to 2040 under status quo and intervention scenarios, demonstrating an aging HIV population and the need for integrated noncommunicable disease care.",
    keyFindings: "PWH in Kenya are forecasted to age over the next 15 years, with the median age increasing from 39 in 2025 to 43 in 2040 without intervention (46 with full HIV care scale-up). The population over age 50 will grow from 376,000 (26%) to 479,000 (34%), driven by declining new infections among younger ages and longer survival on ART. This demographic shift underscores Kenya's urgent need to integrate HIV care with screening and treatment for age-related noncommunicable diseases.",
    projects: ["jheem"],
    tags: ["HIV", "Kenya", "aging", "modeling", "noncommunicable diseases", "Africa"],
    featured: false,
    imageUrl: "/images/publications/schnuremc-2024-fig3.jpeg",
    imageCaption: "Figure 3: Age structure of people with HIV in Kenya in 2025, 2040 (status quo), and 2040 (full intervention)"
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
    projects: [],
    tags: ["HIV", "MSM", "aging", "microsimulation", "modeling"],
    featured: true,
    imageUrl: "/images/publications/hyle-2023-fig2.png",
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
    projects: [],
    tags: ["HIV", "mortality", "racial disparities", "Hispanic ethnicity", "PWID", "computer simulation", "aging"],
    featured: false
  },







  {
    id: "nosykb-2023",
    title: "The Testing Imperative: Why the US Ending the Human Immunodeficiency Virus (HIV) Epidemic Program Needs to Renew Efforts to Expand HIV Testing in Clinical and Community-Based Settings",
    authors: "Nosyk B, Fojo AT, Kasaie P, Enns B, Trigg L, Piske M, Hutchinson AB, DiNenno EA, Zang X, Del Rio C",
    journal: "Clinical Infectious Diseases",
    year: "2023",
    doi: "10.1093/cid/ciad103",
    url: "https://doi.org/10.1093/cid/ciad103",
    abstract: "This viewpoint article argues that large-scale increases in HIV testing across settings with high burden of HIV may produce the largest incidence reductions to support the US Ending the HIV Epidemic initiative's goal of reducing new HIV infections 90% by 2030, despite recent declines in testing volumes and flat prevention funding.",
    keyFindings: "Data from several modeling studies demonstrate that large-scale increases in HIV testing may produce the largest incidence reductions to support the EHE initiative. Despite CDC recommendations, fewer than half of US adults report ever receiving an HIV test, and CDC-funded tests dropped 56% from 2015 to 2020. Modeling suggests biannual testing for MSM/PWID and annual testing for heterosexuals could yield a 55% decline in HIV incidence, with testing expansion being cost-saving in most settings.",
    projects: ["jheem"],
    tags: ["HIV", "testing", "EHE", "policy", "prevention", "public health"],
    featured: false,
    imageUrl: "/images/publications/nosykb-2023-fig1.jpeg",
    imageCaption: "Figure 1: Total testing volumes and test positivity of CDC-funded HIV tests (2013-2020)"
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
    projects: [],
    tags: ["HIV", "MSM", "aging", "microsimulation", "validation"],
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
    abstract: "We used the Johns Hopkins Epidemiologic and Economic Model to project HIV infections from 2020 to 2025 in 32 US metropolitan statistical areas, examining how COVID-19 pandemic disruptions to sexual transmission, HIV testing, viral suppression, and PrEP use might affect HIV incidence.",
    keyFindings: "The effects of COVID-19 on HIV transmission remain uncertain and differ between cities. Under optimistic scenarios where sexual transmission decreased and healthcare access was maintained, HIV incidence could fall 8% (95% CrI: 14% lower to no change), while pessimistic scenarios with maintained transmission but disrupted care could increase incidence 11% (1-21% higher). Critically, reported HIV diagnoses are likely to correlate poorly with underlying incidence in 2020-2021, with diagnoses dropping then rebounding regardless of actual transmission trends.",
    projects: ["jheem"],
    tags: ["HIV", "COVID-19", "pandemic", "transmission", "modeling", "metropolitan areas", "health disruptions"],
    featured: false,
    imageUrl: "/images/publications/fojo-2022-covid-hiv-fig2.jpeg",
    imageCaption: "Figure 2: Projected incidence and reported diagnoses, according to potential effects of COVID-19 on sexual transmission and viral suppression"
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
    projects: [],
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
    projects: [],
    tags: ["HIV", "aging", "ART", "epidemiology", "modeling"],
    featured: false,
    imageUrl: "/images/publications/althoff-2021-fig3a.png",
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
    projects: [],
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
    imageUrl: "/images/publications/fojo-2021-end-hiv-fig4.png",
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
    journal: "PLoS ONE",
    year: "2018",
    doi: "10.1371/journal.pone.0206755",
    url: "https://doi.org/10.1371/journal.pone.0206755",
    abstract: "This cost-effectiveness study evaluates Spain's 2016 policy shift to recommend ART initiation at any CD4 count, using the JHEEM model to project epidemiologic and economic impacts over 20 years compared to delayed ART initiation.",
    keyFindings: "Early ART initiation irrespective of CD4 count could avert 20,100 new HIV infections (28% reduction) and 3,800 deaths over 20 years in Spain, at an incremental cost of €1.05 billion and cost-effectiveness ratio of €29,700 per QALY gained. When combined with improved HIV screening among high-risk groups, the intervention could prevent 58% of new infections, demonstrating the critical synergy between treatment as prevention and enhanced diagnosis.",
    projects: ["jheem"],
    tags: ["HIV", "ART", "guidelines", "Spain", "economic impact", "CD4", "cost-effectiveness", "modeling"],
    featured: false,
    imageUrl: "/images/publications/kasaie-2018-fig1.jpg",
    imageCaption: "Figure 1: Projected new HIV infections, cumulative infections averted, HIV deaths, and cumulative deaths averted in Spain from 2017 to 2037 under early versus delayed ART"
  },




];

// Extract unique tags and years for filters
export const publicationTags: string[] = [
  "ART",
  "Africa",
  "Bangladesh",
  "CD4",
  "CDC",
  "COVID-19",
  "EHE",
  "HIV",
  "Hispanic ethnicity",
  "India",
  "Kenya",
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
  "health disruptions",
  "household contacts",
  "methodology",
  "metropolitan areas",
  "microsimulation",
  "modeling",
  "mortality",
  "multimorbidity",
  "noncommunicable diseases",
  "pandemic",
  "policy",
  "preprint",
  "prevention",
  "preventive therapy",
  "preventive treatment",
  "priority setting",
  "public health",
  "racial disparities",
  "randomized trial",
  "Ryan White",
  "simulation",
  "structural racism",
  "subclinical TB",
  "testing",
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
