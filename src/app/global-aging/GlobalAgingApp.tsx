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
  const chartGridRef = useRef<ChartGridHandle>(null);

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
                onClick={handleExportClick}
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
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Description */}
            <div className="px-6 py-5 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100 space-y-4">
              <p className="text-sm text-amber-900 leading-relaxed">
                <span className="font-semibold">About these plots:</span> These plots display the
                model-projected age distributions (both as total counts and relative percentages by
                age) of people living with HIV in each location over time.
              </p>

              <div className="text-sm text-amber-900">
                <p className="mb-1.5">
                  <span className="font-semibold">Note:</span> Income groupings reflect the{' '}
                  <a
                    href="https://datahelpdesk.worldbank.org/knowledgebase/articles/906519-world-bank-country-and-lending-groups"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-amber-700"
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
            </div>

            <div className="p-8">
              <GlobalAgingAppWithSuspense />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ModelingMethodologySection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-hopkins-blue/30 hover:shadow-md transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              isExpanded ? 'bg-hopkins-blue text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-hopkins-blue/10'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900">Modeling Methodology</h3>
            <p className="text-sm text-gray-600">
              Compartmental model, calibration approach, and published reference
            </p>
          </div>
        </div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isExpanded ? 'bg-hopkins-blue/10 rotate-180' : 'bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:p-8 space-y-4 text-sm text-gray-700 leading-relaxed">
          <p>
            The modeling methodology builds on previous work in Kenya, published as{' '}
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/38537051/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-hopkins-blue underline decoration-gray-300 hover:decoration-hopkins-blue underline-offset-2"
            >
              &ldquo;Forecasting the Effect of HIV-Targeted Interventions on the Age Distribution of
              People with HIV in Kenya&rdquo; (<em className="not-italic">AIDS</em>, 2024)
            </a>
            , and has been expanded to represent multiple countries, income groups, and global
            populations.
          </p>
          <p>
            The GMHA is a compartmental model characterized by transitions along the HIV continuum
            of care (HIV incidence, diagnosis, engagement in care, and viral suppression) and
            stratified by age and sex. The model parameters are calibrated using Bayesian methods,
            combining prior distributions of key model parameters from available literature and
            survey data with calibration targets from routine HIV and demographic surveillance data.
          </p>
          <p>
            In order to capture local heterogeneities in HIV epidemics, the global estimates were
            generated by calibrating nine individual country models (South Africa, Mozambique,
            Nigeria, Tanzania, Uganda, Kenya, Zambia, Zimbabwe, and Malawi) — representing ~50% of
            the global population living with HIV — and modeling the remaining countries as two
            aggregate models: one capturing all other countries included in{' '}
            <a
              href="https://aidsinfo.unaids.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-hopkins-blue underline decoration-gray-300 hover:decoration-hopkins-blue underline-offset-2"
            >
              UNAIDS&apos; disaggregated data reporting
            </a>
            , and one capturing the remaining countries that are not included in the UNAIDS data.
            All models were calibrated to target data through 2023, and the calibration process was
            run across multiple chains and thinned to a final set of 1,000 simulations. The global
            model was constructed by aggregating outputs across all individually-fitted
            country-level models, and outcomes were validated against UNAIDS global data on HIV
            incidence and prevalence. For each outcome, we report the median value and 95% credible
            interval.
          </p>
          <p className="pt-2 border-t border-gray-100">
            <span className="font-semibold text-gray-900">Income models:</span> We used the{' '}
            <a
              href="https://datahelpdesk.worldbank.org/knowledgebase/articles/906519-world-bank-country-and-lending-groups"
              target="_blank"
              rel="noopener noreferrer"
              className="text-hopkins-blue underline decoration-gray-300 hover:decoration-hopkins-blue underline-offset-2"
            >
              World Bank&apos;s income classification
            </a>{' '}
            to group models by income.
          </p>
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
              <p className="text-lg text-gray-700 leading-relaxed mb-5 max-w-2xl">
                As antiretroviral therapy (ART) continues to extend life expectancy, the
                global population of people living with HIV (PWH) is aging rapidly. This
                demographic shift has important implications for healthcare systems
                worldwide, particularly in sub-Saharan Africa, where the burden of HIV
                remains highest.
              </p>
              <p className="text-base text-gray-700 leading-relaxed mb-5 max-w-2xl">
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
              <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
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
              className="bg-gradient-to-br from-hopkins-blue/5 to-hopkins-spirit-blue/10 p-6 rounded-xl space-y-5"
            >
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-light text-hopkins-blue mb-1">14 Models</div>
                  <p className="text-xs text-gray-600">Nine individual countries, four income-group aggregates, and a global model</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-hopkins-blue/20">
                  <div>
                    <div className="text-2xl font-semibold text-hopkins-blue mb-1">~50%</div>
                    <p className="text-xs text-gray-600">of global PWH represented by individual country models</p>
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

      {/* Upcoming Conference: AIDS 2026 */}
      <section className="bg-gradient-to-r from-hopkins-gold/10 via-amber-50 to-hopkins-gold/10 border-y border-hopkins-gold/30">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 items-start">
            <div>
              <p className="text-amber-700 text-xs font-semibold tracking-widest uppercase mb-2">
                Upcoming
              </p>
              <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
                GMHA at AIDS 2026
              </h2>
              <p className="text-sm text-gray-700 mt-2">
                Rio de Janeiro · 26th International AIDS Conference
              </p>
              <a
                href="https://www.iasociety.org/conferences/aids2026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-hopkins-blue hover:underline"
              >
                Conference site
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <ul className="space-y-3">
              <li className="text-sm text-gray-800 leading-snug">
                <span className="font-semibold">Satellite session</span>
                <span className="text-gray-600"> · Tuesday, July 28 · 6:00–7:30 pm</span>
                <br />
                <span className="text-gray-700">Report from The Lancet HIV commission on HIV and ageing</span>
              </li>
              <li className="text-sm text-gray-800 leading-snug">
                <span className="font-semibold">Poster presentation</span>
                <span className="text-gray-600"> · Tuesday, July 28 · 12:00–1:00 pm</span>
                <br />
                <span className="text-gray-700">Forecasting the Global Age Distribution of People with HIV from 2025–2040</span>
              </li>
              <li className="text-sm text-gray-800 leading-snug">
                <span className="font-semibold">Poster presentation</span>
                <span className="text-gray-600"> · Wednesday, July 29 · 12:00–1:00 pm</span>
                <br />
                <span className="text-gray-700">The potential impact of long-acting injectable ART to reduce HIV incidence among youth in South Africa</span>
              </li>
            </ul>
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

              {/* Modeling Methodology */}
              <ErrorBoundary>
                <ModelingMethodologySection />
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
