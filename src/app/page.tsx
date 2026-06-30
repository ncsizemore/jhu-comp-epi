import dynamic from 'next/dynamic';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SectionErrorFallback } from '@/components/SectionErrorFallback';
import { SITE } from '@/lib/site';
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

const DISEASES_OF_FOCUS = [
  'HIV/AIDS',
  'Syphilis and other sexually transmitted infections',
  'Human papillomavirus (HPV)',
  'Tuberculosis (TB)',
  'Aging and comorbidities among people living with HIV',
];

function Masthead() {
  return (
    <section className="border-b border-[color:var(--color-rule)]">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-[4.5rem]">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          {SITE.affiliation}
        </p>
        <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.94] text-[color:var(--color-ink)] md:text-8xl">
          <span className="text-[color:var(--color-hopkins-blue)]">CIPHER</span>{' '}
          <span>Lab</span>
        </h1>
        <p className="mt-4 max-w-4xl text-lg font-semibold leading-relaxed text-[color:var(--color-ink)] md:text-xl">
          {SITE.expansion}
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <p className="text-xl leading-relaxed text-[color:var(--color-ink)]">
            CIPHER Lab is a multidisciplinary research team housed within the
            Johns Hopkins Schools of Public Health and Medicine. Our faculty,
            researchers, and trainees develop policy-relevant models of
            infectious disease dynamics to support public health decision-making
            in the United States and globally.
          </p>
          <p className="border-t border-[color:var(--color-rule)] pt-5 text-base leading-relaxed text-[color:var(--color-muted)] md:border-l md:border-t-0 md:pl-7 md:pt-0">
            By integrating epidemiologic data, mathematical modeling, simulation,
            and statistical inference, we generate actionable evidence on disease
            transmission, prevention, treatment, and population health outcomes.
            Our work bridges research and practice, providing insights that help
            public health agencies, healthcare systems, and policymakers respond
            to current and emerging health challenges.
          </p>
        </div>
      </div>
    </section>
  );
}

function ResearchScope() {
  return (
    <section className="border-b border-[color:var(--color-rule)]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              Our research
            </p>
            <h2 className="mt-3 font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
              Computational models for infectious disease decisions.
            </h2>
          </div>

          <div>
            <p className="max-w-4xl text-xl leading-relaxed text-[color:var(--color-ink)]">
              CIPHER Lab studies how diseases spread, how interventions affect
              population health, and how public health resources can be deployed
              most effectively. We develop and apply computational models to
              answer questions that matter for prevention, treatment, health
              equity, and policy.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-[color:var(--color-rule)] pt-7 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              Diseases of focus
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]">
              {DISEASES_OF_FOCUS.join('; ')}.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              Geographic reach
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]">
              We maintain a suite of locally calibrated models across multiple
              U.S. cities and more than 30 states, enabling analyses that reflect
              local epidemiology, healthcare systems, and population needs. Our
              work also extends globally through studies of HIV and TB in
              selected countries.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              Decision support
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]">
              We help teams compare prevention, screening, treatment, policy,
              and resource-allocation choices, including how demographic and
              epidemiologic changes may shape future needs.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
              We collaborate with public health agencies, healthcare
              organizations, and policymakers to evaluate interventions, project
              future disease burden, assess program effectiveness, and inform
              resource allocation. Through peer-reviewed research, public tools,
              and policy-focused analyses, we provide evidence that supports
              better health decisions and stronger public health systems.
            </p>
          </div>
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
    <section className="border-b border-[color:var(--color-rule)] bg-[#fbfcfe]">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
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
      <Masthead />
      <ResearchScope />
      <Findings data={findingsData} />
      <InTheNews />
    </MainLayout>
  );
}
