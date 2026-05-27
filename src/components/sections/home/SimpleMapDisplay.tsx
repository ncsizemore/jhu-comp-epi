'use client';

import { useState } from 'react';
import { USMap, USStates, USMarker } from '@/components/maps/us-map';

type City = { name: string; coordinates: [number, number] };

const CITIES: City[] = [
  { name: "Los Angeles, CA", coordinates: [-118.2437, 34.0522] },
  { name: "San Francisco, CA", coordinates: [-122.4194, 37.7749] },
  { name: "San Diego, CA", coordinates: [-117.1611, 32.7157] },
  { name: "Riverside, CA", coordinates: [-117.3961, 33.9533] },
  { name: "Houston, TX", coordinates: [-95.3698, 29.7604] },
  { name: "Dallas, TX", coordinates: [-96.7970, 32.7767] },
  { name: "San Antonio, TX", coordinates: [-98.4936, 29.4241] },
  { name: "Austin, TX", coordinates: [-97.7431, 30.2672] },
  { name: "Miami, FL", coordinates: [-80.1918, 25.7617] },
  { name: "Orlando, FL", coordinates: [-81.3792, 28.5383] },
  { name: "Jacksonville, FL", coordinates: [-81.6557, 30.3322] },
  { name: "New York, NY", coordinates: [-74.0059, 40.7128] },
  { name: "Philadelphia, PA", coordinates: [-75.1652, 39.9526] },
  { name: "Washington, DC", coordinates: [-77.0369, 38.9072] },
  { name: "Atlanta, GA", coordinates: [-84.3880, 33.7490] },
  { name: "Charlotte, NC", coordinates: [-80.8431, 35.2271] },
  { name: "Boston, MA", coordinates: [-71.0589, 42.3601] },
  { name: "Baltimore, MD", coordinates: [-76.6122, 39.2904] },
  { name: "Chicago, IL", coordinates: [-87.6298, 41.8781] },
  { name: "Indianapolis, IN", coordinates: [-86.1581, 39.7684] },
  { name: "Milwaukee, WI", coordinates: [-87.9065, 43.0389] },
  { name: "Phoenix, AZ", coordinates: [-112.0740, 33.4484] },
  { name: "Las Vegas, NV", coordinates: [-115.1398, 36.1699] },
  { name: "Oklahoma City, OK", coordinates: [-97.5164, 35.4676] },
  { name: "Kansas City, MO", coordinates: [-94.5786, 39.0997] },
  { name: "St. Louis, MO", coordinates: [-90.1994, 38.6270] },
  { name: "Memphis, TN", coordinates: [-90.0490, 35.1495] },
  { name: "New Orleans, LA", coordinates: [-90.0715, 29.9511] },
  { name: "Seattle, WA", coordinates: [-122.3321, 47.6062] },
  { name: "Portland, OR", coordinates: [-122.6765, 45.5152] },
  { name: "Denver, CO", coordinates: [-104.9903, 39.7392] },
  { name: "Salt Lake City, UT", coordinates: [-111.8910, 40.7608] },
];

const LABELED = new Set([
  'New York, NY',
  'Los Angeles, CA',
  'Miami, FL',
  'Houston, TX',
  'Atlanta, GA',
  'Chicago, IL',
  'San Francisco, CA',
]);

export default function SimpleMapDisplay() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <figure className="m-0">
      <div className="border border-[color:var(--color-rule)] bg-white">
        <USMap className="w-full h-auto" style={{ maxHeight: 540 }}>
          <USStates fill="#f1f5f9" stroke="#cbd5e1" strokeWidth={0.7} hoverFill="#e2e8f0" />

          {CITIES.map(city => {
            const isHovered = hovered === city.name;
            const isLabeled = LABELED.has(city.name);
            return (
              <USMarker key={city.name} coordinates={city.coordinates}>
                <circle
                  r={isHovered ? 7 : 5}
                  fill={isHovered ? '#0f172a' : '#002D72'}
                  stroke="#ffffff"
                  strokeWidth={1.5}
                  onMouseEnter={() => setHovered(city.name)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'pointer', transition: 'r 120ms, fill 120ms' }}
                />
                {(isLabeled || isHovered) && (
                  <text
                    textAnchor="middle"
                    y={-11}
                    style={{
                      fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                      fontSize: 11,
                      fontWeight: isHovered ? 600 : 500,
                      fill: isHovered ? '#0f172a' : '#334155',
                      pointerEvents: 'none',
                    }}
                  >
                    {city.name.split(',')[0]}
                  </text>
                )}
              </USMarker>
            );
          })}
        </USMap>
      </div>
      <figcaption className="mt-3 text-sm text-[color:var(--color-muted)]">
        32 metropolitan areas covered by JHEEM and SHIELD modeling frameworks.
        Hover a marker to see the city.
      </figcaption>
    </figure>
  );
}
