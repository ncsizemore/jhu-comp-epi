'use client';

import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { PROJECT_THEME } from '@/lib/projects/config';

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

  // Major cities to label (highest burden areas)
  const labeledCities = [
    'New York, NY', 'Los Angeles, CA', 'Miami, FL', 'Houston, TX',
    'Atlanta, GA', 'Chicago, IL', 'San Francisco, CA'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2 relative">
          <div className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 h-[500px] rounded-xl relative overflow-hidden shadow-2xl">
            {/* Atmospheric lighting effects */}
            <div className="absolute inset-0 pointer-events-none z-0">
              {/* Radial gradients for depth - no data implications, just atmosphere */}
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-cyan-400/8 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            {hoveredCity && (
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-white/20 z-20 pointer-events-none">
                <p className="font-black text-gray-900 text-lg tracking-tight">{hoveredCity}</p>
                <p className="text-gray-600 text-sm font-medium">JHEEM/SHIELD Coverage</p>
              </div>
            )}

          {isMounted && (
            <ComposableMap
              projection="geoAlbersUsa"
              className="w-full h-full relative z-10"
              style={{ width: "100%", height: "100%" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#1e293b"
                      stroke="#475569"
                      strokeWidth={0.75}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#334155" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {cities.map((city, index) => {
                const isLabeled = labeledCities.includes(city.name);
                const isHovered = hoveredCity === city.name;
                const isMajor = isLabeled;
                // Staggered animation delay for organic feel
                const animationDelay = `${(index * 0.3) % 8}s`;

                return (
                  <Marker
                    key={`${city.name}-${index}`}
                    coordinates={city.coordinates}
                  >
                    {/* Outer glow ring - subtle pulse on all dots */}
                    <circle
                      r={isMajor ? 22 : 16}
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth={1.5}
                      className="animate-pulse"
                      style={{
                        pointerEvents: 'none',
                        animationDelay: animationDelay,
                        opacity: isMajor ? 0.4 : 0.25
                      }}
                    />

                    {/* Middle glow ring for extra depth - also pulses */}
                    <circle
                      r={isMajor ? 14 : 10}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth={1}
                      className="animate-pulse"
                      style={{
                        pointerEvents: 'none',
                        animationDelay: animationDelay,
                        opacity: isMajor ? 0.5 : 0.35
                      }}
                    />

                    {/* Main dot with BOLD glow - subtle pulse */}
                    <circle
                      r={isHovered ? 14 : (isMajor ? 9 : 6)}
                      fill={isHovered ? "#60a5fa" : "#2563eb"}
                      stroke="#ffffff"
                      strokeWidth={isHovered ? 3 : (isMajor ? 2.5 : 2)}
                      opacity={1}
                      className={`cursor-pointer transition-all duration-300 ${!isHovered ? 'animate-pulse' : ''}`}
                      onMouseEnter={() => setHoveredCity(city.name)}
                      onMouseLeave={() => setHoveredCity(null)}
                      style={{
                        filter: isHovered
                          ? 'drop-shadow(0 0 24px rgba(96, 165, 250, 1)) drop-shadow(0 0 16px rgba(59, 130, 246, 1)) drop-shadow(0 0 8px rgba(37, 99, 235, 0.8)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.6))'
                          : isMajor
                          ? 'drop-shadow(0 0 16px rgba(59, 130, 246, 1)) drop-shadow(0 0 8px rgba(37, 99, 235, 0.8)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5))'
                          : 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.9)) drop-shadow(0 0 5px rgba(37, 99, 235, 0.7)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4))',
                        animationDelay: !isHovered ? animationDelay : undefined
                      }}
                    />

                    {/* Ping animation on hover - larger and more dramatic */}
                    {isHovered && (
                      <>
                        <circle
                          r={25}
                          fill="none"
                          stroke="#60a5fa"
                          strokeWidth={2.5}
                          opacity={0.7}
                          style={{ pointerEvents: 'none' }}
                          className="animate-ping"
                        />
                        <circle
                          r={35}
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth={1.5}
                          opacity={0.4}
                          style={{ pointerEvents: 'none', animationDelay: '0.15s' }}
                          className="animate-ping"
                        />
                      </>
                    )}

                    {/* City label for major cities - brighter and more visible */}
                    {isLabeled && !isHovered && (
                      <text
                        textAnchor="middle"
                        y={-14}
                        style={{
                          fontFamily: "system-ui, -apple-system, sans-serif",
                          fontSize: "11px",
                          fontWeight: "700",
                          fill: "#dbeafe",
                          letterSpacing: "0.5px",
                          pointerEvents: "none",
                          textShadow: "0 0 8px rgba(59, 130, 246, 0.8), 0 2px 4px rgba(0,0,0,0.9)",
                          filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.9))"
                        }}
                      >
                        {city.name.split(',')[0]}
                      </text>
                    )}
                  </Marker>
                );
              })}
            </ComposableMap>
          )}
        </div>
      </div>

      {/* Models Legend - Right Side */}
      <div className="space-y-4">
        {/* JHEEM */}
        <div className="bg-hopkins-blue/5 border-2 border-hopkins-blue/30 rounded-xl p-4 hover:shadow-lg hover:border-hopkins-blue/50 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${PROJECT_THEME.jheem.colors.gradient} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <h3 className="text-base font-black text-gray-900">{PROJECT_THEME.jheem.name}</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Models HIV transmission and prevention across 32 high burden US cities to help end the HIV epidemic.
          </p>
        </div>

        {/* SHIELD */}
        <div className="bg-amber-500/5 border-2 border-amber-500/30 rounded-xl p-4 hover:shadow-lg hover:border-amber-500/50 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${PROJECT_THEME.shield.colors.gradient} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <h3 className="text-base font-black text-gray-900">{PROJECT_THEME.shield.name}</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Modeling HIV-Syphilis co-epidemic across high level jurisdictions.
          </p>
        </div>

        {/* PEARL */}
        <div className="bg-hopkins-spirit-blue/5 border-2 border-hopkins-spirit-blue/30 rounded-xl p-4 hover:shadow-lg hover:border-hopkins-spirit-blue/50 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${PROJECT_THEME.pearl.colors.gradient} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <h3 className="text-base font-black text-gray-900">{PROJECT_THEME.pearl.name}</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Models aging and multimorbidity burden among persons aging with HIV in the US at a national level.
          </p>
        </div>
      </div>
    </div>
  );
}
