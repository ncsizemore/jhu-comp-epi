'use client';

import { useMemo, useState } from 'react';
import { USMap, USStates, USMarker } from '@/components/maps/us-map';

type Geography = 'city' | 'state';

type CityRow = {
  id: string;
  name: string;
  short: string;
  coords: [number, number];
  value: number;
  pct: number;
};

type StateRow = {
  id: string;
  fips: string;
  name: string;
  abbr: string;
  value: number;
};

type Analysis = {
  id: string;
  shortTitle: string;
  eyebrow: string;
  headline: string;
  question: string;
  geography: Geography;
  metric: {
    label: string;
    unit: 'count' | 'percent';
    description: string;
  };
  cityData?: CityRow[];
  stateData?: StateRow[];
  summary: {
    value: string;
    label: string;
    detail: string;
  };
  citation: string;
  journal: string;
  year: number;
  href: string;
  portalUrl: string;
};

// Placeholder data — magnitudes and ranks chosen to be plausible against
// published headline findings; replace with CloudFront city-summaries.json
// once visual direction is locked.
const RW_MSA: CityRow[] = [
  { id: 'nyc', name: 'New York, NY', short: 'New York', coords: [-74.0059, 40.7128], value: 8420, pct: 41 },
  { id: 'mia', name: 'Miami, FL', short: 'Miami', coords: [-80.1918, 25.7617], value: 6890, pct: 58 },
  { id: 'lax', name: 'Los Angeles, CA', short: 'Los Angeles', coords: [-118.2437, 34.0522], value: 6210, pct: 47 },
  { id: 'atl', name: 'Atlanta, GA', short: 'Atlanta', coords: [-84.3880, 33.7490], value: 5340, pct: 71 },
  { id: 'hou', name: 'Houston, TX', short: 'Houston', coords: [-95.3698, 29.7604], value: 4980, pct: 63 },
  { id: 'dal', name: 'Dallas, TX', short: 'Dallas', coords: [-96.7970, 32.7767], value: 4120, pct: 55 },
  { id: 'wdc', name: 'Washington, DC', short: 'Washington', coords: [-77.0369, 38.9072], value: 3780, pct: 49 },
  { id: 'phi', name: 'Philadelphia, PA', short: 'Philadelphia', coords: [-75.1652, 39.9526], value: 3210, pct: 52 },
  { id: 'chi', name: 'Chicago, IL', short: 'Chicago', coords: [-87.6298, 41.8781], value: 2980, pct: 44 },
  { id: 'mem', name: 'Memphis, TN', short: 'Memphis', coords: [-90.0490, 35.1495], value: 2640, pct: 89 },
  { id: 'orl', name: 'Orlando, FL', short: 'Orlando', coords: [-81.3792, 28.5383], value: 2510, pct: 67 },
  { id: 'sat', name: 'San Antonio, TX', short: 'San Antonio', coords: [-98.4936, 29.4241], value: 2380, pct: 61 },
  { id: 'nor', name: 'New Orleans, LA', short: 'New Orleans', coords: [-90.0715, 29.9511], value: 2210, pct: 78 },
  { id: 'cha', name: 'Charlotte, NC', short: 'Charlotte', coords: [-80.8431, 35.2271], value: 2040, pct: 73 },
  { id: 'bal', name: 'Baltimore, MD', short: 'Baltimore', coords: [-76.6122, 39.2904], value: 1980, pct: 38 },
  { id: 'jax', name: 'Jacksonville, FL', short: 'Jacksonville', coords: [-81.6557, 30.3322], value: 1820, pct: 64 },
  { id: 'sdg', name: 'San Diego, CA', short: 'San Diego', coords: [-117.1611, 32.7157], value: 1690, pct: 33 },
  { id: 'sfo', name: 'San Francisco, CA', short: 'San Francisco', coords: [-122.4194, 37.7749], value: 1610, pct: 28 },
  { id: 'phx', name: 'Phoenix, AZ', short: 'Phoenix', coords: [-112.0740, 33.4484], value: 1490, pct: 51 },
  { id: 'bos', name: 'Boston, MA', short: 'Boston', coords: [-71.0589, 42.3601], value: 1320, pct: 31 },
  { id: 'sea', name: 'Seattle, WA', short: 'Seattle', coords: [-122.3321, 47.6062], value: 1180, pct: 25 },
  { id: 'aus', name: 'Austin, TX', short: 'Austin', coords: [-97.7431, 30.2672], value: 1090, pct: 42 },
  { id: 'lvs', name: 'Las Vegas, NV', short: 'Las Vegas', coords: [-115.1398, 36.1699], value: 980, pct: 46 },
  { id: 'ind', name: 'Indianapolis, IN', short: 'Indianapolis', coords: [-86.1581, 39.7684], value: 910, pct: 110 },
  { id: 'kan', name: 'Kansas City, MO', short: 'Kansas City', coords: [-94.5786, 39.0997], value: 840, pct: 95 },
  { id: 'stl', name: 'St. Louis, MO', short: 'St. Louis', coords: [-90.1994, 38.6270], value: 760, pct: 102 },
  { id: 'mil', name: 'Milwaukee, WI', short: 'Milwaukee', coords: [-87.9065, 43.0389], value: 680, pct: 81 },
  { id: 'okc', name: 'Oklahoma City, OK', short: 'Oklahoma City', coords: [-97.5164, 35.4676], value: 590, pct: 69 },
  { id: 'den', name: 'Denver, CO', short: 'Denver', coords: [-104.9903, 39.7392], value: 540, pct: 35 },
  { id: 'por', name: 'Portland, OR', short: 'Portland', coords: [-122.6765, 45.5152], value: 480, pct: 22 },
  { id: 'slc', name: 'Salt Lake City, UT', short: 'Salt Lake City', coords: [-111.8910, 40.7608], value: 410, pct: 18 },
  { id: 'riv', name: 'Riverside, CA', short: 'Riverside', coords: [-117.3961, 33.9533], value: 360, pct: 9 },
];

const RW_STATE: StateRow[] = [
  { id: 'al', fips: '01', name: 'Alabama', abbr: 'AL', value: 111 },
  { id: 'ca', fips: '06', name: 'California', abbr: 'CA', value: 52 },
  { id: 'fl', fips: '12', name: 'Florida', abbr: 'FL', value: 68 },
  { id: 'ga', fips: '13', name: 'Georgia', abbr: 'GA', value: 74 },
  { id: 'il', fips: '17', name: 'Illinois', abbr: 'IL', value: 49 },
  { id: 'la', fips: '22', name: 'Louisiana', abbr: 'LA', value: 88 },
  { id: 'ms', fips: '28', name: 'Mississippi', abbr: 'MS', value: 119 },
  { id: 'mo', fips: '29', name: 'Missouri', abbr: 'MO', value: 126 },
  { id: 'ny', fips: '36', name: 'New York', abbr: 'NY', value: 45 },
  { id: 'tx', fips: '48', name: 'Texas', abbr: 'TX', value: 71 },
  { id: 'wi', fips: '55', name: 'Wisconsin', abbr: 'WI', value: 83 },
];

const CDC_TESTING: StateRow[] = [
  { id: 'ca', fips: '06', name: 'California', abbr: 'CA', value: 8 },
  { id: 'fl', fips: '12', name: 'Florida', abbr: 'FL', value: 12 },
  { id: 'ga', fips: '13', name: 'Georgia', abbr: 'GA', value: 14 },
  { id: 'il', fips: '17', name: 'Illinois', abbr: 'IL', value: 9 },
  { id: 'la', fips: '22', name: 'Louisiana', abbr: 'LA', value: 18 },
  { id: 'md', fips: '24', name: 'Maryland', abbr: 'MD', value: 7 },
  { id: 'mi', fips: '26', name: 'Michigan', abbr: 'MI', value: 6 },
  { id: 'mo', fips: '29', name: 'Missouri', abbr: 'MO', value: 24 },
  { id: 'ms', fips: '28', name: 'Mississippi', abbr: 'MS', value: 30 },
  { id: 'nc', fips: '37', name: 'North Carolina', abbr: 'NC', value: 11 },
  { id: 'nj', fips: '34', name: 'New Jersey', abbr: 'NJ', value: 5 },
  { id: 'ny', fips: '36', name: 'New York', abbr: 'NY', value: 4 },
  { id: 'oh', fips: '39', name: 'Ohio', abbr: 'OH', value: 13 },
  { id: 'pa', fips: '42', name: 'Pennsylvania', abbr: 'PA', value: 10 },
  { id: 'sc', fips: '45', name: 'South Carolina', abbr: 'SC', value: 22 },
  { id: 'tn', fips: '47', name: 'Tennessee', abbr: 'TN', value: 19 },
  { id: 'tx', fips: '48', name: 'Texas', abbr: 'TX', value: 15 },
  { id: 'va', fips: '51', name: 'Virginia', abbr: 'VA', value: 8 },
];

const ANALYSES: Analysis[] = [
  {
    id: 'rw-cities',
    shortTitle: 'Ryan White — cities',
    eyebrow: 'High-burden metropolitan areas',
    headline: 'Ending Ryan White funding would concentrate excess infections in major metros.',
    question:
      'If federal Ryan White HIV/AIDS Program funding were to end, how many additional HIV infections would follow in the country’s highest-burden metropolitan areas?',
    geography: 'city',
    metric: {
      label: 'Additional HIV infections by 2030',
      unit: 'count',
      description:
        'Projected new infections under permanent program cessation, relative to continued funding. Marker area scales with magnitude.',
    },
    cityData: RW_MSA,
    summary: {
      value: '75,436',
      label: 'additional infections',
      detail: 'Projected across high-burden metros from 2025 to 2030.',
    },
    citation: 'Forster et al.',
    journal: 'Annals of Internal Medicine',
    year: 2025,
    href: '/publications',
    portalUrl: 'https://jheem.org/ryan-white',
  },
  {
    id: 'rw-states',
    shortTitle: 'Ryan White — states',
    eyebrow: 'State-level burden',
    headline: 'The same funding shock would fall unevenly across high-burden states.',
    question:
      'Aggregated to the state level, how unevenly would the impact of Ryan White cessation fall across the 11 states with the highest HIV burden?',
    geography: 'state',
    metric: {
      label: 'Percent increase in HIV incidence by 2030',
      unit: 'percent',
      description:
        'Projected percent increase in new infections under cessation, relative to continued funding. Color intensity scales with magnitude.',
    },
    stateData: RW_STATE,
    summary: {
      value: '+126%',
      label: 'largest modeled increase',
      detail: 'State-level percent increase under the cessation scenario.',
    },
    citation: 'Zalesak et al.',
    journal: 'American Journal of Public Health',
    year: 2026,
    href: '/publications',
    portalUrl: 'https://jheem.org/ryan-white-state-level/explorer/ajph',
  },
  {
    id: 'cdc-testing',
    shortTitle: 'CDC testing',
    eyebrow: '18 states',
    headline: 'Testing cuts would create the largest proportional increases in rural-burden states.',
    question:
      'How would ending CDC-funded HIV testing programs reshape the HIV epidemic across the 18 states that receive the bulk of these funds?',
    geography: 'state',
    metric: {
      label: 'Percent increase in HIV incidence by 2030',
      unit: 'percent',
      description:
        'Projected percent increase under testing program cessation, relative to continued funding. Color intensity scales with magnitude.',
    },
    stateData: CDC_TESTING,
    summary: {
      value: '+30%',
      label: 'largest modeled increase',
      detail: 'Projected state-level incidence increase by 2030.',
    },
    citation: 'Balasubramanian et al.',
    journal: 'Clinical Infectious Diseases',
    year: 2026,
    href: '/publications',
    portalUrl: 'https://jheem.org/cdc-testing',
  },
];

const HOPKINS_BLUE = '#002D72';
const HOPKINS_INK = '#0f172a';
const STATE_BASE_FILL = '#f1f5f9';
const STATE_BASE_STROKE = '#cbd5e1';
const CITY_MAX_RADIUS = 26;
const CITY_MIN_RADIUS = 4;

function formatValue(value: number, unit: 'count' | 'percent'): string {
  if (unit === 'percent') return `+${value}%`;
  return value.toLocaleString('en-US');
}

// Sqrt scale keeps the *area* of each circle proportional to the value, which
// is the correct perceptual encoding for magnitude on a proportional-symbol
// map. (Linear radius double-counts because area grows as r^2.)
function radiusFor(value: number, max: number, maxR: number, minR: number) {
  if (value <= 0) return minR;
  const t = Math.sqrt(value / max);
  return minR + (maxR - minR) * t;
}

function choroplethColor(value: number, max: number): string {
  if (max <= 0) return STATE_BASE_FILL;
  const t = Math.max(0, Math.min(1, value / max));
  // Sequential single-hue ramp from very-light slate to Hopkins blue.
  const stops = [
    { t: 0.0, c: [241, 245, 249] },
    { t: 0.25, c: [186, 209, 232] },
    { t: 0.5, c: [115, 158, 200] },
    { t: 0.75, c: [50, 99, 156] },
    { t: 1.0, c: [0, 45, 114] },
  ];
  let lo = stops[0];
  let hi = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (t >= stops[i].t && t <= stops[i + 1].t) {
      lo = stops[i];
      hi = stops[i + 1];
      break;
    }
  }
  const span = hi.t - lo.t || 1;
  const local = (t - lo.t) / span;
  const r = Math.round(lo.c[0] + (hi.c[0] - lo.c[0]) * local);
  const g = Math.round(lo.c[1] + (hi.c[1] - lo.c[1]) * local);
  const b = Math.round(lo.c[2] + (hi.c[2] - lo.c[2]) * local);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function RealResultsMap() {
  const [activeId, setActiveId] = useState<string>(ANALYSES[0].id);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = ANALYSES.find(a => a.id === activeId)!;

  const ranked = useMemo(() => {
    if (active.geography === 'city') {
      return [...(active.cityData ?? [])].sort((a, b) => b.value - a.value);
    }
    return [...(active.stateData ?? [])].sort((a, b) => b.value - a.value);
  }, [active]);

  const maxValue = ranked[0]?.value ?? 0;

  const cityFipsToRow = useMemo(() => {
    if (active.geography !== 'state') return new Map<string, StateRow>();
    const m = new Map<string, StateRow>();
    (active.stateData ?? []).forEach(s => m.set(s.fips, s));
    return m;
  }, [active]);

  const getStateFill = (stateId: string): string | undefined => {
    if (active.geography !== 'state') return undefined;
    const row = cityFipsToRow.get(stateId);
    if (!row) return STATE_BASE_FILL;
    return choroplethColor(row.value, maxValue);
  };

  const hoveredRow = ranked.find(r => r.id === hovered);
  const figureNote =
    active.geography === 'city'
      ? 'Marker area scales with projected additional infections.'
      : `${ranked.length} states modeled · range ${ranked[ranked.length - 1]?.value}–${maxValue}%`;
  const visibleRanked = active.geography === 'city' ? ranked.slice(0, 12) : ranked;
  const hiddenCount = ranked.length - visibleRanked.length;

  return (
    <div className="not-prose">
      <div className="mb-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[color:var(--color-rule)] text-sm">
        {ANALYSES.map(a => {
          const isActive = a.id === activeId;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => {
                setActiveId(a.id);
                setHovered(null);
              }}
              aria-pressed={isActive}
              className={[
                'relative -mb-px py-3 transition-colors',
                isActive
                  ? 'text-[color:var(--color-ink)] font-medium'
                  : 'text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]',
              ].join(' ')}
              style={{
                borderBottom: isActive ? `2px solid ${HOPKINS_BLUE}` : '2px solid transparent',
              }}
            >
              {a.shortTitle}
            </button>
          );
        })}
      </div>

      <figure className="m-0 border-y border-[color:var(--color-rule)] bg-white">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              {active.eyebrow}
            </p>
            <div className="mt-3 grid gap-5 md:grid-cols-[minmax(0,1fr)_13rem]">
              <div>
                <h3 className="max-w-3xl font-serif text-2xl leading-tight text-[color:var(--color-ink)] md:text-3xl">
                  {active.headline}
                </h3>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-[color:var(--color-ink)]">
                  {active.question}
                </p>
              </div>
              <div className="border-t border-[color:var(--color-rule)] pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-1">
                <div className="font-serif text-4xl leading-none text-[color:var(--color-ink)]">
                  {active.summary.value}
                </div>
                <p className="mt-2 text-sm font-medium leading-snug text-[color:var(--color-ink)]">
                  {active.summary.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[color:var(--color-muted)]">
                  {active.summary.detail}
                </p>
              </div>
            </div>

            <div className="mt-7 bg-[#fbfcfe]">
              <USMap
                className="w-full h-auto"
                style={{ maxHeight: 540 }}
                ariaLabel={`${active.metric.label} map for ${active.shortTitle}`}
              >
                {active.geography === 'state' ? (
                  <USStates
                    stroke="#ffffff"
                    strokeWidth={0.8}
                    getFill={getStateFill}
                    onStateEnter={(fips) => {
                      const row = (active.stateData ?? []).find(s => s.fips === fips);
                      if (row) setHovered(row.id);
                    }}
                    onStateLeave={() => setHovered(null)}
                    highlightedId={
                      hovered
                        ? (active.stateData ?? []).find(s => s.id === hovered)?.fips ?? null
                        : null
                    }
                    highlightStroke={HOPKINS_INK}
                    highlightStrokeWidth={1.5}
                  />
                ) : (
                  <>
                    <USStates fill={STATE_BASE_FILL} stroke={STATE_BASE_STROKE} strokeWidth={0.6} />
                    {(active.cityData ?? []).map(city => {
                      const isHovered = hovered === city.id;
                      const r = radiusFor(city.value, maxValue, CITY_MAX_RADIUS, CITY_MIN_RADIUS);
                      return (
                        <USMarker key={city.id} coordinates={city.coords}>
                          <circle
                            r={r}
                            fill={HOPKINS_BLUE}
                            fillOpacity={isHovered ? 0.95 : 0.68}
                            stroke="#ffffff"
                            strokeWidth={1.25}
                            onMouseEnter={() => setHovered(city.id)}
                            onMouseLeave={() => setHovered(null)}
                            style={{ cursor: 'pointer', transition: 'fill-opacity 120ms' }}
                          />
                          {isHovered && (
                            <text
                              textAnchor="middle"
                              y={-r - 7}
                              style={{
                                fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                                fontSize: 11,
                                fontWeight: 650,
                                fill: HOPKINS_INK,
                                pointerEvents: 'none',
                                fontVariantNumeric: 'tabular-nums',
                              }}
                            >
                              {city.short} · {formatValue(city.value, 'count')}
                            </text>
                          )}
                        </USMarker>
                      );
                    })}
                  </>
                )}
              </USMap>
            </div>

            <div className="mt-3 flex flex-col gap-3 text-xs text-[color:var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
              <span>{figureNote}</span>
              <LegendStrip active={active} maxValue={maxValue} />
            </div>
          </div>

          <aside className="border-t border-[color:var(--color-rule)] p-5 lg:border-l lg:border-t-0 lg:p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                {active.geography === 'city' ? 'Highest totals' : 'Highest increases'}
              </h4>
              <span className="text-xs text-[color:var(--color-muted)]">
                {active.metric.unit === 'count' ? 'infections' : '% increase'}
              </span>
            </div>
            <ol className="mt-3 divide-y divide-[color:var(--color-rule)] border-t border-[color:var(--color-rule)]">
              {visibleRanked.map((row, idx) => {
                const isHovered = hovered === row.id;
                const barWidth = maxValue > 0 ? `${Math.max(5, (row.value / maxValue) * 100)}%` : '0%';
                return (
                  <li
                    key={row.id}
                    tabIndex={0}
                    onFocus={() => setHovered(row.id)}
                    onBlur={() => setHovered(null)}
                    onMouseEnter={() => setHovered(row.id)}
                    onMouseLeave={() => setHovered(null)}
                    className={[
                      'py-2.5 text-sm outline-none transition-colors',
                      isHovered ? 'bg-[color:var(--color-rule)]/40' : '',
                    ].join(' ')}
                  >
                    <div className="flex items-baseline gap-3 px-2">
                      <span
                        className="w-6 text-right text-xs text-[color:var(--color-muted)] tabular-nums"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {idx + 1}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[color:var(--color-ink)]">
                        {'short' in row ? row.short : row.name}
                      </span>
                      <span
                        className="font-medium text-[color:var(--color-ink)]"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {formatValue(row.value, active.metric.unit)}
                      </span>
                    </div>
                    <div className="mt-2 ml-11 mr-2 h-px bg-[color:var(--color-rule)]">
                      <div
                        className="h-px"
                        style={{ width: barWidth, backgroundColor: HOPKINS_BLUE }}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>
            {hiddenCount > 0 && (
              <p className="mt-3 text-xs leading-relaxed text-[color:var(--color-muted)]">
                Showing the top {visibleRanked.length}; {hiddenCount} additional metros are
                included on the map and in the portal.
              </p>
            )}
          </aside>
        </div>
      </figure>

      <div className="mt-6 pt-4 border-t border-[color:var(--color-rule)] flex flex-col md:flex-row gap-2 md:items-baseline md:justify-between text-sm">
        <div className="text-[color:var(--color-muted)]">
          <span className="text-[color:var(--color-ink)]">{active.metric.label}.</span>{' '}
          {active.metric.description} {active.citation},{' '}
          <em className="not-italic">{active.journal}</em> ({active.year}).
        </div>
        <a
          href={active.portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
        >
          Explore in the JHEEM portal →
        </a>
      </div>

      {hoveredRow && (
        <div className="sr-only" aria-live="polite">
          {('short' in hoveredRow ? hoveredRow.short : hoveredRow.name)}:{' '}
          {formatValue(hoveredRow.value, active.metric.unit)}
        </div>
      )}
    </div>
  );
}

function LegendStrip({ active, maxValue }: { active: Analysis; maxValue: number }) {
  if (active.geography === 'state') {
    const samples = [0, 0.25, 0.5, 0.75, 1];
    return (
      <div className="flex items-center gap-2">
        <span className="tabular-nums">0</span>
        <div className="flex h-2 w-32">
          {samples.map((t, i) => (
            <div
              key={i}
              className="flex-1"
              style={{ background: choroplethColor(t * maxValue, maxValue) }}
            />
          ))}
        </div>
        <span className="tabular-nums">+{maxValue}%</span>
      </div>
    );
  }
  // Proportional-symbol legend: two reference circles, small and large.
  const small = Math.round(maxValue / 8);
  return (
    <div className="flex items-center gap-3">
      <svg width="80" height="32" viewBox="0 0 80 32" aria-hidden="true">
        <circle cx="14" cy="22" r={radiusFor(small, maxValue, CITY_MAX_RADIUS, CITY_MIN_RADIUS)} fill={HOPKINS_BLUE} fillOpacity={0.68} stroke="#fff" strokeWidth={1} />
        <circle cx="58" cy="22" r={radiusFor(maxValue, maxValue, CITY_MAX_RADIUS, CITY_MIN_RADIUS)} fill={HOPKINS_BLUE} fillOpacity={0.68} stroke="#fff" strokeWidth={1} />
      </svg>
      <span className="tabular-nums">
        {small.toLocaleString('en-US')} – {maxValue.toLocaleString('en-US')}
      </span>
    </div>
  );
}
