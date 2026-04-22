// Data accessors for the global aging web app.
//
// Strategy:
//   - metadata and summary are tiny (~10 KB combined) -> static imports.
//   - projections, calibration, observed are large -> live under /public and
//     are fetched on demand via hooks with module-level promise caching.
//   - Pure transforms take the data as arguments (no hidden module state).

import { useEffect, useState } from 'react';
import type {
  Metadata,
  LocationMeta,
  ProjectionData,
  CalibrationData,
  ObservedData,
  SummaryData,
  Quantiles,
  ChartDataPoint,
  CalibrationChartPoint,
  TimeSeriesPoint,
  ObservedPoint,
} from './types';

import metadataJson from './metadata.json';
import summaryJson from './summary.json';

// --- Small statically imported data ---
export const metadata = metadataJson as unknown as Metadata;
export const summary = summaryJson as unknown as SummaryData;

// --- Lazy-loaded data (fetched from /public at runtime) ---
const DATA_BASE = '/data/global-aging';

let projectionsPromise: Promise<ProjectionData> | null = null;
let calibrationPromise: Promise<CalibrationData> | null = null;
let observedPromise: Promise<ObservedData> | null = null;

// Fetch-and-cache. On rejection, drop the cached promise so a subsequent
// call can retry — otherwise the first failure would lock the page until
// a full refresh.
function cachedFetch<T>(url: string, clear: () => void): Promise<T> {
  return fetch(url)
    .then(r => {
      if (!r.ok) throw new Error(`Failed to load ${url}: ${r.status}`);
      return r.json() as Promise<T>;
    })
    .catch(err => {
      clear();
      throw err;
    });
}

function loadProjections(): Promise<ProjectionData> {
  if (!projectionsPromise) {
    projectionsPromise = cachedFetch<ProjectionData>(
      `${DATA_BASE}/projections.json`,
      () => { projectionsPromise = null; },
    );
  }
  return projectionsPromise;
}

function loadCalibration(): Promise<CalibrationData> {
  if (!calibrationPromise) {
    calibrationPromise = cachedFetch<CalibrationData>(
      `${DATA_BASE}/calibration.json`,
      () => { calibrationPromise = null; },
    );
  }
  return calibrationPromise;
}

function loadObserved(): Promise<ObservedData> {
  if (!observedPromise) {
    observedPromise = cachedFetch<ObservedData>(
      `${DATA_BASE}/observed.json`,
      () => { observedPromise = null; },
    );
  }
  return observedPromise;
}

// --- Hooks ---

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useAsyncData<T>(loader: () => Promise<T>, enabled = true): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: enabled, error: null });

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setState(s => ({ ...s, loading: true }));
    loader()
      .then(data => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((error: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error });
      });
    return () => {
      cancelled = true;
    };
  }, [loader, enabled]);

  return state;
}

export function useProjections(enabled = true) {
  return useAsyncData(loadProjections, enabled);
}

export function useCalibration(enabled = true) {
  return useAsyncData(loadCalibration, enabled);
}

export function useObserved(enabled = true) {
  return useAsyncData(loadObserved, enabled);
}

// --- Location helpers (sync, operate on metadata) ---

export function getLocations(): LocationMeta[] {
  return Object.values(metadata.locations);
}

export function getLocationsByCategory(category: LocationMeta['category']): LocationMeta[] {
  return getLocations().filter(loc => loc.category === category);
}

export function getLocationLabel(code: string): string {
  return metadata.locations[code]?.label ?? code;
}

export function isValidLocationCode(code: string): boolean {
  return code in metadata.locations;
}

export const LOCATION_CODES = Object.keys(metadata.locations);

// --- Age bracket colors ---

export const COLLAPSED_AGE_COLORS: Record<string, string> = {
  '0-14':  '#6366F1',
  '15-24': '#F59E0B',
  '25-34': '#3B82F6',
  '35-44': '#EF4444',
  '45-54': '#84CC16',
  '55-64': '#8B5CF6',
  '65+':   '#10B981',
};

export const FULL_AGE_COLORS: Record<string, string> = {
  '0-4':          '#440154',
  '5-9':          '#481567',
  '10-14':        '#482677',
  '15-19':        '#453781',
  '20-24':        '#3F4788',
  '25-29':        '#39568C',
  '30-34':        '#31688E',
  '35-39':        '#2D708E',
  '40-44':        '#287D8E',
  '45-49':        '#238A8D',
  '50-54':        '#1F978B',
  '55-59':        '#29AF7F',
  '60-64':        '#3CBB75',
  '65-69':        '#55C667',
  '70-74':        '#7AD151',
  '75-79':        '#BDDF26',
  '80 and over':  '#FDE725',
};

// --- Types / granularity helpers ---

export type SexGroup = 'both' | 'male' | 'female';
export type AgeGranularity = 'collapsed' | 'full';

export function getAgeBrackets(granularity: AgeGranularity): string[] {
  if (granularity === 'collapsed') {
    return Object.keys(metadata.collapsed_age_groups);
  }
  return metadata.age_brackets;
}

export function getAgeColors(granularity: AgeGranularity): Record<string, string> {
  return granularity === 'collapsed' ? COLLAPSED_AGE_COLORS : FULL_AGE_COLORS;
}

// --- Pure transforms (take data as arg) ---

/**
 * Transform projection data into Recharts-compatible format for stacked bar charts.
 */
export function transformProjectionsForChart(
  projections: ProjectionData,
  locationCodes: string[],
  yearRange: [number, number],
  sexGroup: SexGroup,
  granularity: AgeGranularity,
  normalized: boolean
): ChartDataPoint[] {
  const [startYear, endYear] = yearRange;
  const brackets = getAgeBrackets(granularity);
  const years = metadata.years.filter(y => y >= startYear && y <= endYear);

  return years.map(year => {
    const point: ChartDataPoint = { year };

    for (const locCode of locationCodes) {
      const locData = projections[locCode]?.[sexGroup]?.[String(year)]?.[granularity];
      if (!locData) continue;

      if (normalized) {
        const total = brackets.reduce((sum, b) => sum + ((locData[b] as Quantiles)?.median ?? 0), 0);
        for (const bracket of brackets) {
          const val = (locData[bracket] as Quantiles)?.median ?? 0;
          point[`${locCode}_${bracket}`] = total > 0 ? (val / total) * 100 : 0;
        }
      } else {
        for (const bracket of brackets) {
          point[`${locCode}_${bracket}`] = (locData[bracket] as Quantiles)?.median ?? 0;
        }
      }
    }

    return point;
  });
}

// --- Calibration ---

export const OUTCOME_KEYS = Object.keys(metadata.outcome_labels);
export const OUTCOME_LABELS = metadata.outcome_labels;

/**
 * Merge model predictions with observed data points for a given location + outcome.
 */
export function getCalibrationChartData(
  calibration: CalibrationData,
  observed: ObservedData,
  locationCode: string,
  outcome: string,
  ageCategory: string = 'total',
  sexCategory: string = 'total'
): CalibrationChartPoint[] {
  let modelSeries: TimeSeriesPoint[] = [];
  const locCalib = calibration[locationCode]?.[outcome];
  if (locCalib) {
    if (sexCategory !== 'total' && locCalib.by_sex?.[sexCategory]) {
      modelSeries = locCalib.by_sex[sexCategory];
    } else if (ageCategory !== 'total' && locCalib.by_age?.[ageCategory]) {
      modelSeries = locCalib.by_age[ageCategory];
    } else {
      modelSeries = locCalib.total ?? [];
    }
  }

  let obsSeries: ObservedPoint[] = [];
  const locObs = observed[locationCode]?.[outcome];
  if (locObs) {
    if (ageCategory !== 'total' && locObs.by_age?.[ageCategory]) {
      obsSeries = locObs.by_age[ageCategory];
    } else if (ageCategory === 'total') {
      obsSeries = locObs.total ?? [];
    }
  }

  const obsMap = new Map<number, ObservedPoint>();
  for (const pt of obsSeries) obsMap.set(pt.year, pt);

  return modelSeries.map(mp => {
    const obs = obsMap.get(mp.year);
    const point: CalibrationChartPoint = {
      year: mp.year,
      mean: mp.mean,
      lower: mp.lower,
      upper: mp.upper,
    };
    if (obs) {
      point.observed = obs.value;
      if (obs.lower !== undefined) point.observed_lower = obs.lower;
      if (obs.upper !== undefined) point.observed_upper = obs.upper;
    }
    return point;
  });
}

export function getSurveillanceAgeBrackets(outcome: string): string[] {
  const epiOutcomes = ['incidence', 'prevalence', 'hiv.mortality'];
  if (epiOutcomes.includes(outcome)) {
    return ['0-14', '10-19', '15-24', '15-49', '15+', '50 and over'];
  }
  const cascadeOutcomes = ['awareness', 'engagement', 'suppression', 'engagement.allPLHIV', 'suppression.allPLHIV'];
  if (cascadeOutcomes.includes(outcome)) {
    return ['15+'];
  }
  return [];
}

// Re-export types
export type { LocationMeta, Quantiles, ChartDataPoint, CalibrationChartPoint } from './types';
