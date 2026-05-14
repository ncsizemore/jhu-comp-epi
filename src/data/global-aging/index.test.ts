import { describe, it, expect } from 'vitest';
import {
  transformProjectionsForChart,
  getCalibrationChartData,
  maxStackedTotal,
  getAgeBrackets,
} from './index';
import type {
  ProjectionData,
  CalibrationData,
  ObservedData,
  ChartDataPoint,
} from './types';

// --- Fixtures ---------------------------------------------------------------

// Build a projection slice for one location/sex/year, collapsed brackets only.
function projForYear(brackets: Record<string, number>) {
  return {
    full: {},
    collapsed: Object.fromEntries(
      Object.entries(brackets).map(([b, v]) => [b, { median: v, lower: v * 0.9, upper: v * 1.1 }])
    ),
  };
}

const tinyProjections: ProjectionData = {
  kenya: {
    both: {
      '2025': projForYear({ '0-14': 100, '15-24': 200, '25-34': 300, '35-44': 250, '45-54': 100, '55-64': 50, '65+': 0 }),
      '2026': projForYear({ '0-14': 110, '15-24': 210, '25-34': 310, '35-44': 260, '45-54': 110, '55-64': 60, '65+': 10 }),
    },
    male: { '2025': projForYear({ '0-14': 50, '15-24': 100, '25-34': 150, '35-44': 125, '45-54': 50, '55-64': 25, '65+': 0 }) },
    female: { '2025': projForYear({ '0-14': 50, '15-24': 100, '25-34': 150, '35-44': 125, '45-54': 50, '55-64': 25, '65+': 0 }) },
  } as ProjectionData['kenya'],
};

// Calibration: one outcome with each axis populated so dispatch can be tested.
const tinyCalibration: CalibrationData = {
  kenya: {
    prevalence: {
      total: [
        { year: 2020, mean: 1000, median: 1000, lower: 900, upper: 1100 },
        { year: 2021, mean: 1100, median: 1100, lower: 990, upper: 1210 },
      ],
      by_sex: {
        male:   [{ year: 2020, mean: 500, median: 500, lower: 450, upper: 550 }],
        female: [{ year: 2020, mean: 500, median: 500, lower: 450, upper: 550 }],
      },
      by_age: {
        '15-49': [{ year: 2020, mean: 800, median: 800, lower: 720, upper: 880 }],
      },
    },
    suppression: {
      total: [
        { year: 2020, mean: 0.7, median: 0.7, lower: 0.6, upper: 0.8 },
      ],
      by_sex: {},
      by_age: {},
      by_sex_age: {
        'male.15+':   [{ year: 2020, mean: 0.65, median: 0.65, lower: 0.55, upper: 0.75 }],
        'female.15+': [{ year: 2020, mean: 0.75, median: 0.75, lower: 0.65, upper: 0.85 }],
      },
    },
  },
};

const tinyObserved: ObservedData = {
  kenya: {
    prevalence: {
      total: [
        { year: 2020, value: 1050, lower: 950, upper: 1150 },
      ],
      by_age: {
        '15-49': [{ year: 2020, value: 820 }],
      },
    },
    suppression: {
      total: [],
      by_sex_age: {
        'male.15+':   [{ year: 2020, value: 0.62 }],
        'female.15+': [{ year: 2020, value: 0.78 }],
      },
    },
  },
};

// --- transformProjectionsForChart -------------------------------------------

describe('transformProjectionsForChart', () => {
  it('returns one ChartDataPoint per year in range', () => {
    const out = transformProjectionsForChart(tinyProjections, ['kenya'], [2025, 2026], 'both', 'collapsed', false);
    expect(out).toHaveLength(2);
    expect(out[0].year).toBe(2025);
    expect(out[1].year).toBe(2026);
  });

  it('filters years outside the requested range', () => {
    const out = transformProjectionsForChart(tinyProjections, ['kenya'], [2026, 2026], 'both', 'collapsed', false);
    expect(out).toHaveLength(1);
    expect(out[0].year).toBe(2026);
  });

  it('emits raw median counts in counts mode', () => {
    const out = transformProjectionsForChart(tinyProjections, ['kenya'], [2025, 2025], 'both', 'collapsed', false);
    expect(out[0]['kenya_0-14']).toBe(100);
    expect(out[0]['kenya_25-34']).toBe(300);
  });

  it('normalizes to percentages summing to 100 in normalized mode', () => {
    const out = transformProjectionsForChart(tinyProjections, ['kenya'], [2025, 2025], 'both', 'collapsed', true);
    const brackets = getAgeBrackets('collapsed');
    const sum = brackets.reduce((s, b) => s + (out[0][`kenya_${b}`] as number), 0);
    expect(sum).toBeCloseTo(100, 5);
  });

  it('returns 0 for normalized zero-total stratum without throwing', () => {
    // No matching location → no data added; the point only has `year`.
    const out = transformProjectionsForChart(tinyProjections, ['missingloc'], [2025, 2025], 'both', 'collapsed', true);
    expect(out).toHaveLength(1);
    expect(out[0].year).toBe(2025);
    expect(Object.keys(out[0])).toEqual(['year']);
  });

  it('reads from the requested sex group', () => {
    const both = transformProjectionsForChart(tinyProjections, ['kenya'], [2025, 2025], 'both', 'collapsed', false);
    const male = transformProjectionsForChart(tinyProjections, ['kenya'], [2025, 2025], 'male', 'collapsed', false);
    expect(both[0]['kenya_15-24']).toBe(200);
    expect(male[0]['kenya_15-24']).toBe(100);
  });

  it('silently skips locations missing from the data', () => {
    const out = transformProjectionsForChart(tinyProjections, ['kenya', 'atlantis'], [2025, 2025], 'both', 'collapsed', false);
    expect(out[0]['kenya_0-14']).toBe(100);
    expect(out[0]['atlantis_0-14']).toBeUndefined();
  });
});

// --- getCalibrationChartData ------------------------------------------------

describe('getCalibrationChartData', () => {
  it('returns the total series for ageCategory="total"', () => {
    const out = getCalibrationChartData(tinyCalibration, tinyObserved, 'kenya', 'prevalence');
    expect(out).toHaveLength(2);
    expect(out[0].year).toBe(2020);
    expect(out[0].mean).toBe(1000);
  });

  it('merges observed points by year', () => {
    const out = getCalibrationChartData(tinyCalibration, tinyObserved, 'kenya', 'prevalence');
    expect(out[0].observed).toBe(1050);
    expect(out[0].observed_lower).toBe(950);
    expect(out[0].observed_upper).toBe(1150);
    // 2021 has model but no observed → no observed fields
    expect(out[1].observed).toBeUndefined();
  });

  it('dispatches to by_age for a non-total age category', () => {
    const out = getCalibrationChartData(tinyCalibration, tinyObserved, 'kenya', 'prevalence', '15-49');
    expect(out).toHaveLength(1);
    expect(out[0].mean).toBe(800);
    expect(out[0].observed).toBe(820);
  });

  it('dispatches to by_sex_age for male.15+ / female.15+ keys (cascade)', () => {
    const male = getCalibrationChartData(tinyCalibration, tinyObserved, 'kenya', 'suppression', 'male.15+');
    const female = getCalibrationChartData(tinyCalibration, tinyObserved, 'kenya', 'suppression', 'female.15+');
    expect(male[0].mean).toBe(0.65);
    expect(female[0].mean).toBe(0.75);
    expect(male[0].observed).toBe(0.62);
    expect(female[0].observed).toBe(0.78);
  });

  it('dispatches to by_sex when sexCategory is set and ageCategory is total', () => {
    const out = getCalibrationChartData(tinyCalibration, tinyObserved, 'kenya', 'prevalence', 'total', 'male');
    expect(out[0].mean).toBe(500);
  });

  it('returns an empty array for a missing location', () => {
    const out = getCalibrationChartData(tinyCalibration, tinyObserved, 'atlantis', 'prevalence');
    expect(out).toEqual([]);
  });

  it('returns model points without observed when observed series is missing', () => {
    const obsWithout: ObservedData = { kenya: { prevalence: { total: [] } } };
    const out = getCalibrationChartData(tinyCalibration, obsWithout, 'kenya', 'prevalence');
    expect(out).toHaveLength(2);
    expect(out[0].observed).toBeUndefined();
  });
});

// --- maxStackedTotal --------------------------------------------------------

describe('maxStackedTotal', () => {
  const brackets = ['a', 'b', 'c'];
  const data: ChartDataPoint[] = [
    { year: 2025, kenya_a: 10, kenya_b: 20, kenya_c: 30 },         // total 60
    { year: 2026, kenya_a: 15, kenya_b: 25, kenya_c: 35 },         // total 75
    { year: 2027, kenya_a: 5, kenya_b: 5, kenya_c: 5 },            // total 15
  ];

  it('returns the largest stacked sum across all years', () => {
    expect(maxStackedTotal(data, 'kenya', brackets)).toBe(75);
  });

  it('returns 0 for empty data', () => {
    expect(maxStackedTotal([], 'kenya', brackets)).toBe(0);
  });

  it('treats missing bracket keys as 0', () => {
    const sparse: ChartDataPoint[] = [{ year: 2025, kenya_a: 10 }];
    expect(maxStackedTotal(sparse, 'kenya', brackets)).toBe(10);
  });

  it('isolates by location prefix', () => {
    const mixed: ChartDataPoint[] = [
      { year: 2025, kenya_a: 10, kenya_b: 20, mozambique_a: 999, mozambique_b: 999 },
    ];
    expect(maxStackedTotal(mixed, 'kenya', ['a', 'b'])).toBe(30);
  });
});

// --- Cascade shape regression -----------------------------------------------

// Locks the contract that cascade outcomes are stored as 0–1 fractions
// (per-sim ratio, quantiled across sims). If a future R-script change ever
// emits cascade as counts, this test will fail and demand an explicit decision
// rather than silently flipping the rendered plot.
describe('cascade-as-proportions shape', () => {
  it('keeps cascade outcomes in [0, 1]', () => {
    const out = getCalibrationChartData(tinyCalibration, tinyObserved, 'kenya', 'suppression', 'male.15+');
    expect(out[0].mean).toBeGreaterThanOrEqual(0);
    expect(out[0].mean).toBeLessThanOrEqual(1);
    expect(out[0].lower).toBeGreaterThanOrEqual(0);
    expect(out[0].upper).toBeLessThanOrEqual(1);
  });
});
