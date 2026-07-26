# About Page Refinement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refine the About page alignment, founder authority detail, safety wall, standards presentation, and proof metrics while reusing the homepage proof component.

**Architecture:** Extract the homepage proof band into a shared server component and use it on both Home and About. Keep the About page content-driven, enhance existing page sections with Phosphor icons and responsive CSS Grid, and avoid adding new client-side behavior.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Phosphor Icons, Playwright.

### Task 1: Specify the visual behavior

**Files:**
- Modify: `tests/about-page.spec.ts`

**Step 1: Write the failing tests**

Add checks that:

- the craftsmanship commitments are vertically centered against the copy column at desktop;
- the founder authority badge visibly overlaps the portrait boundary;
- the EMR card uses a light authority surface;
- Program Controls stretches to the bottom of its grid column and uses four check icons;
- the standards section renders four technical icon cards;
- the About proof section is produced by the same shared proof-band component as Home.

**Step 2: Run the focused test**

Run: `npx playwright test tests/about-page.spec.ts --reporter=dot --workers=2`

Expected: FAIL because the new test IDs, shared proof component, and visual relationships do not exist yet.

### Task 2: Extract and reuse the proof band

**Files:**
- Create: `components/proof-band.tsx`
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `content/about.ts`

**Step 1: Implement the shared component**

Move the homepage navy band, stacked heading, metric rail, and `StatCounter` usage into `ProofBand`. Accept `overline`, `title`, `body`, and item props.

**Step 2: Replace both page implementations**

Render the shared component on Home and About. Normalize About statistics to the same `value`, `suffix`, and `label` shape used by the homepage.

**Step 3: Run the focused test**

Run: `npx playwright test tests/about-page.spec.ts --reporter=dot --workers=2`

Expected: The proof reuse assertions pass while the remaining new visual tests still fail.

### Task 3: Refine craftsmanship, founder, and safety

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `components/safety-authority-wall.tsx`

**Step 1: Center the craftsmanship commitments**

Use desktop grid alignment and an inner flex container so the three commitments center vertically against the complete copy block.

**Step 2: Add the founder authority medallion**

Add a compact, square trust badge that overlaps the lower-left portrait boundary without obscuring Robert Kent's face or replacing the caption.

**Step 3: Recompose the safety wall**

Use a light neutral EMR card with navy typography and electric-blue structural accents. Make the left column a two-row grid, stretch Program Controls through the remaining height, and replace line markers with check icons.

**Step 4: Run the focused test**

Run: `npx playwright test tests/about-page.spec.ts --reporter=dot --workers=2`

Expected: Alignment, overlap, light EMR surface, and full-height control assertions pass.

### Task 4: Redesign the standards section

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `content/about.ts`

**Step 1: Add semantic icons**

Map each value to an allowed Phosphor icon that represents planning, reliability, communication, or established experience.

**Step 2: Build the technical standards rail**

Use an asymmetric four-card composition with a subtle technical-grid surface, large ordinal numerals, icon housings, and a visible connected baseline. Preserve the existing content and reading order.

**Step 3: Run the focused test**

Run: `npx playwright test tests/about-page.spec.ts --reporter=dot --workers=2`

Expected: PASS.

### Task 5: Verify and hand off

**Files:**
- Verify: `app/about/page.tsx`
- Verify: `components/proof-band.tsx`
- Verify: `components/safety-authority-wall.tsx`

**Step 1: Run code quality checks**

Run: `npm run lint && npm run build`

Expected: Both commands exit successfully.

**Step 2: Run the full browser suite**

Run: `npx playwright test --reporter=dot --workers=4`

Expected: All tests pass.

**Step 3: Inspect desktop and mobile**

Check `/about` at 1440px and 390px widths for alignment, text contrast, overlap behavior, and horizontal overflow.

**Step 4: Leave the About preview open**

Open the refined page at the most materially changed section and pause for user approval.
