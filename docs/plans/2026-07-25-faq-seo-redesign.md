# FAQ SEO Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Give the FAQ page a photo-backed hero, stronger grouped visual hierarchy, and additional people-first commercial electrical questions that match documented DPS services.

**Architecture:** Reuse the shared `Hero` background-image mode and existing Radix accordion. Keep all FAQ copy in `content/faq.ts`, extend the group presentation inside the existing Client Component, and continue deriving FAQPage JSON-LD from the same flattened content array.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Radix Accordion, Phosphor Icons, Playwright.

---

### Task 1: Browser contracts

**Files:**
- Create: `tests/faq-seo-redesign.spec.ts`
- Modify: `tests/pass1.spec.ts`
- Modify: `tests/generated-images.spec.ts`

**Steps:**
1. Write a failing test requiring the field image inside the hero and no Page System module.
2. Write a failing test requiring five group icons and no System numbering.
3. Write a failing test requiring the eight new search-intent questions.
4. Write a failing test confirming every visible question appears in FAQPage JSON-LD.
5. Run the focused tests and confirm they fail for the expected missing UI and content.

### Task 2: Hero treatment

**Files:**
- Modify: `app/faq/page.tsx`
- Reuse: `public/images/generated/faq-field-planning.webp`

**Steps:**
1. Pass the existing image source and approved alt text into `Hero`.
2. Delete the separate field-image section and decorative caption.
3. Run the focused hero test and confirm it passes.

### Task 3: FAQ content expansion

**Files:**
- Modify: `content/faq.ts`

**Steps:**
1. Add category labels to each FAQ group.
2. Add the eight researched questions and plain-spoken answers.
3. Update the page metadata to cover commercial electrical, UPS, generator, switchgear, EV charging, and Metro Atlanta intent without keyword stuffing.
4. Confirm `allFaqItems` still derives the schema from the rendered source.

### Task 4: Group visual system

**Files:**
- Modify: `components/faq-accordion.tsx`

**Steps:**
1. Map the five groups to Phosphor icons.
2. Replace System numbering with icon, category label, and real question count.
3. Refine the accordion container, trigger typography, spacing, and mobile collapse.
4. Preserve keyboard and focus behavior.
5. Run the focused tests and confirm they pass.

### Task 5: Final verification

**Steps:**
1. Run ESLint.
2. Run the production build.
3. Run the complete Playwright suite.
4. Capture and inspect desktop and mobile FAQ screenshots.
5. Confirm the local preview returns HTTP 200 on port 3108.
