import React from 'react';
import dynamic from 'next/dynamic';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { HeroBackground } from '@/components/ui/HeroBackground';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SectionErrorFallback } from '@/components/SectionErrorFallback';

// Lazy load the map component (it's heavy with react-simple-maps)
const SimpleMapDisplay = dynamic(
  () => import('@/components/sections/home/SimpleMapDisplay'),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-hopkins-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }
);

// Enhanced Hero Section
function EnhancedHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
      <HeroBackground />

      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tight leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-hopkins-gold to-amber-400">Computational</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hopkins-gold to-amber-400">Epidemiology</span> Lab
          </h1>

          <p className="text-lg font-medium text-gray-300 max-w-4xl mx-auto mb-6 leading-relaxed">
            The Computational Epidemiology Lab develops and applies mathematical, statistical, and computational approaches to study infectious disease dynamics. Our work spans modeling, simulation, and data-driven analyses to inform surveillance, prevention, and public health decision-making in the United States. Our interdisciplinary team leverages these methods to generate actionable insights that guide public health interventions.
          </p>

          <p className="text-base text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Johns Hopkins Bloomberg School of Public Health & School of Medicine
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-hopkins-blue to-hopkins-spirit-blue text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-hopkins-blue/25 transition-all duration-300 transform hover:scale-105"
            >
              <span>Explore Our Models</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <Link
              href="/publications"
              className="group inline-flex items-center gap-3 px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <span>View Publications</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Consolidated Research Section with Map
function ResearchSection() {
  return (
    <section className="py-14 bg-gradient-to-br from-white via-gray-50 to-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-hopkins-blue/6 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-hopkins-spirit-blue/4 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
            Our <span className="text-hopkins-blue">Research</span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From local cities to national health systems, our computational frameworks model epidemic dynamics across diverse geographic and demographic landscapes
          </p>
        </div>

        {/* Map + Research Areas - One Unified Card */}
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden shadow-lg mb-10">
          {/* Map */}
          <div className="p-6">
            <ErrorBoundary fallback={<SectionErrorFallback title="Map temporarily unavailable" message="The interactive map could not be loaded. The map shows our research locations across the United States." />}>
              <SimpleMapDisplay />
            </ErrorBoundary>
          </div>

          {/* Research Areas - directly below map in same card */}
          <div className="px-6 pb-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="w-14 h-14 bg-gradient-to-br from-hopkins-blue to-blue-800 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-7 h-7 bg-white rounded-full"></div>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">HIV Transmission & Prevention</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  JHEEM simulates dynamics across 32 cities, evaluating PrEP and treatment strategies.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-7 h-7 bg-white rounded-full"></div>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">HIV-STI Co-epidemic Dynamics</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  SHIELD models dual epidemic strategies across high-burden jurisdictions.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <div className="w-14 h-14 bg-gradient-to-br from-hopkins-spirit-blue to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-7 h-7 bg-white rounded-full"></div>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">Aging HIV Populations</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  PEARL models multimorbidity patterns across 200+ clinical sites.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Impact Story */}
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 lg:p-8 mb-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-hopkins-blue rounded-full"></div>
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Featured Study</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Ryan White HIV/AIDS Program Evaluation
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Our JHEEM model, informed by surveys of 180 clinic directors across 31 US cities,
                projected that ending Ryan White services could increase HIV infections by 49% over five years.
                This research provides critical evidence for policy decisions about essential HIV care programs.
              </p>

              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-hopkins-blue/10 rounded-lg">
                  <span className="text-xs font-medium text-gray-700">Survey + Modeling Integration</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-lg">
                  <span className="text-xs font-medium text-gray-700">Policy Evaluation</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-hopkins-blue/20 to-hopkins-spirit-blue/30 rounded-xl p-5">
                <div className="text-3xl font-black text-hopkins-blue mb-1">75,436</div>
                <p className="text-gray-700 font-medium text-sm mb-1">Additional Infections</p>
                <p className="text-gray-600 text-xs">If Programs End</p>
                <div className="mt-3 text-xl font-black text-gray-700">49%</div>
                <p className="text-gray-600 text-xs">Projected Increase</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-hopkins-blue to-hopkins-spirit-blue text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-hopkins-blue/25 transition-all duration-500 transform hover:scale-105"
          >
            <span>Explore Our Models</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <Link
            href="/publications"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>View Publications</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// In the News Callout - Enhanced with attention-grabbing design
function InTheNewsCallout() {
  return (
    <section className="py-10 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-6">
        <a
          href="https://www.nbcnews.com/health/sexual-health/republicans-seek-deep-cuts-hiv-prevention-treatment-funding-rcna233776"
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 rounded-2xl border-2 border-red-400/40 p-6 hover:shadow-2xl hover:border-red-500/60 transition-all duration-300 hover:-translate-y-1"
        >
          {/* Attention badge */}
          <div className="absolute -top-3 left-6 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            ⚡ Featured in the News
          </div>

          <div className="flex items-start gap-4 mt-2">
            {/* Icon */}
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-gray-600">NBC News</span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-500">September 2025</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors">
                Experts warn of consequences from proposed HIV funding cuts
              </h3>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                Dr. Anthony Fojo discusses how eliminating the CDC&apos;s HIV-prevention division could disrupt critical functions as models project over 213,000 additional infections through 2030.
              </p>
              <span className="text-sm text-red-700 font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Read full article
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <MainLayout>
      <EnhancedHeroSection />
      <InTheNewsCallout />
      <ResearchSection />
    </MainLayout>
  );
}