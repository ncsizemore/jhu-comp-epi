'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { Publication } from '@/lib/data/publications';
import { projectsMap } from '@/lib/projects/config';
import PublicationListItem from '@/components/publications/PublicationListItem';
import { usePublicationFilters } from '@/hooks/usePublicationFilters';

interface PublicationIndexProps {
  publications: Publication[];
  years: string[];
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
        {label}
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  children,
  count,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        'inline-flex items-center gap-2 border px-3 py-1.5 text-sm transition-colors',
        active
          ? 'border-[color:var(--color-hopkins-blue)] bg-[color:var(--color-hopkins-blue)] text-white'
          : 'border-[color:var(--color-rule)] bg-white text-[color:var(--color-ink)] hover:border-[color:var(--color-hopkins-blue)]',
      ].join(' ')}
    >
      <span>{children}</span>
      {typeof count === 'number' && (
        <span className={active ? 'text-white/75' : 'text-[color:var(--color-muted)]'}>
          {count}
        </span>
      )}
    </button>
  );
}

function toggleValue(
  setter: React.Dispatch<React.SetStateAction<string[]>>,
  value: string,
) {
  setter(current =>
    current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value],
  );
}

export default function PublicationIndex({
  publications,
  years,
}: PublicationIndexProps) {
  const [displayCount, setDisplayCount] = useState(20);
  const {
    filters: { selectedTags, selectedYears, selectedProjects },
    setSelectedTags,
    setSelectedYears,
    setSelectedProjects,
    filteredPublications,
    clearFilters,
    hasActiveFilters,
    totalCount,
    filteredCount,
  } = usePublicationFilters(publications);

  const yearFilters = useMemo(() => {
    const counts = new Map<string, number>();
    publications.forEach(publication => {
      counts.set(publication.year, (counts.get(publication.year) ?? 0) + 1);
    });

    return years
      .map(year => ({ year, count: counts.get(year) ?? 0 }))
      .filter(item => item.count > 0);
  }, [publications, years]);

  const projectEntries = useMemo(
    () =>
      Object.entries(projectsMap).filter(([projectId]) =>
        publications.some(publication => publication.projects.includes(projectId)),
      ),
    [publications],
  );

  const topTags = useMemo(() => {
    const counts = new Map<string, number>();
    publications.forEach(publication => {
      publication.tags.forEach(tag => {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      });
    });

    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 7)
      .map(([tag, count]) => ({ tag, count }));
  }, [publications]);

  const sortedPublications = useMemo(
    () =>
      [...filteredPublications]
        .sort((a, b) => parseInt(b.year) - parseInt(a.year))
        .slice(0, displayCount),
    [displayCount, filteredPublications],
  );

  return (
    <section id="publications" className="border-b border-[color:var(--color-rule)] bg-[#fbfcfe]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="border-t border-[color:var(--color-rule)] pt-5 lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-baseline justify-between gap-4 lg:block">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                  Browse
                </p>
                <h2 className="mt-3 font-serif text-2xl text-[color:var(--color-ink)]">
                  Research record
                </h2>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)] lg:mt-5"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="mt-7 space-y-7">
              <FilterGroup label="Year">
                {yearFilters.map(({ year, count }) => (
                  <FilterButton
                    key={year}
                    active={selectedYears.includes(year)}
                    count={count}
                    onClick={() => toggleValue(setSelectedYears, year)}
                  >
                    {year}
                  </FilterButton>
                ))}
              </FilterGroup>

              {projectEntries.length > 1 && (
                <FilterGroup label="Project">
                  {projectEntries.map(([projectId, project]) => (
                    <FilterButton
                      key={projectId}
                      active={selectedProjects.includes(projectId)}
                      onClick={() => toggleValue(setSelectedProjects, projectId)}
                    >
                      {project.name}
                    </FilterButton>
                  ))}
                </FilterGroup>
              )}

              <FilterGroup label="Topic">
                {topTags.map(({ tag, count }) => (
                  <FilterButton
                    key={tag}
                    active={selectedTags.includes(tag)}
                    count={count}
                    onClick={() => toggleValue(setSelectedTags, tag)}
                  >
                    {tag}
                  </FilterButton>
                ))}
              </FilterGroup>
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap items-end justify-between gap-4 border-t border-[color:var(--color-rule)] pt-5">
              <p className="font-serif text-3xl leading-tight text-[color:var(--color-ink)]">
                {filteredCount === totalCount
                  ? `${totalCount} publications`
                  : `${filteredCount} of ${totalCount} publications`}
              </p>
            </div>

            <div className="mt-7 border-t border-[color:var(--color-rule)]">
              {sortedPublications.map(publication => (
                <PublicationListItem
                  key={publication.id}
                  publication={publication}
                />
              ))}
            </div>

            {filteredPublications.length === 0 && (
              <div className="border-b border-[color:var(--color-rule)] py-10">
                <h3 className="font-serif text-2xl text-[color:var(--color-ink)]">
                  No publications found
                </h3>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 text-sm text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
                >
                  Clear filters
                </button>
              </div>
            )}

            {displayCount < filteredPublications.length && (
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setDisplayCount(current => current + 20)}
                  className="text-sm text-[color:var(--color-link)] underline decoration-[color:var(--color-rule)] underline-offset-4 hover:decoration-[color:var(--color-link)]"
                >
                  Load more publications
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
