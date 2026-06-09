'use client';

import React, { memo, useMemo } from 'react';
import { getLocations, getLocationsByCategory } from '@/data/global-aging';
import type { LocationMeta } from '@/data/global-aging';

interface LocationSelectorProps {
  selectedLocations: string[];
  onLocationChange: (locations: string[]) => void;
  maxLocations?: number;
}

const CATEGORY_CONFIG: { category: LocationMeta['category']; label: string }[] = [
  { category: 'country', label: 'Countries' },
  { category: 'income_group', label: 'Income Groups' },
  { category: 'aggregate', label: 'Aggregates' },
];

const LocationSelector = memo(({
  selectedLocations,
  onLocationChange,
  maxLocations = Number.POSITIVE_INFINITY
}: LocationSelectorProps) => {
  const allLocations = useMemo(() => getLocations(), []);
  const locationsByCategory = useMemo(
    () => Object.fromEntries(
      CATEGORY_CONFIG.map(({ category }) => [category, getLocationsByCategory(category)])
    ) as Record<LocationMeta['category'], LocationMeta[]>,
    [],
  );
  const maxSelectable = Math.min(maxLocations, allLocations.length);
  const selectAllLabel = maxSelectable < allLocations.length ? 'Max' : 'All';

  const handleToggle = (code: string) => {
    if (selectedLocations.includes(code)) {
      onLocationChange(selectedLocations.filter(c => c !== code));
    } else if (selectedLocations.length < maxSelectable) {
      onLocationChange([...selectedLocations, code]);
    }
  };

  const handleClearAll = () => onLocationChange([]);

  const handleSelectAll = () => {
    onLocationChange(allLocations.map(l => l.code).slice(0, maxSelectable));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[color:var(--color-ink)]">
          Select Locations
        </label>
        <div className="flex items-center gap-2">
          <div className="text-xs font-medium text-[color:var(--color-muted)]">
            {selectedLocations.length === 0 ? (
              <span className="text-gray-400">None selected</span>
            ) : (
                <span>
                  <span className="text-hopkins-blue font-semibold">{selectedLocations.length}</span>/{maxSelectable}
                </span>
              )}
            </div>
            <div className="flex gap-2">
            {selectedLocations.length < maxSelectable && (
              <button type="button" onClick={handleSelectAll} className="text-xs text-[color:var(--color-muted)] underline transition-colors hover:text-[color:var(--color-ink)]">
                {selectAllLabel}
              </button>
            )}
            {selectedLocations.length > 0 && (
              <button type="button" onClick={handleClearAll} className="text-xs text-[color:var(--color-muted)] underline transition-colors hover:text-[color:var(--color-ink)]">
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grouped location buttons */}
      <div className="space-y-3">
        {CATEGORY_CONFIG.map(({ category, label }) => {
          const locations = locationsByCategory[category] ?? [];
          if (locations.length === 0) return null;

          return (
            <div key={category}>
              <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                {label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {locations.map(loc => {
                  const isSelected = selectedLocations.includes(loc.code);
                  const isDisabled = !isSelected && selectedLocations.length >= maxLocations;
                  const isGlobal = loc.code === 'global';

                  return (
                    <button
                      type="button"
                      key={loc.code}
                      onClick={() => !isDisabled && handleToggle(loc.code)}
                      disabled={isDisabled}
                      aria-pressed={isSelected}
                      aria-label={`${isSelected ? 'Deselect' : 'Select'} ${loc.label}`}
                      title={isDisabled ? `Maximum locations reached (${maxSelectable} max)` : loc.label}
                      className={`group relative border px-2.5 py-1.5 text-xs font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 disabled:grayscale ${
                        isGlobal
                          ? isSelected
                            ? 'border-[color:var(--color-accent)] bg-[color:var(--color-accent)] text-[color:var(--color-ink)]'
                            : 'border-[color:var(--color-rule)] bg-[#f8fafc] text-[color:var(--color-muted)] hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-ink)]'
                          : isSelected
                            ? 'border-[color:var(--color-hopkins-blue)] bg-[color:var(--color-hopkins-blue)] text-white'
                            : 'border-[color:var(--color-rule)] bg-white text-[color:var(--color-muted)] hover:border-[color:var(--color-hopkins-blue)] hover:bg-[#f8fafc] hover:text-[color:var(--color-ink)]'
                      }`}
                    >
                      {loc.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

LocationSelector.displayName = 'LocationSelector';

export default LocationSelector;
