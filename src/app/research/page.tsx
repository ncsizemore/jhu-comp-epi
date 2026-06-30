import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import {
  DECISION_SUPPORT,
  DISEASES_OF_FOCUS,
  GEOGRAPHIC_REACH,
  PUBLIC_HEALTH_QUESTIONS,
  RESEARCH_OVERVIEW,
} from '@/lib/research-content';
import { SITE } from '@/lib/site';

export const metadata = {
  title: `Research | ${SITE.name}`,
  description:
    'Research focus areas, geographic reach, and decision-support questions from CIPHER Lab.',
};

function ResearchLead() {
  return (
    <section className="border-b border-[color:var(--color-rule)] bg-[#fbfcfe]">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          Our research
        </p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-[color:var(--color-ink)] md:text-5xl">
          Computational models for infectious disease decisions.
        </h1>
        <p className="mt-6 max-w-4xl text-lg leading-relaxed text-[color:var(--color-ink)]">
          {RESEARCH_OVERVIEW}
        </p>
      </div>
    </section>
  );
}

function ResearchScope() {
  return (
    <section className="border-b border-[color:var(--color-rule)]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <div>
            <h2 className="font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
              Diseases and places
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-serif text-xl leading-tight text-[color:var(--color-ink)]">
                Diseases of focus
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                Our research focuses on infectious diseases and their long-term
                health consequences, including:
              </p>
              <ul className="mt-5 divide-y divide-[color:var(--color-rule)] border-y border-[color:var(--color-rule)]">
                {DISEASES_OF_FOCUS.map(disease => (
                  <li
                    key={disease}
                    className="py-3 text-base leading-snug text-[color:var(--color-ink)]"
                  >
                    {disease}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[color:var(--color-rule)] pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <h3 className="font-serif text-xl leading-tight text-[color:var(--color-ink)]">
                Geographic reach
              </h3>
              <div className="mt-3 space-y-4 text-sm leading-relaxed text-[color:var(--color-muted)]">
                {GEOGRAPHIC_REACH.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResearchQuestions() {
  return (
    <section className="border-b border-[color:var(--color-rule)] bg-[#fbfcfe]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <div>
            <h2 className="font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
              Public health impact
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-muted)]">
              Our research helps answer critical questions such as:
            </p>
          </div>

          <ol className="grid border-y border-[color:var(--color-rule)] md:grid-cols-2">
            {PUBLIC_HEALTH_QUESTIONS.map((question, index) => (
              <li
                key={question}
                className={[
                  'border-b border-[color:var(--color-rule)] py-5 md:px-6 md:odd:border-r',
                  index === PUBLIC_HEALTH_QUESTIONS.length - 1
                    ? 'md:col-span-2 md:border-b-0 md:border-r-0'
                    : '',
                ].join(' ')}
              >
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-2 max-w-md font-serif text-xl leading-snug text-[color:var(--color-ink)]">
                  {question}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function DecisionSupport() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <h2 className="font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
            Decision support for policy and practice
          </h2>
          <div>
            <p className="max-w-4xl text-base leading-relaxed text-[color:var(--color-muted)]">
              {DECISION_SUPPORT}
            </p>
            <p className="mt-7">
              <Link
                href="/projects"
                className="text-sm font-semibold text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 transition-colors hover:decoration-[color:var(--color-link)]"
              >
                View modeling projects →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ResearchPage() {
  return (
    <MainLayout>
      <ResearchLead />
      <ResearchScope />
      <ResearchQuestions />
      <DecisionSupport />
    </MainLayout>
  );
}
