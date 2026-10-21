"use client";

import { useState } from "react";
import { publications, publicationYears } from "@/data/publications";
import { filterPublications } from "@/lib/publication-search";

export default function PublicationArchive() {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const records = filterPublications(publications, query, year);
  const clear = () => {
    setQuery("");
    setYear("");
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
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="publication-year-filter">
            <label htmlFor="publication-year">Year</label>
            <select
              id="publication-year"
              aria-controls="publication-results"
              value={year}
              onChange={(event) => setYear(event.target.value)}
            >
              <option value="">All years</option>
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
            disabled={!query && !year}
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
