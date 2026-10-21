"use client";

import { useSearchParams } from "next/navigation";
import { publications, publicationYears } from "@/data/publications";
import { filterPublications } from "@/lib/publication-search";
import { PROJECT_THEME } from "@/lib/projects/config";

export default function PublicationArchive() {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const year = params.get("year") ?? "";
  const project = params.get("project") ?? "";
  const records = filterPublications(publications, query, year, project);
  const programs = Object.values(PROJECT_THEME);
  const update = (values: Record<string, string>, replace = false) => {
    const url = new URL(window.location.href);
    Object.entries(values).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    });
    // Next observes native history changes without a server request per keystroke.
    window.history[replace ? "replaceState" : "pushState"](null, "", url);
  };
  const clear = () => {
    update({ q: "", year: "", project: "" });
  };
  return (
    <section className="publication-archive" aria-label="Publication archive">
      <div className="wrap">
        <form
          className="archive-controls"
          role="search"
          aria-label="Find publications"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="publication-search">
            <label htmlFor="publication-query">Search publications</label>
            <input
              type="search"
              id="publication-query"
              placeholder="Title, author, journal, or topic"
              autoComplete="off"
              aria-controls="publication-results"
              value={query}
              onChange={(event) => update({ q: event.target.value }, true)}
            />
          </div>
          <div className="publication-program-filter">
            <label htmlFor="publication-program">Research program</label>
            <select
              id="publication-program"
              aria-controls="publication-results"
              value={project}
              onChange={(event) => update({ project: event.target.value })}
            >
              <option value="">All programs</option>
              {programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
              {project && !programs.some((p) => p.id === project) && (
                <option value={project}>Unknown program</option>
              )}
            </select>
          </div>
          <div className="publication-year-filter">
            <label htmlFor="publication-year">Year</label>
            <select
              id="publication-year"
              aria-controls="publication-results"
              value={year}
              onChange={(event) => update({ year: event.target.value })}
            >
              <option value="">All years</option>
              {year && !publicationYears.includes(year) && (
                <option value={year}>{year}</option>
              )}
              {publicationYears.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <button
            className="clear-filters"
            type="button"
            disabled={!query && !year && !project}
            onClick={clear}
          >
            Clear filters
          </button>
        </form>
        <div className="archive-summary">
          <p role="status" aria-live="polite" aria-atomic="true">
            {records.length}{" "}
            {records.length === 1 ? "publication" : "publications"}
          </p>
          <p>Newest first · Preprints are labeled</p>
        </div>
        <div id="publication-results">
          {publicationYears
            .filter((value) => records.some((p) => p.year === value))
            .map((value) => (
              <section
                className="publication-year"
                key={value}
                aria-labelledby={`year-${value}`}
              >
                <h2 id={`year-${value}`}>{value}</h2>
                <ol className="citation-list">
                  {records
                    .filter((p) => p.year === value)
                    .map((p) => (
                      <li className="citation" key={p.id}>
                        <p className="citation-journal">
                          {p.journal}
                          {p.preprint && (
                            <span className="preprint-label">Preprint</span>
                          )}
                        </p>
                        <h3>
                          <a href={p.url}>
                            {p.title} <span aria-hidden="true">↗</span>
                          </a>
                        </h3>
                        <details className="citation-author-details">
                          <summary>
                            {p.shortAuthors ?? p.authors}{" "}
                            <span>All authors</span>
                          </summary>
                          <p>{p.authors}</p>
                        </details>
                      </li>
                    ))}
                </ol>
              </section>
            ))}
          {!records.length && (
            <div className="publication-empty">
              <h2>No matching publications.</h2>
              <p>Try a different search or clear the filters.</p>
              <button className="clear-filters" onClick={clear}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
