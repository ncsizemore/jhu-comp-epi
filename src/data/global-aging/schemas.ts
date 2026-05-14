// Zod schemas for the four JSON contracts produced by gmha/web/extract_for_web.R.
//
// Purpose: catch R↔TS drift at load time in dev. The R script lives in a
// separate repo; without a runtime check the only signal of schema drift is
// "chart silently renders blank in production." With these schemas, dev/CI
// surfaces the exact path that broke.
//
// validateInDev() is a no-op in production — the schemas are zero runtime
// cost on the user-facing build.

import { z } from 'zod';

// --- Leaf shapes ------------------------------------------------------------

const Quantiles = z.object({
  median: z.number(),
  lower: z.number(),
  upper: z.number(),
});

const TimeSeriesPoint = z.object({
  year: z.number(),
  mean: z.number().nullable(),
  median: z.number().nullable(),
  lower: z.number().nullable(),
  upper: z.number().nullable(),
});

const ObservedPoint = z.object({
  year: z.number(),
  value: z.number(),
  lower: z.number().optional(),
  upper: z.number().optional(),
});

const LocationMeta = z.object({
  code: z.string(),
  label: z.string(),
  category: z.enum(['country', 'income_group', 'aggregate']),
});

// --- Top-level shapes -------------------------------------------------------

export const MetadataSchema = z.object({
  generated: z.string(),
  years: z.array(z.number()),
  age_brackets: z.array(z.string()),
  collapsed_age_groups: z.record(z.string(), z.array(z.string())),
  surveillance_age_brackets: z.array(z.string()),
  outcome_labels: z.record(z.string(), z.string()),
  locations: z.record(z.string(), LocationMeta),
});

// projections[location][sex][year] = { full, collapsed }
export const ProjectionDataSchema = z.record(
  z.string(),
  z.record(
    z.string(),
    z.record(
      z.string(),
      z.object({
        full: z.record(z.string(), Quantiles),
        collapsed: z.record(z.string(), Quantiles),
      }),
    ),
  ),
);

const OutcomeData = z.object({
  total: z.array(TimeSeriesPoint),
  by_sex: z.record(z.string(), z.array(TimeSeriesPoint)),
  by_age: z.record(z.string(), z.array(TimeSeriesPoint)),
  by_sex_age: z.record(z.string(), z.array(TimeSeriesPoint)).optional(),
});

// One location's calibration: outcome → OutcomeData. Files served as
// /data/global-aging/calibration/<location>.json (per-location split).
export const LocationCalibrationSchema = z.record(z.string(), OutcomeData);

// Legacy monolithic shape, kept for the in-memory fixtures used in tests.
// Not loaded from disk anymore.
export const CalibrationDataSchema = z.record(
  z.string(),
  LocationCalibrationSchema,
);

const ObservedOutcomeData = z.object({
  total: z.array(ObservedPoint),
  by_age: z.record(z.string(), z.array(ObservedPoint)).optional(),
  by_sex_age: z.record(z.string(), z.array(ObservedPoint)).optional(),
});

// observed[location][outcome] = ObservedOutcomeData
export const ObservedDataSchema = z.record(
  z.string(),
  z.record(z.string(), ObservedOutcomeData),
);

// --- Validation helper ------------------------------------------------------

/**
 * Validate `data` against `schema` in dev; pass through unchanged in prod.
 * Throws with the first issue path on failure so the dev console surfaces
 * the exact field that drifted from the R-script contract.
 */
export function validateInDev<T>(
  schema: z.ZodType<T>,
  data: unknown,
  label: string,
): T {
  if (process.env.NODE_ENV === 'production') return data as T;

  const result = schema.safeParse(data);
  if (!result.success) {
    const first = result.error.issues[0];
    const path = first?.path.join('.') ?? '<root>';
    throw new Error(
      `[${label}] schema validation failed at "${path}": ${first?.message ?? 'unknown'}`,
    );
  }
  return result.data;
}
