import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildHomepageFindingsAnalyses,
  getHomepageFindingsData,
  HOMEPAGE_FINDINGS_REVALIDATE_SECONDS,
  type HomepageFindingsSummaries,
} from './jheem-findings-data';

function locationSummary(
  name: string,
  shortName: string,
  cessationIncreaseAbsolute: number,
  cessationIncreasePercent: number,
) {
  return {
    name,
    shortName,
    coordinates: [-90, 35] as [number, number],
    impact: {
      cessationIncreaseAbsolute,
      cessationIncreasePercent,
      startYear: 2026,
      targetYear: 2031,
    },
  };
}

const summaries: HomepageFindingsSummaries = {
  ryanWhiteCities: {
    generated: '2026-03-02',
    cities: {
      'C.35620': locationSummary(
        'New York-Newark-Jersey City, NY-NJ-PA',
        'New York',
        8735.4,
        40.6,
      ),
      'C.33100': locationSummary(
        'Miami-Fort Lauderdale-West Palm Beach, FL',
        'Miami',
        7253.2,
        58.2,
      ),
    },
  },
  ryanWhiteStates: {
    generated: '2026-02-05',
    states: {
      MO: locationSummary('Missouri', 'MO', 1200, 126.2),
      AL: locationSummary('Alabama', 'AL', 900, 106.1),
    },
  },
  cdcTestingStates: {
    generated: '2026-02-06',
    states: {
      LA: locationSummary('Louisiana', 'LA', 400, 30.3),
      TN: locationSummary('Tennessee', 'TN', 320, 16.8),
    },
  },
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('buildHomepageFindingsAnalyses', () => {
  it('normalizes portal summaries into the homepage findings contract', () => {
    const analyses = buildHomepageFindingsAnalyses(summaries);

    expect(analyses.map(analysis => analysis.id)).toEqual([
      'rw-cities',
      'rw-states',
      'cdc-testing',
    ]);

    const cityAnalysis = analyses[0];
    expect(cityAnalysis.metric.label).toBe('Additional HIV infections by 2031');
    expect(cityAnalysis.question).toContain('2 highest-burden metropolitan areas');
    expect(cityAnalysis.summary).toEqual({
      value: '15,989',
      label: 'additional infections',
      detail: 'Projected across 2 high-burden metros from 2026 to 2031.',
    });
    expect(cityAnalysis.cityData?.[0]).toMatchObject({
      id: 'C.35620',
      short: 'New York',
      value: 8735,
      pct: 41,
    });

    const ryanWhiteStateAnalysis = analyses[1];
    expect(ryanWhiteStateAnalysis.metric.label).toBe(
      'Percent increase in HIV incidence by 2031',
    );
    expect(ryanWhiteStateAnalysis.question).toContain('2 states with the highest HIV burden');
    expect(ryanWhiteStateAnalysis.summary.value).toBe('+126%');
    expect(ryanWhiteStateAnalysis.stateData?.[0]).toMatchObject({
      id: 'mo',
      fips: '29',
      name: 'Missouri',
      value: 126,
    });

    const cdcAnalysis = analyses[2];
    expect(cdcAnalysis.eyebrow).toBe('2 states');
    expect(cdcAnalysis.question).toContain('across the 2 states');
    expect(cdcAnalysis.summary.value).toBe('+30%');
  });
});

describe('getHomepageFindingsData', () => {
  it('keeps successful analyses when one portal summary fails', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);

      if (url.includes('/ryan-white/city-summaries.json')) {
        return jsonResponse(summaries.ryanWhiteCities);
      }

      if (url.includes('/ryan-white-state/state-summaries.json')) {
        return jsonResponse(summaries.ryanWhiteStates);
      }

      if (url.includes('/cdc-testing/state-summaries.json')) {
        return jsonResponse({ error: 'unavailable' }, 503);
      }

      throw new Error(`Unexpected URL: ${url}`);
    });
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.stubGlobal('fetch', fetchMock);

    const result = await getHomepageFindingsData();

    expect(result.analyses.map(analysis => analysis.id)).toEqual([
      'rw-cities',
      'rw-states',
    ]);
    expect(result.unavailableAnalyses).toEqual(['CDC testing']);
    expect(consoleError).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/ryan-white/city-summaries.json'),
      expect.objectContaining({
        headers: { Accept: 'application/json' },
        next: { revalidate: HOMEPAGE_FINDINGS_REVALIDATE_SECONDS },
      }),
    );
  });
});
