import dynamic from 'next/dynamic';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SectionErrorFallback } from '@/components/SectionErrorFallback';

const RealResultsMap = dynamic(
  () => import('@/components/sections/home/RealResultsMap'),
  {
    loading: () => (
      <div className="h-[620px] flex items-center justify-center text-sm text-[color:var(--color-muted)]">
        Loading findings…
      </div>
    ),
  },
);

function Masthead() {
  return (
    <section className="border-b border-[color:var(--color-rule)]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          Johns Hopkins Bloomberg School of Public Health · School of Medicine
        </p>
        <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[0.98] tracking-tight text-[color:var(--color-ink)] md:text-7xl">
          Computational Epidemiology Lab
        </h1>
        <p className="mt-7 max-w-3xl text-xl leading-relaxed text-[color:var(--color-ink)]">
          We build policy-facing models of infectious disease dynamics, combining
          local data, simulation, and epidemiologic inference to support public
          health decisions in the United States.
        </p>
      </div>
    </section>
  );
}

function ResearchScope() {
  return (
    <section className="border-b border-[color:var(--color-rule)]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <h2 className="font-serif text-2xl text-[color:var(--color-ink)]">
            What the lab studies
          </h2>
          <p className="max-w-3xl text-lg leading-relaxed text-[color:var(--color-ink)]">
            Our work connects mechanistic modeling with surveillance, prevention, and
            treatment questions. The common thread is practical: estimating how
            interventions and disruptions change outcomes across real populations and
            places.
          </p>
        </div>

        <div className="mt-10 grid gap-8 border-t border-[color:var(--color-rule)] pt-7 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              Local calibration
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]">
              Models are fit to city, state, and population-specific data rather than
              treating the epidemic as one national average.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              Policy scenarios
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]">
              Analyses compare plausible futures: program continuation, interruptions,
              funding changes, and targeted intervention strategies.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              Decision support
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]">
              Results are translated into published evidence and public tools for
              researchers, policymakers, clinicians, and health departments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Findings() {
  return (
    <section className="border-b border-[color:var(--color-rule)] bg-[#fbfcfe]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              Recent model results
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-[color:var(--color-ink)] md:text-4xl">
              Published findings, mapped
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[color:var(--color-ink)]">
              Recent JHEEM analyses estimate how federal HIV program disruptions could
              alter incidence across U.S. cities and states. The figure below is a
              curated view of headline geographic findings from those papers.
            </p>
          </div>
          <div className="border-t border-[color:var(--color-rule)] pt-5 text-sm leading-relaxed text-[color:var(--color-muted)] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-1">
            <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink)]">
              Why geography matters
            </span>
            <span className="mt-3 block">
              The same national policy can produce sharply different local outcomes
              because epidemics, care access, and program dependence vary by place.
            </span>
          </div>
        </div>
        <ErrorBoundary
          fallback={
            <SectionErrorFallback
              title="Map temporarily unavailable"
              message="The interactive figure could not be loaded."
            />
          }
        >
          <RealResultsMap />
        </ErrorBoundary>
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
                More news →
              </Link>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <MainLayout>
      <Masthead />
      <ResearchScope />
      <Findings />
      <InTheNews />
    </MainLayout>
  );
}
