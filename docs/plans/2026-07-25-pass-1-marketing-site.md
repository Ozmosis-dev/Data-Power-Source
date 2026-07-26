# Data Power Source Pass 1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a premium, responsive Pass 1 marketing site with the global shell, Home, Services Overview, FAQ, and scoped route stubs in `07-build gpt`.

**Architecture:** Use a statically rendered Next.js App Router application. Keep all editable page content in typed files under `content/`; compose pages from reusable server components, with small isolated client components only for header state, mobile navigation, reveal/count motion, and the FAQ accordion. Use Radix primitives through local shadcn-style wrappers for accessible disclosure/dialog behavior.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 3, Radix UI, Lucide, Playwright, ESLint.

## Approved visual direction

- Engineered editorial: large Sora display type, generous section rhythm, blueprint-like rules and numbered details.
- Light-first pages with deliberate navy feature bands and restrained electric-blue structure.
- Asymmetric service and proof layouts; tight radii and flat elevation.
- Real content first. Missing photography, logos, testimonials, hours, licenses, and wider service-radius confirmation render as explicit, tasteful placeholders.
- Motion stays under 200ms, is isolated to purposeful reveals/counting/header condensation, and respects reduced-motion preferences.

## Task 1: Scaffold and tokens

**Files:**
- Create: `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`
- Create: `tailwind.config.ts`, `app/globals.css`, `app/fonts.ts`
- Create: `public/brand/README.md`

**Steps:**
1. Pin the locally available Next/React/Radix/Lucide/Tailwind/Playwright versions.
2. Encode every color ramp, type token, radius, shadow, and max-width from `03-styleguide/design.md`.
3. Add the light/dark CSS variables verbatim and layer only implementation utilities below them.
4. Add asset instructions for `Asset_1DPS.svg`, `Asset_2DPS.svg`, and `Asset_3DPS.svg`.
5. Install dependencies and run `npm run lint` to verify the scaffold.

## Task 2: Write failing acceptance tests

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/pass1.spec.ts`

**Steps:**
1. Write tests for required page metadata, exact hero copy, the global phone/quote actions, route stubs, and footer NAP.
2. Write keyboard/click tests for the Services menu, mobile navigation, and FAQ accordion.
3. Write DOM tests for LocalBusiness, BreadcrumbList, and FAQPage JSON-LD.
4. Start the initial app shell and run `npm test`; confirm failures are due to missing requested features.

## Task 3: Content and schemas

**Files:**
- Create: `content/site.ts`, `content/home.ts`, `content/services.ts`, `content/faq.ts`
- Create: `lib/schema.ts`, `lib/utils.ts`

**Steps:**
1. Transcribe the four canonical copy files into typed, easily edited content modules.
2. Preserve bracketed facts as `pending` content items instead of inventing replacements.
3. Implement pure schema builders for LocalBusiness, BreadcrumbList, and FAQPage.
4. Re-run the relevant acceptance tests; expected failures should move to missing UI only.

## Task 4: Global shell and primitives

**Files:**
- Create: `app/layout.tsx`
- Create: `components/site-header.tsx`, `components/services-mega-menu.tsx`, `components/mobile-nav.tsx`
- Create: `components/site-footer.tsx`, `components/mobile-action-bar.tsx`
- Create: `components/ui/button.tsx`, `components/ui/accordion.tsx`, `components/ui/sheet.tsx`
- Create: `components/brand-mark.tsx`, `components/click-to-call.tsx`, `components/breadcrumb.tsx`

**Steps:**
1. Build the sticky header with scroll condensation and desktop Services navigation.
2. Build the mobile sheet with an expandable Services group and a persistent call/quote bar.
3. Build the navy footer with exact NAP, proof line, and pending-state blocks.
4. Add the site-wide LocalBusiness JSON-LD.
5. Run header, mobile-nav, footer, and schema tests until green.

## Task 5: Shared page components

**Files:**
- Create: `components/section-band.tsx`, `components/hero.tsx`, `components/service-card.tsx`
- Create: `components/pillar-split.tsx`, `components/stat-counter.tsx`, `components/process-steps.tsx`
- Create: `components/project-card.tsx`, `components/cta-band.tsx`, `components/faq-accordion.tsx`
- Create: `components/reveal.tsx`, `components/placeholder-media.tsx`

**Steps:**
1. Implement the light/navy layout rhythm primitives and responsive hero.
2. Implement reusable asymmetric cards and two-pillar composition.
3. Implement reduced-motion-safe reveals and stats.
4. Implement keyboard-accessible accordion groups.
5. Run interaction tests after each client component is introduced.

## Task 6: Page routes

**Files:**
- Create: `app/page.tsx`
- Create: `app/services/page.tsx`
- Create: `app/faq/page.tsx`
- Create: `app/[stub]/page.tsx`
- Create: `app/contact/page.tsx`, `app/privacy/page.tsx`
- Create: service detail stub routes under `app/services/`

**Steps:**
1. Compose Home in the exact nine-section order from `layouts.md`.
2. Compose Services in the exact six-section order.
3. Compose FAQ with the five requested groups, exact source answers, BreadcrumbList, and FAQPage schema.
4. Add polished coming-soon stubs only for linked, unbuilt routes.
5. Run all acceptance tests and fix any behavior or content failures.

## Task 7: Screenshots before polish

**Files:**
- Create: `artifacts/screenshots/home-desktop.png`, `home-mobile.png`
- Create: `artifacts/screenshots/services-desktop.png`, `services-mobile.png`
- Create: `artifacts/screenshots/faq-desktop.png`, `faq-mobile.png`

**Steps:**
1. Start the production-like local server.
2. Capture full-page desktop (1440px) and mobile (390px) screenshots for all three real pages.
3. Present the six screenshots before modifying visual polish.

## Task 8: Polish and final verification

**Steps:**
1. Review screenshots for hierarchy, density, cropping, responsive stacking, and sticky-control overlap.
2. Apply a focused polish pass without changing canonical copy.
3. Run `npm test`, `npm run lint`, and `npm run build`.
4. Inspect all six final screenshots and verify there are no horizontal overflows or broken placeholders.
5. Reconcile the definition-of-done checklist and report only evidence-backed completion or remaining gaps.
