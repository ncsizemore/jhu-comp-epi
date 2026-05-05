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
  const [selectedLocation, setSelectedLocation] = useState('south_africa');
  const [selectedOutcome, setSelectedOutcome] = useState('prevalence');
  const [ageSelection, setAgeSelection] = useState<AgeSelection>('total');

  // Lazy-load calibration + observed only once the section has been opened
  const { data: calibration, loading: calibrationLoading, error: calibrationError } = useCalibration(isExpanded);
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
      data: getCalibrationChartData(calibration, observed, selectedLocation, selectedOutcome, age),
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
            <h3 className="text-lg font-semibold text-gray-900">Model Calibration</h3>
            <p className="text-sm text-gray-600">
              Compare model simulations with UNAIDS surveillance data
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
        <div className="mt-4 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Description */}
          <div className="px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
            <p className="text-sm text-amber-800">
              <span className="font-semibold">About these plots:</span> Black lines show the mean across 1,000 model simulations.
              Orange shaded regions represent 95% credible intervals. Green dots indicate UNAIDS surveillance estimates.
              The dashed vertical line marks the last year of available surveillance data.
            </p>
          </div>

          {/* Controls */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex flex-wrap gap-6">
              {/* Location Selector */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-hopkins-blue focus:border-transparent transition-all"
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
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
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
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-hopkins-blue focus:border-transparent transition-all"
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
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Age Groups
                  </label>
                  <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                    <button
                      onClick={() => setAgeSelection('total')}
                      className={`px-4 py-2 text-sm font-medium transition-all ${
                        ageSelection === 'total'
                          ? 'bg-gradient-to-r from-hopkins-blue to-hopkins-spirit-blue text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Total Only
                    </button>
                    <button
                      onClick={() => setAgeSelection('all')}
                      className={`px-4 py-2 text-sm font-medium transition-all border-l border-gray-300 ${
                        ageSelection === 'all'
                          ? 'bg-gradient-to-r from-hopkins-blue to-hopkins-spirit-blue text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
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
            <h4 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
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
                  <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 p-4 animate-pulse" style={{ height: ageSelection === 'all' ? 220 : 300 }}>
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
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
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
