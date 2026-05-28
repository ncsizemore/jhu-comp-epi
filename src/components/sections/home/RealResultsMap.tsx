'use client';

import { useMemo, useState } from 'react';
import { USMap, USStates, USMarker } from '@/components/maps/us-map';
import type {
  FindingsCityRow,
  FindingsMapProps,
  FindingsStateRow,
} from './findings-map-types';

const HOPKINS_BLUE = '#002D72';
const HOPKINS_BLUE_700 = '#123f7d';
const HOPKINS_GOLD = '#F2C413';
const HOPKINS_INK = '#0f172a';
const ELECTRIC_CYAN = '#5de2e7';
const MAP_CANVAS_TOP = '#06111f';
const MAP_CANVAS_BOTTOM = '#0b2630';
const STATE_BASE_FILL = '#18313a';
const STATE_BASE_STROKE = '#52717a';
const CITY_MAX_RADIUS = 25;
const CITY_MIN_RADIUS = 4;
const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;
const CITY_CALLOUT_LIMIT = 5;
const STATE_CALLOUT_LIMIT = 4;

type CalloutAnchor = 'start' | 'end' | 'middle';

type CalloutOffset = {
  dx: number;
  dy: number;
  anchor?: CalloutAnchor;
  width?: number;
};

const CITY_CALLOUT_OFFSETS: Record<string, CalloutOffset> = {
  'C.12060': { dx: 42, dy: -14, anchor: 'start', width: 110 }, // Atlanta
  'C.19100': { dx: -38, dy: -34, anchor: 'end', width: 112 }, // Dallas
  'C.26420': { dx: -38, dy: 38, anchor: 'end', width: 110 }, // Houston
  'C.33100': { dx: 12, dy: 30, anchor: 'start', width: 102 }, // Miami
  'C.35620': { dx: -28, dy: -44, anchor: 'end', width: 124 }, // New York
};

const STATE_LABEL_COORDS: Record<string, [number, number]> = {
  al: [-86.8, 32.8],
  ca: [-119.5, 36.5],
  fl: [-81.7, 27.8],
  ga: [-83.4, 32.7],
  il: [-89.2, 40.0],
  la: [-91.9, 30.9],
  md: [-76.7, 39.0],
  mi: [-84.6, 44.3],
  mo: [-92.5, 38.5],
  ms: [-89.7, 32.7],
  nc: [-79.1, 35.5],
  nj: [-74.7, 40.1],
  ny: [-75.5, 42.9],
  oh: [-82.8, 40.4],
  pa: [-77.7, 40.9],
  sc: [-80.9, 33.8],
  tn: [-86.4, 35.8],
  tx: [-99.9, 31.1],
  va: [-78.4, 37.5],
  wi: [-89.6, 44.6],
};

const STATE_CALLOUT_OFFSETS: Record<string, CalloutOffset> = {
  al: { dx: 28, dy: -38, anchor: 'start', width: 72 },
  fl: { dx: 34, dy: 34, anchor: 'start', width: 72 },
  il: { dx: 34, dy: -34, anchor: 'start', width: 72 },
  la: { dx: -30, dy: 38, anchor: 'end', width: 72 },
  mo: { dx: -38, dy: -34, anchor: 'end', width: 72 },
  ms: { dx: 36, dy: 30, anchor: 'start', width: 72 },
  sc: { dx: 38, dy: 8, anchor: 'start', width: 72 },
  tn: { dx: 34, dy: -30, anchor: 'start', width: 72 },
  wi: { dx: 32, dy: -34, anchor: 'start', width: 72 },
};

function formatValue(value: number, unit: 'count' | 'percent'): string {
  if (unit === 'percent') return `+${value}%`;
  return value.toLocaleString('en-US');
}

function formatCompactValue(value: number, unit: 'count' | 'percent'): string {
  if (unit === 'percent') return `+${value}%`;
  if (value >= 1000) {
    const rounded = value >= 10000 ? Math.round(value / 1000) : Math.round(value / 100) / 10;
    return `${rounded}k`;
  }
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
  // Dark-surface sequential ramp: modeled states glow against the base landmass.
  const stops = [
    { t: 0.0, c: [39, 86, 99] },
    { t: 0.24, c: [26, 126, 154] },
    { t: 0.5, c: [51, 190, 210] },
    { t: 0.78, c: [137, 218, 143] },
    { t: 1.0, c: [242, 196, 19] },
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

export default function RealResultsMap({ analyses }: FindingsMapProps) {
  const [activeId, setActiveId] = useState<string>(analyses[0].id);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = analyses.find(a => a.id === activeId) ?? analyses[0];

  const ranked = useMemo(() => {
    if (active.geography === 'city') {
      return [...(active.cityData ?? [])].sort((a, b) => b.value - a.value);
    }
    return [...(active.stateData ?? [])].sort((a, b) => b.value - a.value);
  }, [active]);

  const maxValue = ranked[0]?.value ?? 0;
  const cityRows = active.geography === 'city' ? active.cityData ?? [] : [];
  const stateRows = active.geography === 'state' ? active.stateData ?? [] : [];
  const drawnCityRows = [...cityRows].sort((a, b) => a.value - b.value);
  const cityCalloutRows = [...cityRows]
    .sort((a, b) => b.value - a.value)
    .slice(0, CITY_CALLOUT_LIMIT);
  const stateCalloutRows = [...stateRows]
    .sort((a, b) => b.value - a.value)
    .slice(0, STATE_CALLOUT_LIMIT);

  const cityFipsToRow = useMemo(() => {
    if (active.geography !== 'state') return new Map<string, FindingsStateRow>();
    const m = new Map<string, FindingsStateRow>();
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
  const visibleRanked = ranked.length > 12 ? ranked.slice(0, 10) : ranked;
  const hiddenCount = ranked.length - visibleRanked.length;
  const hiddenLocationLabel = active.geography === 'city' ? 'metros' : 'states';
  const calloutIds = new Set(
    active.geography === 'city'
      ? cityCalloutRows.map(row => row.id)
      : stateCalloutRows.map(row => row.id),
  );
  const topAccentIds = new Set(ranked.slice(0, active.geography === 'city' ? 5 : 4).map(row => row.id));

  return (
    <div className="not-prose">
      <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[color:var(--color-rule)] text-sm">
        {analyses.map(a => {
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

      <figure className="m-0 overflow-hidden border border-[color:var(--color-rule)] bg-white shadow-[0_12px_38px_rgba(15,23,42,0.08)]">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="p-5 sm:p-6 lg:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              {active.eyebrow}
            </p>
            <div className="mt-3 grid gap-5 md:grid-cols-[minmax(0,1fr)_13rem]">
              <div>
                <h3 className="max-w-3xl font-serif text-[1.65rem] leading-tight text-[color:var(--color-ink)] md:text-3xl">
                  {active.headline}
                </h3>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-[color:var(--color-ink)]">
                  {active.question}
                </p>
              </div>
              <div className="border-t border-[color:var(--color-rule)] bg-[#f6f9fb] p-4 md:border-l md:border-t-0 md:pt-4">
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

            <div className="mt-6 overflow-hidden border border-[#225568] bg-[#071322] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_42px_rgba(0,0,0,0.22)]">
              <USMap
                className="w-full h-auto"
                style={{ maxHeight: 540 }}
                ariaLabel={`${active.metric.label} map for ${active.shortTitle}`}
              >
                <defs>
                  <linearGradient id="map-canvas-gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={MAP_CANVAS_TOP} />
                    <stop offset="100%" stopColor={MAP_CANVAS_BOTTOM} />
                  </linearGradient>
                  <radialGradient id="city-marker-fill" cx="34%" cy="26%" r="78%">
                    <stop offset="0%" stopColor="#f7feff" stopOpacity="0.98" />
                    <stop offset="38%" stopColor={ELECTRIC_CYAN} stopOpacity="0.96" />
                    <stop offset="100%" stopColor={HOPKINS_BLUE_700} stopOpacity="0.94" />
                  </radialGradient>
                  <pattern id="map-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                    <path d="M80 0H0V80" fill="none" stroke="#5de2e7" strokeWidth="0.65" />
                  </pattern>
                  <filter id="state-glow" x="-18%" y="-18%" width="136%" height="136%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2.8" floodColor="#5de2e7" floodOpacity="0.22" />
                  </filter>
                  <filter id="marker-shadow" x="-60%" y="-60%" width="220%" height="220%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4.2" floodColor="#5de2e7" floodOpacity="0.62" />
                    <feDropShadow dx="0" dy="2.5" stdDeviation="2.2" floodColor="#000000" floodOpacity="0.4" />
                  </filter>
                  <filter id="callout-shadow" x="-20%" y="-40%" width="140%" height="190%">
                    <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.42" />
                  </filter>
                </defs>
                <MapBackdrop />
                {active.geography === 'state' ? (
                  <>
                    <USStates
                      stroke="#071322"
                      strokeWidth={1.1}
                      getFill={getStateFill}
                      onStateEnter={(fips) => {
                        const row = stateRows.find(s => s.fips === fips);
                        if (row) setHovered(row.id);
                      }}
                      onStateLeave={() => setHovered(null)}
                      highlightedId={
                        hovered
                          ? stateRows.find(s => s.id === hovered)?.fips ?? null
                          : null
                      }
                      highlightStroke={HOPKINS_GOLD}
                      highlightStrokeWidth={2.3}
                    />
                    <g pointerEvents="none">
                      <USStates fill="none" stroke="#d8f8fb" strokeWidth={0.25} />
                    </g>
                    {stateCalloutRows.map((row, idx) => {
                      const coordinates = STATE_LABEL_COORDS[row.id];
                      if (!coordinates) return null;
                      const isHovered = hovered === row.id;
                      return (
                        <USMarker key={row.id} coordinates={coordinates}>
                          <g
                            onMouseEnter={() => setHovered(row.id)}
                            onMouseLeave={() => setHovered(null)}
                            style={{ cursor: 'pointer' }}
                          >
                            <StateCallout
                              row={row}
                              rank={idx + 1}
                              offset={STATE_CALLOUT_OFFSETS[row.id]}
                              emphasized={isHovered || idx === 0}
                            />
                          </g>
                        </USMarker>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <USStates fill={STATE_BASE_FILL} stroke={STATE_BASE_STROKE} strokeWidth={0.9} />
                    <g pointerEvents="none">
                      <USStates fill="none" stroke="#d8f8fb" strokeWidth={0.22} />
                    </g>
                    {drawnCityRows.map(city => {
                      const isHovered = hovered === city.id;
                      const isTop = topAccentIds.has(city.id);
                      const r = radiusFor(city.value, maxValue, CITY_MAX_RADIUS, CITY_MIN_RADIUS);
                      return (
                        <USMarker key={city.id} coordinates={city.coords}>
                          {isTop && !isHovered && (
                            <circle
                              className="map-marker-pulse"
                              r={r + 3}
                              fill="none"
                              stroke={HOPKINS_GOLD}
                              strokeWidth={1.5}
                              style={{ animationDelay: `${cityCalloutRows.findIndex(row => row.id === city.id) * 0.58}s` }}
                            />
                          )}
                          <circle
                            r={r}
                            className="map-marker-core"
                            fill="url(#city-marker-fill)"
                            fillOpacity={isHovered ? 0.98 : isTop ? 0.9 : 0.66}
                            stroke={isHovered ? '#ffffff' : isTop ? HOPKINS_GOLD : '#c4f5fb'}
                            strokeWidth={isHovered ? 2.2 : isTop ? 1.6 : 1.1}
                            filter={isTop ? 'url(#marker-shadow)' : undefined}
                            onMouseEnter={() => setHovered(city.id)}
                            onMouseLeave={() => setHovered(null)}
                            style={{ cursor: 'pointer' }}
                          />
                        </USMarker>
                      );
                    })}
                    {cityCalloutRows.map((city, idx) => {
                      const isHovered = hovered === city.id;
                      return (
                        <USMarker key={`${city.id}-callout`} coordinates={city.coords}>
                          <g
                            onMouseEnter={() => setHovered(city.id)}
                            onMouseLeave={() => setHovered(null)}
                            style={{ cursor: 'pointer' }}
                          >
                            <CityCallout
                              city={city}
                              rank={idx + 1}
                              offset={CITY_CALLOUT_OFFSETS[city.id]}
                              emphasized={isHovered || idx < 2}
                            />
                          </g>
                        </USMarker>
                      );
                    })}
                    {cityRows
                      .filter(city => hovered === city.id && !calloutIds.has(city.id))
                      .map(city => (
                        <USMarker key={`${city.id}-hover-callout`} coordinates={city.coords}>
                          <CityCallout
                            city={city}
                            offset={{ dx: 26, dy: -34, anchor: 'start', width: 116 }}
                            emphasized
                            hoverOnly
                          />
                        </USMarker>
                      ))}
                  </>
                )}
              </USMap>
            </div>
          </div>

          <aside className="border-t border-[color:var(--color-rule)] bg-[#f6f9fb] p-5 lg:border-l lg:border-t-0 lg:p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                {active.geography === 'city' ? 'Highest totals' : 'Highest increases'}
              </h4>
              <span className="text-xs text-[color:var(--color-muted)]">
                {active.metric.unit === 'count' ? 'infections' : '% increase'}
              </span>
            </div>
            <ol className="mt-3 divide-y divide-[#d9e4ea] border-t border-[#d9e4ea]">
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
                      isHovered ? 'bg-white' : '',
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
                    <div className="mt-2 ml-11 mr-2 h-1 bg-[#d9e4ea]">
                      <div
                        className="h-full"
                        style={{
                          width: barWidth,
                          background:
                            active.geography === 'state'
                              ? choroplethColor(row.value, maxValue)
                              : `linear-gradient(90deg, ${ELECTRIC_CYAN}, ${HOPKINS_GOLD})`,
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>
            {hiddenCount > 0 && (
              <p className="mt-3 text-xs leading-relaxed text-[color:var(--color-muted)]">
                Showing the top {visibleRanked.length}; {hiddenCount} additional{' '}
                {hiddenLocationLabel} are included on the map and in the portal.
              </p>
            )}
          </aside>
        </div>
      </figure>

      <div className="mt-5 grid gap-3 border-t border-[color:var(--color-rule)] pt-4 text-sm md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div>
          <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
            Source
          </span>
          <span className="mt-1 block leading-relaxed text-[color:var(--color-muted)]">
            <span className="text-[color:var(--color-ink)]">{active.metric.label}.</span>{' '}
            {active.citation}, <em className="not-italic">{active.journal}</em> ({active.year}).
          </span>
        </div>
        <a
          href={active.portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center border border-[color:var(--color-rule)] px-3 py-2 text-sm font-medium text-[color:var(--color-link)] transition-colors hover:border-[color:var(--color-link)]"
        >
          Open JHEEM portal
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

function MapBackdrop() {
  return (
    <g aria-hidden="true">
      <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#map-canvas-gradient)" />
      <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#map-grid)" opacity={0.16} />
      <path
        d="M78 476 C176 420 282 438 374 386 C486 324 594 356 724 286"
        fill="none"
        stroke={ELECTRIC_CYAN}
        strokeLinecap="round"
        strokeWidth={1.8}
        strokeDasharray="2 10"
        opacity={0.28}
      />
      <path
        d="M72 174 C184 216 302 184 418 228 C528 270 638 236 730 278"
        fill="none"
        stroke="#bff9ff"
        strokeLinecap="round"
        strokeWidth={1.2}
        strokeDasharray="1 12"
        opacity={0.34}
      />
      <path
        d="M96 516 C206 482 330 506 446 468 C552 432 638 448 724 406"
        fill="none"
        stroke={HOPKINS_GOLD}
        strokeDasharray="2 12"
        strokeLinecap="round"
        strokeWidth={1.4}
        opacity={0.22}
      />
      <text x="34" y="42" className="map-grid-label">
        MODEL FIELD / U.S.
      </text>
      <text x="34" y="568" className="map-grid-label">
        JHEEM SCENARIO SPACE
      </text>
    </g>
  );
}

function calloutGeometry(offset: CalloutOffset | undefined, width: number, height: number) {
  const dx = offset?.dx ?? 28;
  const dy = offset?.dy ?? -34;
  const anchor = offset?.anchor ?? 'start';
  const x = anchor === 'end' ? dx - width : anchor === 'middle' ? dx - width / 2 : dx;
  const y = dy - height / 2;
  const lineX = anchor === 'end' ? x + width : anchor === 'middle' ? dx : x;
  return { x, y, width, height, dx, dy, lineX };
}

function CityCallout({
  city,
  rank,
  offset,
  emphasized,
  hoverOnly,
}: {
  city: FindingsCityRow;
  rank?: number;
  offset?: CalloutOffset;
  emphasized?: boolean;
  hoverOnly?: boolean;
}) {
  const width = offset?.width ?? 116;
  const height = 38;
  const g = calloutGeometry(offset, width, height);
  const textX = g.x + 12;
  const rankColor = emphasized ? HOPKINS_GOLD : ELECTRIC_CYAN;

  return (
    <g className="map-callout" filter="url(#callout-shadow)" pointerEvents="none">
      <path
        className="map-leader-line"
        d={`M0 0 C ${g.dx * 0.22} ${g.dy * 0.36}, ${g.lineX - g.dx * 0.18} ${g.dy}, ${g.lineX} ${g.dy}`}
        fill="none"
        stroke={emphasized ? HOPKINS_GOLD : ELECTRIC_CYAN}
        strokeWidth={emphasized ? 1.25 : 0.9}
        strokeOpacity={emphasized ? 0.72 : 0.48}
      />
      <circle r={3.2} fill={rankColor} stroke="#071322" strokeWidth={1.1} />
      <rect
        x={g.x}
        y={g.y}
        width={g.width}
        height={g.height}
        rx={4}
        fill="#081a28"
        fillOpacity={hoverOnly || emphasized ? 0.96 : 0.84}
        stroke={emphasized ? HOPKINS_GOLD : '#2d9aaa'}
        strokeWidth={emphasized ? 1.1 : 0.8}
      />
      {rank && (
        <text
          x={g.x + g.width - 10}
          y={g.y + 14}
        textAnchor="end"
        className="map-callout-rank"
        >
          {rank}
        </text>
      )}
      <text x={textX} y={g.y + 16} className="map-callout-title">
        {city.short}
      </text>
      <text x={textX} y={g.y + 30} className="map-callout-value">
        {formatCompactValue(city.value, 'count')} projected
      </text>
    </g>
  );
}

function StateCallout({
  row,
  rank,
  offset,
  emphasized,
}: {
  row: FindingsStateRow;
  rank: number;
  offset?: CalloutOffset;
  emphasized?: boolean;
}) {
  const width = offset?.width ?? 72;
  const height = 30;
  const g = calloutGeometry(offset, width, height);

  return (
    <g className="map-callout" filter="url(#callout-shadow)" pointerEvents="none">
      <path
        className="map-leader-line"
        d={`M0 0 C ${g.dx * 0.25} ${g.dy * 0.3}, ${g.lineX - g.dx * 0.2} ${g.dy}, ${g.lineX} ${g.dy}`}
        fill="none"
        stroke={emphasized ? HOPKINS_GOLD : ELECTRIC_CYAN}
        strokeWidth={emphasized ? 1.2 : 0.9}
        strokeOpacity={emphasized ? 0.72 : 0.48}
      />
      <circle r={3.4} fill={emphasized ? HOPKINS_GOLD : ELECTRIC_CYAN} stroke="#071322" strokeWidth={1.1} />
      <rect
        x={g.x}
        y={g.y}
        width={g.width}
        height={g.height}
        rx={4}
        fill="#081a28"
        fillOpacity={emphasized ? 0.96 : 0.84}
        stroke={emphasized ? HOPKINS_GOLD : '#2d9aaa'}
        strokeWidth={emphasized ? 1.1 : 0.8}
      />
      <text x={g.x + 9} y={g.y + 13} className="map-callout-title">
        {row.abbr}
      </text>
      <text x={g.x + 9} y={g.y + 25} className="map-callout-value">
        {formatCompactValue(row.value, 'percent')}
      </text>
      <text x={g.x + g.width - 8} y={g.y + 13} textAnchor="end" className="map-callout-rank">
        {rank}
      </text>
    </g>
  );
}
