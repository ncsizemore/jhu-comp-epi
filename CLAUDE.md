# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 website for the Johns Hopkins University Computational Epidemiology Group. It showcases the research team, publications, and projects using a modern React/TypeScript stack with Tailwind CSS.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Fetch publications from PubMed/Crossref
npm run fetch-publications

# Apply reviewed publications to the codebase
npm run apply-publications
```

## Architecture

### Directory Structure

- `src/app/` - Next.js 15 App Router pages and layouts
  - `page.tsx` - Homepage with hero, stats, and sections
  - `team/` - Team member pages
  - `publications/` - Publications listing
  - `projects/` - Research projects
- `src/components/` - React components organized by type
  - `layout/` - Header, Footer, MainLayout
  - `sections/` - HeroSection, StatsSection, ProjectsSection, and section-specific subdirectories
  - `ui/` - Reusable UI components
- `src/data/` - Centralized data files
  - `team-data.json` - Source of truth for team members (used by other sites)
  - `team.ts` - TypeScript interfaces and utility functions for team data
  - `publications.ts` - Publication data
  - `projects.ts` - Research project data
- `scripts/` - Node.js utility scripts
  - `fetch-publications.js` - Fetches publications from PubMed/Crossref for team members
  - `apply-publications.js` - Applies reviewed publications to publications.ts
  - `test-pubmed.js` - Test script for PubMed API
- `public/` - Static assets (images, SVGs, patterns)

### Data Architecture

**Team Data**: The project uses a centralized team data system stored in `src/data/team-data.json`. This JSON file is the single source of truth for team member information and is designed to be consumed by multiple websites (including non-Next.js sites). See `TEAM_INTEGRATION_GUIDE.md` for details on how other sites can fetch and use this data.

**Publications Workflow**: Publications are fetched using a two-step process:
1. `npm run fetch-publications` - Searches PubMed/Crossref for team member publications and creates a review file
2. Manual review of `src/data/publications-review.json`
3. `npm run apply-publications` - Applies approved publications to `src/data/publications.ts`

### Styling

- **Framework**: Tailwind CSS 4 with custom theme extensions
- **Custom colors**: Extended teal palette for brand colors
- **Custom animations**: `pulse-slow`, `spin-slow` for subtle motion
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **Path aliases**: `@/*` maps to `src/*`

### TypeScript Configuration

- Strict mode enabled
- Path alias: `@/*` → `./src/*`
- JSON imports enabled via `resolveJsonModule`
- Target: ES2017

### Key Components

**Team Components** (`src/components/sections/team/`):
- Display team members by category (faculty, postdoc, student, staff)
- Use utility functions from `src/data/team.ts` to filter and sort members
- Support photo placeholders with initials when images are missing

**Publication Components** (`src/components/sections/publications/`):
- Display publications with rich metadata
- Support for multiple publication formats

**Layout Components**:
- Header with navigation
- Footer with contact information
- MainLayout wrapper for consistent page structure

## Important Conventions

### Team Data

When working with team data:
- Always use `team-data.json` as the source of truth
- Use the utility functions from `team.ts` (e.g., `getFacultyMembers()`, `getTeamMembersByCategory()`)
- Team members have categories: 'faculty', 'postdoc', 'student', 'staff'
- Team members have status: 'current', 'alumni', 'collaborator'
- Display order is controlled by the `order` field

### Publications

- Use the scripts to fetch publications rather than manually updating
- The review process prevents incorrect publications from being added
- Publications are linked to team members via author matching

### Styling

- Use Tailwind utility classes consistently
- Custom teal colors are available (teal-400, teal-500, etc.)
- Responsive design using Tailwind breakpoints
- Animations should be subtle (pulse-slow, spin-slow)

### Component Organization

- Keep section components in `src/components/sections/`
- Complex sections may have their own subdirectory (e.g., `publications/`, `team/`)
- Reusable UI components go in `src/components/ui/`
- Layout components stay in `src/components/layout/`
