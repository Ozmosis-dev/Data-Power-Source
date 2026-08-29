# Image-led Section Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:test-driven-development to implement this plan task-by-task.

**Goal:** Replace three visually empty or generic sections with approved, image-led compositions that remain readable, responsive, keyboard accessible, and consistent with the Data Power Source brand.

**Architecture:** Keep the existing Next.js App Router, content model, Tailwind utilities, and shared page components. Add asset metadata only where the homepage needs a stable image-to-industry mapping; enhance the existing service proof and homepage sections in place without introducing new dependencies.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 3, Next Image, Playwright.

## Design direction

- Commercial electrical proof: preserve the blue proof surface and place copy in a seven-column editorial text zone beside a five-column switchboard image. Use a subtle gradient and framing edge so the image feels integrated rather than pasted into the section.
- Owner-led expertise: use the approved Robert L. Kent portrait as the full card canvas. Layer a left-to-right navy gradient and bottom vignette over the image, keeping text in the lower-left safe area and the founder visible to the right.
- Industries: replace the equal white matrix with an asymmetric image mosaic. The first row uses a 7/5 split, followed by four balanced supporting cards. Every card uses a real industry image, a restrained navy gradient, a quiet index, and an accessible hover/focus animation that scales the image, lifts the title, and reveals an exploration cue. Reduced-motion users receive the static state.

## Task 1: Lock the desired visual behaviors

**Files:**
- Modify: `tests/home-visual-polish.spec.ts`
- Modify: `tests/service-detail-pages.spec.ts`

1. Add assertions for six meaningful industry images, an asymmetric desktop span, and the image transform on hover.
2. Add assertions for the founder portrait and its gradient overlay inside the owner-led card.
3. Add assertions for a visible proof image on the commercial electrical page.
4. Run the targeted Playwright tests and verify they fail because the new UI is absent.

## Task 2: Implement the image-led sections

**Files:**
- Modify: `content/home.ts`
- Modify: `app/page.tsx`
- Modify: `components/service-detail-page.tsx`

1. Replace the homepage industry strings with image metadata and keep all visible labels unchanged.
2. Render the asymmetric industry mosaic with `next/image`, semantic labels, readable overlays, hover/focus states, and mobile-safe sizing.
3. Place the approved founder portrait and directional gradient inside the owner-led card.
4. Add the commercial electrical proof image while preserving metric layouts on other service pages.
5. Run the targeted tests and confirm they pass.

## Task 3: Verify the complete result

**Files:**
- No production file changes expected.

1. Run lint and the relevant browser regression suites.
2. Start the local Next.js server.
3. Review the homepage and commercial electrical page at desktop and mobile widths, including hover and keyboard focus.
4. Capture screenshots for visual comparison and open the local homepage in the browser.
