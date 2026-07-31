# Service Detail Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the four service-detail stubs with complete, responsive, themed pages using the approved copy and established Data Power Source design system.

**Architecture:** Keep the existing dynamic `/services/[slug]` route and drive it from a typed content model. A shared `ServiceDetailPage` composition will provide the branded hero, overview, capability matrix, focus content, proof, related paths, and CTA. Per-page layout variants and CSS custom properties will make electrical blue, mission-critical orange, connectivity green, and design-build charcoal feel distinct without duplicating the global shell.

**Tech Stack:** Next.js App Router, React Server Components, TypeScript, Tailwind CSS 3, Phosphor Icons, Playwright.

### Task 1: Define route-level acceptance coverage

**Files:**
- Create: `tests/service-detail-pages.spec.ts`

**Step 1: Write the failing tests**

Cover all four canonical routes, metadata, unique H1 copy, theme tokens, service marks, hero imagery, service content, quote actions, mobile overflow, and `Service` plus breadcrumb schema.

**Step 2: Run the focused test**

Run: `npm run build && npx playwright test tests/service-detail-pages.spec.ts`

Expected: FAIL because the current route still renders the "Coming in the next pass" stub.

### Task 2: Build the typed service-content model

**Files:**
- Create: `content/service-details.ts`

**Step 1: Add the minimum data shape required by the tests**

Define metadata, service discipline, theme tokens, hero image, overview, capability groups, focus sections, proof content, related links, and closing CTA for each canonical slug.

**Step 2: Preserve source copy and remove page-level em/en dashes**

Keep factual claims from `04-specs/copy/04-07` and do not invent credentials, clients, brands, or project measurements.

### Task 3: Create the themed service-page composition

**Files:**
- Create: `components/service-detail-page.tsx`
- Modify: `app/globals.css`

**Step 1: Build the shared hero and overview**

Use a split hero with the service mark, accent rail, real image, breadcrumb, H1, concise lead, and quote CTA.

**Step 2: Build the capability and focus sections**

Use an asymmetric capability matrix, service-specific focus layouts, the approved proof or case-study block, related links, and a themed CTA band.

**Step 3: Add responsive and reduced-motion behavior**

Collapse asymmetric grids to one column below tablet widths, preserve visible focus states, avoid horizontal overflow, and reuse the existing IntersectionObserver reveal component.

### Task 4: Connect metadata and structured data

**Files:**
- Modify: `app/services/[slug]/page.tsx`
- Modify: `lib/schema.ts`

**Step 1: Replace the stub route**

Resolve content by slug, expose `generateStaticParams`, add `generateMetadata`, and render `ServiceDetailPage`.

**Step 2: Add `Service` JSON-LD**

Include service name, description, provider, area served, and canonical URL alongside `BreadcrumbList`.

### Task 5: Add the connectivity image asset

**Files:**
- Create: `public/images/generated/service-connectivity-cabling.webp`

Copy the selected generated structured-cabling image into the project and reference it from connectivity content.

### Task 6: Verify and refine

**Files:**
- Modify as needed based on verification findings.

**Step 1: Run focused Playwright coverage**

Run: `npx playwright test tests/service-detail-pages.spec.ts`

Expected: PASS.

**Step 2: Run repository checks**

Run: `npm run lint`

Run: `npm run build`

Run: `npm test`

Expected: all commands exit 0.

**Step 3: Inspect desktop and mobile screenshots**

Check all four pages at 1440px desktop and 390px mobile for hierarchy, color consistency, CTA contrast, image crops, and overflow.

**Step 4: Run the front-end design pre-flight**

Confirm one accent per page, consistent radii, no em/en dashes in visible service-page copy, concise hero stacks, no duplicate CTA wording, no hand-drawn icons, reduced motion, and responsive collapse.
