# Industries page design

## Objective

Replace the `/industries` placeholder with a polished, responsive marketing page that preserves the current Data Power Source design system, incorporates all nine markets in `Industries-We-Serve.docx`, and strengthens the page for local and industry-specific search intent.

## Recommended direction: field guide

The page will read as a numbered field guide to the facilities DPS serves. A compact navy hero establishes the uptime promise, followed by a horizontal market index that lets visitors jump directly to any industry. Nine image-led chapters then alternate between left- and right-weighted layouts so the long page maintains rhythm without feeling like a repeated card grid.

The existing brand world remains the authority: Sora and Inter, navy technical grids, white and cool-neutral surfaces, electric blue structure, tight radii, thin rules, and restrained motion. Generated photography will share a cool, documentary grade with believable electrical infrastructure, no text, no logos, and no generic stock-photo posing.

## Page structure

1. Compact technical hero with breadcrumb, overline, H1, lead, and a nine-market count.
2. Sticky-friendly market index with anchor links and a concise capability statement.
3. Nine semantic industry chapters. Each chapter includes a number, keyword-rich H2, short market description, representative services, one original horizontal image, and a relevant link to projects or services.
4. Proof band connecting the markets to recognizable client/project evidence already present on the site.
5. Closing quote CTA using the established `CTABand` component.

## Content decisions

The document is the content baseline. Thin entries receive limited editorial expansion for clarity and search usefulness, without inventing certifications, clients, or performance claims. “Government & Municipal” remains one market because that is how the source document groups it. The existing site’s project evidence is used only where the project content already supports it.

SEO includes a descriptive title, meta description, canonical URL, Open Graph image, visible keyword-relevant headings, descriptive image filenames and alt text, breadcrumb JSON-LD, and an `ItemList` describing the nine visible markets. Structured data will mirror visible page content.

## Responsive and accessible behavior

Desktop chapters use a 12-column layout with controlled asymmetry. Mobile collapses each chapter to a single column, keeping the number and heading before the image and service list. Anchor targets receive scroll margin for the sticky header. All images use meaningful alt text and responsive Next.js image sizing. Links retain visible focus states, motion respects reduced-motion preferences, and heading order remains H1 → H2 → H3.

## Verification

Playwright will assert the route title, single H1, nine industry chapters, all source-market headings, meaningful image alternatives, real anchor targets, CTA visibility, and mobile horizontal-overflow safety. The final gate is lint, production build, targeted Playwright tests, desktop/mobile screenshots, and visual inspection.
