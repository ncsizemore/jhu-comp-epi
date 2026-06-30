import dynamic from 'next/dynamic';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SectionErrorFallback } from '@/components/SectionErrorFallback';
import { SITE } from '@/lib/site';
import { HOMEPAGE_INTRO } from '@/lib/research-content';
import {
  getHomepageFindingsData,
  type HomepageFindingsData,
} from '@/lib/jheem-findings-data';
import type { FindingsMapProps } from '@/components/sections/home/findings-map-types';

const FindingsMap = dynamic<FindingsMapProps>(
  () => import('@/components/sections/home/FindingsMap'),
  {
    loading: () => (
      <div className="h-[620px] flex items-center justify-center text-sm text-[color:var(--color-muted)]">
        Loading findings…
      </div>
    ),
  },
);

function EvidenceFieldBackdrop({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={[
        'pointer-events-none absolute inset-x-0 top-0 hidden overflow-hidden md:block',
        compact ? 'h-64' : 'h-full min-h-[34rem]',
      ].join(' ')}
    >
      <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(0,45,114,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,45,114,0.045)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(242,196,19,0.12),transparent_23%),radial-gradient(circle_at_82%_18%,rgba(42,168,184,0.14),transparent_26%),linear-gradient(to_bottom,rgba(248,251,253,0.15)_0%,#fbfcfe_86%)]" />
      <svg
        className={[
          'absolute left-1/2 w-[min(78rem,calc(100vw-3rem))] -translate-x-1/2',
          compact ? '-top-2 h-28' : 'top-10 h-72',
        ].join(' ')}
        viewBox="0 0 960 220"
        preserveAspectRatio="none"
      >
        <path
          d="M0 104 C150 18 250 168 396 88 C540 10 680 136 960 42"
          fill="none"
          stroke="rgba(0,45,114,0.09)"
          strokeWidth="1"
        />
        <path
          d="M0 142 C180 80 268 164 420 122 C598 72 720 168 960 112"
          fill="none"
          stroke="rgba(242,196,19,0.26)"
          strokeDasharray="7 10"
          strokeWidth="1"
        />
        <path
          d="M0 184 C210 152 310 160 476 176 C650 192 780 134 960 154"
          fill="none"
          stroke="rgba(42,168,184,0.11)"
          strokeWidth="1"
        />
      </svg>
      {!compact && (
        <>
          <span className="absolute right-[15%] top-20 h-2 w-2 rounded-full border border-white bg-[#2aa8b8] shadow-[0_0_0_5px_rgba(42,168,184,0.12)]">
            <span className="evidence-field-pulse absolute inset-[-7px] rounded-full border border-[rgba(42,168,184,0.46)]" />
          </span>
          <span className="absolute left-[18%] top-32 h-1.5 w-1.5 rounded-full border border-white bg-[#003d79] shadow-[0_0_0_5px_rgba(0,45,114,0.1)]">
            <span className="evidence-field-pulse absolute inset-[-7px] rounded-full border border-[rgba(0,45,114,0.38)] [animation-delay:1.1s]" />
          </span>
          <span className="absolute right-[32%] top-48 h-2 w-2 rounded-full border border-white bg-[#f2c413] shadow-[0_0_0_5px_rgba(242,196,19,0.16)]">
            <span className="evidence-field-pulse absolute inset-[-7px] rounded-full border border-[rgba(242,196,19,0.48)] [animation-delay:2.2s]" />
          </span>
        </>
      )}
    </div>
  );
}

function Opening() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-rule)] bg-[#fbfcfe]">
      <EvidenceFieldBackdrop />
      <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-20">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          {SITE.affiliation}
        </p>
        <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.92] text-[color:var(--color-ink)] md:text-[6.75rem]">
          <span className="text-[color:var(--color-hopkins-blue)]">CIPHER</span>{' '}
          <span>Lab</span>
        </h1>
        <p className="mt-4 max-w-4xl text-lg font-semibold leading-relaxed text-[color:var(--color-ink)] md:text-xl">
          {SITE.expansion}
        </p>

        <div className="mt-10 grid gap-7 border-y border-[color:var(--color-rule)] bg-white/45 py-8 backdrop-blur-[1px] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <p className="text-xl leading-relaxed text-[color:var(--color-ink)]">
            {HOMEPAGE_INTRO[0]}
          </p>
          <p className="text-base leading-relaxed text-[color:var(--color-muted)]">
            {HOMEPAGE_INTRO[1]}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href="/research"
            className="text-sm font-semibold text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 transition-colors hover:decoration-[color:var(--color-link)]"
          >
            Read about our research →
          </Link>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
            prevention / treatment / equity / policy
          </span>
        </div>
      </div>
    </section>
  );
}

function Findings({ data }: { data: HomepageFindingsData | null }) {
  const analyses = data?.analyses ?? [];
  const hasAnalyses = analyses.length > 0;
  const unavailableCount = data?.unavailableAnalyses.length ?? 0;
  const unavailableLabel = data?.unavailableAnalyses.join(', ') ?? '';

  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-rule)] bg-[#fbfcfe]">
      <EvidenceFieldBackdrop compact />
      <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="mb-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              Decision support in practice
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-[color:var(--color-ink)] md:text-4xl">
              Model results, mapped to local decisions.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[color:var(--color-ink)]">
              Recent JHEEM analyses estimate how federal HIV program disruptions
              could alter incidence by place. The figure below curates headline
              geographic findings from those papers as one example of how CIPHER
              turns model output into interpretable public-health evidence.
            </p>
          </div>
          <div className="border-t border-[color:var(--color-rule)] pt-5 text-sm leading-relaxed text-[color:var(--color-muted)] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-1">
            <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink)]">
              Why geography matters
            </span>
            <span className="mt-3 block">
              Epidemics, care access, and program dependence vary by place, so the
              same national policy can produce sharply different local outcomes.
            </span>
          </div>
        </div>
        {unavailableCount > 0 && hasAnalyses && (
          <p className="mb-4 max-w-3xl text-xs leading-relaxed text-[color:var(--color-muted)]">
            {unavailableLabel} {unavailableCount === 1 ? 'is' : 'are'} temporarily
            unavailable, so this view is showing only the loaded result
            {analyses.length === 1 ? '' : 's'}.
          </p>
        )}
        {hasAnalyses ? (
          <ErrorBoundary
            fallback={
              <SectionErrorFallback
                title="Map temporarily unavailable"
                message="The interactive figure could not be loaded."
              />
            }
          >
            <FindingsMap analyses={analyses} />
          </ErrorBoundary>
        ) : (
          <SectionErrorFallback
            title="Map temporarily unavailable"
            message="The latest JHEEM summary data could not be loaded."
          />
        )}
      </div>
    </section>
  );
}

function InTheNews() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <h2 className="font-serif text-2xl text-[color:var(--color-ink)]">
            In the news
          </h2>
          <article className="border-t border-[color:var(--color-rule)] pt-5 md:border-t-0 md:pt-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              NBC News · September 2025
            </p>
            <h3 className="mt-3 max-w-2xl font-serif text-2xl leading-snug text-[color:var(--color-ink)]">
              <a
                href="https://www.nbcnews.com/health/sexual-health/republicans-seek-deep-cuts-hiv-prevention-treatment-funding-rcna233776"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--color-link)]"
              >
                Experts warn of consequences from proposed HIV funding cuts
              </a>
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[color:var(--color-ink)]">
              Dr. Anthony Fojo discusses how eliminating the CDC&apos;s HIV-prevention
              division could disrupt critical functions, with models projecting over
              213,000 additional infections through 2030.
            </p>
            <p className="mt-8 text-sm">
              <Link
                href="/news"
                className="text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
              >
                Read coverage note →
              </Link>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  let findingsData: HomepageFindingsData | null = null;

  try {
    findingsData = await getHomepageFindingsData();
  } catch (error) {
    console.error('Failed to load homepage findings data:', error);
  }

  return (
    <MainLayout>
      <Opening />
      <Findings data={findingsData} />
      <InTheNews />
    </MainLayout>
  );
}
