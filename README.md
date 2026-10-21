# CIPHER Lab Website

Next.js site for CIPHER Lab: Computational and Infectious Disease Public
Health Epidemiology Research.

## Requirements

- Node.js `>=24.0.0`
- npm

Install dependencies with:

```bash
npm ci
```

The repo includes `.npmrc` with `legacy-peer-deps=true` for dependency
compatibility.

## Common Commands

```bash
npm run dev        # local development server
npm run lint       # ESLint
npm run test:run   # Vitest test suite
npm run build      # production build
```

## Project Structure

- `src/app/`: Next.js App Router pages.
- `src/components/layout/`: shared header, footer, and page shell.
- `src/components/sections/`: page-specific section components.
- `src/components/global-aging/`: interactive global HIV aging app.
- `src/data/`: static source data and raw TypeScript/JSON datasets.
- `src/lib/data/`: data access functions used by pages and components.
- `public/data/global-aging/`: browser-loadable global aging JSON assets.
- `docs/`: implementation notes and reference material.
- `docs/archive/`: historical working notes from earlier site iterations.

## Data Workflows

### Global Aging App

The global aging app reads metadata from `src/data/global-aging/` and larger
runtime JSON assets from `public/data/global-aging/`.

To refresh those files from the sibling GMHA repository:

1. In the GMHA repo, generate web JSON files:

   ```bash
   Rscript web/extract_for_web.R
   ```

2. In this repo, stage the generated JSON:

   ```bash
   npm run extract
   ```

By default, `npm run extract` reads from `../gmha/web/json`. Override that with:

```bash
GMHA_DIR=/path/to/gmha npm run extract
```

The extractor copies metadata and projection assets, splits calibration data
into per-location files, and writes `src/data/global-aging/manifest.json`.

### Homepage research figure

The trajectory figure uses frozen JHEEM portal projections from the March 2026
release, retrieved in October 2026. Annual means and per-metro provenance are
in `public/data/ryan-white-trajectory.json`; the two responsive SVG views are in
`src/components/sections/home/TrajectoryFigure.tsx`. Update the data, curves,
rounded labels, and caption together. Tests reconcile the aggregate to its sources.
This aggregation differs from the original published study estimate; the caption
and release note explicitly distinguish them. No pooled uncertainty is inferred.

### Publications

`src/data/publication-records.json` is the curated archive used by the page and
`/api/publications`. Full author names, source URLs, verification dates, status,
and sorting dates are retained. Existing API IDs are preserved where applicable.
TB and PEARL belong to separate groups and are excluded from this archive.

```bash
npm run fetch-publications
# Review src/data/publications-review.json against primary sources and group scope.
# New records need group: "cipher" and verified metadata; coauthorship is insufficient.
npm run apply-publications
```

The apply command updates JSON without regenerating the TypeScript interface.
It validates records and duplicate DOIs before writing and creates an ignored
`src/data/publication-records.json.backup`. Within citation year, journal issue
or indexed publication dates determine order; preprints use latest version date.

### Design and identity

The production pages implement the accepted v15 design. `src/app/cipher.css`
scopes editorial styles to `.cipher-site`; the existing global-aging tool retains
its application styles. See `docs/design-language.md` for the design rules and
`docs/releases/2026-10-cipher-refresh.md` for release scope and source decisions.

## Deployment

Production deploys through Vercel from `main`. Before pushing deployable
changes, run:

```bash
npm run lint
npm run test:run
npm run build
```

The temporary canonical deployment is:

```text
https://cipher-epi.vercel.app
```

`https://cipherpublichealth.vercel.app` is also attached to the Vercel project
as a non-canonical alternate while the team evaluates a future custom domain.

### Site URL and legacy redirects

The app has a default canonical public URL and host-level redirects. These can
be overridden through build environment variables when the final custom domain
is chosen:

- `NEXT_PUBLIC_SITE_URL`: canonical public site URL, for example
  `https://cipher-epi.vercel.app`.
- `SITE_LEGACY_HOSTS`: comma-separated legacy hosts that should redirect to the
  canonical URL, for example
  `jhu-comp-epi.vercel.app,jhu-comp-epi-pvip.vercel.app`.

The default legacy redirects are temporary rather than permanent because the lab
is likely to move to a custom domain later.

Recommended domain migration sequence:

1. Add the new Vercel domain/alias to the existing project.
2. Verify the new alias serves the current site.
3. Update `NEXT_PUBLIC_SITE_URL` or the default canonical URL.
4. Update `SITE_LEGACY_HOSTS` or the default legacy host list.
5. Redeploy from `main`.
6. Smoke test the new URL and confirm old aliases redirect to it.
