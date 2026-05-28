# Homepage Findings Map

## Purpose

The homepage findings map is an editorial summary of published JHEEM modeling
results. It is intentionally narrower than the JHEEM portal: the portal is where
users explore scenarios in depth, while the homepage gives visitors a fast,
place-based read on what recent analyses found.

The current homepage section lets users switch between three analyses:

- Ryan White cessation in high-burden metropolitan areas.
- Ryan White cessation aggregated to high-burden states.
- CDC-funded HIV testing cessation across funded states.

Each tab links to the corresponding public portal view.

## Implementation

The page fetches and validates live portal summary JSON on the server:

- Component: `src/components/sections/home/FindingsMap.tsx`
- Shared map types: `src/components/sections/home/findings-map-types.ts`
- Data loading and normalization: `src/lib/jheem-findings-data.ts`
- Data contract tests: `src/lib/jheem-findings-data.test.ts`

The homepage uses Next.js incremental static regeneration for this data. The
current revalidation interval is 24 hours, exported as
`HOMEPAGE_FINDINGS_REVALIDATE_SECONDS`.

## Source Data

The homepage reads the same summary artifacts that power the public portal:

- `https://d320iym4dtm9lj.cloudfront.net/ryan-white/city-summaries.json`
- `https://d320iym4dtm9lj.cloudfront.net/ryan-white-state/state-summaries.json`
- `https://d320iym4dtm9lj.cloudfront.net/cdc-testing/state-summaries.json`

The expected summary shape is intentionally small:

```ts
{
  generated: string;
  cities?: Record<string, {
    name: string;
    shortName: string;
    coordinates: [number, number];
    impact: {
      cessationIncreaseAbsolute: number;
      cessationIncreasePercent: number;
      startYear?: number;
      targetYear: number;
    };
  }>;
  states?: Record<string, {
    name: string;
    shortName: string;
    coordinates: [number, number];
    impact: {
      cessationIncreaseAbsolute: number;
      cessationIncreasePercent: number;
      startYear?: number;
      targetYear: number;
    };
  }>;
}
```

Runtime zod schemas validate this shape before data reaches the component. City
rows use the portal city code as their stable ID. State rows convert postal
abbreviations into FIPS codes for the US map topology.

## Failure Behavior

The loader treats each analysis independently. If one CloudFront summary fails
or no longer matches the expected schema, the homepage logs the failure, keeps
the successfully loaded analyses, and displays a small partial-data notice.

If all summaries fail, the map section renders `SectionErrorFallback`.

## Design Notes

The map is the homepage's one deliberately wide visual moment. The surrounding
page stays restrained and editorial, while the map panel uses a darker canvas,
subtle grid treatment, choropleth glow, proportional city markers, ranked side
rail, and source/portal links.

This is meant to read as academic data storytelling rather than a dashboard.
When extending the site design language to other pages, reuse the restraint,
typography, spacing, and source-forward framing before reusing the map panel
style directly.

