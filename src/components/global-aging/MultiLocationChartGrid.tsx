'use client';

import React, { memo, useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import AgeDistributionChart from './AgeDistributionChart';
import {
  transformProjectionsForChart,
  getAgeBrackets,
  getAgeColors,
  getLocationLabel,
  useProjections,
} from '@/data/global-aging';
import type { SexGroup, AgeGranularity, ChartDataPoint } from '@/data/global-aging';

interface MultiLocationChartGridProps {
  locationCodes: string[];
  sexGroup: SexGroup;
  granularity: AgeGranularity;
  normalized?: boolean;
  yearRange?: [number, number];
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
  sexGroup,
  granularity,
  normalized = false,
  yearRange = [2025, 2040]
}: MultiLocationChartGridProps) => {
  const INITIAL_RENDER_COUNT = 6;
  const BATCH_SIZE = 6;
  const BATCH_DELAY = 100;

  const [renderedCount, setRenderedCount] = useState(INITIAL_RENDER_COUNT);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRenderedCount(Math.min(INITIAL_RENDER_COUNT, locationCodes.length));
  }, [locationCodes.length, normalized, yearRange, sexGroup, granularity]);

  useEffect(() => {
    if (renderedCount < locationCodes.length) {
      const timer = setTimeout(() => {
        setRenderedCount(prev => Math.min(prev + BATCH_SIZE, locationCodes.length));
      }, BATCH_DELAY);
      return () => clearTimeout(timer);
    }
  }, [renderedCount, locationCodes.length]);

  const { data: projections, loading: projectionsLoading, error: projectionsError } = useProjections();

  const gridLayout = useMemo(() => getGridLayout(locationCodes.length), [locationCodes.length]);
  const ageBrackets = useMemo(() => getAgeBrackets(granularity), [granularity]);
  const ageColors = useMemo(() => getAgeColors(granularity), [granularity]);

  const chartData: ChartDataPoint[] = useMemo(() => {
    if (locationCodes.length === 0 || !projections) return [];
    return transformProjectionsForChart(projections, locationCodes, yearRange, sexGroup, granularity, normalized);
  }, [projections, locationCodes, yearRange, sexGroup, granularity, normalized]);

  // Export all charts as PNG. Uses html-to-image rather than html2canvas
  // because the latter (v1.x) cannot parse oklch() colors emitted by Tailwind v4.
  const handleExportCharts = useCallback(async () => {
    if (!gridRef.current) return;
    window.dispatchEvent(new CustomEvent('exportStatus', { detail: { status: 'exporting' } }));
    try {
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
      link.download = `global_aging_projections_${names}_${timestamp}.png`;
      link.href = dataUrl;
      link.click();
      window.dispatchEvent(new CustomEvent('exportStatus', { detail: { status: 'success' } }));
    } catch (err) {
      console.error('PNG export failed:', err);
      window.dispatchEvent(new CustomEvent('exportStatus', { detail: { status: 'error' } }));
    }
  }, [locationCodes]);

  useEffect(() => {
    const handleExport = () => handleExportCharts();
    window.addEventListener('exportCharts', handleExport);
    return () => window.removeEventListener('exportCharts', handleExport);
  }, [handleExportCharts]);

  if (locationCodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
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
      <div className="flex items-center justify-center h-64 bg-red-50 rounded-xl border border-red-200">
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
          <div key={code} className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 animate-pulse">
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

          return (
            <motion.div
              key={code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: animationDelay, duration: 0.4 }}
              className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 p-3"
            >
              {isRendered ? (
                <AgeDistributionChart
                  data={chartData}
                  locationPrefix={code}
                  locationName={getLocationLabel(code)}
                  ageBrackets={ageBrackets}
                  ageColors={ageColors}
                  normalized={normalized}
                  height={gridLayout.chartHeight}
                />
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
                          style={{ height: `${Math.random() * 60 + 40}%` }}
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
