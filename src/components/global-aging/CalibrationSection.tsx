'use client';

import { useState, useMemo, memo } from 'react';
import CalibrationChart from './CalibrationChart';
import {
  getCalibrationChartData,
  getSurveillanceAgeBrackets,
  getLocationLabel,
  isProportionOutcome,
  useCalibration,
  useObserved,
  VISIBLE_OUTCOME_KEYS,
  OUTCOME_LABELS,
  LOCATION_CODES,
} from '@/data/global-aging';

interface CalibrationSectionProps {
  defaultExpanded?: boolean;
}

type AgeSelection = 'total' | 'all';

const CalibrationSection = memo(({ defaultExpanded = true }: CalibrationSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('south_africa');
  const [selectedOutcome, setSelectedOutcome] = useState('prevalence');
  const [ageSelection, setAgeSelection] = useState<AgeSelection>('total');

  // Lazy-load calibration + observed only once the section has been opened.
  // Calibration is split per-location on disk, so this only pulls the
  // ~150 KB (gzipped) slice for the currently-selected location.
  const { data: calibration, loading: calibrationLoading, error: calibrationError } = useCalibration(selectedLocation, isExpanded);
  const { data: observed, loading: observedLoading, error: observedError } = useObserved(isExpanded);

  const dataLoading = calibrationLoading || observedLoading;
  const dataError = calibrationError ?? observedError;
  const dataReady = !!calibration && !!observed;

  // Get surveillance age brackets for the selected outcome
  const survAgeBrackets = useMemo(() =>
    getSurveillanceAgeBrackets(selectedOutcome),
    [selectedOutcome]
  );

  const hasAgeBrackets = survAgeBrackets.length > 1;

  // Build chart configs
  const chartConfigs = useMemo(() => {
    if (!calibration || !observed) return [];
    const ages = (ageSelection === 'all' && hasAgeBrackets)
      ? ['total', ...survAgeBrackets]
      : ['total'];

    return ages.map(age => ({
      age,
      data: getCalibrationChartData(calibration, observed[selectedLocation], selectedOutcome, age),
      key: `${selectedOutcome}-${age}`
    }));
  }, [calibration, observed, selectedLocation, selectedOutcome, ageSelection, survAgeBrackets, hasAgeBrackets]);

  const gridCols = useMemo(() => {
    const n = chartConfigs.length;
    if (n <= 2) return 'grid-cols-1 md:grid-cols-2';
    if (n <= 4) return 'grid-cols-1 md:grid-cols-2';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  }, [chartConfigs.length]);

  const lastObservedYear = 2023;

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="global-aging-calibration-panel"
        className="group flex w-full items-center justify-between border border-[color:var(--color-rule)] bg-white p-4 text-left transition-colors hover:border-[color:var(--color-hopkins-blue)]/35"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            isExpanded ? 'bg-[color:var(--color-hopkins-blue)] text-white' : 'bg-[#f1f5f9] text-[color:var(--color-muted)] group-hover:bg-[#e8f1fb]'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-[color:var(--color-ink)]">Model Calibration</h3>
            <p className="text-sm text-[color:var(--color-muted)]">
              Compare model simulations with UNAIDS surveillance data
            </p>
          </div>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isExpanded ? 'bg-[#e8f1fb] rotate-180' : 'bg-[#f1f5f9]'
        }`} aria-hidden="true">
          <svg className="w-5 h-5 text-[color:var(--color-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div id="global-aging-calibration-panel" className="mt-4 overflow-hidden border border-[color:var(--color-rule)] bg-white">
          {/* Description */}
          <div className="space-y-4 border-b border-amber-200 bg-[#fffaf0] px-6 py-5">
            <p className="text-sm leading-relaxed text-[#733b00]">
              <span className="font-semibold">About these plots:</span> These plots display results of the
              model calibration process for each location. The black lines show the mean across 1,000 model
              simulations, while the orange shaded regions represent 95% credible intervals. The green points
              indicate calibration targets from surveillance data, with the dashed vertical line marking the
              last year of available surveillance data.
            </p>

            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex w-fit items-center gap-1.5 border border-amber-200 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#7a4200] transition-colors hover:bg-white"
              aria-expanded={showDetails}
              aria-controls="global-aging-calibration-details"
            >
              {showDetails ? 'Hide details' : 'Data sources and details'}
              <svg
                className={`w-3 h-3 transition-transform ${showDetails ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDetails && (
              <div id="global-aging-calibration-details" className="space-y-4">
                <div className="text-sm text-[#733b00]">
                  <p className="font-semibold mb-1.5">Calibration target (surveillance data) sources:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      New infections, People Living with HIV, HIV mortality, Aware of Status, On ART, Virally
                      Suppressed:{' '}
                      <a
                        href="https://aidsinfo.unaids.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[#4f2a00]"
                      >
                        UNAIDS AIDSinfo surveillance estimates
                      </a>
                    </li>
                    <li>
                      Population, Total Mortality:{' '}
                      <a
                        href="https://population.un.org/wpp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[#4f2a00]"
                      >
                        UN World Population Prospects
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="text-sm text-[#733b00]">
                  <p className="mb-1.5">
                    <span className="font-semibold">Note:</span> Income groupings reflect the{' '}
                    <a
                      href="https://datahelpdesk.worldbank.org/knowledgebase/articles/906519-world-bank-country-and-lending-groups"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-[#4f2a00]"
                    >
                      World Bank&apos;s income classifications
                    </a>{' '}
                    and include the following countries:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <span className="font-medium">Low income:</span> Malawi, Mozambique, Uganda, and all other
                      low-income countries reporting to UNAIDS, modeled as an aggregate
                    </li>
                    <li>
                      <span className="font-medium">Lower middle income:</span> Kenya, Nigeria, Tanzania, Zambia,
                      Zimbabwe, and all other lower-middle-income countries reporting to UNAIDS, modeled as an
                      aggregate
                    </li>
                    <li>
                      <span className="font-medium">Upper middle income:</span> South Africa and all other
                      upper-middle-income countries reporting to UNAIDS, modeled as an aggregate
                    </li>
                    <li>
                      <span className="font-medium">High income:</span> All high-income countries reporting to
                      UNAIDS, modeled as an aggregate
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="border-b border-[color:var(--color-rule)] px-6 py-4">
            <div className="flex flex-wrap gap-6">
              {/* Location Selector */}
              <div className="flex-1 min-w-[200px]">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border border-[color:var(--color-rule)] bg-white px-3 py-2 text-sm font-medium text-[color:var(--color-ink)] transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-hopkins-blue"
                >
                  {LOCATION_CODES.map(code => (
                    <option key={code} value={code}>
                      {getLocationLabel(code)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Outcome Selector */}
              <div className="flex-1 min-w-[200px]">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                  Outcome
                </label>
                <select
                  value={selectedOutcome}
                  onChange={(e) => {
                    setSelectedOutcome(e.target.value);
                    // Reset age selection if new outcome doesn't support age breakdowns
                    if (getSurveillanceAgeBrackets(e.target.value).length <= 1) {
                      setAgeSelection('total');
                    }
                  }}
                  className="w-full border border-[color:var(--color-rule)] bg-white px-3 py-2 text-sm font-medium text-[color:var(--color-ink)] transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-hopkins-blue"
                >
                  {VISIBLE_OUTCOME_KEYS.map(key => (
                    <option key={key} value={key}>
                      {OUTCOME_LABELS[key]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age Group Selector - only show if outcome supports it */}
              {hasAgeBrackets && (
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                    Age Groups
                  </label>
                  <div className="flex overflow-hidden border border-[color:var(--color-rule)]" role="group" aria-label="Calibration age group display">
                    <button
                      type="button"
                      onClick={() => setAgeSelection('total')}
                      aria-pressed={ageSelection === 'total'}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        ageSelection === 'total'
                          ? 'bg-[color:var(--color-hopkins-blue)] text-white'
                          : 'bg-white text-[color:var(--color-muted)] hover:bg-[#f8fafc] hover:text-[color:var(--color-ink)]'
                      }`}
                    >
                      Total Only
                    </button>
                    <button
                      type="button"
                      onClick={() => setAgeSelection('all')}
                      aria-pressed={ageSelection === 'all'}
                      className={`border-l border-[color:var(--color-rule)] px-4 py-2 text-sm font-medium transition-colors ${
                        ageSelection === 'all'
                          ? 'bg-[color:var(--color-hopkins-blue)] text-white'
                          : 'bg-white text-[color:var(--color-muted)] hover:bg-[#f8fafc] hover:text-[color:var(--color-ink)]'
                      }`}
                    >
                      {isProportionOutcome(selectedOutcome) ? 'By Sex (15+)' : 'All Age Groups'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chart Grid */}
          <div className="p-6">
            <h4 className="mb-4 border-b border-[color:var(--color-rule)] pb-2 text-base font-semibold text-[color:var(--color-ink)]">
              {OUTCOME_LABELS[selectedOutcome] || selectedOutcome}
            </h4>
            {dataError ? (
              <div className="flex items-center justify-center h-64 bg-red-50 rounded-xl border border-red-200">
                <div className="text-center px-4">
                  <h3 className="text-lg font-medium text-red-700 mb-2">Failed to load calibration data</h3>
                  <p className="text-sm text-red-600">{dataError.message}</p>
                </div>
              </div>
            ) : dataLoading || !dataReady ? (
              <div className={`grid ${gridCols} gap-4`}>
                {Array.from({ length: ageSelection === 'all' && hasAgeBrackets ? survAgeBrackets.length + 1 : 1 }).map((_, i) => (
                  <div key={i} className="animate-pulse border border-[color:var(--color-rule)] bg-[#f8fafc] p-4" style={{ height: ageSelection === 'all' ? 220 : 300 }}>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
                    <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className={`grid ${gridCols} gap-4`}>
                {chartConfigs.map(config => (
                  <CalibrationChart
                    key={config.key}
                    data={config.data}
                    outcome={selectedOutcome}
                    ageCategory={config.age}
                    locationName={getLocationLabel(selectedLocation)}
                    height={ageSelection === 'all' ? 220 : 300}
                    lastObservedYear={lastObservedYear}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="border-t border-[color:var(--color-rule)] bg-[#f8fafc] px-6 py-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-gray-800 rounded" />
                <span className="text-gray-600">Model mean</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 bg-orange-200 rounded opacity-60" />
                <span className="text-gray-600">95% credible interval</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-gray-600">UNAIDS surveillance data</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0 border-t-2 border-dashed border-gray-400" />
                <span className="text-gray-600">End of observed data</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

CalibrationSection.displayName = 'CalibrationSection';

export default CalibrationSection;
