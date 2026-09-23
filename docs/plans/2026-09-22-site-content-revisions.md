# Site Content Revisions Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update the approved Landing, About, Projects, Safety, and FAQ copy while preventing stale or contradictory claims from remaining in rendered pages.

**Architecture:** Keep page copy in the existing `content/` modules and preserve established components and page layouts. Add one focused Playwright regression suite that validates the rendered copy, metadata, and removal of superseded claims, then update existing page-specific assertions to match the approved text.

**Tech Stack:** Next.js 16, React 19, TypeScript, Playwright, ESLint

### Task 1: Add failing content revision coverage

**Files:**
- Create: `tests/content-revisions.spec.ts`

**Step 1: Write the failing tests**

Add rendered-page assertions for the Landing region/year/response copy, About year/response copy, anonymized project names, revised Safety descriptions, and revised FAQ entries.

**Step 2: Run the focused test to verify it fails**

Run: `npx playwright test tests/content-revisions.spec.ts`

Expected: FAIL because the site still renders the prior content.

### Task 2: Update Landing, About, and shared response-time facts

**Files:**
- Modify: `content/home.ts`
- Modify: `content/about.ts`
- Modify: `content/site.ts`
- Modify: `content/contact.ts`
- Modify: `components/mobile-nav.tsx`
- Modify: `components/quote-dialog.tsx`
- Modify: `app/about/opengraph-image.tsx`
- Modify: existing affected Playwright specifications

**Step 1: Implement the approved claims**

Use “Metro Atlanta & the SE US” throughout landing-page-specific copy, replace 2001 with 1992 on Landing and About, and replace every site-facing two-hour emergency-response claim with four hours.

**Step 2: Keep test expectations synchronized**

Update existing assertions that intentionally verify the corrected copy.

### Task 3: Anonymize the two requested projects

**Files:**
- Modify: `content/projects.ts`
- Modify: `content/home.ts`
- Modify: `tests/projects.spec.ts`

**Step 1: Replace public-facing client references**

Use “Local Assisted Living Facility” and “Local School District Data Center” throughout the affected project records and landing-page project card while retaining existing routes for link stability.

**Step 2: Update project expectations**

Assert the new headings and facts and verify the prior client names no longer render on their project pages.

### Task 4: Revise Safety and FAQ content

**Files:**
- Modify: `content/about-safety.ts`
- Modify: `content/faq.ts`
- Modify: `tests/about-subpages.spec.ts`
- Modify: `tests/faq-seo-redesign.spec.ts`

**Step 1: Apply the approved Safety descriptions**

Replace the “Prepared before the work” and “Ready to respond” descriptions with the supplied training and certification language.

**Step 2: Apply the FAQ revisions**

Update generator sizing, replace the UPS/generator service answer, and add the infrared-thermography preventive-maintenance entry without retaining contradictory maintenance claims.

### Task 5: Verify the implementation

**Files:**
- Verify all modified files

**Step 1: Rebuild the application**

Run: `npm run build`

Expected: successful production build.

**Step 2: Run focused regression tests**

Run the new content revision test and affected Landing, About, Projects, Safety, FAQ, and social-image tests.

Expected: PASS.

**Step 3: Run lint and stale-copy searches**

Run: `npm run lint`

Expected: PASS with no errors.

Search production source for superseded year, response-time, project-name, Safety, and FAQ wording and confirm no unintended public-facing matches remain.
