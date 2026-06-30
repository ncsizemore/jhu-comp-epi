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

### Homepage Findings Map

The homepage findings map fetches live JHEEM summary data server-side with a
24-hour revalidation interval. See `docs/homepage-findings-map.md` for the data
contract and failure behavior.

### Publications

Publication updates use a review workflow:

```bash
npm run fetch-publications
# review src/data/publications-review.json
npm run apply-publications
```

`apply-publications` creates a backup at `src/data/publications.ts.backup`.
Backup files are ignored by git.

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
