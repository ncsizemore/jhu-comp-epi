# October 2026 CIPHER release

Implements the accepted v15 page family in the production Next.js application:
home, research, SHIELD, people, publications, and news, with shared identity,
navigation, footer, local fonts, and the refined symbol favicon. Research now
contains the program index; `/projects` forwards there. Existing JHEEM/GMHA
redirects remain, and the global-aging application is preserved.

## Content decisions

- Group-neutral contact wording uses the existing pkasaie@jhu.edu address.
- The existing 11-person roster remains; portraits stay compact.
- The audited archive contains 19 distinct publications. TB and PEARL remain
  separate. The remaining ADAP preprint is labeled, and verified journal citations
  replace outdated metadata. Legacy API IDs are retained for existing records.
- The AIDS paper (PMID 41739082) is independently verified as a journal record;
  no formal relationship to the earlier preprint is asserted.
- The homepage figure sums 31 metro annual model means from the March 2026 portal
  release. The 2025–2030 difference is 79,154.7225, displayed as 79,000; 2030 endpoints
  round to 25,900 and 43,000. Both series reconcile to the archived per-metro values.
  The caption identifies the release and distinguishes this aggregation from the
  original paper’s 75,436 estimate. It does not infer why the analyses differ or
  construct a combined credible interval. Source JSON is publicly accessible.

## Validation

Run lint, the Vitest suite, and the production build. Browser checks cover desktop
and phone layouts, keyboard menu dismissal, archive search/year/reset behavior,
31-metro disclosure, route continuity, and the global-aging application.

The original prototype remains in the separate JHEEM design worktree. This release
does not change the JHEEM portal or introduce dark mode or new analytical features.
