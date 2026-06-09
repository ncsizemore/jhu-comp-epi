# CLAUDE.md

This file gives Claude Code concise project context. The canonical human-facing
setup and workflow notes live in `README.md`.

## Project Overview

This is a Next.js 16 App Router site for the Johns Hopkins Computational
Epidemiology Lab. It presents the lab homepage, projects, publications, team,
news archive, and the interactive global HIV aging app.

## Commands

```bash
npm ci
npm run dev
npm run lint
npm run test:run
npm run build
```

The repo declares Node.js `>=24.0.0`.

## Current Structure

- `src/app/`: route pages and route-level metadata.
- `src/components/layout/`: header, footer, and `MainLayout`.
- `src/components/sections/`: page section components.
- `src/components/global-aging/`: global aging app UI and chart components.
- `src/data/`: raw static datasets and TypeScript data definitions.
- `src/lib/data/`: async data access functions used by pages/components.
- `src/lib/jheem-findings-data.ts`: homepage findings-map fetch/validation.
- `public/data/global-aging/`: runtime JSON assets for the global aging app.
- `docs/`: current implementation notes.
- `docs/archive/`: historical working notes retained for context.

## Conventions

- Prefer `src/lib/data/*` accessors from pages/components instead of importing
  raw `src/data/*` modules directly.
- Keep colleague-provided global aging prose unchanged unless explicitly asked.
- Run `npm run lint`, `npm run test:run`, and `npm run build` before deployable
  pushes.
- Use `npm run extract` to stage global aging JSON after the GMHA repo generates
  `web/json` outputs.
- Use `npm run fetch-publications`, review `src/data/publications-review.json`,
  then run `npm run apply-publications` for publication updates.

## Design Notes

The current site language is restrained, academic, and editorial: serif display
headings, thin rules, Hopkins blue accents, source-forward data presentation,
and minimal decorative UI. Avoid reintroducing older SaaS-style cards, large
marketing heroes, or unused legacy components.
