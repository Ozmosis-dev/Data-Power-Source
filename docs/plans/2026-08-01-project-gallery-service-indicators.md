# Project Gallery Service Indicators Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Simplify the Projects hero industry index and add an accessible, brand-colored service reference to every project card.

**Architecture:** Keep the existing project data as the source of truth by adding a typed `serviceDisciplines` field to each case study. Render the same four-category metadata through one shared indicator component in a compact gallery legend and as the applicable subset on each card. Preserve the existing routes, copy, photography, card motion, and project detail content.

**Tech Stack:** Next.js App Router, React Server Components, TypeScript, Tailwind CSS, Playwright.

### Task 1: Lock the requested gallery behavior in tests

**Files:**
- Modify: `tests/projects.spec.ts`

1. Replace the icon-grid expectations with a compact inline list expectation.
2. Add expectations for the four-item service legend and exact brand colors.
3. Add per-card expectations for the documented service disciplines.
4. Run the focused tests and confirm they fail because the simplified index and service indicators do not exist yet.

### Task 2: Add typed service metadata and the shared indicator

**Files:**
- Modify: `content/projects.ts`
- Create: `components/project-service-indicators.tsx`
- Modify: `components/project-gallery-card.tsx`
- Modify: `app/projects/page.tsx`

1. Add `serviceDisciplines` to the project type and all nine case studies.
2. Build one shared indicator that supports a labeled legend and a compact dot-only card treatment.
3. Replace the card index with the applicable service dots and an accessible text label.
4. Place the labeled legend directly above the gallery, outside the hero.

### Task 3: Simplify the hero industry index

**Files:**
- Modify: `components/project-market-rail.tsx`

1. Remove icons, counts, boxes, and the six-column grid.
2. Keep a single short heading followed by six inline market names.
3. Allow a natural wrapped inline layout on narrow screens without overflow.

### Task 4: Verify the finished refinement

**Files:**
- Verify: `tests/projects.spec.ts`

1. Run the focused gallery tests and confirm they pass.
2. Build the production site.
3. Review desktop and mobile layouts in the local preview.
4. Run lint, whitespace checks, the complete Projects suite, and the full browser regression suite.
