// Types for the global aging web app data layer
// These mirror the JSON structure produced by gmha/web/extract_for_web.R

// --- Metadata ---

export interface LocationMeta {
  code: string;
  label: string;
  category: 'country' | 'income_group' | 'aggregate';
}

export interface Metadata {
  generated: string;
  years: number[];
  age_brackets: string[];
  collapsed_age_groups: Record<string, string[]>;
  surveillance_age_brackets: string[];
  outcome_labels: Record<string, string>;
  locations: Record<string, LocationMeta>;
}

// --- Projections (age distribution stacked bar charts) ---

export interface Quantiles {
  median: number;
  lower: number;
  upper: number;
}

// projections[locationCode][sexGroup][year][granularity][ageBracket] = Quantiles
// sexGroup: "both" | "male" | "female"
// granularity: "full" (17 brackets) | "collapsed" (7 groups)
export type ProjectionData = Record<
  string, // location code
  Record<
    string, // sex group
    Record<
      string, // year
      {
        full: Record<string, Quantiles>;
        collapsed: Record<string, Quantiles>;
      }
    >
  >
>;

// --- Calibration (model prediction time series) ---

export interface TimeSeriesPoint {
  year: number;
  mean: number;
  median: number;
  lower: number;
  upper: number;
}

export interface OutcomeData {
  total: TimeSeriesPoint[];
  by_sex: Record<string, TimeSeriesPoint[]>;
  by_age: Record<string, TimeSeriesPoint[]>;
}

// calibration[locationCode][outcome] = OutcomeData
export type CalibrationData = Record<string, Record<string, OutcomeData>>;

// --- Observed/surveillance data ---

export interface ObservedPoint {
  year: number;
  value: number;
  lower?: number;
  upper?: number;
}

export interface ObservedOutcomeData {
  total: ObservedPoint[];
  by_age: Record<string, ObservedPoint[]>;
}

// observed[locationCode][outcome] = ObservedOutcomeData
export type ObservedData = Record<string, Record<string, ObservedOutcomeData>>;

// --- Summary statistics ---

export type SummaryData = Record<string, Record<string, unknown>>;

// --- Chart data types (transformed for Recharts) ---

export interface ChartDataPoint {
  year: number;
  [key: string]: number;
}

export interface CalibrationChartPoint {
  year: number;
  mean: number;
  lower: number;
  upper: number;
  observed?: number;
  observed_lower?: number;
  observed_upper?: number;
}
