'use client';

import { useId, useMemo, type CSSProperties, type ReactNode } from 'react';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import statesTopo from 'us-atlas/states-10m.json';

// Matches react-simple-maps' default ComposableMap (width 800, height 600,
// projection scale 1070) so existing marker radii and font sizes — calibrated
// against that viewBox — still read the same on screen.
const VIEWBOX_WIDTH = 800;
const VIEWBOX_HEIGHT = 600;

const projection = geoAlbersUsa()
  .scale(1070)
  .translate([VIEWBOX_WIDTH / 2, VIEWBOX_HEIGHT / 2]);

const pathGen = geoPath(projection);

const topology = statesTopo as unknown as Topology;
const statesCollection = feature(
  topology,
  topology.objects.states as GeometryCollection,
) as FeatureCollection<Geometry, GeoJsonProperties>;

const STATE_PATHS: ReadonlyArray<{ id: string; d: string }> = statesCollection.features.map(
  (f: Feature, i: number) => ({
    id: String(f.id ?? i),
    d: pathGen(f) ?? '',
  }),
);

interface USMapProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}

export function USMap({ children, className, style, ariaLabel }: USMapProps) {
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={style}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </svg>
  );
}

interface USStatesProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  hoverFill?: string;
  getFill?: (stateId: string) => string | undefined;
  onStateEnter?: (stateId: string) => void;
  onStateLeave?: (stateId: string) => void;
  highlightedId?: string | null;
  highlightStroke?: string;
  highlightStrokeWidth?: number;
}

export function USStates({
  fill,
  stroke,
  strokeWidth,
  hoverFill,
  getFill,
  onStateEnter,
  onStateLeave,
  highlightedId,
  highlightStroke,
  highlightStrokeWidth,
}: USStatesProps) {
  // useId() keeps the hover-style scope unique per instance so multiple maps
  // on the same page don't bleed styles into each other.
  const rawId = useId();
  const cls = `us-state-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const paths = useMemo(() => STATE_PATHS, []);
  return (
    <g>
      {hoverFill && (
        <style>{`.${cls}{transition:fill 150ms}.${cls}:hover{fill:${hoverFill}}`}</style>
      )}
      {paths.map(p => {
        const isHighlighted = highlightedId === p.id;
        const resolvedFill = getFill?.(p.id) ?? fill;
        return (
          <path
            key={p.id}
            d={p.d}
            fill={resolvedFill}
            stroke={isHighlighted && highlightStroke ? highlightStroke : stroke}
            strokeWidth={isHighlighted && highlightStrokeWidth ? highlightStrokeWidth : strokeWidth}
            className={cls}
            style={{ outline: 'none', cursor: onStateEnter ? 'pointer' : undefined }}
            onMouseEnter={onStateEnter ? () => onStateEnter(p.id) : undefined}
            onMouseLeave={onStateLeave ? () => onStateLeave(p.id) : undefined}
          />
        );
      })}
    </g>
  );
}

interface USMarkerProps {
  coordinates: [number, number];
  children?: ReactNode;
}

export function USMarker({ coordinates, children }: USMarkerProps) {
  const projected = projection(coordinates);
  if (!projected) return null;
  // Round to sub-pixel precision so SSR and client render identical strings.
  // Raw projection output can drift in the last float64 digit across V8
  // contexts, which trips React's hydration check.
  const x = Math.round(projected[0] * 10000) / 10000;
  const y = Math.round(projected[1] * 10000) / 10000;
  return <g transform={`translate(${x}, ${y})`}>{children}</g>;
}
