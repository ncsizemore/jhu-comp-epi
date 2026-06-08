import Image from 'next/image';
import { Publication } from '@/lib/data/publications';
import { projectsMap } from '@/lib/projects/config';
import { formatAuthors } from '@/lib/utils/authors';

interface PublicationsLeadProps {
  publications: Publication[];
}

function publicationHref(publication: Publication) {
  return publication.url || (publication.doi ? `https://doi.org/${publication.doi}` : undefined);
}

function projectLabel(publication: Publication) {
  const projectId = publication.projects[0] as keyof typeof projectsMap | undefined;
  return projectId ? projectsMap[projectId]?.name : undefined;
}

function sortNewest(publications: Publication[]) {
  return [...publications].sort((a, b) => parseInt(b.year) - parseInt(a.year));
}

function shortSummary(publication: Publication) {
  return publication.keyFindings || publication.abstract;
}

export default function PublicationsLead({ publications }: PublicationsLeadProps) {
  const newestPublications = sortNewest(publications);
  const years = publications.map(publication => parseInt(publication.year));
  const yearSpan =
    years.length > 0
      ? `${Math.min(...years)}-${Math.max(...years)}`
      : undefined;
  const leadPublication =
    newestPublications.find(publication => publication.featured && publication.imageUrl) ??
    newestPublications.find(publication => publication.imageUrl) ??
    newestPublications[0];
  const policySequence = newestPublications
    .filter(publication => publication.year === '2025')
    .slice(0, 3);

  if (!leadPublication) {
    return null;
  }

  const leadHref = publicationHref(leadPublication);
  const leadProject = projectLabel(leadPublication);
  const leadSummary = shortSummary(leadPublication);

  return (
    <>
      <section className="border-b border-[color:var(--color-rule)] bg-[#f7fafd]">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
          <div className="grid gap-9 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
            <div className="border-t border-[color:var(--color-rule)] pt-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                Research output
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-tight text-[color:var(--color-ink)]">
                Publications
              </h1>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[color:var(--color-rule)] pt-5 lg:grid-cols-1">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                    Papers
                  </dt>
                  <dd className="mt-1 font-serif text-3xl text-[color:var(--color-ink)]">
                    {publications.length}
                  </dd>
                </div>
                {yearSpan && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                      Years
                    </dt>
                    <dd className="mt-1 font-serif text-3xl text-[color:var(--color-ink)]">
                      {yearSpan}
                    </dd>
                  </div>
                )}
              </dl>

              <ul className="mt-7 space-y-2 border-t border-[color:var(--color-rule)] pt-5 text-sm leading-relaxed text-[color:var(--color-muted)]">
                <li>HIV policy</li>
                <li>Testing and PrEP</li>
                <li>Care engagement</li>
                <li>Comorbidity and aging</li>
              </ul>
            </div>

            <article className="border-t border-[color:var(--color-rule)] pt-5">
              <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                <span>Featured paper</span>
                <span className="h-px w-8 bg-[color:var(--color-accent)]" />
                <span>{leadPublication.year}</span>
                <span>{leadPublication.journal}</span>
              </div>

              <h2 className="max-w-3xl font-serif text-3xl leading-tight text-[color:var(--color-ink)]">
                {leadHref ? (
                  <a
                    href={leadHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[color:var(--color-link)]"
                  >
                    {leadPublication.title}
                  </a>
                ) : (
                  leadPublication.title
                )}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-muted)]">
                {formatAuthors(leadPublication.authors)}
                {leadProject && (
                  <>
                    <span className="px-1.5">/</span>
                    <span>{leadProject}</span>
                  </>
                )}
              </p>

              {leadSummary && (
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[color:var(--color-ink)] line-clamp-6">
                  {leadSummary}
                </p>
              )}

              {leadPublication.imageUrl && (
                <figure className="mt-7 border border-[color:var(--color-rule)] bg-white p-4">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={leadPublication.imageUrl}
                      alt={leadPublication.imageCaption || leadPublication.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 640px"
                      priority
                    />
                  </div>
                  {leadPublication.imageCaption && (
                    <figcaption className="mt-3 border-t border-[color:var(--color-rule)] pt-3 text-xs leading-relaxed text-[color:var(--color-muted)]">
                      {leadPublication.imageCaption}
                    </figcaption>
                  )}
                </figure>
              )}
            </article>
          </div>
        </div>
      </section>

      {policySequence.length > 0 && (
        <section className="border-b border-[color:var(--color-rule)] bg-white">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
            <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                  2025 policy sequence
                </p>
                <h2 className="mt-3 max-w-xs font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
                  Funding, testing, incidence.
                </h2>
              </div>

              <div className="grid gap-px border-t border-[color:var(--color-rule)] bg-[color:var(--color-rule)] md:grid-cols-3">
                {policySequence.map((publication, index) => {
                  const href = publicationHref(publication);
                  const summary = publication.abstract || publication.keyFindings;

                  return (
                    <article key={publication.id} className="bg-white px-5 py-6">
                      <p className="font-mono text-xs text-[color:var(--color-muted)]">
                        {String(index + 1).padStart(2, '0')} / {publication.year}
                      </p>
                      <h3 className="mt-4 font-serif text-xl leading-snug text-[color:var(--color-ink)]">
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[color:var(--color-link)]"
                          >
                            {publication.title}
                          </a>
                        ) : (
                          publication.title
                        )}
                      </h3>
                      {summary && (
                        <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-muted)] line-clamp-4">
                          {summary}
                        </p>
                      )}
                      <p className="mt-5 text-xs italic leading-relaxed text-[color:var(--color-muted)]">
                        {publication.journal}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
