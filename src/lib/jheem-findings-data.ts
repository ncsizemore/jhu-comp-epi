import { z } from 'zod';
import type {
  FindingsAnalysis,
  FindingsCityRow,
  FindingsStateRow,
} from '@/components/sections/home/findings-map-types';

export const HOMEPAGE_FINDINGS_REVALIDATE_SECONDS = 60 * 60 * 24;

const JHEEM_DATA = {
  ryanWhiteCities:
    'https://d320iym4dtm9lj.cloudfront.net/ryan-white/city-summaries.json',
  ryanWhiteStates:
    'https://d320iym4dtm9lj.cloudfront.net/ryan-white-state/state-summaries.json',
  cdcTestingStates:
    'https://d320iym4dtm9lj.cloudfront.net/cdc-testing/state-summaries.json',
} as const;

const STATE_FIPS: Record<string, string> = {
  AL: '01',
  AK: '02',
  AZ: '04',
  AR: '05',
  CA: '06',
  CO: '08',
  CT: '09',
  DE: '10',
  DC: '11',
  FL: '12',
  GA: '13',
  HI: '15',
  ID: '16',
  IL: '17',
  IN: '18',
  IA: '19',
  KS: '20',
  KY: '21',
  LA: '22',
  ME: '23',
  MD: '24',
  MA: '25',
  MI: '26',
  MN: '27',
  MS: '28',
  MO: '29',
  MT: '30',
  NE: '31',
  NV: '32',
  NH: '33',
  NJ: '34',
  NM: '35',
  NY: '36',
  NC: '37',
  ND: '38',
  OH: '39',
  OK: '40',
  OR: '41',
  PA: '42',
  RI: '44',
  SC: '45',
  SD: '46',
  TN: '47',
  TX: '48',
  UT: '49',
  VT: '50',
  VA: '51',
  WA: '53',
  WV: '54',
  WI: '55',
  WY: '56',
};

const coordinateSchema = z.tuple([z.number(), z.number()]);

const impactSchema = z.object({
  cessationIncreasePercent: z.number(),
  cessationIncreaseAbsolute: z.number(),
  targetYear: z.number(),
  startYear: z.number().optional(),
});

const locationSummarySchema = z
  .object({
    name: z.string(),
    shortName: z.string(),
    coordinates: coordinateSchema,
    impact: impactSchema,
  })
  .passthrough();

const citySummariesSchema = z
  .object({
    generated: z.string(),
    cities: z.record(z.string(), locationSummarySchema),
  })
  .passthrough();

const stateSummariesSchema = z
  .object({
    generated: z.string(),
    states: z.record(z.string(), locationSummarySchema),
  })
  .passthrough();

type PortalLocationSummary = z.infer<typeof locationSummarySchema>;
type CitySummaries = z.infer<typeof citySummariesSchema>;
type StateSummaries = z.infer<typeof stateSummariesSchema>;

export type HomepageFindingsSummaries = {
  ryanWhiteCities: CitySummaries;
  ryanWhiteStates: StateSummaries;
  cdcTestingStates: StateSummaries;
};

export type HomepageFindingsData = {
  analyses: FindingsAnalysis[];
  unavailableAnalyses: string[];
};

async function fetchSummary<T>(url: string, schema: z.ZodType<T>): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: HOMEPAGE_FINDINGS_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Failed to load JHEEM summary data: ${response.status} ${url}`);
  }

  return schema.parse(await response.json());
}

function formatCount(value: number): string {
  return Math.round(value).toLocaleString('en-US');
}

function periodLabel(rows: PortalLocationSummary[]): string {
  const row = rows.find(summary => summary.impact.startYear && summary.impact.targetYear);
  if (!row?.impact.startYear) return '2025 to 2030';
  return `${row.impact.startYear} to ${row.impact.targetYear}`;
}

function targetYear(rows: PortalLocationSummary[]): number {
  return rows[0]?.impact.targetYear ?? 2030;
}

function toCityRows(cities: Record<string, PortalLocationSummary>): FindingsCityRow[] {
  return Object.entries(cities).map(([code, city]) => ({
    id: code,
    name: city.name,
    short: city.shortName,
    coords: city.coordinates,
    value: Math.round(city.impact.cessationIncreaseAbsolute),
    pct: Math.round(city.impact.cessationIncreasePercent),
  }));
}

function toStateRows(states: Record<string, PortalLocationSummary>): FindingsStateRow[] {
  return Object.entries(states).map(([code, state]) => {
    const fips = STATE_FIPS[code];
    if (!fips) {
      throw new Error(`Missing FIPS code for JHEEM state summary: ${code}`);
    }

    return {
      id: code.toLowerCase(),
      fips,
      name: state.name,
      abbr: state.shortName || code,
      value: Math.round(state.impact.cessationIncreasePercent),
    };
  });
}

function totalAbsolute(rows: PortalLocationSummary[]): number {
  return rows.reduce((sum, row) => sum + row.impact.cessationIncreaseAbsolute, 0);
}

function maxPercent(rows: FindingsStateRow[]): number {
  return rows.reduce((max, row) => Math.max(max, row.value), 0);
}

function buildRyanWhiteCityAnalysis(
  citySummaries: CitySummaries,
): FindingsAnalysis {
  const rawRows = Object.values(citySummaries.cities);
  const cityData = toCityRows(citySummaries.cities);
  const period = periodLabel(rawRows);
  const year = targetYear(rawRows);

  return {
    id: 'rw-cities',
    shortTitle: 'Ryan White - cities',
    eyebrow: 'High-burden metropolitan areas',
    headline: 'Ending Ryan White funding would concentrate excess infections in major metros.',
    question:
      `If federal Ryan White HIV/AIDS Program funding were to end, how many additional HIV infections would follow in the country’s ${cityData.length} highest-burden metropolitan areas?`,
    geography: 'city',
    metric: {
      label: `Additional HIV infections by ${year}`,
      unit: 'count',
      description:
        'Projected new infections under permanent program cessation, relative to continued funding.',
    },
    cityData,
    summary: {
      value: formatCount(totalAbsolute(rawRows)),
      label: 'additional infections',
      detail: `Projected across ${cityData.length} high-burden metros from ${period}.`,
    },
    citation: 'Forster et al.',
    journal: 'Annals of Internal Medicine',
    year: 2025,
    href: '/publications',
    portalUrl: 'https://jheem.org/ryan-white',
  };
}

function buildRyanWhiteStateAnalysis(
  stateSummaries: StateSummaries,
): FindingsAnalysis {
  const rawRows = Object.values(stateSummaries.states);
  const stateData = toStateRows(stateSummaries.states);
  const period = periodLabel(rawRows);
  const year = targetYear(rawRows);

  return {
    id: 'rw-states',
    shortTitle: 'Ryan White - states',
    eyebrow: 'State-level burden',
    headline: 'The same funding shock would fall unevenly across high-burden states.',
    question:
      `Aggregated to the state level, how unevenly would the impact of Ryan White cessation fall across the ${stateData.length} states with the highest HIV burden?`,
    geography: 'state',
    metric: {
      label: `Percent increase in HIV incidence by ${year}`,
      unit: 'percent',
      description:
        'Projected percent increase in new infections under cessation, relative to continued funding.',
    },
    stateData,
    summary: {
      value: `+${maxPercent(stateData)}%`,
      label: 'largest modeled increase',
      detail: `State-level percent increase under the cessation scenario, ${period}.`,
    },
    citation: 'Zalesak et al.',
    journal: 'American Journal of Public Health',
    year: 2026,
    href: '/publications',
    portalUrl: 'https://jheem.org/ryan-white-state-level/explorer/ajph',
  };
}

function buildCdcTestingAnalysis(
  stateSummaries: StateSummaries,
): FindingsAnalysis {
  const rawRows = Object.values(stateSummaries.states);
  const stateData = toStateRows(stateSummaries.states);
  const period = periodLabel(rawRows);
  const year = targetYear(rawRows);

  return {
    id: 'cdc-testing',
    shortTitle: 'CDC testing',
    eyebrow: `${stateData.length} states`,
    headline: 'Testing cuts would create the largest proportional increases in rural-burden states.',
    question:
      `How would ending CDC-funded HIV testing programs reshape the HIV epidemic across the ${stateData.length} states that receive the bulk of these funds?`,
    geography: 'state',
    metric: {
      label: `Percent increase in HIV incidence by ${year}`,
      unit: 'percent',
      description:
        'Projected percent increase under testing program cessation, relative to continued funding.',
    },
    stateData,
    summary: {
      value: `+${maxPercent(stateData)}%`,
      label: 'largest modeled increase',
      detail: `Projected state-level incidence increase under testing cessation, ${period}.`,
    },
    citation: 'Balasubramanian et al.',
    journal: 'Clinical Infectious Diseases',
    year: 2026,
    href: '/publications',
    portalUrl: 'https://jheem.org/cdc-testing',
  };
}

export function buildHomepageFindingsAnalyses({
  ryanWhiteCities,
  ryanWhiteStates,
  cdcTestingStates,
}: HomepageFindingsSummaries): FindingsAnalysis[] {
  return [
    buildRyanWhiteCityAnalysis(ryanWhiteCities),
    buildRyanWhiteStateAnalysis(ryanWhiteStates),
    buildCdcTestingAnalysis(cdcTestingStates),
  ];
}

const FINDINGS_LOADERS = [
  {
    label: 'Ryan White cities',
    load: async () =>
      buildRyanWhiteCityAnalysis(
        await fetchSummary(JHEEM_DATA.ryanWhiteCities, citySummariesSchema),
      ),
  },
  {
    label: 'Ryan White states',
    load: async () =>
      buildRyanWhiteStateAnalysis(
        await fetchSummary(JHEEM_DATA.ryanWhiteStates, stateSummariesSchema),
      ),
  },
  {
    label: 'CDC testing',
    load: async () =>
      buildCdcTestingAnalysis(
        await fetchSummary(JHEEM_DATA.cdcTestingStates, stateSummariesSchema),
      ),
  },
] as const;

export async function getHomepageFindingsData(): Promise<HomepageFindingsData> {
  const settled = await Promise.allSettled(
    FINDINGS_LOADERS.map(loader => loader.load()),
  );

  const analyses: FindingsAnalysis[] = [];
  const unavailableAnalyses: string[] = [];

  settled.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      analyses.push(result.value);
      return;
    }

    const label = FINDINGS_LOADERS[index].label;
    unavailableAnalyses.push(label);
    console.error(`Failed to load ${label} summary data:`, result.reason);
  });

  return { analyses, unavailableAnalyses };
}
