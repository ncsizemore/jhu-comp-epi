import { describe, expect, it } from 'vitest';
import source from '../../public/data/ryan-white-trajectory.json';

describe('homepage portal projections', () => {
  it('reconciles both plotted series to the 31 frozen metro sources', () => {
    expect(new Set(source.cities.map(c => c.id)).size).toBe(31);
    for (const scenario of ['Baseline', 'Cessation'] as const) {
      for (const point of source.series[scenario]) {
        const total = source.cities.reduce((sum, city) => sum + city.series[scenario].find(p => p.year === point.year)!.value, 0);
        expect(point.value).toBeCloseTo(total, 3);
      }
    }
  });
  it('supports rounded figure values while keeping the paper estimate distinct', () => {
    const total = source.series.Cessation.filter(p => p.year >= 2025).reduce((sum, p) => sum + p.value - source.series.Baseline.find(b => b.year === p.year)!.value, 0);
    expect(total).toBeCloseTo(source.cumulative_additional_2025_2030, 3);
    expect(Math.round(total / 1000) * 1000).toBe(79000);
    expect(Math.round(source.series.Baseline.at(-1)!.value / 100) * 100).toBe(25900);
    expect(Math.round(source.series.Cessation.at(-1)!.value / 1000) * 1000).toBe(43000);
    expect(source.publicationComparison.publishedAdditionalInfections).toBe(75436);
  });
});
