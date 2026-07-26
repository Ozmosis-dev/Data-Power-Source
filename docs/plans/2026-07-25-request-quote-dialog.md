# Request a Quote Dialog Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add one branded, accessible Request a Quote dialog and connect every site-wide quote CTA to it.

**Architecture:** A client-side Radix Dialog provider wraps the shared shell. Reusable quote triggers retain `/contact` as a progressive-enhancement fallback. A compact quote form posts to the existing `/api/contact` route and renders loading, success, and error states.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Radix Dialog, Phosphor icons, Playwright.

### Task 1: Add failing global interaction tests

**Files:**
- Create: `tests/quote-dialog.spec.ts`

**Step 1: Write the failing tests**

Cover:

- Header CTA opens a dialog without changing the URL.
- Dialog has a clear title, DPS logo, photo, direct-call action, and required intake controls.
- Escape closes the dialog and returns focus to the trigger.
- Every exact "Request a quote" link on Home has `data-quote-trigger`.
- Mobile trigger opens a full-height, scrollable layout.
- Successful submission renders confirmation.
- Failed delivery renders the direct-call fallback.

**Step 2: Run the focused file**

Run: `npx playwright test tests/quote-dialog.spec.ts`

Expected: FAIL because the quote dialog and trigger attributes do not exist.

### Task 2: Build the dialog provider and quote form

**Files:**
- Create: `components/quote-dialog.tsx`
- Create: `components/quote-form.tsx`
- Modify: `app/layout.tsx`

**Step 1: Implement the minimal provider**

Use `@radix-ui/react-dialog` with a controlled visual shell, accessible title and description, overlay, close action, focus management, and reduced-motion-safe transitions.

**Step 2: Implement the compact form**

Post the normalized payload to `/api/contact`. Render loading, success, and error states. Use unique field IDs prefixed with `quote-`.

**Step 3: Run focused tests**

Run: `npx playwright test tests/quote-dialog.spec.ts`

Expected: trigger tests still fail until CTA wiring is complete.

### Task 3: Wire every quote CTA

**Files:**
- Modify: `components/site-header.tsx`
- Modify: `components/hero.tsx`
- Modify: `components/cta-band.tsx`
- Modify: `components/site-footer.tsx`
- Modify: `components/mobile-action-bar.tsx`
- Modify: `components/mobile-nav.tsx`

**Step 1: Replace quote links**

Use the reusable `QuoteTrigger` component while retaining `href="/contact"`.

**Step 2: Run focused tests**

Run: `npx playwright test tests/quote-dialog.spec.ts`

Expected: PASS.

### Task 4: Preserve existing contracts

**Files:**
- Modify only if necessary: existing Playwright tests

**Step 1: Run interaction regression tests**

Run: `npx playwright test tests/pass1.spec.ts tests/ui-refinement.spec.ts tests/contact-page.spec.ts`

Expected: PASS. Existing href and color contracts remain valid.

**Step 2: Correct only stale expectations**

Do not weaken tests. Preserve the `/contact` fallback and canonical cobalt assertions.

### Task 5: Visual review and final verification

**Files:**
- Create: `docs/screenshots/quote-dialog-desktop.png`
- Create: `docs/screenshots/quote-dialog-mobile.png`

**Step 1: Inspect desktop and mobile**

Verify dialog fit, form scrolling, CTA visibility, close-button placement, contrast, and no clipped content.

**Step 2: Run full checks**

Run:

- `npm run lint`
- `npm run build`
- `npx playwright test`

Expected: all commands exit successfully.

**Step 3: Leave preview open**

Open the Home page, activate the header quote trigger, and leave the dialog visible for approval.
