import MainLayout from '@/components/layout/MainLayout';
import PageIntro from '@/components/ui/PageIntro';

export const metadata = {
  title: 'News & Media | The Computational Epidemiology Lab',
  description:
    'Latest news, media coverage, and research highlights from the Computational Epidemiology Lab at Johns Hopkins University',
};

const newsItems = [
  {
    id: 1,
    date: 'September 2025',
    source: 'NBC News',
    title: 'Experts warn of consequences from proposed HIV funding cuts',
    description:
      "Dr. Anthony Fojo discusses how eliminating the CDC's HIV-prevention division could disrupt critical functions as models project over 213,000 additional infections through 2030.",
    url: 'https://www.nbcnews.com/health/sexual-health/republicans-seek-deep-cuts-hiv-prevention-treatment-funding-rcna233776',
    category: 'Media coverage',
  },
];

export default function NewsPage() {
  return (
    <MainLayout>
      <PageIntro eyebrow="News and media" title="Coverage and commentary">
        <p>
          Media coverage, research highlights, and public-facing commentary from
          the Computational Epidemiology Lab.
        </p>
      </PageIntro>

      <section>
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <h2 className="font-serif text-2xl text-[color:var(--color-ink)]">
              Recent coverage
            </h2>
            <div className="divide-y divide-[color:var(--color-rule)] border-t border-[color:var(--color-rule)]">
              {newsItems.map(item => (
                <article key={item.id} className="py-7 first:pt-5">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                    {item.source} · {item.date} · {item.category}
                  </p>
                  <h3 className="mt-3 max-w-3xl font-serif text-2xl leading-snug text-[color:var(--color-ink)]">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[color:var(--color-link)]"
                    >
                      {item.title}
                    </a>
                  </h3>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-[color:var(--color-ink)]">
                    {item.description}
                  </p>
                  <p className="mt-5 text-sm">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
                    >
                      Read full article →
                    </a>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
