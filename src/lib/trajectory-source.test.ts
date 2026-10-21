import { describe, expect, it } from 'vitest';
import source from '../../public/data/ryan-white-trajectory.json';
import comparison from '../../public/data/ryan-white-publication-comparison.json';

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
  it('matches every comparison row to the frozen metro data without changing the published values', () => {
    expect(comparison.metros.map(c => c.id).sort()).toEqual(source.cities.map(c => c.id).sort());
    for (const row of comparison.metros) {
      const city = source.cities.find(c => c.id === row.id)!;
      const baseline = city.series.Baseline.filter(p => p.year >= 2025).reduce((sum, p) => sum + p.value, 0);
      const cessation = city.series.Cessation.filter(p => p.year >= 2025).reduce((sum, p) => sum + p.value, 0);
      expect(row.portalBaseline).toBeCloseTo(baseline, 3);
      expect(row.portalAdditional).toBeCloseTo(cessation - baseline, 3);
      expect(row.additionalDifference).toBeCloseTo(row.portalAdditional - row.publishedAdditional, 3);
    }
    expect(comparison.metros.reduce((sum, row) => sum + row.publishedAdditional, 0)).toBe(75436);
    expect(comparison.metros.reduce((sum, row) => sum + row.publishedBaseline, 0)).toBe(154429);
    expect(comparison.portal.additionalInfections).toBe(source.cumulative_additional_2025_2030);
  });
});
