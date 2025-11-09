# Code Review Report - JHU Computational Epidemiology

**Last Updated:** November 8, 2025
**Previous Review:** November 7, 2025
**Application:** Next.js 15.2.4
**Review Type:** Security, Performance, Code Quality, Architecture

---

## Executive Summary

This is a **consolidated review** comparing progress since November 7, 2025 with current state assessment from comprehensive security, performance, quality, and architectural analysis.

### Progress Since November 7

**Fixed (5 issues):** ✅
- Dependencies installed (react-simple-maps, react-slick)
- TypeScript 'any' types eliminated
- Backup files removed from git
- Clipboard API error handling added
- ErrorBoundary component created

**Regressed (1 issue):** 📈
- Dependency vulnerabilities: 6 → 9 (WORSE)

**Unchanged (12 issues):** ➡️
- Large data files in client bundle
- Missing memoization in filters
- Code duplication (project theming)
- Large component files
- Security headers missing
- And 7 more...

### Current State Assessment

**Overall Grade: C+ (Functional but accumulating technical debt)**

| Category | Grade | Trend |
|----------|-------|-------|
| Security | B- | 📈 Declining (more vulnerabilities) |
| Performance | C | ➡️ Unchanged |
| Code Quality | B+ | 📉 Improved (no 'any' types) |
| Architecture | D+ | 📈 Declining (40% code duplication) |

**Critical Finding:** We're **fixing symptoms while root causes spread**. Code duplication has increased, architectural coupling has worsened, and dependency vulnerabilities have grown.

---

## The Honest Assessment

### What We're Doing Well ✅

1. **Responding to reviews** - Team is engaged
2. **TypeScript discipline** - Zero 'any' types (was 2)
3. **Error handling basics** - Try-catch blocks added
4. **Component creation** - ErrorBoundary exists (though unused)

### What We're Avoiding ❌

1. **Architectural refactoring** - Tight coupling getting worse
2. **Code deduplication** - 40% duplication in project theming
3. **Dependency maintenance** - Vulnerabilities growing (6→9)
4. **Using what we create** - ErrorBoundary built but not implemented

### The Pattern

This is **"checkbox engineering"**: fixing what's measurable (ESLint warnings, TypeScript errors) while avoiding hard architectural work (refactoring, abstraction, deduplication).

**Result:** The codebase is getting **harder to work with, not easier**.

---

## Critical Issues (Fix Immediately)

### 1. Dependency Vulnerabilities - REGRESSION ⚠️
**Severity:** HIGH (Getting Worse)
**Status:** Nov 7: 6 vulnerabilities → Nov 8: 9 vulnerabilities

**Current Vulnerabilities:**
- `d3-color` < 3.1.0 - ReDoS vulnerability (HIGH)
- `d3-interpolate`, `d3-transition`, `d3-zoom` - Inherited from d3-color (HIGH)
- `next` 15.2.4 - Cache key confusion, SSRF, content injection (MODERATE)
- `brace-expansion` - ReDoS (LOW)
- `@eslint/plugin-kit` - ReDoS (LOW)

**Impact:**
- Security: Potential DoS attacks via color parsing
- Security: SSRF and cache vulnerabilities in Next.js
- Compliance: Failing security audits

**Fix:**
```bash
# Update Next.js (addresses 3 CVEs)
npm install next@^15.5.6

# Update react-simple-maps (fixes d3-color chain)
npm install react-simple-maps@^1.0.0

# Fix remaining
npm audit fix
```

**Test After:**
```bash
npm run build
npm audit --production
```

---

### 2. React Hook Dependency Bug 🐛
**Severity:** HIGH (New Issue - Production Risk)
**File:** `src/components/sections/publications/ModernPublicationDisplay.tsx:55`

**Issue:** Missing dependency in useEffect - stale closure bug

**Current Code:**
```typescript
useEffect(() => {
  if (!autoplay || isTransitioning) return;

  timerRef.current = setTimeout(() => {
    goToNextPub(); // ← Not in dependency array!
  }, 8000);

  return () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };
}, [autoplay, isTransitioning, currentIndex, featuredPubs.length]);
// Missing: goToNextPub
```

**Risk:** Autoplay carousel may use stale function references, causing incorrect navigation.

**Fix:**
```typescript
const goToNextPub = useCallback(() => {
  setIsTransitioning(true);
  setTimeout(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredPubs.length);
    setIsTransitioning(false);
  }, 500);
}, [featuredPubs.length]);

useEffect(() => {
  if (!autoplay || isTransitioning) return;

  timerRef.current = setTimeout(() => {
    goToNextPub();
  }, 8000);

  return () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };
}, [autoplay, isTransitioning, currentIndex, featuredPubs.length, goToNextPub]);
```

---

### 3. Architectural: 40% Code Duplication in Project Theming 🏗️
**Severity:** CRITICAL (Architectural Blocker)
**Status:** Nov 7: Moderate → Nov 8: High (97 hardcoded colors, 4+ duplicate definitions)

**The Problem:**
Project theming is duplicated in **at least 4 files**, creating a maintenance nightmare:

**Duplicate Locations:**
1. `src/components/sections/publications/PublicationsList.tsx:285-303`
2. `src/app/publications/page.tsx:37-45`
3. `src/components/sections/publications/FeaturedPublications.tsx:88-93`
4. `src/data/publications.ts:352-357`

**Evidence:**
```typescript
// DUPLICATED 4+ times:
const projectColors = {
  pearl: 'from-hopkins-spirit-blue to-blue-600',
  jheem: 'from-hopkins-blue to-indigo-600',
  shield: 'from-amber-500 to-orange-600'
};

const projectGradients = { /* same data, different format */ };
const projectBorders = { /* same data, different format */ };
const projectsMap = { /* same data, different format */ };
```

**Impact:**
- Every new publication component duplicates this code
- Changing brand colors requires updating 4+ files
- Inconsistent styling across features
- **Blocks all future theming work** (dark mode impossible)

**Root Cause:** No centralized design system or configuration layer.

**Fix (Week 1 Priority):**

Create `/src/lib/projects/config.ts`:
```typescript
export const PROJECT_THEME = {
  jheem: {
    name: "JHEEM",
    description: "Johns Hopkins Epidemiologic and Economic Model",
    colors: {
      solid: 'bg-hopkins-blue',
      text: 'text-hopkins-blue',
      gradient: 'from-hopkins-blue to-indigo-600',
      gradientDark: 'from-hopkins-blue/30 to-indigo-900/30',
      border: 'border-l-hopkins-blue'
    }
  },
  shield: {
    name: "SHIELD",
    description: "Simulation of Health Impacts through Epidemiological Analysis",
    colors: {
      solid: 'bg-amber-500',
      text: 'text-amber-500',
      gradient: 'from-amber-500 to-orange-600',
      gradientDark: 'from-amber-500/30 to-orange-900/30',
      border: 'border-l-amber-500'
    }
  },
  pearl: {
    name: "PEARL",
    description: "Population Epidemiology Analysis and Research Laboratory",
    colors: {
      solid: 'bg-hopkins-spirit-blue',
      text: 'text-hopkins-spirit-blue',
      gradient: 'from-hopkins-spirit-blue to-blue-600',
      gradientDark: 'from-hopkins-spirit-blue/30 to-blue-900/30',
      border: 'border-l-hopkins-spirit-blue'
    }
  }
} as const;

export type ProjectId = keyof typeof PROJECT_THEME;

export const getProjectTheme = (projectId: string) => {
  return PROJECT_THEME[projectId as ProjectId] || PROJECT_THEME.pearl;
};

export const getProjectColor = (projectId: string, variant: keyof typeof PROJECT_THEME.pearl.colors) => {
  return getProjectTheme(projectId).colors[variant];
};
```

**Then refactor all 4+ duplicate locations** to use this single source of truth.

**Success Metric:** Zero duplicate project theme definitions.

---

### 4. Architectural: Tight Coupling via Direct Data Imports 🏗️
**Severity:** HIGH (Prevents Testing, Scaling, Migration)
**Status:** Unchanged from Nov 7

**The Problem:**
7+ components directly import data arrays instead of using a data access layer:

**Affected Files:**
- `src/app/publications/page.tsx:7` - `import { publications } from '@/data/publications'`
- `src/app/projects/[id]/page.tsx:4` - `import { projects } from '@/data/projects'`
- `src/components/sections/publications/PublicationsList.tsx:5`
- And 4+ more...

**Why This Is Bad:**
1. **Violates separation of concerns** - UI components know about data structure
2. **Makes testing impossible** - Can't mock data
3. **Blocks API migration** - Can't switch to database without refactoring every component
4. **Forces client-side rendering** - Data bundled into client JS
5. **Tight coupling** - Change data format = update all components

**Root Cause:** No abstraction layer between data and presentation.

**Fix (Week 1 Priority):**

Create `/src/lib/data/publications.ts`:
```typescript
import { publications as publicationsData, Publication } from '@/data/publications';

// Data access layer - Future: fetch from API/DB
export async function getPublications(): Promise<Publication[]> {
  return publicationsData;
}

export async function getFeaturedPublications(): Promise<Publication[]> {
  return publicationsData.filter(p => p.featured);
}

export async function getPublicationsByProject(projectId: string): Promise<Publication[]> {
  return publicationsData.filter(p => p.projects.includes(projectId));
}

export async function getPublicationsByYear(year: string): Promise<Publication[]> {
  return publicationsData.filter(p => p.year === year);
}

export async function getPublicationYears(): Promise<string[]> {
  return [...new Set(publicationsData.map(p => p.year))].sort((a, b) => b.localeCompare(a));
}
```

**Then refactor pages to Server Components:**
```typescript
// app/publications/page.tsx
import { getPublications, getPublicationYears } from '@/lib/data/publications';

export default async function PublicationsPage() {
  const publications = await getPublications();
  const years = await getPublicationYears();

  return (
    <MainLayout>
      <PublicationsClient publications={publications} years={years} />
    </MainLayout>
  );
}
```

**Benefits:**
- ✅ Testable (mock data access layer)
- ✅ Future-proof (swap implementation without touching components)
- ✅ Server-side rendering (data not in client bundle)
- ✅ Separation of concerns (components don't know data source)

**Success Metric:** Zero direct imports of data arrays in components.

---

### 5. Large Data Files in Client Bundle (50KB Overhead)
**Severity:** HIGH
**Status:** Unchanged from Nov 7

**Files:**
- `src/data/publications.ts` - 25,180 bytes
- `src/data/team-data.json` - 24,564 bytes
- **Total:** ~50KB of data in every page's JavaScript bundle

**Impact:**
- Slower initial page load
- Larger bundle size
- Data loaded even on pages that don't need it

**Why Still Broken:**
Publications page is marked `"use client"` (line 1), forcing all data client-side.

**Fix:**
After implementing #4 (data access layer), convert to Server Component:
```typescript
// app/publications/page.tsx
// Remove "use client" - make this a Server Component

import { getPublications } from '@/lib/data/publications';

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <MainLayout>
      {/* Only interactive parts are client components */}
      <PublicationsClient publications={publications} />
    </MainLayout>
  );
}
```

**Success Metric:**
- Bundle size reduced by 50KB
- Lighthouse performance score improved

---

### 6. Missing Memoization in Filters (Performance)
**Severity:** HIGH
**Status:** Unchanged from Nov 7
**File:** `src/app/publications/page.tsx:18-31`

**Issue:** Filter/sort runs on **every render** without memoization, causing poor performance with 50+ publications.

**Current Code:**
```typescript
const filteredPublications = publications.filter(pub => {
  const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => pub.tags.includes(tag));
  const matchesYears = selectedYears.length === 0 || selectedYears.includes(pub.year);
  const matchesProjects = selectedProjects.length === 0 || selectedProjects.some(project => pub.projects.includes(project));
  return matchesTags && matchesYears && matchesProjects;
});
```

**Impact:**
- Filters run on every state change, even unrelated ones
- With 50+ publications, this is 50+ iterations per render
- Causes UI jank when typing or clicking

**Fix:**
```typescript
const filteredPublications = useMemo(() => {
  return publications.filter(pub => {
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => pub.tags.includes(tag));
    const matchesYears = selectedYears.length === 0 || selectedYears.includes(pub.year);
    const matchesProjects = selectedProjects.length === 0 || selectedProjects.some(project => pub.projects.includes(project));
    return matchesTags && matchesYears && matchesProjects;
  });
}, [publications, selectedTags, selectedYears, selectedProjects]);
```

**Better Fix (Extract to Hook):**
```typescript
// src/hooks/usePublicationFilters.ts
export function usePublicationFilters(publications: Publication[]) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return publications.filter(pub => {
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => pub.tags.includes(tag));
      const matchesYears = selectedYears.length === 0 || selectedYears.includes(pub.year);
      const matchesProjects = selectedProjects.length === 0 || selectedProjects.some(project => pub.projects.includes(project));
      return matchesTags && matchesYears && matchesProjects;
    });
  }, [publications, selectedTags, selectedYears, selectedProjects]);

  return {
    filtered,
    selectedTags,
    selectedYears,
    selectedProjects,
    setSelectedTags,
    setSelectedYears,
    setSelectedProjects
  };
}
```

---

### 7. ErrorBoundary Created But Not Used
**Severity:** MEDIUM (Checkbox Engineering)
**Status:** NEW - Component exists (72 lines) but **zero usage in app**

**Issue:** ErrorBoundary component was created (likely from Nov 7 review) but never implemented.

**This is a red flag:** Creating components without using them suggests "checkbox mentality" - doing what the review says without understanding why.

**Fix:**
```typescript
// app/layout.tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary fallback={<ErrorFallback />}>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}

// app/publications/page.tsx - Wrap risky sections
<ErrorBoundary fallback={<PublicationsError />}>
  <FeaturedPublications publications={publications} />
</ErrorBoundary>
```

**Success Metric:** ErrorBoundary used in at least 3 locations (layout + 2 sections).

---

## High Priority Issues

### 8. Missing React.memo on List Components
**Severity:** HIGH (Performance)
**Files:**
- `src/components/sections/publications/PublicationsList.tsx:270-428` (158-line inline component)
- `src/components/sections/team/TeamMemberCard.tsx:8`

**Issue:** List item components re-render on every parent state change.

**Impact:**
- Publications list: 20+ items re-render when filters change
- Team cards: 13+ cards re-render unnecessarily
- Causes layout thrashing and janky scrolling

**Fix:**
```typescript
// Extract PublicationListItem to separate file
// src/components/publications/PublicationListItem.tsx
import { memo } from 'react';

const PublicationListItem = memo(({ publication, isExpanded, onToggleExpansion }) => {
  // ... 158 lines of component logic
});

export default PublicationListItem;

// src/components/sections/team/TeamMemberCard.tsx
import { memo } from 'react';

const TeamMemberCard = memo(({ member }) => {
  // ... component code
});

export default TeamMemberCard;
```

---

### 9. Large Component Files (Maintainability)
**Severity:** MEDIUM
**Status:** Unchanged from Nov 7

**Files:**
- `src/components/sections/publications/PublicationsList.tsx` - **428 lines**
- `src/components/sections/publications/FeaturedPublications.tsx` - **369 lines**
- `src/app/publications/page.tsx` - **310 lines**
- `src/components/sections/publications/RecentPublicationsHighlight.tsx` - **227 lines**

**Issue:** Components exceed 200-line guideline, mixing multiple concerns.

**Impact:**
- Hard to understand and maintain
- Difficult to test in isolation
- Code navigation slows down
- Higher cognitive load for developers

**Fix:** Split into smaller, focused components.

Target structure:
```
src/components/publications/
├── PublicationCard.tsx          (<100 lines)
├── PublicationListItem.tsx      (<150 lines)
├── PublicationFilters.tsx       (<100 lines)
├── PublicationList.tsx          (<150 lines)
└── index.ts
```

---

### 10. No Shared UI Component Library
**Severity:** MEDIUM (Architectural)
**Status:** Getting worse (more duplication as features added)

**Issue:** Common UI patterns recreated in each component:
- Filter buttons (duplicated in PublicationsList.tsx:146-157 and publications/page.tsx:106-118)
- Badge components (inline in multiple files)
- Card containers (repeated patterns)
- Loading states (ad-hoc in each component)

**Impact:**
- Inconsistent UX across features
- Code duplication
- Harder to implement design changes
- Every new feature recreates UI patterns

**Fix:** Create shared component library

```typescript
// src/components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'filter';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', size = 'md', active, children, onClick }: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-colors';
  const variantStyles = {
    primary: 'bg-hopkins-blue text-white hover:bg-hopkins-blue/90',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    filter: active
      ? 'bg-hopkins-blue text-white'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  };
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// src/components/ui/Badge.tsx
// src/components/ui/Card.tsx
// src/components/ui/FilterGroup.tsx
// etc.
```

---

### 11. Security Headers Missing
**Severity:** MEDIUM
**Status:** Unchanged from Nov 7
**File:** `next.config.ts`

**Issue:** Standard security headers not implemented.

**Fix:**
```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self'",
            ].join('; ')
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};
```

---

## 2-Week Refactoring Roadmap

### Week 1: Foundation & Architecture (Critical Path)

#### Day 1-2: Dependency & Security Cleanup
**Goal:** Fix security vulnerabilities and update dependencies

**Tasks:**
- [ ] Update Next.js to 15.5.6+
- [ ] Update react-simple-maps to 1.0.0+
- [ ] Run `npm audit fix`
- [ ] Test build and deployment
- [ ] Verify map component still works

**Success Criteria:**
- Zero high/moderate npm audit vulnerabilities
- All tests pass
- Production build succeeds

---

#### Day 3-4: Centralize Project Theming
**Goal:** Eliminate 40% code duplication in project configuration

**Tasks:**
- [ ] Create `/src/lib/projects/config.ts` with PROJECT_THEME
- [ ] Update `PublicationsList.tsx` to use centralized config
- [ ] Update `publications/page.tsx` to use centralized config
- [ ] Update `FeaturedPublications.tsx` to use centralized config
- [ ] Update `src/data/publications.ts` to use centralized config
- [ ] Search and replace all hardcoded project colors
- [ ] Create `useProjectTheme()` hook for easy access

**Success Criteria:**
- Zero duplicate project theme definitions
- Grep for `projectColors`, `projectGradients`, `projectsMap` returns 0 results (except in config.ts)
- All components use centralized config

**Estimated Impact:**
- Remove ~200 lines of duplicate code
- Make theming changes 10x faster
- Enable future dark mode implementation

---

#### Day 5: Create Data Access Layer
**Goal:** Decouple data from presentation

**Tasks:**
- [ ] Create `/src/lib/data/publications.ts` with data access functions
- [ ] Create `/src/lib/data/team.ts` with data access functions
- [ ] Create `/src/lib/data/projects.ts` with data access functions
- [ ] Update `app/publications/page.tsx` to use data access layer
- [ ] Remove "use client" from publications page
- [ ] Convert to Server Component pattern

**Success Criteria:**
- Zero direct imports of `publications`, `teamData`, `projects` arrays in components
- Publications page is Server Component
- Bundle size reduced by 50KB

---

### Week 2: Performance & Component Quality

#### Day 6-7: Fix React Performance Issues
**Goal:** Add memoization and fix hook dependencies

**Tasks:**
- [ ] Fix ModernPublicationDisplay.tsx useEffect dependency bug
- [ ] Add useMemo to filter logic in publications/page.tsx
- [ ] Create `usePublicationFilters()` custom hook
- [ ] Add React.memo to PublicationListItem
- [ ] Add React.memo to TeamMemberCard
- [ ] Add useCallback to event handlers in carousels

**Success Criteria:**
- No React ESLint warnings
- Filter performance: <50ms for 100 publications
- Fewer re-renders (use React DevTools Profiler)

---

#### Day 8-9: Component Refactoring
**Goal:** Split large components, create shared UI library

**Tasks:**
- [ ] Extract PublicationListItem from PublicationsList.tsx to separate file
- [ ] Create `/src/components/ui/Button.tsx`
- [ ] Create `/src/components/ui/Badge.tsx`
- [ ] Create `/src/components/ui/Card.tsx`
- [ ] Create `/src/components/ui/FilterGroup.tsx`
- [ ] Refactor PublicationsList.tsx to use shared components
- [ ] Refactor publications/page.tsx to use shared components

**Success Criteria:**
- No component files >300 lines
- Shared UI components used in 3+ places
- Consistent button/badge styling across app

---

#### Day 10: Implement ErrorBoundary & Security
**Goal:** Actually use ErrorBoundary, add security headers

**Tasks:**
- [ ] Wrap app/layout.tsx with ErrorBoundary
- [ ] Wrap FeaturedPublications with ErrorBoundary
- [ ] Wrap map component with ErrorBoundary
- [ ] Create error fallback components
- [ ] Add security headers to next.config.ts
- [ ] Add CSP policy

**Success Criteria:**
- ErrorBoundary used in 3+ locations
- Test error handling (throw error in component)
- Security headers visible in browser DevTools

---

## Metrics & Success Criteria

### Before (Nov 8, 2025)

| Metric | Value |
|--------|-------|
| npm audit vulnerabilities | 9 (5 High, 1 Mod, 3 Low) |
| TypeScript 'any' usage | 0 ✅ |
| Code duplication | 40% (project theming) |
| Largest component | 428 lines |
| Bundle size (data) | ~50KB |
| Direct data imports | 7+ files |
| Hardcoded colors | 97 instances |
| ErrorBoundary usage | 0 locations |
| Shared UI components | 2 |
| Components >300 lines | 3 |

### After (Target: Nov 22, 2025)

| Metric | Target |
|--------|--------|
| npm audit vulnerabilities | 0 high/moderate |
| TypeScript 'any' usage | 0 ✅ |
| Code duplication | <5% |
| Largest component | <250 lines |
| Bundle size (data) | 0KB (server-side) |
| Direct data imports | 0 files |
| Hardcoded colors | 0 (use config) |
| ErrorBoundary usage | 3+ locations |
| Shared UI components | 10+ |
| Components >300 lines | 0 |

---

## Progress Tracking

### Week 1: Foundation & Architecture
- [ ] Day 1-2: Dependencies & Security ⏱️ 2 days
- [ ] Day 3-4: Centralize Project Theming ⏱️ 2 days
- [ ] Day 5: Data Access Layer ⏱️ 1 day

### Week 2: Performance & Quality
- [ ] Day 6-7: React Performance ⏱️ 2 days
- [ ] Day 8-9: Component Refactoring ⏱️ 2 days
- [ ] Day 10: ErrorBoundary & Security ⏱️ 1 day

**Total Estimated Time:** 10 days

---

## Rules for Future Development

After this refactor, **enforce these patterns** to prevent regression:

### 1. No Direct Data Imports
❌ **Never:**
```typescript
import { publications } from '@/data/publications';
```

✅ **Always:**
```typescript
import { getPublications } from '@/lib/data/publications';
const publications = await getPublications();
```

### 2. No Hardcoded Project Styling
❌ **Never:**
```typescript
const projectColors = { pearl: 'from-blue-500...', jheem: '...' };
```

✅ **Always:**
```typescript
import { getProjectTheme } from '@/lib/projects/config';
const theme = getProjectTheme(projectId);
```

### 3. No Components >250 Lines
If a component exceeds 250 lines, split it:
- Extract inline components
- Move logic to custom hooks
- Split into smaller focused components

### 4. Use Shared UI Components
Before creating a new button/badge/card, check if one exists in `/src/components/ui/`.

### 5. Memoize Expensive Operations
Always use `useMemo` for:
- Filtering/sorting arrays
- Complex calculations
- Derived state

Always use `useCallback` for:
- Event handlers passed to child components
- Functions in useEffect dependencies

### 6. Server Components by Default
Only use `"use client"` when absolutely necessary (interactivity, hooks, browser APIs).

---

## Testing Plan

After each day's work:

```bash
# 1. Type check
npm run type-check

# 2. Build
npm run build

# 3. Security audit
npm audit --production

# 4. Test locally
npm run dev
# Manually test affected features

# 5. Visual regression
# Check publications, team, projects pages
```

---

## Positive Findings ✅

### What's Working Well

1. **TypeScript Discipline** - Zero 'any' types throughout codebase
2. **Component Structure** - Clear organization in /components/sections/
3. **Next.js 15 Adoption** - Using App Router, async params
4. **Git Hygiene** - No credentials, clean history
5. **Responsive to Reviews** - Team is engaged and fixing issues

### What We Built Right

1. **Data Centralization** - Publications in single source (just need access layer)
2. **Image Optimization** - Using next/image correctly
3. **External Link Security** - Proper rel="noopener noreferrer"
4. **TypeScript Coverage** - 100% TypeScript usage
5. **Error Handling Basics** - Try-catch blocks added to clipboard, API calls

---

## The Bottom Line

### Current State: C+ (Functional but accumulating debt)

**We're in the danger zone:** The codebase works today, but technical debt is compounding faster than we're paying it down.

**The Pattern:**
- ✅ Fix tactical issues (TypeScript, ESLint)
- ❌ Avoid architectural work (refactoring, abstraction)
- 📈 Result: Debt grows, codebase gets harder to work with

### What Happens If We Don't Refactor?

**3 months from now:**
- 10+ files with duplicate project theming
- 100+ hardcoded colors (dark mode impossible)
- 200KB+ client bundle
- Every new feature duplicates code
- Developer velocity slows by 50%

**6 months from now:**
- Unmaintainable codebase
- Afraid to make changes (break 5 things when fixing 1)
- 2-month rewrite needed instead of 2-week refactor

### What Happens If We Do Refactor?

**After Week 1:**
- No security vulnerabilities
- Centralized project theming (change colors in one place)
- Data access layer (ready for API/database migration)
- 50KB smaller bundle

**After Week 2:**
- No performance issues
- Components <250 lines (easier to understand)
- Shared UI library (consistent UX)
- ErrorBoundary protecting users

**Long Term:**
- Sustainable development velocity
- Easy to onboard new developers
- Ready to scale (add features without duplicating code)
- Foundation for dark mode, internationalization, etc.

---

## Recommendation

**Stop new features for 2 weeks.** Fix the foundation.

This isn't optional anymore. The architectural issues are blocking future development. Every new feature makes the problem worse.

**The choice:**
1. **2 weeks now** - Focused refactor, clean foundation
2. **2 months later** - Complete rewrite when debt is unbearable

I recommend Option 1.

---

**Next Steps:**

1. Review this roadmap
2. Get team buy-in for 2-week refactor sprint
3. Start with Week 1, Day 1-2 (dependencies)
4. Update this document with progress daily

**Let's build this right.**

---

**Report Updated:** November 8, 2025
**Previous Review:** November 7, 2025
**Total Files Analyzed:** 62 source files
**Lines of Code:** ~15,000+
