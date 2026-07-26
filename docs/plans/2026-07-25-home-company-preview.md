# Home Company Preview Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the redundant Home service introduction with a company preview, add a reduced-motion-safe rotating type banner, strengthen hero proof readability, and refine the service bento spacing and hover treatment.

**Architecture:** Keep the Home page server-rendered and isolate the timed typing behavior in one Client Component. Store editable company copy and rotating phrases in `content/home.ts`; reuse the existing design tokens, icon family, buttons, and reveal component.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Phosphor Icons, Playwright.

---

### Task 1: Browser contracts

**Files:**
- Create: `tests/home-company-preview.spec.ts`
- Modify: `tests/ui-refinement.spec.ts`

**Steps:**
1. Write failing checks for the company preview, IEC logo, About CTA, type banner, service gutters/glow, foregrounded proof rail, and Why DPS CTA.
2. Run the focused checks and confirm they fail because the new UI is absent.

### Task 2: Company preview content and credential asset

**Files:**
- Modify: `content/home.ts`
- Modify: `app/page.tsx`
- Add: `public/brand/iec-atlanta-georgia.png`

**Steps:**
1. Add editable company-preview copy and the four rotating phrases to `content/home.ts`.
2. Replace the Home `PillarSplit` section with the editorial company preview.
3. Copy the supplied IEC mark into the local brand directory and render it with intrinsic dimensions.
4. Add the About CTA to the Why DPS header.

### Task 3: Rotating type banner

**Files:**
- Create: `components/rotating-type-banner.tsx`
- Modify: `app/page.tsx`

**Steps:**
1. Implement the visual typing state machine with timeout cleanup.
2. Add a static accessible phrase list.
3. Detect `prefers-reduced-motion` and render a stable first phrase without cycling.
4. Place the banner immediately after the company preview.

### Task 4: Service bento and proof rail

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/service-card.tsx`
- Modify: `components/technical-grid.tsx`

**Steps:**
1. Replace the one-pixel bento dividers with responsive 20px gutters and restore card radii.
2. Add a discipline-color tinted hover halo to each service card.
3. Put the proof rail in a foreground stacking context, increase type contrast, and remove hover animations.
4. Run the focused browser checks and confirm they pass.

### Task 5: Final verification

**Files:**
- Inspect: Home at desktop and mobile widths.

**Steps:**
1. Run ESLint.
2. Run the production build.
3. Run the full Playwright suite.
4. Capture and inspect desktop and mobile screenshots.
5. Leave the local preview running for approval.
