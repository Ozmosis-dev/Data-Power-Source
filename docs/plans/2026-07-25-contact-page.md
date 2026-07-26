# Contact Page and Brand Blue Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Unify primary blue surfaces, add the IEC credential to the footer, and replace the contact stub with a complete, accessible project-intake page.

**Architecture:** Keep primary color behavior in the shared button and brand tokens, add the footer credential to the shared shell, and create an explicit `/contact` route backed by editable content, a client form component, and an environment-configured API route. Reuse the shared hero, section, button, breadcrumb, and schema patterns.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Phosphor Icons, Playwright.

### Task 1: Browser contracts

**Files:**

- Create: `tests/contact-page.spec.ts`
- Modify: `tests/pass1.spec.ts`
- Modify: `tests/ui-refinement.spec.ts`

**Steps:**

1. Add a failing computed-style test requiring the header, company-preview, footer, and dark-band quote actions to share one background color.
2. Add a failing footer test requiring the IEC badge at a restrained size.
3. Add failing contact-page tests for metadata, hero, form fields, verified NAP, breadcrumbs, and ContactPage schema.
4. Add failing tests for form success and error states using intercepted API responses.
5. Run the focused suite and confirm the expected failures.

### Task 2: Color and footer

**Files:**

- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `components/ui/button.tsx`
- Modify: `components/site-footer.tsx`

**Steps:**

1. Lock primary and dark CTA variants to `brand-600`.
2. Align the electrical discipline color with the canonical brand blue.
3. Add the small IEC badge to the footer proof row.
4. Run the color and footer tests.

### Task 3: Contact content and page

**Files:**

- Create: `content/contact.ts`
- Create: `app/contact/page.tsx`
- Create: `components/contact-form.tsx`
- Create: `app/api/contact/route.ts`
- Modify: `content/site.ts`

**Steps:**

1. Encode the approved contact copy and verified contact details.
2. Build the compact photo-backed hero and two-column intake layout.
3. Build the accessible form with required fields and complete submission states.
4. Add the configurable form-delivery route with validation and a honeypot.
5. Remove `contact` from the stub route registry.
6. Add BreadcrumbList and ContactPage JSON-LD.
7. Run the focused contact tests.

### Task 4: Responsive and production verification

**Steps:**

1. Run ESLint.
2. Run the production build.
3. Run the complete Playwright suite.
4. Inspect desktop and mobile screenshots.
5. Confirm the local preview returns HTTP 200 and leave it open for approval.
