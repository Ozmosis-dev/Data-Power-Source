# Project Gallery and Detail Pages Implementation Plan

**Goal:** Replace the placeholder Projects route with a complete nine-project case-study library sourced from the existing Data Power Source website, using every project photograph and all verified project facts.

**Architecture:** Store the nine case studies in one typed content module. Render an editorial gallery at `/projects` and statically generate detail pages at `/projects/[slug]`. Keep images local under `public/images/projects`, share a reusable detail-page renderer, and expose valid metadata, breadcrumbs, article schema, and sitemap entries for every route.

**Source:** `https://datapowersource.com/category/projects/` and the nine linked project articles. Personal contact details and legacy map embeds are intentionally excluded.

## Design direction

- Visual variance: 7/10. Use a wide featured project followed by an asymmetric two-column portfolio rhythm rather than nine identical cards.
- Motion: 4/10. Reuse the restrained `Reveal` motion and image-scale hover behavior already established on the site.
- Density: 5/10. Keep project facts and scope easy to scan, but let the original photographs carry the page.
- Gallery hero: navy editorial introduction with a real project photograph and a concise verified count of nine projects.
- Detail hero: client/market context, project title, location, lead photograph, and a compact facts rail.
- Detail narrative: operational challenge, delivered systems, verified result, full image gallery, related-project navigation, and a contact CTA.
- Responsive behavior: asymmetric desktop layouts collapse into a single readable column; no horizontal scrolling; all facts and images remain accessible.

## Content model

Each project includes:

- title, short title, slug, client, location, market, and services
- optional value and duration only when stated by the source
- SEO description and gallery summary
- source-faithful overview paragraphs, structured scope items, and outcome
- a complete ordered image set with descriptive alternative text

## Implementation sequence

1. Add failing browser tests for the gallery, all nine project routes, detail-page facts, image counts, schema, links, and 390px overflow.
2. Download all 48 original project photographs and place them in project-specific public directories.
3. Create `content/projects.ts` as the single source of truth for gallery, detail, metadata, and sitemap data.
4. Build the editorial project card, portfolio gallery page, image gallery, project facts, and reusable detail-page renderer.
5. Add static params, per-project metadata, breadcrumb/article schema, sitemap routes, and not-found behavior.
6. Link the three homepage project cards to their real case studies and replace representative-image language with project-specific descriptions.
7. Remove the Projects placeholder while leaving the Industries placeholder intact.
8. Verify focused browser tests, full lint, production build, desktop screenshots, mobile screenshots, image rendering, keyboard focus, and no horizontal overflow.

## Primary files

- Add: `content/projects.ts`
- Add: `components/project-gallery-card.tsx`
- Add: `components/project-detail-page.tsx`
- Add: `app/projects/page.tsx`
- Add: `app/projects/[slug]/page.tsx`
- Add: `tests/projects.spec.ts`
- Modify: `components/project-card.tsx`
- Modify: `content/home.ts`
- Modify: `content/site.ts`
- Modify: `app/sitemap.ts`
- Modify: `lib/schema.ts`
- Modify: `tests/pass1.spec.ts`

## Verification targets

- `/projects` lists exactly nine linked case studies.
- Every case-study route returns successfully and uses a unique title and description.
- All source-stated values, durations, locations, equipment sizes, and continuity outcomes are present.
- Every one of the 48 migrated images appears exactly once in its project detail gallery.
- No project claims a value or duration that the source does not provide.
- Breadcrumb and article structured data are present on every detail page.
- The gallery and all detail pages have no horizontal overflow at 390px.
- No personal contact information from legacy project PDFs or map embeds is published.
