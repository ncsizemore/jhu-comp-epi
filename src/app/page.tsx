import dynamic from 'next/dynamic';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SectionErrorFallback } from '@/components/SectionErrorFallback';

const SimpleMapDisplay = dynamic(
  () => import('@/components/sections/home/SimpleMapDisplay'),
  {
    loading: () => (
      <div className="h-[460px] flex items-center justify-center text-sm text-[color:var(--color-muted)]">
        Loading map…
      </div>
    ),
  },
);

function Masthead() {
  return (
    <section className="border-b border-[color:var(--color-rule)]">
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-[color:var(--color-ink)] tracking-tight leading-tight">
          Computational Epidemiology Lab
        </h1>
        <p className="mt-3 text-sm text-[color:var(--color-muted)] uppercase tracking-wider">
          Johns Hopkins Bloomberg School of Public Health · School of Medicine
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="border-b border-[color:var(--color-rule)]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-lg text-[color:var(--color-ink)] leading-relaxed">
          We develop and apply mathematical, statistical, and computational methods to study
          infectious disease dynamics. Our work spans modeling, simulation, and data-driven
          analysis to inform surveillance, prevention, and public health decision-making in
          the United States.
        </p>
      </div>
    </section>
  );
}

function ResearchNetwork() {
  return (
    <section className="border-b border-[color:var(--color-rule)]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="font-serif text-2xl text-[color:var(--color-ink)] mb-4">
          Research network
        </h2>
        <p className="text-base text-[color:var(--color-ink)] leading-relaxed mb-8">
          Alongside national-level modeling, our work focuses on the 32 U.S. metropolitan
          areas carrying the highest burden of HIV and syphilis. The JHEEM and SHIELD
          frameworks calibrate independently to each city, capturing local epidemic dynamics
          and the effect of interventions tailored to them.
        </p>
        <ErrorBoundary
          fallback={
            <SectionErrorFallback
              title="Map temporarily unavailable"
              message="The interactive map could not be loaded."
            />
          }
        >
          <SimpleMapDisplay />
        </ErrorBoundary>
      </div>
    </section>
  );
}

function FeaturedStudy() {
  return (
    <section className="border-b border-[color:var(--color-rule)]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="font-serif text-2xl text-[color:var(--color-ink)] mb-4">
          Selected work
        </h2>
        <article>
          <h3 className="font-serif text-xl text-[color:var(--color-ink)] mb-3">
            Ryan White HIV/AIDS Program evaluation
          </h3>
          <p className="text-base text-[color:var(--color-ink)] leading-relaxed">
            Drawing on a survey of 180 clinic directors across 31 U.S. cities, the JHEEM
            model projected that ending Ryan White services could lead to roughly{' '}
            <strong className="font-semibold">75,400 additional HIV infections</strong> — a{' '}
            <strong className="font-semibold">49% increase</strong> — over five years. The
            analysis pairs primary survey data with mechanistic modeling to inform decisions
            about a program that supports more than half of all people receiving HIV care in
            the country.
          </p>
          <p className="mt-4">
            <Link
              href="/publications"
              className="text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
            >
              See related publications
            </Link>
          </p>
        </article>
      </div>
    </section>
  );
}

function InTheNews() {
  return (
    <section>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="font-serif text-2xl text-[color:var(--color-ink)] mb-6">
          In the news
        </h2>
        <article>
          <p className="text-xs text-[color:var(--color-muted)] uppercase tracking-wider mb-2">
            NBC News · September 2025
          </p>
          <h3 className="font-serif text-lg text-[color:var(--color-ink)] mb-2">
            <a
              href="https://www.nbcnews.com/health/sexual-health/republicans-seek-deep-cuts-hiv-prevention-treatment-funding-rcna233776"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[color:var(--color-link)]"
            >
              Experts warn of consequences from proposed HIV funding cuts
            </a>
          </h3>
          <p className="text-base text-[color:var(--color-ink)] leading-relaxed">
            Dr. Anthony Fojo discusses how eliminating the CDC&apos;s HIV-prevention division
            could disrupt critical functions, with models projecting over 213,000 additional
            infections through 2030.
          </p>
        </article>
        <p className="mt-8 text-sm">
          <Link
            href="/news"
            className="text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
          >
            More news →
          </Link>
        </p>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <MainLayout>
      <Masthead />
      <About />
      <ResearchNetwork />
      <FeaturedStudy />
      <InTheNews />
    </MainLayout>
  );
}
