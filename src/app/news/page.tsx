import MainLayout from '@/components/layout/MainLayout';

export const metadata = {
  title: 'Media Coverage | The Computational Epidemiology Lab',
  description:
    'Selected public-facing media coverage and commentary from the Computational Epidemiology Lab at Johns Hopkins University.',
};

const coverageItems = [
  {
    id: 1,
    date: 'September 2025',
    source: 'NBC News',
    title: 'Experts warn of consequences from proposed HIV funding cuts',
    description:
      "Dr. Anthony Fojo discusses how eliminating the CDC's HIV-prevention division could disrupt critical functions as models project over 213,000 additional infections through 2030.",
    url: 'https://www.nbcnews.com/health/sexual-health/republicans-seek-deep-cuts-hiv-prevention-treatment-funding-rcna233776',
    category: 'Media coverage',
    context:
      'The coverage connects proposed HIV funding changes to model-based projections of infections, prevention capacity, and public-health disruption.',
  },
];

function NewsIntro() {
  return (
    <section className="border-b border-[color:var(--color-rule)] bg-[#fbfcfe]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              Media coverage
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-[color:var(--color-ink)]">
              News and commentary
            </h1>
          </div>
          <div>
            <p className="max-w-4xl text-xl leading-relaxed text-[color:var(--color-ink)]">
              Selected public-facing coverage of the lab&apos;s modeling work and
              related policy commentary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoverageArchive() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="mb-10 grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              Archive
            </p>
            <h2 className="mt-3 font-serif text-2xl text-[color:var(--color-ink)]">
              Selected coverage
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-[color:var(--color-muted)]">
            Coverage that places model projections in public discussion about
            prevention, treatment, funding, and implementation.
          </p>
        </div>

        <div className="border-t border-[color:var(--color-rule)]">
          {coverageItems.map(item => (
            <article
              key={item.id}
              className="grid gap-8 border-b border-[color:var(--color-rule)] py-9 lg:grid-cols-[16rem_minmax(0,1fr)]"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                  {item.source}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {item.date}
                  <br />
                  {item.category}
                </p>
              </div>
              <div className="max-w-3xl">
                <h3 className="font-serif text-3xl leading-tight text-[color:var(--color-ink)]">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[color:var(--color-link)]"
                  >
                    {item.title}
                  </a>
                </h3>
                <p className="mt-5 text-base leading-relaxed text-[color:var(--color-ink)]">
                  {item.description}
                </p>
                <div className="mt-6 border-t border-[color:var(--color-rule)] pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                    Modeling context
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                    {item.context}
                  </p>
                </div>
                <p className="mt-6 text-sm">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
                  >
                    Read full article →
                  </a>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function NewsPage() {
  return (
    <MainLayout>
      <NewsIntro />
      <CoverageArchive />
    </MainLayout>
  );
}
