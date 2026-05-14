'use client';

import React, { memo, useMemo } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import type { CalibrationChartPoint } from '@/data/global-aging';
import { OUTCOME_LABELS, isProportionOutcome } from '@/data/global-aging';

// Format model/observed values. Cascade outcomes are stored as 0–1 fractions
// and render as percentages; everything else is a count.
function formatValue(value: number, outcome: string): string {
  if (isProportionOutcome(outcome)) return `${(value * 100).toFixed(1)}%`;
  return Math.round(value).toLocaleString();
}

function formatTick(value: number, outcome: string): string {
  if (isProportionOutcome(outcome)) return `${Math.round(value * 100)}%`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
  return value.toString();
}

interface CalibrationChartProps {
  data: CalibrationChartPoint[];
  outcome: string;
  ageCategory: string;
  locationName: string;
  height?: number;
  lastObservedYear?: number;
}

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
  color: string;
  payload: CalibrationChartPoint;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: number;
  outcome: string;
  ageCategory: string;
  locationName: string;
}

const CustomTooltip = memo(({
  active, payload, label, outcome, ageCategory, locationName
}: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;
  const dataPoint = payload[0]?.payload;
  if (!dataPoint) return null;

  const ageLabel =
    ageCategory === 'total' ? 'Total' :
    ageCategory === 'male.15+' ? 'Male 15+' :
    ageCategory === 'female.15+' ? 'Female 15+' :
    ageCategory;
  const outcomeLabel = OUTCOME_LABELS[outcome] || outcome;

  return (
    <div className="bg-white/98 backdrop-blur-xl p-4 border-2 border-gray-200/60 rounded-2xl shadow-2xl ring-1 ring-black/5 max-w-xs">
      <div className="mb-3 pb-2 border-b border-gray-200/70">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {locationName} · {ageLabel}
        </p>
        <p className="text-xl font-bold text-hopkins-blue">{label}</p>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-gray-800 rounded" />
            <span className="text-gray-600">Model mean</span>
          </div>
          <span className="font-semibold text-gray-900">
            {formatValue(dataPoint.mean, outcome)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-200 rounded-sm opacity-60" />
            <span className="text-gray-600">95% CI</span>
          </div>
          <span className="font-medium text-gray-700">
            {formatValue(dataPoint.lower, outcome)} – {formatValue(dataPoint.upper, outcome)}
          </span>
        </div>
        {dataPoint.observed !== undefined && (
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-gray-600">UNAIDS observed</span>
            </div>
            <span className="font-semibold text-emerald-700">
              {formatValue(dataPoint.observed, outcome)}
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 pt-2 border-t border-gray-200">
        <p className="text-xs text-gray-500 italic">{outcomeLabel}</p>
      </div>
    </div>
  );
});

CustomTooltip.displayName = 'CustomTooltip';

const CalibrationChart = memo(({
  data,
  outcome,
  ageCategory,
  locationName,
  height = 280,
  lastObservedYear = 2023
}: CalibrationChartProps) => {
  const chartData = useMemo(() => {
    return data.map(point => ({
      ...point,
      observedPoint: point.observed
    }));
  }, [data]);

  const yDomain = useMemo(() => {
    const allValues = data.flatMap(d => [
      d.lower, d.upper, d.observed ?? 0
    ]).filter(v => v > 0);
    if (allValues.length === 0) return [0, isProportionOutcome(outcome) ? 1 : 100];
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const padding = (max - min) * 0.1;
    const upper = isProportionOutcome(outcome) ? Math.min(1, max + padding) : max + padding;
    return [Math.max(0, min - padding), upper];
  }, [data, outcome]);

  const title = useMemo(() => {
    if (ageCategory === 'total') return 'Total';
    if (ageCategory === 'male.15+') return 'Male 15+';
    if (ageCategory === 'female.15+') return 'Female 15+';
    return ageCategory;
  }, [ageCategory]);

  // 5-year tick marks across the data range. Recharts XAxis defaults to
  // type="category", which ignores `domain` — `ticks` is the only knob that
  // matters here, so don't bother computing xDomain.
  const xTicks = useMemo(() => {
    if (data.length === 0) return [];
    const years = data.map(d => d.year);
    const min = Math.min(...years);
    const max = Math.max(...years);
    const ticks: number[] = [];
    for (let y = Math.ceil(min / 5) * 5; y <= max; y += 5) {
      ticks.push(y);
    }
    return ticks;
  }, [data]);

  return (
    <div className="w-full">
      <div className="mb-2 text-center">
        <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id={`ciGradient-${outcome}-${ageCategory}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity={0.3} />
              <stop offset="50%" stopColor="#FB923C" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#FDBA74" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.6} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: '#6B7280' }}
            stroke="#D1D5DB"
            ticks={xTicks}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#6B7280' }}
            stroke="#D1D5DB"
            domain={yDomain}
            tickFormatter={(value) => formatTick(value, outcome)}
            width={50}
          />

          <ReferenceLine
            x={lastObservedYear}
            stroke="#9CA3AF"
            strokeDasharray="4 4"
            strokeWidth={1}
          />

          <Tooltip
            content={<CustomTooltip outcome={outcome} ageCategory={ageCategory} locationName={locationName} />}
            cursor={{ stroke: '#002D72', strokeWidth: 1, strokeOpacity: 0.3 }}
          />

          <Area type="monotone" dataKey="upper" stroke="none" fill={`url(#ciGradient-${outcome}-${ageCategory})`} fillOpacity={1} isAnimationActive={false} />
          <Area type="monotone" dataKey="lower" stroke="none" fill="#FFFFFF" fillOpacity={1} isAnimationActive={false} />
          <Area type="monotone" dataKey="upper" stroke="#F97316" strokeWidth={1} strokeOpacity={0.4} fill="none" isAnimationActive={false} />
          <Area type="monotone" dataKey="lower" stroke="#F97316" strokeWidth={1} strokeOpacity={0.4} fill="none" isAnimationActive={false} />
          <Line type="monotone" dataKey="mean" stroke="#1F2937" strokeWidth={2} dot={false} isAnimationActive={false} />
          <Scatter dataKey="observedPoint" fill="#10B981" stroke="#059669" strokeWidth={1.5} isAnimationActive={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
});

CalibrationChart.displayName = 'CalibrationChart';

export default CalibrationChart;
