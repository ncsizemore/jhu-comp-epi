# Publications Page Improvements

**Last Updated:** 2025-11-13
**Status:** Planning Phase

This document tracks improvements specific to the publications page based on a comprehensive review from senior SWE, web designer, and developer perspectives.

---

## Priority Matrix

### 🔴 Critical (Do First)

#### 1. Timeline Keyboard Navigation
**File:** `src/components/sections/publications/EnhancedPublicationsList.tsx:152-165`
**Problem:** Year buttons and paper icons are only mouse-accessible
**Solution:**
- Add keyboard arrow navigation along timeline
- Add Enter/Space to select year/paper
- Add proper focus indicators
**Impact:** Critical for accessibility and usability
**Effort:** Medium (4-6 hours)
**Status:** ✅ Completed

#### 2. URL State Management for Filters
**File:** `src/components/sections/publications/EnhancedPublicationsList.tsx:19-29`
**Problem:**
- Users can't bookmark filtered views (e.g., "Show me all 2024 PEARL publications")
- Can't share filtered views with colleagues
- Filters reset on page refresh
**Solution:** Use URL search params to persist filter state
**Impact:** Researchers need to share specific filtered views
**Effort:** Medium (3-4 hours)
**Status:** ✅ Completed

#### 3. Timeline Mobile Layout
**File:** `src/components/sections/publications/EnhancedPublicationsList.tsx:127-250`
**Problem:**
- Timeline is desktop-only design - breaks down on mobile
- Small touch targets (32px paper icons) hard to tap
- Horizontal scrolling issues on small screens
**Solution:** Vertical timeline or simple year dropdown on mobile
**Impact:** Major usability issue on phones/tablets
**Effort:** High (6-8 hours)
**Status:** ✅ Completed

---

### 🟡 High Priority

#### 4. Featured Card Visual Balance
**File:** `src/components/sections/publications/FeaturedPublicationsGrid.tsx:88-115`
**Problem:** Cards with images vs without images look mismatched
**Solution:**
- Add placeholder pattern/graphic for cards without images
- OR: Require images for featured publications
**Impact:** Visual inconsistency hurts professional appearance
**Effort:** Low (1-2 hours)
**Status:** Not Started

#### 5. Filter Discoverability
**File:** `src/components/sections/publications/EnhancedPublicationsList.tsx:253-347`
**Problem:** Filter section easy to miss below the large timeline
**Solution:**
- Make filters sticky, or
- Add more prominent positioning
- Add visual cue that filters are available
**Impact:** Users might not realize they can filter
**Effort:** Low (1-2 hours)
**Status:** Not Started

#### 6. Timeline Height Layout Shift
**File:** `src/components/sections/publications/EnhancedPublicationsList.tsx:74-78`
**Problem:** Dynamic height calculation causes CLS (Cumulative Layout Shift)
**Solution:** Pre-calculate or set minimum height
**Impact:** Poor Core Web Vitals, jumpy page loading
**Effort:** Low (1-2 hours)
**Status:** Not Started

#### 7. Publication List Virtualization
**File:** `src/components/sections/publications/EnhancedPublicationsList.tsx:351-359`
**Problem:** With pagination at 20, this works now, but could be issue as dataset grows
**Solution:** Implement react-window or react-virtualized for long lists
**Impact:** Future-proofs as publication count grows
**Effort:** Medium (4-5 hours)
**Status:** Not Started

---

### 🟢 Medium Priority

#### 8. Timeline Year Label Overlap
**File:** `src/components/sections/publications/EnhancedPublicationsList.tsx:151-165`
**Problem:** If research spans many years (15+), labels will overlap
**Solution:** Add responsive year label rotation or selective display
**Impact:** Visual polish, edge case handling
**Effort:** Low (2-3 hours)
**Status:** Not Started

#### 9. Structured Data for Publications
**File:** `src/app/publications/page.tsx:9-12`
**Problem:** No JSON-LD for ScholarlyArticle schema
**Solution:** Add structured data markup
**Impact:** Better discoverability in academic search (Google Scholar)
**Effort:** Medium (3-4 hours)
**Status:** Not Started

#### 10. Modal Prev/Next Keyboard Shortcuts
**File:** `src/components/publications/PublicationModal.tsx:28-34`
**Problem:** Left/right arrow keys don't navigate between publications
**Solution:** Add arrow key listeners in modal
**Impact:** Nice UX enhancement for keyboard users
**Effort:** Low (1 hour)
**Status:** Not Started

#### 11. Filter Reset on Timeline Interaction
**File:** `src/components/sections/publications/EnhancedPublicationsList.tsx:59-64`
**Problem:**
- Clicking a paper icon sets both year AND project filters
- Might be surprising - unclear interaction model
**Solution:**
- Consider additive vs. replacement logic
- Add visual feedback showing what was filtered
**Impact:** Clearer interaction model
**Effort:** Low (2 hours)
**Status:** Not Started

---

### 🔵 Low Priority (Polish)

#### 12. Animation Performance on Low-End Devices
**Problem:** Multiple backdrop-blur and pulse animations
**Solution:** Add performance monitoring or simpler fallbacks
**Impact:** Better experience on older devices
**Effort:** Medium (3-4 hours)
**Status:** Not Started

#### 13. Empty State for Featured Publications
**Problem:** If no featured pubs exist, section shows empty
**Solution:** Add graceful fallback or hide section
**Impact:** Edge case handling
**Effort:** Low (1 hour)
**Status:** Not Started

#### 14. Timeline Tooltip Positioning Logic
**File:** `src/components/sections/publications/EnhancedPublicationsList.tsx:218-220`
**Problem:** Could still clip on extreme edges
**Solution:** Add boundary detection
**Impact:** Visual polish
**Effort:** Low (2 hours)
**Status:** Not Started

---

## Quick Wins (Can Do in < 1 Hour)

### A. Add Focus Indicators to Timeline Buttons ✅
**File:** `src/app/publications/publications.css`
**Status:** Completed
- Added focus-visible styles with Hopkins gold outline
- Added timeline-specific focus styles for year buttons and paper icons

### B. Make Filter Section Sticky ✅
**File:** `src/components/sections/publications/EnhancedPublicationsList.tsx:392`
**Status:** Completed
- Made filter section sticky with `sticky top-[6.5rem] z-20`
- Removed `overflow-hidden` from parent section (was blocking sticky)
- Adjusted sticky positioning to keep full filter box visible
- Increased backdrop blur for better visibility when scrolling

### C. Hide Timeline on Mobile, Show Year Dropdown ✅
**Status:** Completed (part of Critical #3)
- Timeline hidden on mobile with `hidden lg:block`
- Added mobile year dropdown selector
- Improved mobile UX significantly

---

## Sprint Plan

### Week 1: Core Functionality ✅ COMPLETED
- [x] URL state management (#2) - Essential for shareability
- [x] Timeline mobile layout (#3) - Major usability gap
- [x] Timeline keyboard navigation (#1) - Accessibility requirement

### Week 2: Visual Polish
- [ ] Featured card balance (#4) - Professional appearance
- [ ] Filter discoverability (#5) - Help users find features
- [ ] Timeline height/CLS (#6) - Performance metrics

### Week 3: Refinements
- [ ] Modal keyboard nav (#10)
- [ ] Filter interaction clarity (#11)
- [ ] Year label overlap (#8)

---

## Notes

- **Excluded:** Site-wide concerns like dark mode, i18n, general accessibility patterns
- **Focus:** Publications page-specific improvements only
- **Testing:** Each improvement should be tested on mobile + desktop before marking complete
- **Accessibility:** Items #1, #10 are WCAG compliance related

---

## Completion Tracking

**Total Items:** 14 core + 3 quick wins
**Completed:** 6 (35%)
**In Progress:** 0
**Not Started:** 11

**Critical (🔴):** 3/3 completed ✅
**High (🟡):** 0/4 completed
**Medium (🟢):** 0/4 completed
**Low (🔵):** 0/3 completed
**Quick Wins:** 3/3 completed ✅

---

## Session Summary (2025-11-13)

### Completed Today:
1. ✅ **Quick Win A:** Added focus indicators to timeline buttons
   - Custom CSS for Hopkins gold outline on focus
   - Specific styles for year buttons and paper icons

2. ✅ **Quick Win B:** Made filter section sticky
   - Sticky positioning with enhanced backdrop blur
   - Better visibility when scrolling

3. ✅ **Critical #2:** URL state management for filters
   - Modified `usePublicationFilters` hook to use URL search params
   - Filters now persist in URL for bookmarking/sharing
   - Example: `/publications?years=2024&projects=pearl`

4. ✅ **Critical #1:** Timeline keyboard navigation
   - Full arrow key navigation (←→ between years, ↑↓ between publications)
   - Enter/Space to select
   - Focus management with auto-focus on navigation
   - Accessible tooltip on focus

5. ✅ **Critical #3:** Mobile-friendly timeline
   - Desktop: Full interactive timeline (unchanged)
   - Mobile: Clean dropdown selector with publication counts
   - Responsive breakpoints (lg: desktop timeline, mobile: dropdown)

### Technical Changes:
- **Files Modified:** 3
  - `src/app/publications/publications.css`
  - `src/hooks/usePublicationFilters.ts`
  - `src/components/sections/publications/EnhancedPublicationsList.tsx`
- **Build Status:** ✅ All tests passing
- **Bundle Size:** 8.53 kB (slight increase due to keyboard nav logic)

### Impact:
- **Accessibility:** Major improvement - timeline now fully keyboard accessible
- **Shareability:** Users can now bookmark and share filtered views
- **Mobile UX:** Dramatically improved - no more broken timeline on mobile
- **WCAG Compliance:** Improved focus indicators and keyboard navigation
