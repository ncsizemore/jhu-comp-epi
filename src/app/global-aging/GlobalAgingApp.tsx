'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import LocationSelector from '@/components/global-aging/LocationSelector';
import MultiLocationChartGrid from '@/components/global-aging/MultiLocationChartGrid';
import type { ChartGridHandle } from '@/components/global-aging/MultiLocationChartGrid';
import TimelineControls from '@/components/global-aging/TimelineControls';
import CalibrationSection from '@/components/global-aging/CalibrationSection';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { isValidLocationCode } from '@/data/global-aging';
import type { SexMode, AgeGranularity } from '@/data/global-aging';

type SearchParamReader = {
  get(name: string): string | null;
};

const DEFAULT_LOCATIONS = ['south_africa', 'kenya'];
const DEFAULT_YEAR_RANGE: [number, number] = [2025, 2040];

function initialLocations(searchParams: SearchParamReader): string[] {
  const urlLocations = searchParams.get('locations');
  if (!urlLocations) return DEFAULT_LOCATIONS;

  const codes = urlLocations.split(',').filter(isValidLocationCode);
  return codes.length > 0 ? codes : DEFAULT_LOCATIONS;
}

function initialSexMode(searchParams: SearchParamReader): SexMode {
  const urlSex = searchParams.get('sex');
  if (urlSex === 'male' || urlSex === 'female' || urlSex === 'both' || urlSex === 'mf-split') {
    return urlSex;
  }

  return 'both';
}

function initialGranularity(searchParams: SearchParamReader): AgeGranularity {
  const urlGranularity = searchParams.get('age');
  if (urlGranularity === 'collapsed' || urlGranularity === 'full') {
    return urlGranularity;
  }

  return 'collapsed';
}

function initialNormalized(searchParams: SearchParamReader): boolean {
  return searchParams.get('normalized') === 'true';
}

function initialYearRange(searchParams: SearchParamReader): [number, number] {
  const urlYears = searchParams.get('years');
  if (!urlYears) return DEFAULT_YEAR_RANGE;

  const [start, end] = urlYears.split('-').map(Number);
  if (!isNaN(start) && !isNaN(end) && start >= 2025 && end <= 2040 && start <= end) {
    return [start, end];
  }

  return DEFAULT_YEAR_RANGE;
}

// Inner component using useSearchParams
function GlobalAgingAppInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedLocations, setSelectedLocations] = useState<string[]>(() =>
    initialLocations(searchParams),
  );
  const [sexMode, setSexMode] = useState<SexMode>(() => initialSexMode(searchParams));
  const [granularity, setGranularity] = useState<AgeGranularity>(() =>
    initialGranularity(searchParams),
  );
  const [normalized, setNormalized] = useState(() => initialNormalized(searchParams));
  const [yearRange, setYearRange] = useState<[number, number]>(() =>
    initialYearRange(searchParams),
  );

  type ExportStatus = 'idle' | 'exporting' | 'success' | 'error';
  const [exportStatus, setExportStatus] = useState<ExportStatus>('idle');
  const chartGridRef = useRef<ChartGridHandle>(null);
  const exportDisabled = exportStatus === 'exporting' || selectedLocations.length === 0;
  const exportButtonLabel =
    exportStatus === 'exporting' ? 'Exporting' :
    exportStatus === 'success' ? 'Exported' :
    exportStatus === 'error' ? 'Export failed' :
    selectedLocations.length === 0 ? 'Select locations' :
    'Export PNG';

  const handleExportClick = async () => {
    if (!chartGridRef.current) return;
    setExportStatus('exporting');
    try {
      await chartGridRef.current.exportToPng();
      setExportStatus('success');
    } catch (err) {
      console.error('PNG export failed:', err);
      setExportStatus('error');
    }
    setTimeout(() => setExportStatus('idle'), 2000);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('locations', selectedLocations.join(','));

    if (sexMode !== 'both') params.set('sex', sexMode);
    if (granularity !== 'collapsed') params.set('age', granularity);
    if (normalized) params.set('normalized', 'true');
    if (yearRange[0] !== 2025 || yearRange[1] !== 2040) {
      params.set('years', `${yearRange[0]}-${yearRange[1]}`);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedLocations, sexMode, granularity, normalized, yearRange, router]);

  return (
    <div className="space-y-7">
      {/* Controls Section */}
      <div className="border border-[color:var(--color-rule)] bg-white shadow-[0_14px_45px_rgba(15,23,42,0.04)]">
        <div className="grid divide-y divide-[color:var(--color-rule)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.9fr)_minmax(18rem,0.7fr)] lg:divide-x lg:divide-y-0">
          {/* Location Selector */}
          <div className="p-4 md:p-5">
            <LocationSelector
              selectedLocations={selectedLocations}
              onLocationChange={setSelectedLocations}
            />
          </div>

          {/* Timeline Controls */}
          <div className="p-4 md:p-5">
            <TimelineControls
              yearRange={yearRange}
              onYearRangeChange={setYearRange}
              minYear={2025}
              maxYear={2040}
            />
          </div>

          {/* Options Panel */}
          <div className="grid gap-3 p-4 sm:grid-cols-2 md:p-5 lg:grid-cols-1">
            {/* Sex Group */}
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                Sex
              </label>
              <div className="flex w-full overflow-hidden border border-[color:var(--color-rule)]" role="group" aria-label="Sex">
                {(['both', 'male', 'female', 'mf-split'] as SexMode[]).map(s => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSexMode(s)}
                    aria-pressed={sexMode === s}
                    className={`flex-1 px-2 py-2 text-[11px] font-semibold transition-all duration-200 ${
                      s !== 'both' ? 'border-l border-[color:var(--color-rule)]' : ''
                    } ${
                      sexMode === s
                        ? 'bg-[color:var(--color-hopkins-blue)] text-white'
                        : 'bg-white text-[color:var(--color-muted)] hover:bg-[#f8fafc] hover:text-[color:var(--color-ink)]'
                    }`}
                    title={s === 'mf-split' ? 'Male and female charts side-by-side per location' : undefined}
                  >
                    {s === 'both' ? 'Both' : s === 'male' ? 'Male' : s === 'female' ? 'Female' : 'Split'}
                  </button>
                ))}
              </div>
            </div>

            {/* Age Granularity */}
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                Age Groups
              </label>
              <div className="flex w-full overflow-hidden border border-[color:var(--color-rule)]" role="group" aria-label="Age groups">
                <button
                  type="button"
                  onClick={() => setGranularity('collapsed')}
                  aria-pressed={granularity === 'collapsed'}
                  className={`flex-1 px-2 py-2 text-[11px] font-semibold transition-all duration-200 ${
                    granularity === 'collapsed'
                      ? 'bg-[color:var(--color-hopkins-blue)] text-white'
                      : 'bg-white text-[color:var(--color-muted)] hover:bg-[#f8fafc] hover:text-[color:var(--color-ink)]'
                  }`}
                  title="7 collapsed age groups (0-14, 15-24, ... 65+)"
                >
                  7 Groups
                </button>
                <button
                  type="button"
                  onClick={() => setGranularity('full')}
                  aria-pressed={granularity === 'full'}
                  className={`flex-1 border-l border-[color:var(--color-rule)] px-2 py-2 text-[11px] font-semibold transition-all duration-200 ${
                    granularity === 'full'
                      ? 'bg-[color:var(--color-hopkins-blue)] text-white'
                      : 'bg-white text-[color:var(--color-muted)] hover:bg-[#f8fafc] hover:text-[color:var(--color-ink)]'
                  }`}
                  title="Full 17 five-year age brackets (0-4, 5-9, ... 80+)"
                >
                  17 Brackets
                </button>
              </div>
            </div>

            {/* Display Mode */}
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                Display Mode
              </label>
              <div className="flex w-full overflow-hidden border border-[color:var(--color-rule)]" role="group" aria-label="Display mode">
                <button
                  type="button"
                  onClick={() => setNormalized(false)}
                  aria-pressed={!normalized}
                  className={`flex-1 px-2 py-2 text-[11px] font-semibold transition-all duration-200 ${
                    !normalized
                      ? 'bg-[color:var(--color-hopkins-blue)] text-white'
                      : 'bg-white text-[color:var(--color-muted)] hover:bg-[#f8fafc] hover:text-[color:var(--color-ink)]'
                  }`}
                  title="Show absolute counts"
                >
                  Counts
                </button>
                <button
                  type="button"
                  onClick={() => setNormalized(true)}
                  aria-pressed={normalized}
                  className={`flex-1 border-l border-[color:var(--color-rule)] px-2 py-2 text-[11px] font-semibold transition-all duration-200 ${
                    normalized
                      ? 'bg-[color:var(--color-hopkins-blue)] text-white'
                      : 'bg-white text-[color:var(--color-muted)] hover:bg-[#f8fafc] hover:text-[color:var(--color-ink)]'
                  }`}
                  title="Show proportional percentages"
                >
                  Proportional %
                </button>
              </div>
            </div>

            {/* Export */}
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                Export
              </label>
              <div className="w-full">
                <button
                  type="button"
                  onClick={handleExportClick}
                  disabled={exportDisabled}
                  className={`flex w-full items-center justify-center gap-1 border px-2 py-2 text-[11px] font-semibold transition-all ${
                    exportDisabled
                      ? `border-[color:var(--color-rule)] bg-[#f8fafc] text-gray-400 ${exportStatus === 'exporting' ? 'cursor-wait' : 'cursor-not-allowed'}`
                      : exportStatus === 'success'
                      ? 'border-green-300 bg-green-50 text-green-700'
                      : exportStatus === 'error'
                      ? 'border-red-300 bg-red-50 text-red-700'
                      : 'border-[color:var(--color-rule)] bg-white text-[color:var(--color-muted)] hover:border-[color:var(--color-hopkins-blue)] hover:bg-[#f8fafc] hover:text-[color:var(--color-ink)]'
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
                  <span aria-live="polite">{exportButtonLabel}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Grid */}
      <ErrorBoundary>
        <MultiLocationChartGrid
          ref={chartGridRef}
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
      <div className="border border-[color:var(--color-rule)] bg-white p-8">
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
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="border border-[color:var(--color-rule)] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.045)]">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="global-aging-projections-panel"
        className={`group flex w-full items-center justify-between bg-white p-5 text-left transition-colors hover:bg-[#fbfcfe] ${
          isExpanded ? 'border-b border-[color:var(--color-rule)]' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center border transition-colors ${
            isExpanded
              ? 'border-[color:var(--color-hopkins-blue)] bg-[color:var(--color-hopkins-blue)] text-white'
              : 'border-[color:var(--color-rule)] bg-[#f8fafc] text-[color:var(--color-muted)] group-hover:border-[color:var(--color-hopkins-blue)]/35'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-[color:var(--color-ink)]">Age Distribution Projections</h3>
            <p className="text-sm text-[color:var(--color-muted)]">
              Projected age cohort trends by location and sex (2025–2040)
            </p>
          </div>
        </div>
        <div className={`flex h-8 w-8 items-center justify-center transition-all ${
          isExpanded ? 'rotate-180 text-[color:var(--color-hopkins-blue)]' : 'text-[color:var(--color-muted)]'
        }`} aria-hidden="true">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div id="global-aging-projections-panel">
            {/* Description */}
            <div className="space-y-4 border-b border-[#ece4d4] bg-[#fffdf7] px-5 py-5 md:px-6">
              <p className="text-sm leading-relaxed text-[#594f3c]">
                <span className="font-semibold">About these plots:</span> These plots display the
                model-projected age distributions (both as total counts and relative percentages by
                age) of people living with HIV in each location over time.
              </p>

              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="inline-flex w-fit items-center gap-1.5 border border-[#d8c9a8] bg-white/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#665436] transition-colors hover:bg-white hover:text-[color:var(--color-ink)]"
                aria-expanded={showDetails}
                aria-controls="global-aging-projections-details"
              >
                {showDetails ? 'Hide details' : 'Methodology and details'}
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
                <div id="global-aging-projections-details" className="space-y-4">
                  <div className="text-sm text-[#594f3c]">
                    <p className="mb-1.5">
                      <span className="font-semibold">Note:</span> Income groupings reflect the{' '}
                      <a
                        href="https://datahelpdesk.worldbank.org/knowledgebase/articles/906519-world-bank-country-and-lending-groups"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-[#d8c9a8] underline-offset-4 hover:text-[color:var(--color-link)]"
                      >
                        World Bank&apos;s income classifications
                      </a>{' '}
                      and include the following countries:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <span className="font-medium">Low income:</span> Malawi, Mozambique, Uganda, and
                        all other low-income countries reporting to UNAIDS, modeled as an aggregate
                      </li>
                      <li>
                        <span className="font-medium">Lower middle income:</span> Kenya, Nigeria, Tanzania,
                        Zambia, Zimbabwe, and all other lower-middle-income countries reporting to UNAIDS,
                        modeled as an aggregate
                      </li>
                      <li>
                        <span className="font-medium">Upper middle income:</span> South Africa and all
                        other upper-middle-income countries reporting to UNAIDS, modeled as an aggregate
                      </li>
                      <li>
                        <span className="font-medium">High income:</span> All high-income countries
                        reporting to UNAIDS, modeled as an aggregate
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3 border-t border-[#ece4d4] pt-4 text-sm text-[#594f3c]">
                    <p className="font-semibold text-[color:var(--color-ink)]">Modeling Methodology</p>
                    <p className="leading-relaxed">
                      The modeling methodology builds on previous work in Kenya, published as{' '}
                      <a
                        href="https://pubmed.ncbi.nlm.nih.gov/38537051/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-[#d8c9a8] underline-offset-4 hover:text-[color:var(--color-link)]"
                      >
                        &ldquo;Forecasting the Effect of HIV-Targeted Interventions on the Age
                        Distribution of People with HIV in Kenya&rdquo; (
                        <em className="not-italic">AIDS</em>, 2024)
                      </a>
                      , and has been expanded to represent multiple countries, income groups, and
                      global populations.
                    </p>
                    <p className="leading-relaxed">
                      The GMHA is a compartmental model characterized by transitions along the HIV
                      continuum of care (HIV incidence, diagnosis, engagement in care, and viral
                      suppression) and stratified by age and sex. The model parameters are calibrated
                      using Bayesian methods, combining prior distributions of key model parameters
                      from available literature and survey data with calibration targets from routine
                      HIV and demographic surveillance data.
                    </p>
                    <p className="leading-relaxed">
                      In order to capture local heterogeneities in HIV epidemics, the global estimates
                      were generated by calibrating nine individual country models (South Africa,
                      Mozambique, Nigeria, Tanzania, Uganda, Kenya, Zambia, Zimbabwe, and Malawi) —
                      representing ~50% of the global population living with HIV — and modeling the
                      remaining countries as two aggregate models: one capturing all other countries
                      included in{' '}
                      <a
                        href="https://aidsinfo.unaids.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-[#d8c9a8] underline-offset-4 hover:text-[color:var(--color-link)]"
                      >
                        UNAIDS&apos; disaggregated data reporting
                      </a>
                      , and one capturing the remaining countries that are not included in the UNAIDS
                      data. All models were calibrated to target data through 2023, and the calibration
                      process was run across multiple chains and thinned to a final set of 1,000
                      simulations. The global model was constructed by aggregating outputs across all
                      individually-fitted country-level models, and outcomes were validated against
                      UNAIDS global data on HIV incidence and prevalence. For each outcome, we report
                      the median value and 95% credible interval.
                    </p>
                    <p className="leading-relaxed">
                      <span className="font-semibold">Income models:</span> We used the{' '}
                      <a
                        href="https://datahelpdesk.worldbank.org/knowledgebase/articles/906519-world-bank-country-and-lending-groups"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-[#d8c9a8] underline-offset-4 hover:text-[color:var(--color-link)]"
                      >
                        World Bank&apos;s income classification
                      </a>{' '}
                      to group models by income.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 md:p-6">
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
      <section className="border-b border-[color:var(--color-rule)]">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-hopkins-blue)]">
              GMHA Modeling Analysis
            </p>
            <h1 className="mb-8 font-serif text-[2.1rem] leading-[1.08] text-[color:var(--color-ink)] sm:text-4xl md:text-5xl">
              Global Aging Among<br />
              <span className="text-[color:var(--color-hopkins-blue)]">People Living with HIV</span>
            </h1>
          </motion.div>

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.4fr)_20rem]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <p className="mb-5 max-w-3xl text-lg leading-relaxed text-[color:var(--color-ink)]">
                As antiretroviral therapy (ART) continues to extend life expectancy, the
                global population of people living with HIV (PWH) is aging rapidly. This
                demographic shift has important implications for healthcare systems
                worldwide, particularly in sub-Saharan Africa, where the burden of HIV
                remains highest.
              </p>
              <p className="mb-5 max-w-3xl text-base leading-relaxed text-[color:var(--color-muted)]">
                The Global Model of HIV &amp; Aging (GMHA) is a compartmental model of HIV
                transmission, treatment, and population aging that provides a robust
                framework for studying demographic trends among PWH. Originally developed
                to characterize HIV and aging dynamics at a broad scale, the model has been
                adapted and expanded to represent nine individual countries that
                collectively account for approximately 50% of the global population living
                with HIV, as well as four income-group aggregates and a global model. These
                extensions enable comparative analyses of aging trends across diverse
                epidemiological and socioeconomic settings.
              </p>
              <p className="max-w-3xl text-base leading-relaxed text-[color:var(--color-muted)]">
                This interactive tool explores projected age distributions of PWH from 2025
                to 2040 across multiple locations. Projections can be viewed as either
                counts or proportions for the overall population and stratified by age
                groups. The lower panels provide a brief description of modeling
                methodology and a summary review of model calibration for each location.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border-t border-[color:var(--color-rule)] pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-1"
            >
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                  Upcoming
                </p>
                <h3 className="font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
                  GMHA at AIDS 2026
                </h3>
                <p className="mt-2 text-xs text-[color:var(--color-muted)]">
                  Rio de Janeiro · 26th International AIDS Conference
                </p>
              </div>

              <ul className="mt-5 space-y-4 text-xs">
                <li className="border-t border-[color:var(--color-rule)] pt-3">
                  <div className="font-semibold text-[color:var(--color-ink)]">Satellite session</div>
                  <div className="text-[color:var(--color-muted)]">Tue, Jul 28 · 6:00–7:30 pm</div>
                  <div className="mt-1 text-[color:var(--color-muted)]">
                    Report from The Lancet HIV commission on HIV and ageing
                  </div>
                </li>
                <li className="border-t border-[color:var(--color-rule)] pt-3">
                  <div className="font-semibold text-[color:var(--color-ink)]">Poster presentation</div>
                  <div className="text-[color:var(--color-muted)]">Tue, Jul 28 · 12:00–1:00 pm</div>
                  <div className="mt-1 text-[color:var(--color-muted)]">
                    Forecasting the Global Age Distribution of People with HIV from 2025–2040
                  </div>
                </li>
                <li className="border-t border-[color:var(--color-rule)] pt-3">
                  <div className="font-semibold text-[color:var(--color-ink)]">Poster presentation</div>
                  <div className="text-[color:var(--color-muted)]">Wed, Jul 29 · 12:00–1:00 pm</div>
                  <div className="mt-1 text-[color:var(--color-muted)]">
                    The potential impact of long-acting injectable ART to reduce HIV incidence among
                    youth in South Africa
                  </div>
                </li>
              </ul>

              <a
                href="https://www.iasociety.org/conferences/aids2026"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center gap-1.5 border-t border-[color:var(--color-rule)] pt-4 text-xs font-medium text-[color:var(--color-link)] hover:underline"
              >
                Conference details
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main App Area */}
      <section className="border-b border-[color:var(--color-rule)] bg-[#fbfcfe] py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="space-y-8">
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
