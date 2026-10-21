# CIPHER release follow-up — 21 October 2026

## Publication handoff

The JHEEM portal links to `/publications?project=jheem`. The archive now applies
that filter on the initial server render and exposes a Research program selector.
Program, year, and text search combine; the URL preserves all three for reloads,
sharing, and browser navigation. Clear filters returns the full 19-record archive.
The JHEEM subset has 15 records, using the existing curated project assignments.
This pass does not reassign publications or change the TB/PEARL exclusions.

## Opening copy

Retain the accepted headline, identity, and layout. Replace the abstract sentence
about policy-relevant infectious disease dynamics with concrete references to
prevention, treatment, and funding decisions. Preserve the original public-health
decision-making purpose and U.S./global scope. Program descriptions already supply
useful specificity, including the aging work, and remain intact.

## Figure investigation

Sources: `docs/publications/forster-2025.pdf` (Outcomes on PDF page 3; Figure 3 on
pages 6–7), the archived portal series, and a fresh public Baltimore payload from
`https://d320iym4dtm9lj.cloudfront.net/ryan-white/C.12580.json`.
The publication is [Forster et al., 2025](https://doi.org/10.7326/ANNALS-25-01737).
The reproducible numerical comparison is public at
`/data/ryan-white-publication-comparison.json`.

| 2025–2030 statistic | Published Figure 3 | Frozen portal series |
| --- | ---: | ---: |
| Continued-services infections | 154,429 | 154,723.1835 |
| Additional infections with cessation | 75,436 | 79,154.7225 |
| Baltimore additional infections | 1,720 | 1,815.5422 |

- **Arithmetic is reconciled.** The homepage's rounded values follow the archived
  annual means. Every source metro is included once.
- **The statistic is matched.** The paper explicitly uses means across 1,000
  simulations. A mean-versus-median explanation is ruled out for this comparison.
- **Named metro membership is matched.** All 31 rows in Figure 3 map to the portal
  list, including Austin, Cleveland, Columbus, Indianapolis, Sacramento, and Seattle.
  This corrects the earlier audit's uncertainty based on the portal study page's
  static prose list. Geographic boundary definitions have not been independently
  checked. The stale prose list on JHEEM remains a separate correction to make.
- **The source-result difference remains unresolved.** Differences occur within
  individual metros, including baseline means. Rounding and cohort count cannot
  explain them. The public payload records export time but not simulation count,
  model revision, or calibration revision.

The local analysis source uses means and points to a manuscript-era city result
archive (`ryan_white_results_city_2025-07-01.Rdata` on its configured Q: drive).
That archive was not located in the available local sources. Current source code
alone does not establish which simulations produced the published or hosted values.

To finish scientific reconciliation, obtain the manuscript-matching city simulation
archive and the March 2026 export manifest (model/calibration revisions, number and
IDs of simulation draws, and intervention specification), then compare paired
annual results. Do not rescale the curve or relabel the portal estimate as the
publication estimate to make them agree. No researcher has been contacted.

## Presentation and validation

Keep the curve and headline numbers unchanged. The visible caption retains the
release attribution, uncertainty distinction, and published estimate. A native
“Source and calculation” disclosure holds methods and the unresolved comparison,
with links to both machine-readable sources.

Validate combined project/year/search filters, initial server HTML, clear/reload/
back behavior, unknown-program empty results, and desktop/mobile layout. Run lint,
the tests, and a production build. There is no broad restyling or new animation.
