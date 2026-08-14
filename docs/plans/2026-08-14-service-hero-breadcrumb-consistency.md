# Service Hero and Breadcrumb Consistency Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Bring all four service-detail heroes into the site's established title and height hierarchy, and remove visible breadcrumb navigation from every interior page without removing breadcrumb structured data.

**Architecture:** Keep the bespoke service-detail hero and its per-service color, image, service mark, and actions. Replace its viewport-height sizing with content-driven spacing and align its H1 scale with the Projects, Industries, and shared Hero patterns. Remove the reusable breadcrumb rendering path and one-off breadcrumb instances, while leaving each route's `breadcrumbSchema` JSON-LD untouched.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 3, Playwright.

### Task 1: Define the consistency contract

**Files:**
- Create: `tests/interior-hero-consistency.spec.ts`
- Modify: `tests/about-subpages.spec.ts`

**Step 1: Write the failing test**

Add Playwright coverage that visits all four service routes at desktop and mobile sizes, asserts the hero is content-driven rather than viewport-height, and checks the H1 falls within the established interior-page scale. Add representative and route-family assertions that no `aria-label="Breadcrumb"` navigation is rendered while BreadcrumbList JSON-LD is still present.

**Step 2: Run test to verify it fails**

Run: `npx playwright test tests/interior-hero-consistency.spec.ts tests/about-subpages.spec.ts --project=chromium`

Expected: FAIL because visible breadcrumb navigation still renders and the service hero/H1 measurements use the old full-height/small-title treatment.

### Task 2: Normalize the four service-detail heroes

**Files:**
- Modify: `components/service-detail-page.tsx`
- Test: `tests/interior-hero-consistency.spec.ts`

**Step 1: Write minimal implementation**

Remove `min-h-[calc(100dvh-72px)]` from the hero content grid, use responsive content-driven vertical padding, reduce the desktop image minimum height, and change the H1 scale to the same 44px mobile, 59px tablet, and 72px desktop hierarchy used on Projects and Industries.

**Step 2: Run the focused hero tests**

Run: `npx playwright test tests/interior-hero-consistency.spec.ts --project=chromium`

Expected: The service hero size and title hierarchy assertions pass; breadcrumb assertions still fail until Task 3.

### Task 3: Remove visible breadcrumb UI site-wide

**Files:**
- Modify: `components/hero.tsx`
- Modify: `components/service-detail-page.tsx`
- Modify: `components/project-detail-page.tsx`
- Modify: `app/services/page.tsx`
- Modify: `app/projects/page.tsx`
- Modify: `app/industries/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/about/safety/page.tsx`
- Modify: `app/about/values/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/faq/page.tsx`
- Modify: `app/privacy/page.tsx`
- Modify: `app/globals.css`
- Test: `tests/about-subpages.spec.ts`
- Test: `tests/interior-hero-consistency.spec.ts`

**Step 1: Write minimal implementation**

Delete visible `<Breadcrumb>` imports, props, and markup. Replace spacing that depended on breadcrumb presence with the normal hero rhythm. Keep every `breadcrumbSchema(...)` declaration and `BreadcrumbList` JSON-LD script.

**Step 2: Run the focused tests**

Run: `npx playwright test tests/interior-hero-consistency.spec.ts tests/about-subpages.spec.ts --project=chromium`

Expected: PASS.

### Task 4: Verify the whole site and preview

**Files:**
- Verify all modified files and the existing Industries work without altering unrelated changes.

**Step 1: Run static checks**

Run: `npm run lint`

Expected: PASS.

**Step 2: Run the production build**

Run: `npm run build`

Expected: PASS.

**Step 3: Run the complete browser suite**

Run: `npx playwright test --project=chromium`

Expected: PASS.

**Step 4: Visually inspect all four service routes**

Check desktop and 390px mobile screenshots for title wrapping, hero height, image balance, header clearance, and absence of visible breadcrumbs. Confirm the in-app preview is still available at `http://127.0.0.1:3108`.
