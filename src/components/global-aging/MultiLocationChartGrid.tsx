'use client';

import React, { memo, useMemo, useState, useEffect, useRef, useCallback, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import AgeDistributionChart from './AgeDistributionChart';
import {
  transformProjectionsForChart,
  getAgeBrackets,
  getAgeColors,
  getLocationLabel,
  maxStackedTotal,
  useProjections,
} from '@/data/global-aging';
import type { SexMode, AgeGranularity, ChartDataPoint } from '@/data/global-aging';

export interface ChartGridHandle {
  exportToPng: () => Promise<void>;
}

interface MultiLocationChartGridProps {
  locationCodes: string[];
  sexMode: SexMode;
  granularity: AgeGranularity;
  normalized?: boolean;
  yearRange?: [number, number];
  ref?: React.Ref<ChartGridHandle>;
}

function getGridLayout(count: number) {
  if (count === 0) return { chartHeight: 0, gridClass: '', gap: 'gap-6' };
  if (count === 1) return { chartHeight: 500, gridClass: 'grid-cols-1', gap: 'gap-6' };
  if (count === 2) return { chartHeight: 450, gridClass: 'grid-cols-1 md:grid-cols-2', gap: 'gap-6' };
  if (count <= 4) return { chartHeight: 420, gridClass: 'grid-cols-1 md:grid-cols-2', gap: 'gap-6' };
  if (count <= 6) return { chartHeight: 380, gridClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', gap: 'gap-5' };
  return { chartHeight: 340, gridClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', gap: 'gap-4' };
}

const MultiLocationChartGrid = memo(({
  locationCodes,
  sexMode,
  granularity,
  normalized = false,
  yearRange = [2025, 2040],
  ref,
}: MultiLocationChartGridProps) => {
  const INITIAL_RENDER_COUNT = 6;
  const BATCH_SIZE = 6;
  const BATCH_DELAY = 100;

  const isSplit = sexMode === 'mf-split';

  const [renderedCount, setRenderedCount] = useState(INITIAL_RENDER_COUNT);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRenderedCount(Math.min(INITIAL_RENDER_COUNT, locationCodes.length));
  }, [locationCodes.length, normalized, yearRange, sexMode, granularity]);

  useEffect(() => {
    if (renderedCount < locationCodes.length) {
      const timer = setTimeout(() => {
        setRenderedCount(prev => Math.min(prev + BATCH_SIZE, locationCodes.length));
      }, BATCH_DELAY);
      return () => clearTimeout(timer);
    }
  }, [renderedCount, locationCodes.length]);

  const { data: projections, loading: projectionsLoading, error: projectionsError } = useProjections();

  // In mf-split mode each location card hosts two charts side-by-side, so
  // pick a layout that gives each card the room it needs. One column for
  // any count keeps the M/F pair readable; users can scroll if they've
  // selected many locations.
  const gridLayout = useMemo(
    () => isSplit ? { chartHeight: 360, gridClass: 'grid-cols-1', gap: 'gap-6' } : getGridLayout(locationCodes.length),
    [locationCodes.length, isSplit]
  );
  const ageBrackets = useMemo(() => getAgeBrackets(granularity), [granularity]);
  const ageColors = useMemo(() => getAgeColors(granularity), [granularity]);

  // Single-mode data (used when not splitting). For mf-split we compute
  // male and female series separately below.
  const chartData: ChartDataPoint[] = useMemo(() => {
    if (locationCodes.length === 0 || !projections || isSplit) return [];
    return transformProjectionsForChart(projections, locationCodes, yearRange, sexMode, granularity, normalized);
  }, [projections, locationCodes, yearRange, sexMode, granularity, normalized, isSplit]);

  const maleData: ChartDataPoint[] = useMemo(() => {
    if (locationCodes.length === 0 || !projections || !isSplit) return [];
    return transformProjectionsForChart(projections, locationCodes, yearRange, 'male', granularity, normalized);
  }, [projections, locationCodes, yearRange, granularity, normalized, isSplit]);

  const femaleData: ChartDataPoint[] = useMemo(() => {
    if (locationCodes.length === 0 || !projections || !isSplit) return [];
    return transformProjectionsForChart(projections, locationCodes, yearRange, 'female', granularity, normalized);
  }, [projections, locationCodes, yearRange, granularity, normalized, isSplit]);

  // Per-location y-axis cap, shared between the male and female charts so
  // visual size comparison is meaningful. Only relevant for counts mode;
  // normalized mode is already on a fixed [0, 100] scale.
  const sharedYMaxByLocation = useMemo<Record<string, number>>(() => {
    if (!isSplit || normalized) return {};
    const out: Record<string, number> = {};
    for (const code of locationCodes) {
      const m = maxStackedTotal(maleData, code, ageBrackets);
      const f = maxStackedTotal(femaleData, code, ageBrackets);
      out[code] = Math.max(m, f) * 1.05;
    }
    return out;
  }, [isSplit, normalized, locationCodes, maleData, femaleData, ageBrackets]);

  // Export all charts as PNG. Uses html-to-image rather than html2canvas
  // because the latter (v1.x) cannot parse oklch() colors emitted by Tailwind v4.
  // Throws on failure so the caller can surface status to the user.
  const exportToPng = useCallback(async () => {
    if (locationCodes.length === 0) throw new Error('No locations selected');
    if (projectionsLoading || !projections) throw new Error('Charts are still loading');

    if (renderedCount < locationCodes.length) {
      setRenderedCount(locationCodes.length);
      await new Promise<void>(resolve => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      });
    }

    if (!gridRef.current) throw new Error('Chart grid not mounted');
    // Give framer-motion a beat to settle before capture.
    await new Promise(resolve => setTimeout(resolve, 300));
    const { toPng } = await import('html-to-image');
    const dataUrl = await toPng(gridRef.current, {
      backgroundColor: '#ffffff',
      pixelRatio: 2,
      cacheBust: true,
    });
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().split('T')[0];
    const names = locationCodes.length <= 3
      ? locationCodes.join('_')
      : `${locationCodes.length}_locations`;
    const suffix = isSplit ? '_mf' : '';
    link.download = `global_aging_projections_${names}${suffix}_${timestamp}.png`;
    link.href = dataUrl;
    link.click();
  }, [locationCodes, isSplit, projectionsLoading, projections, renderedCount]);

  useImperativeHandle(ref, () => ({ exportToPng }), [exportToPng]);

  if (locationCodes.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center border border-dashed border-[color:var(--color-rule)] bg-[#f8fafc]">
        <div className="text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No Locations Selected</h3>
          <p className="text-gray-500">Choose locations from the selector above to begin comparison</p>
        </div>
      </div>
    );
  }

  if (projectionsError) {
    return (
      <div className="flex h-64 items-center justify-center border border-red-200 bg-red-50">
        <div className="text-center px-4">
          <h3 className="text-lg font-medium text-red-700 mb-2">Failed to load projections</h3>
          <p className="text-sm text-red-600">{projectionsError.message}</p>
        </div>
      </div>
    );
  }

  if (projectionsLoading || !projections) {
    return (
      <div className={`grid ${gridLayout.gap} ${gridLayout.gridClass}`}>
        {locationCodes.slice(0, Math.min(6, locationCodes.length)).map(code => (
          <div key={code} className="animate-pulse border border-[color:var(--color-rule)] bg-white p-3">
            <div className="mb-4 text-center space-y-2">
              <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md w-3/4 mx-auto" />
            </div>
            <div className="relative" style={{ height: `${gridLayout.chartHeight}px` }}>
              <div className="absolute inset-0 flex items-end justify-around gap-2 px-8 pb-8">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100 rounded-t-md"
                    style={{ height: `${((i * 13) % 60) + 40}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div ref={gridRef} className={`grid ${gridLayout.gap} ${gridLayout.gridClass}`}>
        {locationCodes.map((code, index) => {
          const isRendered = index < renderedCount;
          const animationDelay = locationCodes.length > 6
            ? Math.min(index * 0.03, 0.3)
            : index * 0.1;
          const locationName = getLocationLabel(code);
          const yMax = sharedYMaxByLocation[code];

          return (
            <motion.div
              key={code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: animationDelay, duration: 0.4 }}
              className="group border border-[color:var(--color-rule)] bg-white p-3 transition-colors duration-200 hover:border-[color:var(--color-hopkins-blue)]/35"
            >
              {isRendered ? (
                isSplit ? (
                  <div>
                    <div className="mb-2 text-center">
                      <h3 className="text-base font-semibold text-gray-900">{locationName}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <AgeDistributionChart
                        data={maleData}
                        locationPrefix={code}
                        locationName={locationName}
                        titleOverride="Male"
                        ageBrackets={ageBrackets}
                        ageColors={ageColors}
                        normalized={normalized}
                        height={gridLayout.chartHeight}
                        yMax={yMax}
                      />
                      <AgeDistributionChart
                        data={femaleData}
                        locationPrefix={code}
                        locationName={locationName}
                        titleOverride="Female"
                        ageBrackets={ageBrackets}
                        ageColors={ageColors}
                        normalized={normalized}
                        height={gridLayout.chartHeight}
                        yMax={yMax}
                      />
                    </div>
                  </div>
                ) : (
                  <AgeDistributionChart
                    data={chartData}
                    locationPrefix={code}
                    locationName={locationName}
                    ageBrackets={ageBrackets}
                    ageColors={ageColors}
                    normalized={normalized}
                    height={gridLayout.chartHeight}
                  />
                )
              ) : (
                <div className="w-full animate-pulse">
                  <div className="mb-4 text-center space-y-2">
                    <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md w-3/4 mx-auto"></div>
                  </div>
                  <div className="relative" style={{ height: `${gridLayout.chartHeight}px` }}>
                    <div className="absolute inset-0 flex items-end justify-around gap-2 px-8 pb-8">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100 rounded-t-md"
                          style={{ height: `${((i * 13) % 60) + 40}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

MultiLocationChartGrid.displayName = 'MultiLocationChartGrid';

export default MultiLocationChartGrid;
