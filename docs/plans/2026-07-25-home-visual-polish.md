# Home Visual Polish Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:test-driven-development to implement this plan task-by-task.

**Goal:** Refine the Home page hero, service bento, industries, owner-led proof, organization logo wall, and testimonial while preserving the DPS brand, copy, routes, and conversion path.

**Architecture:** Keep the existing server-rendered Next.js page and shared components. Add one reusable discipline strip component, one local owner-team image, and a local logo data map. Use `next/image` for every raster and logo asset, existing brand tokens for surfaces, Phosphor icons for industries, and Playwright for behavior and responsive-layout checks.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Phosphor Icons, Playwright, built-in image generation.

### Task 1: Desired Home behavior

**Files:**
- Create: `tests/home-visual-polish.spec.ts`
- Modify: `tests/pass2-visual.spec.ts`
- Modify: `tests/generated-images.spec.ts`

1. Write browser checks for a full-background Home hero with no system matrix.
2. Check that the discipline strip is inside `main`, directly follows the hero, and is absent from the footer.
3. Check four service callouts per card and a gapless, equal-height bento composition.
4. Check six industry icons and large low-contrast numerals.
5. Check the owner-team image, six grayscale organization marks, and clearly pending testimonial copy.
6. Run the focused tests and confirm they fail for the missing behavior.

### Task 2: Local visual assets

**Files:**
- Create: `public/images/generated/owner-led-team.webp`
- Create: `public/brand/clients/*`

1. Generate one authentic owner-led electrical team image with correct PPE, a commercial electrical setting, no logos, and no rendered text.
2. Source the six requested organization marks from official or organization-controlled sources where available.
3. Convert or optimize assets for the web without altering their proportions.

### Task 3: Hero and discipline strip

**Files:**
- Modify: `components/hero.tsx`
- Create: `components/discipline-strip.tsx`
- Modify: `components/site-footer.tsx`
- Modify: `app/page.tsx`

1. Render the switchgear image as an absolute, faded Home hero background.
2. Remove the visual system overlay and its decorative metadata from the image-backed hero.
3. Extract the discipline strip from the footer and place it directly below the Home hero.
4. Run the focused tests and confirm the hero and strip checks pass.

### Task 4: Service bento and industries

**Files:**
- Modify: `content/home.ts`
- Modify: `components/pillar-split.tsx`
- Modify: `components/service-card.tsx`
- Modify: `app/page.tsx`

1. Add one accurate fourth callout to each Home service and core pillar.
2. Build a contained, gapless 7/5 then 5/7 bento with matched row heights.
3. Add Phosphor industry icons and large faint numerals that become more visible on hover.
4. Run the focused tests and confirm the service and industries checks pass.

### Task 5: Owner-led proof and social proof

**Files:**
- Modify: `app/page.tsx`

1. Layer the generated owner-team image under a solid navy scrim in the owner-led proof tile.
2. Replace text logo placeholders with six local organization marks and a consistent grayscale treatment.
3. Add a designed testimonial placeholder that is explicitly pending client approval and makes no factual claim.
4. Run the focused tests and confirm the proof checks pass.

### Task 6: Verification and visual polish

1. Run lint, production build, and the full Playwright suite.
2. Capture Home screenshots at desktop and mobile sizes.
3. Inspect hero legibility, bento alignment, image crops, logo normalization, mobile stacking, and footer rhythm.
4. Fix any visual regressions and repeat the checks.
5. Leave the local preview running for client approval.
