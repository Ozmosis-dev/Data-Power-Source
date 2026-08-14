# Industries Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a polished `/industries` page with nine image-led industry sections, source-faithful copy, and complete page-level SEO.

**Architecture:** Add a typed content module for market copy and image metadata, a reusable industry chapter component, and a dedicated App Router page. Preserve the shared header, footer, CTA, typography, and layout primitives. Replace the placeholder route through static-route precedence and remove its stale content entry.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 3, Next Image, Phosphor Icons, Playwright.

### Task 1: Express page requirements in Playwright

**Files:**
- Create: `tests/industries-page.spec.ts`

**Step 1: Write the failing tests**

Assert the dedicated page metadata and H1, all nine industry chapter headings, nine meaningful images, in-page market navigation, quote CTA, and mobile overflow safety.

**Step 2: Run the test to verify it fails**

Run: `npx playwright test tests/industries-page.spec.ts --project=chromium`

Expected: FAIL because `/industries` still renders “Coming in the next pass.”

### Task 2: Generate and prepare market imagery

**Files:**
- Create: `public/images/industries/commercial.webp`
- Create: `public/images/industries/industrial-manufacturing.webp`
- Create: `public/images/industries/healthcare.webp`
- Create: `public/images/industries/data-centers-mission-critical.webp`
- Create: `public/images/industries/government-municipal.webp`
- Create: `public/images/industries/education.webp`
- Create: `public/images/industries/military.webp`
- Create: `public/images/industries/telecommunications.webp`
- Create: `public/images/industries/broadcast-media.webp`

**Step 1: Generate one horizontal image per market**

Use one built-in image generation call per industry. Lock a cool documentary grade, believable electrical scope, safe human depiction, no brands, no text, no watermarks, and useful crop space.

**Step 2: Inspect and normalize assets**

Review each output, move it into the project, convert to optimized WebP when needed, and verify dimensions and file size.

### Task 3: Add the content model and chapter component

**Files:**
- Create: `content/industries.ts`
- Create: `components/industry-chapter.tsx`

**Step 1: Implement the typed content model**

Include metadata, hero copy, market IDs, descriptions, representative services, image metadata, and relevant internal links.

**Step 2: Implement the semantic chapter layout**

Render alternating image/text compositions with a numbered marker, H2, service list, and internal CTA while keeping one mobile reading order.

### Task 4: Build the dedicated page and SEO

**Files:**
- Create: `app/industries/page.tsx`
- Modify: `content/site.ts`
- Modify: `app/globals.css`

**Step 1: Assemble the page**

Add the hero, anchor index, nine chapters, proof band, and shared CTA.

**Step 2: Add discoverability signals**

Export descriptive metadata, canonical and Open Graph properties, breadcrumb JSON-LD, and an `ItemList` that exactly reflects visible markets.

**Step 3: Remove placeholder content**

Delete the stale industries stub entry without changing unrelated routes.

### Task 5: Verify and refine

**Files:**
- Modify as required by verification findings.

**Step 1: Run targeted tests**

Run: `npx playwright test tests/industries-page.spec.ts --project=chromium`

Expected: PASS.

**Step 2: Run static verification**

Run: `npm run lint`

Expected: exit 0 with no lint errors.

Run: `npm run build`

Expected: exit 0 and `/industries` listed in the generated routes.

**Step 3: Perform browser QA**

Capture desktop and mobile screenshots, inspect hierarchy, image crops, anchor behavior, focus states, text wrapping, and horizontal overflow. Revise and rerun checks if defects are found.

**Step 4: Request code review**

Review the final diff against the source document and design requirements. Fix all critical and important findings before handoff.
