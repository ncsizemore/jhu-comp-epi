// Data accessors for the global aging web app.
//
// Strategy:
//   - metadata and summary are tiny (~10 KB combined) -> static imports.
//   - projections, calibration, observed are large -> live under /public and
//     are fetched on demand via hooks with module-level promise caching.
//   - Pure transforms take the data as arguments (no hidden module state).

import { useEffect, useMemo, useState } from 'react';
import type {
  Metadata,
  LocationMeta,
  ProjectionData,
  LocationCalibration,
  ObservedData,
  ObservedOutcomeData,
  SummaryData,
  Quantiles,
  ChartDataPoint,
  CalibrationChartPoint,
  TimeSeriesPoint,
  ObservedPoint,
} from './types';

import metadataJson from './metadata.json';
import summaryJson from './summary.json';
import {
  MetadataSchema,
  ProjectionDataSchema,
  LocationCalibrationSchema,
  ObservedDataSchema,
  validateInDev,
} from './schemas';
import type { ZodType } from 'zod';

// --- Small statically imported data ---
// metadata is validated in dev so R↔TS drift surfaces immediately on load.
export const metadata = validateInDev<Metadata>(MetadataSchema, metadataJson, 'metadata');
export const summary = summaryJson as unknown as SummaryData;

// --- Lazy-loaded data (fetched from /public at runtime) ---
const DATA_BASE = '/data/global-aging';

let projectionsPromise: Promise<ProjectionData> | null = null;
const calibrationPromises = new Map<string, Promise<LocationCalibration>>();
let observedPromise: Promise<ObservedData> | null = null;

// Fetch-and-cache. On rejection, drop the cached promise so a subsequent
// call can retry — otherwise the first failure would lock the page until
// a full refresh. The schema is run via validateInDev (no-op in production).
function cachedFetch<T>(url: string, schema: ZodType<T>, label: string, clear: () => void): Promise<T> {
  return fetch(url)
    .then(r => {
      if (!r.ok) throw new Error(`Failed to load ${url}: ${r.status}`);
      return r.json() as Promise<unknown>;
    })
    .then(data => validateInDev<T>(schema, data, label))
    .catch(err => {
      clear();
      throw err;
    });
}

function loadProjections(): Promise<ProjectionData> {
  if (!projectionsPromise) {
    projectionsPromise = cachedFetch<ProjectionData>(
      `${DATA_BASE}/projections.json`,
      ProjectionDataSchema as ZodType<ProjectionData>,
      'projections',
      () => { projectionsPromise = null; },
    );
  }
  return projectionsPromise;
}

function loadCalibrationForLocation(locationCode: string): Promise<LocationCalibration> {
  const existing = calibrationPromises.get(locationCode);
  if (existing) return existing;
  const promise = cachedFetch<LocationCalibration>(
    `${DATA_BASE}/calibration/${locationCode}.json`,
    LocationCalibrationSchema as ZodType<LocationCalibration>,
    `calibration:${locationCode}`,
    () => { calibrationPromises.delete(locationCode); },
  );
  calibrationPromises.set(locationCode, promise);
  return promise;
}

function loadObserved(): Promise<ObservedData> {
  if (!observedPromise) {
    observedPromise = cachedFetch<ObservedData>(
      `${DATA_BASE}/observed.json`,
      ObservedDataSchema as ZodType<ObservedData>,
      'observed',
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

    void Promise.resolve()
      .then(() => {
        if (!cancelled) setState(s => ({ ...s, loading: true }));
        return loader();
      })
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

export function useCalibration(locationCode: string, enabled = true) {
  // useAsyncData identifies the loader by reference, so bind locationCode
  // into a stable per-(code) function to avoid re-fetching on every render.
  const loader = useMemo(
    () => () => loadCalibrationForLocation(locationCode),
    [locationCode],
  );
  return useAsyncData(loader, enabled);
}

export function useObserved(enabled = true) {
  return useAsyncData(loadObserved, enabled);
}

// --- Location helpers (sync, operate on metadata) ---

// Locations present in the data but hidden from the UI. The data files still
// carry these — filter only at the presentation layer.
const HIDDEN_LOCATIONS = new Set<string>(['unaids_remainder']);

export function getLocations(): LocationMeta[] {
  return Object.values(metadata.locations).filter(loc => !HIDDEN_LOCATIONS.has(loc.code));
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

export const LOCATION_CODES = Object.keys(metadata.locations).filter(code => !HIDDEN_LOCATIONS.has(code));

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
// SexMode is the UI-layer toggle. 'mf-split' is rendered as a side-by-side
// male+female pair per location; the data layer only knows the three sex
// groups stored in the JSON.
export type SexMode = SexGroup | 'mf-split';
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

/**
 * Largest single-year stacked total across the bracket set, for one location.
 * Used by the mf-split projection layout to share a y-axis between paired
 * male/female charts so visual comparisons are meaningful.
 */
export function maxStackedTotal(
  data: ChartDataPoint[],
  locationCode: string,
  brackets: string[]
): number {
  let max = 0;
  for (const point of data) {
    let total = 0;
    for (const b of brackets) {
      total += Number(point[`${locationCode}_${b}`]) || 0;
    }
    if (total > max) max = total;
  }
  return max;
}

// --- Calibration ---

// Outcomes shown in the calibration dropdown, in display order. The other
// keys in metadata.outcome_labels (diagnoses, disengagement, etc.) are
// present in the data but hidden from the UI for now.
export const VISIBLE_OUTCOME_KEYS = [
  'population',
  'prevalence',
  'incidence',
  'awareness',
  'engagement',
  'suppression',
  'hiv.mortality',
  'total.mortality',
];

// Cascade outcomes are stored as 0–1 fractions (per-sim ratios then quantiled).
// The UI must format them as percentages and clamp y-axis to [0, 1].
export const PROPORTION_OUTCOMES = new Set<string>([
  'awareness',
  'engagement',
  'suppression',
  'engagement.allPLHIV',
  'suppression.allPLHIV',
]);

export function isProportionOutcome(outcome: string): boolean {
  return PROPORTION_OUTCOMES.has(outcome);
}

export const OUTCOME_LABELS = metadata.outcome_labels;

// Stratum keys passed via `ageCategory` that live on the by_sex_age axis
// rather than by_age. Cascade calibration emits these for sex-stratified 15+
// surveillance points.
const SEX_AGE_KEYS = new Set<string>(['male.15+', 'female.15+']);

/**
 * Merge model predictions with observed data points for one outcome of one
 * location. Pass per-location slices (already extracted by the caller, e.g.
 * `useCalibration(code)` and `observed[code]`).
 */
export function getCalibrationChartData(
  calibration: LocationCalibration | null | undefined,
  observed: Record<string, ObservedOutcomeData> | null | undefined,
  outcome: string,
  ageCategory: string = 'total',
  sexCategory: string = 'total'
): CalibrationChartPoint[] {
  const isSexAge = SEX_AGE_KEYS.has(ageCategory);

  let modelSeries: TimeSeriesPoint[] = [];
  const locCalib = calibration?.[outcome];
  if (locCalib) {
    if (isSexAge && locCalib.by_sex_age?.[ageCategory]) {
      modelSeries = locCalib.by_sex_age[ageCategory];
    } else if (sexCategory !== 'total' && locCalib.by_sex?.[sexCategory]) {
      modelSeries = locCalib.by_sex[sexCategory];
    } else if (ageCategory !== 'total' && locCalib.by_age?.[ageCategory]) {
      modelSeries = locCalib.by_age[ageCategory];
    } else {
      modelSeries = locCalib.total ?? [];
    }
  }

  let obsSeries: ObservedPoint[] = [];
  const locObs = observed?.[outcome];
  if (locObs) {
    if (isSexAge && locObs.by_sex_age?.[ageCategory]) {
      obsSeries = locObs.by_sex_age[ageCategory];
    } else if (ageCategory !== 'total' && locObs.by_age?.[ageCategory]) {
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

// Strata available for the "All Age Groups" view of a given outcome.
//   - HIV epi outcomes use UNAIDS surveillance brackets.
//   - Population and total mortality use the 17 WPP brackets the model is
//     calibrated on; the data manager carries the observed series at these
//     same brackets, so no further mapping is needed.
//   - Cascade outcomes are sex-stratified at 15+ rather than age-only —
//     the keys live on the by_sex_age axis.
export function getSurveillanceAgeBrackets(outcome: string): string[] {
  const epiOutcomes = ['incidence', 'prevalence', 'hiv.mortality'];
  if (epiOutcomes.includes(outcome)) {
    return ['0-14', '10-19', '15-24', '15-49', '15+', '50 and over'];
  }
  if (outcome === 'population' || outcome === 'total.mortality') {
    return [
      '0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39',
      '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79',
      '80 and over',
    ];
  }
  if (PROPORTION_OUTCOMES.has(outcome)) {
    return ['male.15+', 'female.15+'];
  }
  return [];
}

// Re-export types
export type { LocationMeta, Quantiles, ChartDataPoint, CalibrationChartPoint } from './types';
