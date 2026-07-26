# Data Power Source Pass 2 Technical Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refine the approved Pass 1 site into a bolder technical and innovative brand expression using the real exported DPS logo system.

**Architecture:** Preserve the statically rendered Next.js App Router structure and typed content. Replace presentation components in place, keep client JavaScript isolated to navigation, accordions, reveal motion, and stat counters, and add no runtime data layer.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 3, Radix UI, Phosphor Icons, Playwright.

### Task 1: Brand assets and regression tests

**Files:**
- Copy: exported SVGs into `public/brand/`
- Modify: `tests/pass1.spec.ts`
- Create: `tests/pass2-visual.spec.ts`

**Steps:**
1. Add assertions for the real header logo, icon favicon, four service marks, technical status rail, and active navigation state.
2. Run the focused Pass 2 tests and verify they fail against the copied Pass 1 interface.
3. Preserve the original functional acceptance suite unchanged.

### Task 2: Global visual system and shell

**Files:**
- Modify: `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`
- Modify: `components/brand-mark.tsx`, `site-header.tsx`, `services-mega-menu.tsx`, `mobile-nav.tsx`, `site-footer.tsx`
- Create: `components/technical-grid.tsx`, `components/brand-service-mark.tsx`

**Steps:**
1. Introduce exact exported colors: DPS blue, electrical blue, connectivity green, mission orange, graphite.
2. Replace the fallback wordmark with the real text lockup and icon.
3. Rebuild the header as a precision equipment bar with an active-state indicator and a more editorial mega-menu.
4. Simplify the footer into a stronger brand lockup plus operational contact matrix.
5. Run focused shell tests until green.

### Task 3: Shared presentation components

**Files:**
- Modify: `hero.tsx`, `pillar-split.tsx`, `service-card.tsx`, `section-band.tsx`
- Modify: `stat-counter.tsx`, `process-steps.tsx`, `project-card.tsx`, `cta-band.tsx`, `faq-accordion.tsx`

**Steps:**
1. Replace generic cards with equipment bays, measurement rails, schematic linework, and varied asymmetric geometry.
2. Use real service marks as the primary service navigation symbols.
3. Add CSS-only staggered reveals and transform/opacity motion with reduced-motion fallbacks.
4. Preserve all semantics, links, focus states, and accordion behavior.

### Task 4: Page refinement

**Files:**
- Modify: `app/page.tsx`, `app/services/page.tsx`, `app/faq/page.tsx`

**Steps:**
1. Refine Home into an asymmetric operations narrative with a branded systems matrix.
2. Refine Services into a four-discipline control architecture.
3. Refine FAQ into a technical reference manual with clearer category scanning.
4. Keep approved copy and section order intact.

### Task 5: Preview and approval checkpoint

**Steps:**
1. Run lint, production build, and the complete Playwright suite.
2. Capture desktop and mobile screenshots for Home, Services, and FAQ.
3. Inspect and refine the screenshots once.
4. Start the local development server and keep it running.
5. Report the preview URL and pause for user approval.
