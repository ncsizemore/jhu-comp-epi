'use client';

import React, { memo } from 'react';
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
  maxLocations = 13
}: LocationSelectorProps) => {

  const handleToggle = (code: string) => {
    if (selectedLocations.includes(code)) {
      onLocationChange(selectedLocations.filter(c => c !== code));
    } else if (selectedLocations.length < maxLocations) {
      onLocationChange([...selectedLocations, code]);
    }
  };

  const handleClearAll = () => onLocationChange([]);

  const handleSelectAll = () => {
    onLocationChange(getLocations().map(l => l.code).slice(0, maxLocations));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-gray-700">
          Select Locations
        </label>
        <div className="flex items-center gap-2">
          <div className="text-xs font-medium text-gray-600">
            {selectedLocations.length === 0 ? (
              <span className="text-gray-400">None selected</span>
            ) : (
              <span>
                <span className="text-hopkins-blue font-semibold">{selectedLocations.length}</span>/{maxLocations}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {selectedLocations.length < getLocations().length && (
              <button onClick={handleSelectAll} className="text-xs text-gray-600 hover:text-gray-900 underline transition-colors">
                All
              </button>
            )}
            {selectedLocations.length > 0 && (
              <button onClick={handleClearAll} className="text-xs text-gray-600 hover:text-gray-900 underline transition-colors">
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grouped location buttons */}
      <div className="space-y-3">
        {CATEGORY_CONFIG.map(({ category, label }) => {
          const locations = getLocationsByCategory(category);
          if (locations.length === 0) return null;

          return (
            <div key={category}>
              <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                {label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {locations.map(loc => {
                  const isSelected = selectedLocations.includes(loc.code);
                  const isDisabled = !isSelected && selectedLocations.length >= maxLocations;
                  const isGlobal = loc.code === 'global';

                  return (
                    <button
                      key={loc.code}
                      onClick={() => !isDisabled && handleToggle(loc.code)}
                      disabled={isDisabled}
                      title={isDisabled ? `Maximum locations reached (${maxLocations} max)` : loc.label}
                      className={`group relative px-2.5 py-1.5 text-xs font-semibold rounded-lg border-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:grayscale ${
                        isGlobal
                          ? isSelected
                            ? 'bg-gradient-to-br from-hopkins-gold to-amber-400 text-gray-900 border-hopkins-gold shadow-md hover:shadow-lg scale-105'
                            : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 border-gray-400 hover:border-hopkins-gold hover:bg-gradient-to-br hover:from-amber-50 hover:to-amber-100 hover:scale-105 hover:shadow-sm'
                          : isSelected
                            ? 'bg-gradient-to-br from-hopkins-blue to-hopkins-spirit-blue text-white border-hopkins-blue shadow-md hover:shadow-lg scale-105'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-hopkins-blue hover:bg-gray-50 hover:scale-105 hover:shadow-sm'
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
