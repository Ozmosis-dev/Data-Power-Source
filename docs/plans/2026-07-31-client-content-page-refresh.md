# Client Content Page Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the four service detail pages plus Safety and Values & Integrity with every relevant fact supplied in the five client DOCX files, while preserving the established Data Power Source visual system.

**Architecture:** Keep the existing dynamic service route, shared service page composition, About routes, metadata, structured data, navigation, and service color tokens. Extend the typed service capability model with optional grouped detail lists so long technical scopes can be presented in readable editorial panels. Keep Safety and Values & Integrity as distinct pages fed by their existing content modules, with the client-approved four-value narrative distributed according to each page's purpose.

**Tech Stack:** Next.js App Router, React Server Components, TypeScript, Tailwind CSS 3, Phosphor Icons, Playwright.

### Task 1: Lock the client content into acceptance coverage

**Files:**
- Modify: `tests/service-detail-pages.spec.ts`
- Modify: `tests/about-subpages.spec.ts`

**Step 1: Write the failing service-content test**

Add route-specific expectations for the client-approved service headlines and representative scope from each DOCX, including commercial and industrial installation categories, UPS and generator integration, copper/fiber certification, and the four-step design-build process.

**Step 2: Write the failing About-content test**

Require the Safety page to include the client-approved "Safety First, Always" narrative and the Values page to present Safety, Integrity, Workmanship, and Responsiveness.

**Step 3: Run focused tests to verify RED**

Run: `npx playwright test tests/service-detail-pages.spec.ts tests/about-subpages.spec.ts`

Expected: FAIL because the current pages still contain the previous copy and capability structure.

### Task 2: Expand the service content model for technical scope

**Files:**
- Modify: `content/service-details.ts`
- Modify: `components/service-detail-page.tsx`

**Step 1: Add optional capability details**

Allow a capability card to carry an optional `details` string array beneath its summary.

**Step 2: Render grouped details accessibly**

Render details as a compact semantic list with the service accent used only for list markers and focus treatment. Use a two-column list inside sufficiently long cards at wider breakpoints.

**Step 3: Preserve the existing layout fallback**

Keep the current asymmetric four-, six-, seven-, and nine-card layouts and ensure unknown counts still fall back to a two-column desktop grid.

### Task 3: Rewrite all four service pages from client sources

**Files:**
- Modify: `content/service-details.ts`

**Step 1: Rewrite Commercial & Industrial Electrical**

Use every item from `ELECTRICAL SERVICES CONTENT.docx`, grouped into Commercial & Industrial Electrical Installations and EV Charging Stations.

**Step 2: Rewrite Mission-Critical Power**

Use the stakes, complete system, named equipment platforms, NEC detail, load commissioning, and lifecycle-support content from `MISSION CRITICAL CONTENT.docx`.

**Step 3: Rewrite Low Voltage & Connectivity**

Use every item from `LOW VOLTAGE CONTENT.docx`, grouped into Structured Cabling & Data Communications, Fiber Optic Cabling, Certification & Testing, and Adjacent Low-Voltage Systems.

**Step 4: Rewrite Engineering & Design-Build**

Use the single-source benefits, five system categories, four-step process, and facility-specific reliability narrative from `DESIGN BUILD CONTENT.docx`.

**Step 5: Run the service-content test to verify GREEN**

Run: `npx playwright test tests/service-detail-pages.spec.ts`

Expected: PASS.

### Task 4: Rewrite Safety and Values & Integrity from client sources

**Files:**
- Modify: `content/about-safety.ts`
- Modify: `content/about-values.ts`
- Modify: `app/about/values/page.tsx`

**Step 1: Reframe Safety around client-approved operating language**

Lead with "Safety First, Always" and integrate trained, prepared crews, task planning, disciplined execution, and protection of people, facilities, and the team. Retain existing documented safety-program and credential proof as supporting evidence.

**Step 2: Rebuild the values standard around the four client values**

Replace Engineered, Reliable, Straightforward, and Established with Safety, Integrity, Workmanship, and Responsiveness. Update icon mapping and supporting sections to use the client's honesty, realistic scheduling, clean code-compliant workmanship, manufacturer-recommendation, urgency, and follow-through language.

**Step 3: Run the About-content test to verify GREEN**

Run: `npx playwright test tests/about-subpages.spec.ts`

Expected: PASS.

### Task 5: Verify design, quality, and preview

**Files:**
- Modify as needed from verification findings.

**Step 1: Run static checks and production build**

Run: `npm run lint`

Run: `npm run build`

Expected: both commands exit 0.

**Step 2: Run the complete browser suite**

Run: `npm test`

Expected: all tests pass.

**Step 3: Inspect all six pages at desktop and mobile widths**

Check headline hierarchy, themed color continuity, grouped-list density, contrast, image crops, mobile overflow, and CTA visibility.

**Step 4: Run the frontend pre-flight**

Confirm one accent per service page, consistent radii, zero visible em/en dashes, concise hero stacks, semantic lists, no invented metrics, accessible focus and contrast, reduced motion, and responsive collapse.
