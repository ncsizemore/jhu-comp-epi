'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import LocationSelector from '@/components/global-aging/LocationSelector';
import MultiLocationChartGrid from '@/components/global-aging/MultiLocationChartGrid';
import TimelineControls from '@/components/global-aging/TimelineControls';
import CalibrationSection from '@/components/global-aging/CalibrationSection';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { isValidLocationCode } from '@/data/global-aging';
import type { SexMode, AgeGranularity } from '@/data/global-aging';

// Inner component using useSearchParams
function GlobalAgingAppInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedLocations, setSelectedLocations] = useState<string[]>(['south_africa', 'kenya']);
  const [sexMode, setSexMode] = useState<SexMode>('both');
  const [granularity, setGranularity] = useState<AgeGranularity>('collapsed');
  const [normalized, setNormalized] = useState(false);
  const [yearRange, setYearRange] = useState<[number, number]>([2025, 2040]);
  const [isInitialized, setIsInitialized] = useState(false);

  type ExportStatus = 'idle' | 'exporting' | 'success' | 'error';
  const [exportStatus, setExportStatus] = useState<ExportStatus>('idle');

  useEffect(() => {
    if (isInitialized) return;

    const urlLocations = searchParams.get('locations');
    if (urlLocations) {
      const codes = urlLocations.split(',').filter(isValidLocationCode);
      if (codes.length > 0) setSelectedLocations(codes);
    }

    const urlSex = searchParams.get('sex');
    if (urlSex === 'male' || urlSex === 'female' || urlSex === 'both' || urlSex === 'mf-split') {
      setSexMode(urlSex);
    }

    const urlGranularity = searchParams.get('age');
    if (urlGranularity === 'collapsed' || urlGranularity === 'full') {
      setGranularity(urlGranularity);
    }

    const urlNormalized = searchParams.get('normalized');
    if (urlNormalized === 'true') setNormalized(true);

    const urlYears = searchParams.get('years');
    if (urlYears) {
      const [start, end] = urlYears.split('-').map(Number);
      if (!isNaN(start) && !isNaN(end) && start >= 2025 && end <= 2040 && start <= end) {
        setYearRange([start, end]);
      }
    }

    setIsInitialized(true);
  }, [searchParams, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    const params = new URLSearchParams();
    params.set('locations', selectedLocations.join(','));

    if (sexMode !== 'both') params.set('sex', sexMode);
    if (granularity !== 'collapsed') params.set('age', granularity);
    if (normalized) params.set('normalized', 'true');
    if (yearRange[0] !== 2025 || yearRange[1] !== 2040) {
      params.set('years', `${yearRange[0]}-${yearRange[1]}`);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedLocations, sexMode, granularity, normalized, yearRange, isInitialized, router]);

  useEffect(() => {
    const handleExportStatus = (event: Event) => {
      const customEvent = event as CustomEvent<{ status: ExportStatus }>;
      setExportStatus(customEvent.detail.status);
      if (customEvent.detail.status === 'success' || customEvent.detail.status === 'error') {
        setTimeout(() => setExportStatus('idle'), 2000);
      }
    };
    window.addEventListener('exportStatus', handleExportStatus);
    return () => window.removeEventListener('exportStatus', handleExportStatus);
  }, []);

  return (
    <div className="space-y-8">
      {/* Controls Section */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Location Selector */}
        <div className="lg:w-[40%] bg-gray-50 rounded-lg p-3 border border-gray-200">
          <LocationSelector
            selectedLocations={selectedLocations}
            onLocationChange={setSelectedLocations}
            maxLocations={13}
          />
        </div>

        {/* Timeline Controls */}
        <div className="lg:w-[36%] bg-gray-50 rounded-lg p-3 border border-gray-200">
          <TimelineControls
            yearRange={yearRange}
            onYearRangeChange={setYearRange}
            minYear={2025}
            maxYear={2040}
          />
        </div>

        {/* Options Panel */}
        <div className="lg:w-[24%] flex flex-col gap-2">
          {/* Sex Group */}
          <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200 flex flex-col items-center justify-center">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Sex
            </label>
            <div className="w-full flex rounded-lg border border-gray-300 overflow-hidden">
              {(['both', 'male', 'female', 'mf-split'] as SexMode[]).map(s => (
                <button
                  key={s}
                  onClick={() => setSexMode(s)}
                  className={`flex-1 px-2 py-2 text-[11px] font-semibold transition-all duration-200 ${
                    s !== 'both' ? 'border-l border-gray-300' : ''
                  } ${
                    sexMode === s
                      ? 'bg-gradient-to-r from-hopkins-blue to-hopkins-spirit-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  title={s === 'mf-split' ? 'Male and female charts side-by-side per location' : undefined}
                >
                  {s === 'both' ? 'Both' : s === 'male' ? 'Male' : s === 'female' ? 'Female' : 'Split'}
                </button>
              ))}
            </div>
          </div>

          {/* Age Granularity */}
          <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200 flex flex-col items-center justify-center">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Age Groups
            </label>
            <div className="w-full flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setGranularity('collapsed')}
                className={`flex-1 px-2 py-2 text-[11px] font-semibold transition-all duration-200 ${
                  granularity === 'collapsed'
                    ? 'bg-gradient-to-r from-hopkins-blue to-hopkins-spirit-blue text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                title="7 collapsed age groups (0-14, 15-24, ... 65+)"
              >
                7 Groups
              </button>
              <button
                onClick={() => setGranularity('full')}
                className={`flex-1 px-2 py-2 text-[11px] font-semibold transition-all duration-200 border-l border-gray-300 ${
                  granularity === 'full'
                    ? 'bg-gradient-to-r from-hopkins-blue to-hopkins-spirit-blue text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                title="Full 17 five-year age brackets (0-4, 5-9, ... 80+)"
              >
                17 Brackets
              </button>
            </div>
          </div>

          {/* Display Mode */}
          <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200 flex flex-col items-center justify-center">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Display Mode
            </label>
            <div className="w-full flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setNormalized(false)}
                className={`flex-1 px-2 py-2 text-[11px] font-semibold transition-all duration-200 ${
                  !normalized
                    ? 'bg-gradient-to-r from-hopkins-blue to-hopkins-spirit-blue text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                title="Show absolute counts"
              >
                Counts
              </button>
              <button
                onClick={() => setNormalized(true)}
                className={`flex-1 px-2 py-2 text-[11px] font-semibold transition-all duration-200 border-l border-gray-300 ${
                  normalized
                    ? 'bg-gradient-to-r from-hopkins-blue to-hopkins-spirit-blue text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                title="Show proportional percentages"
              >
                Proportional %
              </button>
            </div>
          </div>

          {/* Export */}
          <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200 flex flex-col items-center justify-center">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Export
            </label>
            <div className="w-full">
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('exportCharts'));
                }}
                disabled={exportStatus === 'exporting'}
                className={`w-full flex items-center justify-center gap-1 px-2 py-2 text-[11px] font-semibold rounded-lg transition-all shadow-sm ${
                  exportStatus === 'exporting'
                    ? 'bg-gray-100 border border-gray-300 text-gray-400 cursor-wait'
                    : exportStatus === 'success'
                    ? 'bg-green-50 border border-green-300 text-green-700'
                    : exportStatus === 'error'
                    ? 'bg-red-50 border border-red-300 text-red-700'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-hopkins-blue hover:bg-gray-50 hover:shadow-md'
                }`}
                title="Export charts as PNG image"
              >
                {exportStatus === 'exporting' ? (
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ) : exportStatus === 'success' ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : exportStatus === 'error' ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
                <span>Export PNG</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Grid */}
      <ErrorBoundary>
        <MultiLocationChartGrid
          locationCodes={selectedLocations}
          sexMode={sexMode}
          granularity={granularity}
          normalized={normalized}
          yearRange={yearRange}
        />
      </ErrorBoundary>
    </div>
  );
}

function GlobalAgingAppWithSuspense() {
  return (
    <Suspense fallback={
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/3" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    }>
      <GlobalAgingAppInner />
    </Suspense>
  );
}

function ProjectionsSection() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-hopkins-blue/30 hover:shadow-md transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            isExpanded ? 'bg-hopkins-blue text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-hopkins-blue/10'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900">Age Distribution Projections</h3>
            <p className="text-sm text-gray-600">
              Projected age cohort trends by location and sex (2025–2040)
            </p>
          </div>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isExpanded ? 'bg-hopkins-blue/10 rotate-180' : 'bg-gray-100'
        }`}>
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <GlobalAgingAppWithSuspense />
          </div>
        </div>
      )}
    </div>
  );
}

export default function GlobalAgingApp() {
  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-hopkins-blue text-sm font-semibold tracking-widest uppercase mb-4">
              GMHA Modeling Analysis
            </p>
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-8">
              Global Aging Among<br />
              <span className="font-semibold">People Living with HIV</span>
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-2xl">
                As antiretroviral therapy (ART) extends life expectancy, the global population
                of people living with HIV is aging rapidly. This shift has profound implications
                for healthcare systems, particularly in sub-Saharan Africa where the burden
                of HIV is greatest.
              </p>
              <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                This interactive tool explores projected age distributions of PLHIV across
                13 locations — 7 countries, 4 income groups, and global aggregates — from
                2025 to 2040, based on 1,000 model simulations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-hopkins-blue/5 to-hopkins-spirit-blue/10 p-6 rounded-xl space-y-5"
            >
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-light text-hopkins-blue mb-1">13 Locations</div>
                  <p className="text-xs text-gray-600">Countries, income groups, and global aggregates</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-hopkins-blue/20">
                  <div>
                    <div className="text-2xl font-semibold text-hopkins-blue mb-1">14</div>
                    <p className="text-xs text-gray-600">HIV outcomes modeled</p>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-hopkins-blue mb-1">1,000</div>
                    <p className="text-xs text-gray-600">Simulations per location</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main App Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-hopkins-blue/5 to-hopkins-spirit-blue/10 rounded-2xl p-8 space-y-8">
              {/* Age Distribution Projections */}
              <ErrorBoundary>
                <ProjectionsSection />
              </ErrorBoundary>

              {/* Model Calibration Section */}
              <ErrorBoundary>
                <CalibrationSection defaultExpanded={false} />
              </ErrorBoundary>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
