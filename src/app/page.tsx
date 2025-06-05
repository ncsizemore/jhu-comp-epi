"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

// Enhanced Hero Section
function EnhancedHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
      {/* Sophisticated background matching projects/publications */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-hopkins-blue/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-hopkins-spirit-blue/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-hopkins-gold/10 rounded-full blur-3xl"></div>
      </div>

      {/* Static geometric shapes with modern sophistication */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-hopkins-gold/20 to-amber-400/30 transform rotate-45 rounded-2xl shadow-lg"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-tr from-emerald-400/25 to-teal-500/35 rounded-full shadow-md"></div>
        <div className="absolute top-1/2 left-20 w-16 h-64 bg-gradient-to-b from-hopkins-blue/15 to-transparent rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border-2 border-white/10 rounded-lg rotate-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Computational <span className="text-transparent bg-clip-text bg-gradient-to-r from-hopkins-gold to-amber-400">Epidemiology</span><br />
            Research Group
          </h1>

          <p className="text-xl font-medium text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Advanced mathematical models informing evidence-based policy research across 200+ sites nationwide
          </p>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Johns Hopkins Bloomberg School of Public Health
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-hopkins-blue to-hopkins-spirit-blue text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-hopkins-blue/25 transition-all duration-500 transform hover:scale-105 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative">Explore Our Models</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <Link
              href="/publications"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <span>View Publications</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Geographic Impact & Research Scale Section
function ResearchAtScaleSection() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // US TopoJSON file URL (free from react-simple-maps)
  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

  // JHEEM/SHIELD cities with real coordinates
  const cities: Array<{ name: string; coordinates: [number, number] }> = [
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
    { name: "Salt Lake City, UT", coordinates: [-111.8910, 40.7608] }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-slate-50 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-hopkins-blue/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-hopkins-spirit-blue/6 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Research at <span className="text-hopkins-blue">National Scale</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From local cities to national health systems, our computational frameworks model epidemic dynamics across diverse geographic and demographic landscapes
          </p>
        </div>

        {/* SCALE-FOCUSED: Map as Hero for Geographic Reach */}
        <div className="bg-gradient-to-br from-white/95 via-white/98 to-gray-50/95 backdrop-blur-xl border border-gray-200/60 rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/10">

          {/* Compact Header with Scale Stats */}
          <div className="p-8 pb-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">
                Geographic Coverage & Research Network
              </h3>
              <p className="text-gray-600 font-medium max-w-2xl mx-auto">
                Our mathematical frameworks operate across vast geographic networks,
                from metropolitan areas to national health systems.
              </p>
            </div>

            {/* Scale Stats Row */}
            <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-hopkins-blue to-indigo-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <div className="text-xl font-black text-white">32</div>
                </div>
                <h4 className="font-black text-gray-900 text-sm tracking-tight">US Cities</h4>
                <p className="text-xs text-gray-600 font-medium">Metropolitan Areas</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-hopkins-spirit-blue to-cyan-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <div className="text-base font-black text-white">200+</div>
                </div>
                <h4 className="font-black text-gray-900 text-sm tracking-tight">Clinical Sites</h4>
                <p className="text-xs text-gray-600 font-medium">Research Network</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <div className="text-base font-black text-white">190K+</div>
                </div>
                <h4 className="font-black text-gray-900 text-sm tracking-tight">Participants</h4>
                <p className="text-xs text-gray-600 font-medium">Research Cohort</p>
              </div>
            </div>
          </div>



          {/* Hero Map - Optimized Aspect Ratio */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-black h-[400px] relative overflow-hidden">

              {/* Sophisticated background pattern */}
              <div className="absolute inset-0 opacity-25 pointer-events-none">
                <div className="absolute top-12 right-12 w-40 h-40 bg-gradient-to-br from-hopkins-blue/40 to-indigo-600/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-12 left-12 w-32 h-32 bg-gradient-to-br from-hopkins-gold/40 to-amber-500/30 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-emerald-500/30 to-teal-600/20 rounded-full blur-xl"></div>
              </div>

              {/* Premium hover tooltip */}
              {hoveredCity && (
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-white/20 z-10">
                  <p className="font-black text-gray-900 text-lg tracking-tight">{hoveredCity}</p>
                  <p className="text-gray-600 text-sm font-medium">JHEEM/SHIELD Coverage</p>
                </div>
              )}

              {/* Scale messaging overlay */}
              <div className="absolute top-6 left-6 z-10">
                <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                  <h3 className="text-white font-black text-xl tracking-tight mb-1">US Research Network</h3>
                  <p className="text-gray-200 text-sm font-medium">32 High-Burden Metropolitan Areas</p>
                </div>
              </div>

              {/* Scale indicator */}
              <div className="absolute bottom-6 left-6 z-10">
                <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-3 h-3 bg-hopkins-blue rounded-full"></div>
                    <span className="text-sm font-medium">Active Model Coverage</span>
                  </div>
                  <p className="text-gray-300 text-xs mt-1">JHEEM & SHIELD Frameworks</p>
                </div>
              </div>

              {/* Optimized Map */}
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

                  {/* Scale-focused city markers */}
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
                      {/* Scale emphasis pulse */}
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

          {/* Bottom: Scale Impact Summary */}
          <div className="p-8 pt-6 bg-gradient-to-r from-gray-50/80 to-white/80">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-xl font-black text-gray-900 tracking-tight mb-3">
                Mathematical Models with Real-World Reach
              </h3>
              <p className="text-gray-600 font-medium mb-6 leading-relaxed">
                From HIV prevention in San Francisco to syphilis elimination strategies nationwide,
                our computational frameworks translate complex epidemiological data into actionable insights at unprecedented scale.
              </p>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-black bg-gradient-to-br from-hopkins-blue to-indigo-600 bg-clip-text text-transparent mb-1">
                    Multi-City
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Local calibration across diverse metropolitan areas</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black bg-gradient-to-br from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-1">
                    Nationwide
                  </div>
                  <p className="text-sm text-gray-600 font-medium">National policy and intervention strategies</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black bg-gradient-to-br from-amber-500 to-orange-600 bg-clip-text text-transparent mb-1">
                    Population-Scale
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Cohorts spanning hundreds of thousands of participants</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Integrated Research & Key Questions Section
function ActiveResearchSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Advancing <span className="text-emerald-600">Epidemic Science</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our research addresses fundamental questions in disease modeling, translating computational insights into evidence-based public health strategies that save lives
          </p>
        </div>

        {/* Key Research Questions as strategic callouts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-hopkins-blue to-blue-800 rounded-xl flex-shrink-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">HIV Transmission & Prevention</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Our JHEEM framework simulates HIV transmission dynamics across diverse populations and geographic scales,
                    evaluating prevention strategies from PrEP to treatment interventions across 32 metropolitan areas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex-shrink-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">HIV-STI Co-epidemic Dynamics</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    With syphilis rates doubling in five years and 25-50% of infections among people with HIV,
                    our SHIELD framework models intervention strategies across 32 high-burden cities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-hopkins-spirit-blue to-blue-600 rounded-xl flex-shrink-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Aging HIV Populations</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    As life expectancy approaches general population levels, PEARL models emerging multimorbidity patterns
                    across 200+ clinical sites and 190,000+ participants.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Research Philosophy</h3>
              <p className="text-gray-600 leading-relaxed">
                &ldquo;Mathematical models provide a bridge between complex epidemiological data and actionable public health decisions.
                Our work demonstrates that rigorous computational science can directly prevent disease transmission and save lives.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center">
                <div className="text-2xl font-black text-hopkins-blue mb-1">180</div>
                <p className="text-xs text-gray-600">Clinic Directors Surveyed</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-emerald-600 mb-1">15</div>
                <p className="text-xs text-gray-600">Co-authors on Key Studies</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-amber-600 mb-1">31</div>
                <p className="text-xs text-gray-600">Cities in Ryan White Study</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-gray-700 mb-1">49%</div>
                <p className="text-xs text-gray-600">HIV Increase if Programs End</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-500 transform hover:scale-105 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative">Explore Our Research</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Research Impact Highlight Section
function ResearchImpactSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-hopkins-blue/6 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-hopkins-spirit-blue/4 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Research <span className="text-hopkins-blue">Impact</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our mathematical models translate into real-world policy decisions, preventing disease transmission and informing evidence-based public health strategies
          </p>
        </div>

        {/* Featured Impact Story */}
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 mb-12 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-hopkins-blue rounded-full"></div>
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Featured Study</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ryan White HIV/AIDS Program Evaluation
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                Our JHEEM model, informed by surveys of 180 clinic directors across 31 US cities,
                projected that ending Ryan White services could increase HIV infections by 49% over five years.
                This research provides critical evidence for policy decisions about essential HIV care programs.
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-hopkins-blue/10 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Survey + Modeling Integration</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Policy Evaluation</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">15 Co-authors</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-hopkins-blue/20 to-hopkins-spirit-blue/30 rounded-2xl p-6">
                <div className="text-4xl font-black text-hopkins-blue mb-2">75,436</div>
                <p className="text-gray-700 font-medium mb-1">Projected Additional Infections</p>
                <p className="text-gray-600 text-sm">If Ryan White Programs End</p>
                <div className="mt-4 text-2xl font-black text-gray-700">49%</div>
                <p className="text-gray-600 text-sm">Projected Increase</p>
              </div>
            </div>
          </div>
        </div>

        {/* Research Approach & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
            <div className="text-3xl font-black text-emerald-600 mb-2">Multi-City</div>
            <p className="text-gray-700 font-medium mb-1">Modeling</p>
            <p className="text-gray-600 text-sm">Local-level calibration across diverse metropolitan areas</p>
          </div>

          <div className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
            <div className="text-3xl font-black text-hopkins-blue mb-2">Open Science</div>
            <p className="text-gray-700 font-medium mb-1">Approach</p>
            <p className="text-gray-600 text-sm">All published code distributed through open-source platforms</p>
          </div>

          <div className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
            <div className="text-3xl font-black text-amber-600 mb-2">Policy</div>
            <p className="text-gray-700 font-medium mb-1">Translation</p>
            <p className="text-gray-600 text-sm">Mathematical insights transformed into actionable health decisions</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/publications"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-hopkins-blue to-hopkins-spirit-blue text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-hopkins-blue/25 transition-all duration-500 transform hover:scale-105 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative">View All Publications</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <MainLayout>
      <EnhancedHeroSection />
      <ResearchAtScaleSection />
      <ActiveResearchSection />
      <ResearchImpactSection />
    </MainLayout>
  );
}