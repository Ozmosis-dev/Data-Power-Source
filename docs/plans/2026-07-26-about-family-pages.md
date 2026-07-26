# About Family Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn About into a focused company overview and add standalone Safety and Values / Integrity pages that follow the locked sitemap, use the approved copy, and interlink as one coherent page family.

**Architecture:** Keep `/about` focused on company history, leadership, proof, and concise pathways into the two subpages. Move the detailed safety wall and safety-program narrative to `/about/safety`. Move the full operating-standard presentation and integrity narrative to `/about/values`. Add a shared About-family navigation directly below each hero, shared editable content modules, breadcrumbs, metadata, structured data, and contextual next-page links.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, existing DPS components, Phosphor icons, Playwright.

---

## Content ownership

### About overview `/about`

- Company purpose and craftsmanship
- Robert L. Kent founder history
- Compact Safety and Values pathway cards
- Shared proof metrics
- Contractor qualification and IEC affiliation
- No closing CTA band, preserving the approved About-page exception

### Safety `/about/safety`

- Written safety program and PPE controls
- First Aid and CPR preparation
- NFPA 70E arc-flash procedures
- Three-year EMR record and explanation
- Job-site safety behaviors
- Drug- and alcohol-free workplace policy
- Contractor review context and quote / call CTA

### Values / Integrity `/about/values`

- Engineered, Reliable, Straightforward, and Established standards
- Integrity in estimating and scope
- Communication during changing site conditions
- Documentation and craftsmanship expectations
- Owner-led accountability and quote / call CTA

## Task 1: Specify the About-family behavior

**Files:**
- Modify: `tests/about-page.spec.ts`
- Create: `tests/about-subpages.spec.ts`

1. Add failing assertions that `/about` contains visible links to `/about/safety` and `/about/values`.
2. Add failing assertions that the detailed safety wall is no longer rendered on `/about`.
3. Add failing route, metadata, hero, breadcrumb, schema, CTA, and mobile-overflow checks for both subpages.
4. Add failing assertions for the shared About-family navigation and active-page state on all three routes.
5. Run only the About tests and confirm failures are caused by the missing routes and navigation.

## Task 2: Add editable content modules and shared navigation

**Files:**
- Create: `content/about-safety.ts`
- Create: `content/about-values.ts`
- Modify: `content/about.ts`
- Create: `components/about-family-nav.tsx`

1. Move detailed safety content into `content/about-safety.ts`.
2. Move detailed values content into `content/about-values.ts`.
3. Replace the overview’s detailed blocks with two concise pathway-card definitions.
4. Build a keyboard-accessible three-link navigation with `aria-current="page"` and a mobile-safe layout.
5. Re-run the About tests and confirm the navigation assertions pass while route assertions remain red.

## Task 3: Refactor the About overview

**Files:**
- Modify: `app/about/page.tsx`

1. Render the shared About-family navigation directly after the hero.
2. Remove the detailed safety authority wall and detailed values-card section.
3. Add an asymmetric two-path section that previews Safety and Values without duplicating their full copy.
4. Preserve the founder story, shared proof band, qualification block, metadata, and AboutPage schema.
5. Re-run the About overview tests.

## Task 4: Build the Safety page

**Files:**
- Create: `app/about/safety/page.tsx`
- Reuse: `components/safety-authority-wall.tsx`

1. Build the hero and breadcrumbs from `02a-safety.md`.
2. Render the shared About-family navigation.
3. Present the written program and NFPA 70E narrative as distinct, scannable sections.
4. Reuse the detailed safety authority wall for EMR, controls, and verified training topics.
5. Add job-site behavior, drug-free workplace content, contextual cross-link to Values, and the shared CTA band.
6. Add BreadcrumbList and WebPage structured data.
7. Re-run the subpage tests.

## Task 5: Build the Values / Integrity page

**Files:**
- Create: `app/about/values/page.tsx`

1. Build the hero and breadcrumbs from `02b-values.md`.
2. Render the shared About-family navigation.
3. Create an asymmetric standards composition for Engineered, Reliable, Straightforward, and Established.
4. Add separate integrity-in-practice and communication sections with field-specific proof.
5. Add a contextual cross-link to Safety and the shared CTA band.
6. Add BreadcrumbList and WebPage structured data.
7. Re-run the subpage tests.

## Task 6: Integrate navigation and search surfaces

**Files:**
- Modify: `content/site.ts`
- Modify: `components/mobile-nav.tsx`
- Modify: `components/site-footer.tsx`
- Create or modify: `app/sitemap.ts`

1. Expose Safety and Values / Integrity as discoverable About links without crowding the desktop primary navigation.
2. Add the routes to the generated sitemap if one is not already present.
3. Confirm the About primary-nav state remains active on both subpages.

## Task 7: Verify and polish

**Files:**
- Modify only as needed after review.

1. Run ESLint.
2. Run a production build.
3. Run the focused About tests, then the full Playwright suite.
4. Review `/about`, `/about/safety`, and `/about/values` at desktop and mobile sizes.
5. Check hero pulse continuity, focus visibility, current-page states, color contrast, no horizontal overflow, and no unsupported claims.
6. Run the design pre-flight audit before handoff.
