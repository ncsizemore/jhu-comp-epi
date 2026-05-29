import { Publication } from '@/lib/data/publications';
import { projectsMap } from '@/lib/projects/config';
import { formatAuthors } from '@/lib/utils/authors';

interface PublicationListItemProps {
  publication: Publication;
}

function publicationHref(publication: Publication) {
  return publication.url || (publication.doi ? `https://doi.org/${publication.doi}` : undefined);
}

function projectLabel(publication: Publication) {
  const projectId = publication.projects[0] as keyof typeof projectsMap | undefined;
  return projectId ? projectsMap[projectId]?.name : undefined;
}

export default function PublicationListItem({ publication }: PublicationListItemProps) {
  const href = publicationHref(publication);
  const project = projectLabel(publication);
  const summary = publication.abstract || publication.keyFindings;

  return (
    <article className="group grid gap-5 border-b border-[color:var(--color-rule)] py-7 transition-colors hover:border-[color:var(--color-hopkins-blue)] lg:grid-cols-[10rem_minmax(0,1fr)]">
      <div>
        <p className="font-mono text-xs text-[color:var(--color-muted)]">
          {publication.year}
        </p>
        {project && (
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
            {project}
          </p>
        )}
      </div>

      <div className="max-w-4xl">
        <h3 className="font-serif text-2xl leading-snug text-[color:var(--color-ink)] md:text-[1.7rem]">
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

        <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
          {formatAuthors(publication.authors)}
          <span className="px-1.5">/</span>
          <span className="italic">{publication.journal}</span>
        </p>

        {summary && (
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[color:var(--color-ink)] line-clamp-3">
            {summary}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          {publication.tags.length > 0 && (
            <ul className="flex flex-wrap gap-x-3 gap-y-2 text-xs leading-relaxed text-[color:var(--color-muted)]">
              {publication.tags.slice(0, 4).map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--color-link)] opacity-80 underline decoration-[color:var(--color-rule)] underline-offset-4 transition-opacity hover:opacity-100 hover:decoration-[color:var(--color-link)]"
            >
              Read paper
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
