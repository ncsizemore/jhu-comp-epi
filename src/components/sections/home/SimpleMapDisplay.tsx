'use client';

import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

export default function SimpleMapDisplay() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

  const cities = [
    { name: "Los Angeles, CA", coordinates: [-118.2437, 34.0522] as [number, number] },
    { name: "San Francisco, CA", coordinates: [-122.4194, 37.7749] as [number, number] },
    { name: "San Diego, CA", coordinates: [-117.1611, 32.7157] as [number, number] },
    { name: "Riverside, CA", coordinates: [-117.3961, 33.9533] as [number, number] },
    { name: "Houston, TX", coordinates: [-95.3698, 29.7604] as [number, number] },
    { name: "Dallas, TX", coordinates: [-96.7970, 32.7767] as [number, number] },
    { name: "San Antonio, TX", coordinates: [-98.4936, 29.4241] as [number, number] },
    { name: "Austin, TX", coordinates: [-97.7431, 30.2672] as [number, number] },
    { name: "Miami, FL", coordinates: [-80.1918, 25.7617] as [number, number] },
    { name: "Orlando, FL", coordinates: [-81.3792, 28.5383] as [number, number] },
    { name: "Jacksonville, FL", coordinates: [-81.6557, 30.3322] as [number, number] },
    { name: "New York, NY", coordinates: [-74.0059, 40.7128] as [number, number] },
    { name: "Philadelphia, PA", coordinates: [-75.1652, 39.9526] as [number, number] },
    { name: "Washington, DC", coordinates: [-77.0369, 38.9072] as [number, number] },
    { name: "Atlanta, GA", coordinates: [-84.3880, 33.7490] as [number, number] },
    { name: "Charlotte, NC", coordinates: [-80.8431, 35.2271] as [number, number] },
    { name: "Boston, MA", coordinates: [-71.0589, 42.3601] as [number, number] },
    { name: "Baltimore, MD", coordinates: [-76.6122, 39.2904] as [number, number] },
    { name: "Chicago, IL", coordinates: [-87.6298, 41.8781] as [number, number] },
    { name: "Indianapolis, IN", coordinates: [-86.1581, 39.7684] as [number, number] },
    { name: "Milwaukee, WI", coordinates: [-87.9065, 43.0389] as [number, number] },
    { name: "Phoenix, AZ", coordinates: [-112.0740, 33.4484] as [number, number] },
    { name: "Las Vegas, NV", coordinates: [-115.1398, 36.1699] as [number, number] },
    { name: "Oklahoma City, OK", coordinates: [-97.5164, 35.4676] as [number, number] },
    { name: "Kansas City, MO", coordinates: [-94.5786, 39.0997] as [number, number] },
    { name: "St. Louis, MO", coordinates: [-90.1994, 38.6270] as [number, number] },
    { name: "Memphis, TN", coordinates: [-90.0490, 35.1495] as [number, number] },
    { name: "New Orleans, LA", coordinates: [-90.0715, 29.9511] as [number, number] },
    { name: "Seattle, WA", coordinates: [-122.3321, 47.6062] as [number, number] },
    { name: "Portland, OR", coordinates: [-122.6765, 45.5152] as [number, number] },
    { name: "Denver, CO", coordinates: [-104.9903, 39.7392] as [number, number] },
    { name: "Salt Lake City, UT", coordinates: [-111.8910, 40.7608] as [number, number] }
  ];

  return (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto mb-6">
        <div className="text-center group">
          <div className="w-20 h-20 bg-gradient-to-br from-hopkins-blue to-indigo-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <div className="text-2xl font-black text-white">32</div>
          </div>
          <h4 className="font-black text-gray-900 text-base tracking-tight">US Cities</h4>
          <p className="text-sm text-gray-600 font-medium">Metropolitan Areas</p>
        </div>

        <div className="text-center group">
          <div className="w-20 h-20 bg-gradient-to-br from-hopkins-spirit-blue to-cyan-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <div className="text-xl font-black text-white">200+</div>
          </div>
          <h4 className="font-black text-gray-900 text-base tracking-tight">Clinical Sites</h4>
          <p className="text-sm text-gray-600 font-medium">Research Network</p>
        </div>

        <div className="text-center group">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <div className="text-xl font-black text-white">190K+</div>
          </div>
          <h4 className="font-black text-gray-900 text-base tracking-tight">Participants</h4>
          <p className="text-sm text-gray-600 font-medium">Research Cohort</p>
        </div>
      </div>

      {/* Map */}
      <div className="relative -mx-6">
        <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-black h-[400px] relative overflow-hidden">
          {hoveredCity && (
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-white/20 z-10">
              <p className="font-black text-gray-900 text-lg tracking-tight">{hoveredCity}</p>
              <p className="text-gray-600 text-sm font-medium">JHEEM/SHIELD Coverage</p>
            </div>
          )}

          <div className="absolute top-6 left-6 z-10">
            <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10">
              <h3 className="text-white font-black text-xl tracking-tight mb-1">US Research Network</h3>
              <p className="text-gray-200 text-sm font-medium">32 High-Burden Metropolitan Areas</p>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 z-10">
            <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3 text-white">
                <div className="w-3 h-3 bg-hopkins-blue rounded-full"></div>
                <span className="text-sm font-medium">Active Model Coverage</span>
              </div>
              <p className="text-gray-300 text-xs mt-1">JHEEM & SHIELD Frameworks</p>
            </div>
          </div>

          {isMounted && (
            <ComposableMap
              projection="geoAlbersUsa"
              className="w-full h-full"
              style={{ width: "100%", height: "100%" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#1e293b"
                      stroke="#374151"
                      strokeWidth={1}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#334155" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {cities.map((city, index) => (
                <Marker
                  key={`${city.name}-${index}`}
                  coordinates={city.coordinates}
                  onMouseEnter={() => setHoveredCity(city.name)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  <circle
                    r={hoveredCity === city.name ? 12 : 7}
                    fill={hoveredCity === city.name ? "#3b82f6" : "#1d4ed8"}
                    stroke="#ffffff"
                    strokeWidth={hoveredCity === city.name ? 3 : 2}
                    opacity={1}
                    className="cursor-pointer transition-all duration-400"
                    style={{
                      filter: hoveredCity === city.name
                        ? 'drop-shadow(0 0 16px rgba(59, 130, 246, 0.9)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))'
                        : 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3))'
                    }}
                  />
                  {hoveredCity === city.name && (
                    <circle
                      r={20}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      opacity={0.5}
                      style={{ pointerEvents: 'none' }}
                      className="animate-ping"
                    />
                  )}
                </Marker>
              ))}
            </ComposableMap>
          )}
        </div>
      </div>
    </>
  );
}
