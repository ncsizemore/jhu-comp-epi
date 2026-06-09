'use client';

import React, { memo, useId, useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import type { ChartDataPoint } from '@/data/global-aging';

interface TooltipPayload {
  value?: number;
  dataKey: string;
  color: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
}

interface AgeDistributionChartProps {
  data: ChartDataPoint[];
  locationPrefix: string;
  locationName: string;
  ageBrackets: string[];
  ageColors: Record<string, string>;
  normalized?: boolean;
  height?: number;
  // When set, replaces locationName in the chart title (e.g. "Male"/"Female"
  // for the mf-split layout where the location name lives on the outer card).
  titleOverride?: string;
  // When set, fixes the y-axis upper bound. Used by mf-split to share scale
  // between male and female charts in the same location card.
  yMax?: number;
}

const AgeDistributionChart = memo(({
  data,
  locationPrefix,
  locationName,
  ageBrackets,
  ageColors,
  normalized = false,
  height = 400,
  titleOverride,
  yMax
}: AgeDistributionChartProps) => {
  const [visibleBrackets, setVisibleBrackets] = useState<Set<string>>(
    () => new Set(ageBrackets)
  );
  const gradientPrefix = useId().replace(/:/g, '');

  // Reset visibility when the bracket set itself changes (e.g. granularity toggle).
  // Without this, useState's first-render-only initializer leaves visibleBrackets
  // stuck on the old bracket names, filtering every Bar to null.
  useEffect(() => {
    setVisibleBrackets(new Set(ageBrackets));
  }, [ageBrackets]);

  const toggleBracket = (bracket: string) => {
    setVisibleBrackets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(bracket)) {
        if (newSet.size > 1) newSet.delete(bracket);
      } else {
        newSet.add(bracket);
      }
      return newSet;
    });
  };

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum: number, entry: TooltipPayload) => sum + (entry.value || 0), 0);

      return (
        <div className="relative z-50 bg-white/98 backdrop-blur-xl p-4 border-2 border-gray-200/60 rounded-2xl shadow-2xl ring-1 ring-black/5">
          <div className="mb-3 pb-2 border-b border-gray-200/70">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {locationName}
            </p>
            <p className="text-xl font-bold text-hopkins-blue">{label}</p>
            <p className="text-[9px] text-gray-500 mt-1 italic">
              Median counts (1,000 simulations)
            </p>
          </div>

          <div className="space-y-1.5 max-h-64 overflow-y-auto">
            {[...payload].reverse().map((entry: TooltipPayload, index: number) => {
              const bracket = entry.dataKey.replace(`${locationPrefix}_`, '');
              const value = entry.value || 0;
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
              const actualColor = ageColors[bracket] || '#888';

              return (
                <div key={index} className="flex items-center justify-between gap-4 text-sm">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div
                      className="w-3 h-3 rounded-sm shadow-sm"
                      style={{ backgroundColor: actualColor }}
                    />
                    <span className="font-medium text-gray-700 text-xs">{bracket}</span>
                  </div>
                  <div className="text-right">
                    {normalized ? (
                      <span className="font-semibold text-gray-900 text-xs">
                        {value.toFixed(1)}%
                      </span>
                    ) : (
                      <>
                        <span className="font-semibold text-gray-900 text-xs">
                          {value.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          ({percentage}%)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {!normalized && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-700">Total</span>
                <span className="font-bold text-gray-900">{total.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const isCompact = height < 380;

  const gradientId = (bracket: string) =>
    `${gradientPrefix}-gradient-${bracket.replace(/[^a-zA-Z0-9]/g, '_')}`;

  const CustomLegend = () => (
    <div
      className={`flex flex-wrap justify-center ${isCompact ? 'gap-1 mt-1' : 'gap-1.5 mt-3'}`}
      role="group"
      aria-label={`${locationName} age bracket visibility`}
    >
      {ageBrackets.map((bracket) => {
        const isVisible = visibleBrackets.has(bracket);
        const color = ageColors[bracket] || '#888';

        return (
          <button
            type="button"
            key={bracket}
            onClick={() => toggleBracket(bracket)}
            aria-pressed={isVisible}
            aria-label={`${isVisible ? 'Hide' : 'Show'} ${bracket}`}
            className={`group flex items-center ${isCompact ? 'gap-1 px-1.5 py-0.5' : 'gap-1.5 px-2 py-1'} rounded-lg border transition-all duration-200 ${
              isVisible
                ? 'bg-white/90 hover:bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                : 'bg-transparent border-transparent hover:bg-gray-50'
            }`}
            title={isVisible ? 'Click to hide' : 'Click to show'}
          >
            <div
              className={`${isCompact ? 'w-2 h-2' : 'w-2.5 h-2.5'} rounded transition-all duration-200 ${
                isVisible ? 'shadow-sm' : 'opacity-30 grayscale'
              }`}
              style={{ backgroundColor: color }}
            />
            <span className={`${isCompact ? 'text-[9px]' : 'text-[10px]'} transition-all ${
              isVisible ? 'text-gray-700 font-medium' : 'text-gray-400'
            }`}>
              {bracket}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="w-full">
      <div className="mb-2 text-center">
        <h3 className="text-base font-semibold text-gray-900">{titleOverride ?? locationName}</h3>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <defs>
            {ageBrackets.map(bracket => (
              <linearGradient key={bracket} id={gradientId(bracket)} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ageColors[bracket] || '#888'} stopOpacity={0.95} />
                <stop offset="100%" stopColor={ageColors[bracket] || '#888'} stopOpacity={0.7} />
              </linearGradient>
            ))}
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" opacity={0.6} />
          <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#d1d5db" />
          <YAxis
            tick={{ fontSize: 12, fill: '#6b7280' }}
            stroke="#d1d5db"
            domain={normalized ? [0, 100] : (yMax !== undefined ? [0, yMax] : [0, 'auto'])}
            ticks={normalized ? [0, 25, 50, 75, 100] : undefined}
            tickFormatter={(value) => {
              if (normalized) return `${value}%`;
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
              return value.toString();
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{ zIndex: 1000 }}
            cursor={{ fill: 'rgba(0, 45, 114, 0.08)', radius: 8 }}
          />
          <Legend content={<CustomLegend />} />

          {ageBrackets.map((bracket, idx) => {
            if (!visibleBrackets.has(bracket)) return null;
            const isLast = idx === ageBrackets.length - 1;
            return (
              <Bar
                key={bracket}
                dataKey={`${locationPrefix}_${bracket}`}
                stackId="1"
                fill={`url(#${gradientId(bracket)})`}
                radius={isLast ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

AgeDistributionChart.displayName = 'AgeDistributionChart';

export default AgeDistributionChart;
