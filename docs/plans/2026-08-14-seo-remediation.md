# SEO Remediation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the new Data Power Source site safe to migrate from WordPress and give every indexable page a complete, consistent, verifiable technical and on-page SEO implementation.

**Architecture:** Centralize URL, metadata, and entity identity in small shared helpers; keep route-specific copy in the existing typed content modules; generate crawl files from the same canonical route inventory; and protect the behavior with Playwright contracts. Treat legacy URL preservation, legal copy, factual trust claims, and post-deployment Core Web Vitals as launch gates rather than optional polish.

**Tech Stack:** Next.js 16 App Router, TypeScript, React 19, Playwright, JSON-LD, Vercel.

**Audit source:** `docs/seo/2026-08-14-technical-on-page-seo-audit.md`

## Inputs required before production launch

Implementation can begin without these inputs, but the site must not be declared launch-ready until they are resolved:

- Client/counsel-approved Privacy Policy and Terms of Use.
- Confirmed public business hours.
- Confirmed license/credential display language and numbers, or approval to omit them.
- Confirmed official social/profile URLs for `sameAs`.
- Confirmed location coordinates if they will be published in LocalBusiness schema.
- Confirmation that EMR, 24/7 service, two-hour response, NFPA 70E, First Aid/CPR, IEC, and “since 2001” claims remain current.
- Approval or replacement for generated/representative team imagery and the pending testimonial.
- Google Search Console access/export for legacy URL clicks, links, and index coverage.

## Task 1: Establish automated SEO contracts

**Files:**

- Create: `tests/seo-foundation.spec.ts`
- Create: `tests/seo-migration.spec.ts`
- Modify: `package.json`

**Step 1: Write the rendered-page metadata test**

In `tests/seo-foundation.spec.ts`, fetch `/sitemap.xml`, extract every `<loc>`, visit each pathname, and assert:

```ts
import { expect, test } from "playwright/test";

test("every sitemap page exposes the indexable SEO contract", async ({ page, request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();
  const paths = [...xml.matchAll(/<loc>https:\/\/datapowersource\.com([^<]*)<\/loc>/g)]
    .map((match) => match[1] || "/");

  expect(paths).not.toHaveLength(0);
  for (const path of paths) {
    const navigation = await page.goto(path);
    expect(navigation?.status(), path).toBe(200);
    expect(await page.title(), path).not.toBe("");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S/);
    const canonical = new URL(path, "https://datapowersource.com").toString();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main#main-content")).toHaveCount(1);
  }
});
```

Also collect titles and descriptions into arrays and assert uniqueness. Do not enforce an arbitrary 60/160-character failure threshold; Google truncates by display width, and editorial review should decide whether a longer value is justified.

**Step 2: Write crawl-file and JSON-LD tests**

Add tests that assert:

- `/robots.txt` returns 200 and contains `Sitemap: https://datapowersource.com/sitemap.xml`.
- Every sitemap URL is absolute, HTTPS, apex-hosted, slashless except `/`, unique, and canonical.
- Sitemap entries contain no `priority` or `changefreq`.
- `lastmod` is absent unless it comes from an explicit page-level source date.
- Every JSON-LD script parses.
- The root page includes nodes with IDs `https://datapowersource.com/#organization` and `https://datapowersource.com/#website` after Task 6.

**Step 3: Write the legacy migration test**

In `tests/seo-migration.spec.ts`, encode the approved redirect matrix from Task 2. Request each slashless legacy path with redirects disabled, assert a permanent 308 and exact `Location`, then follow the redirect and assert a final 200 canonical page.

```ts
const redirects = [
  ["/about-us", "/about"],
  ["/about/contact-information", "/contact"],
  ["/contact-us", "/contact"],
  ["/projects-old", "/projects"],
] as const;
```

Test the trailing-slash form separately and assert that it cannot terminate at 404. Add explicit 410 tests for any URL approved for removal.

**Step 4: Add focused scripts**

Add:

```json
"test:seo": "playwright test tests/seo-foundation.spec.ts tests/seo-migration.spec.ts"
```

**Step 5: Build and run the tests to establish the baseline failures**

Run:

```bash
npm run build
npm run test:seo
```

Expected: failures for missing canonicals, missing robots, and broken/incomplete redirects.

**Step 6: Commit the test baseline**

```bash
git add package.json tests/seo-foundation.spec.ts tests/seo-migration.spec.ts
git commit -m "test: define SEO and migration contracts"
```

## Task 2: Repair and complete the WordPress migration map

**Files:**

- Modify: `next.config.ts:4-32`
- Modify: `tests/seo-migration.spec.ts`
- Create: `docs/seo/legacy-url-map.csv`

**Step 1: Record the complete live inventory**

Create `docs/seo/legacy-url-map.csv` with columns:

```text
legacy_url,legacy_type,action,target,status,reason,gsc_clicks,gsc_links,approved_by
```

Include all 26 URLs from the audit. Mark the root, `/services/`, and nine project URLs as retained/equivalent. Record every redirect and every intentional 410.

**Step 2: Resolve the ambiguous utility/archive URLs**

Use Search Console clicks and backlinks plus the live page content to approve one of these actions:

- `/contact-us/contact-us-handler/`: `/contact` or 410.
- `/site-map/`: retain a small HTML sitemap or 410.
- `/author/admin/` and `/author/dpsadmin/`: `/projects` only if the destination is materially equivalent; otherwise 410.

Do not redirect unrelated URLs to the home page solely to avoid a 404; Google may treat an irrelevant redirect as a soft 404.

**Step 3: Fix redirect source syntax**

With `trailingSlash: false`, use slashless sources:

```ts
redirects: async () => [
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/about/contact-information", destination: "/contact", permanent: true },
  { source: "/contact-us", destination: "/contact", permanent: true },
  {
    source: "/services/electrical-services",
    destination: "/services/commercial-industrial-electrical",
    permanent: true,
  },
  {
    source: "/services/connectivity-services",
    destination: "/services/low-voltage-connectivity",
    permanent: true,
  },
  {
    source: "/services/mission-critical-services",
    destination: "/services/mission-critical-power",
    permanent: true,
  },
  {
    source: "/services/engineering-and-design",
    destination: "/services/engineering-design-build",
    permanent: true,
  },
  { source: "/category/projects", destination: "/projects", permanent: true },
  { source: "/projects-old", destination: "/projects", permanent: true },
  { source: "/privacy-policy", destination: "/privacy", permanent: true },
],
```

Add the approved handler/site-map/author decisions. Preserve `/terms-of-use` as a page in Task 3.

**Step 4: Run the migration tests**

Run:

```bash
npm run build
npx playwright test tests/seo-migration.spec.ts
```

Expected: every retained legacy URL is 200; every moved URL reaches its exact destination; approved removed URLs return 410; none terminate at 404.

**Step 5: Commit**

```bash
git add next.config.ts tests/seo-migration.spec.ts docs/seo/legacy-url-map.csv
git commit -m "fix: preserve legacy WordPress URLs"
```

## Task 3: Remove indexable legal and client-pending placeholders

**Files:**

- Modify: `app/privacy/page.tsx`
- Create: `app/terms-of-use/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `components/site-footer.tsx:119-155`
- Modify: `app/page.tsx:280-370`
- Modify: `content/about.ts:119-123`
- Modify: `content/faq.ts:165-184`
- Modify: `content/site.ts:1-76`
- Create: `tests/legal-and-trust-content.spec.ts`

**Step 1: Write tests that prohibit placeholder text on indexable pages**

Visit every sitemap route and assert the body does not contain:

```ts
const prohibited = [
  "pending client confirmation",
  "pending client approval",
  "Privacy policy pending",
  "License numbers pending",
  "Verified client quote pending",
];
```

Add route-specific assertions for a complete Privacy Policy and Terms of Use.

**Step 2: Run the test and verify it fails**

Run:

```bash
npm run build
npx playwright test tests/legal-and-trust-content.spec.ts
```

Expected: failures on privacy, home, footer, about, and FAQ content.

**Step 3: Implement approved legal pages**

Replace the privacy placeholder with counsel-approved content and add `/terms-of-use` using the existing typography/section primitives. Each page needs its own metadata, canonical, one H1, effective date, contact method, and version/review owner.

If approved copy is not yet available, temporarily:

- add `robots: { index: false, follow: true }` to the route metadata;
- remove the route from `app/sitemap.ts`;
- do not advertise the incomplete page as launch-ready.

**Step 4: Resolve sitewide pending trust content**

- Replace hours and license placeholders with verified content or omit the elements.
- Replace the pending testimonial with an approved quote or remove the block.
- Replace/approve representative team images and ensure alt text describes what the image truly depicts.
- Resolve the pending FAQ service-radius note.
- Centralize confirmed factual claims in `content/site.ts` so the same fact is not maintained in several components.

**Step 5: Run focused and full tests**

Run:

```bash
npm run build
npx playwright test tests/legal-and-trust-content.spec.ts
npm test
```

Expected: no placeholder text on any indexable route and no regressions.

**Step 6: Commit**

```bash
git add app/privacy/page.tsx app/terms-of-use/page.tsx app/sitemap.ts components/site-footer.tsx app/page.tsx content/about.ts content/faq.ts content/site.ts tests/legal-and-trust-content.spec.ts
git commit -m "feat: finalize legal and trust content"
```

## Task 4: Centralize complete page metadata

**Files:**

- Create: `lib/seo.ts`
- Modify: `app/layout.tsx:11-27`
- Modify: `content/home.ts:1-6`
- Modify: `content/services.ts:1-6`
- Modify: `content/about.ts:1-8`
- Modify: `content/about-safety.ts:1-8`
- Modify: `content/about-values.ts:1-8`
- Modify: `content/faq.ts:14-20`
- Modify: `content/contact.ts:1-6`
- Modify: `content/industries.ts:21-34`
- Modify: `app/projects/page.tsx:18-30`
- Modify: `app/services/[slug]/page.tsx:23-48`
- Modify: `app/projects/[slug]/page.tsx:12-34`
- Modify: `app/privacy/page.tsx`
- Modify: `app/terms-of-use/page.tsx`
- Modify: `tests/seo-foundation.spec.ts`

**Step 1: Extend the failing SEO test**

Assert that every indexable page has:

- one absolute self-canonical;
- matching absolute `og:url`;
- `og:site_name`, `og:type`, `og:title`, `og:description`, and `og:image`;
- `twitter:card=summary_large_image`, title, description, and image;
- no `meta[name=keywords]`;
- no duplicate canonical or description tag.

**Step 2: Create a single metadata builder**

Create `lib/seo.ts`:

```ts
import type { Metadata } from "next";

export const SITE_URL = "https://datapowersource.com";

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  image?: { url: string; alt: string };
  type?: "website" | "article";
  index?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  index = true,
}: PageMetadataInput): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const socialImage = image ?? {
    url: "/opengraph-image",
    alt: "Data Power Source — Electrical Solutions for Business Continuity",
  };
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index ? undefined : { index: false, follow: true },
    openGraph: {
      type,
      siteName: "Data Power Source",
      locale: "en_US",
      url,
      title,
      description,
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}
```

Keep `metadataBase` and the default image/icons in `app/layout.tsx`. Use the helper for all static and dynamic pages. Use `SITE_URL` everywhere instead of repeating the domain.

**Step 3: Remove keywords metadata**

Delete `metadata.keywords` from the service content type/data and from `generateMetadata`. Google ignores the keywords meta tag.

**Step 4: Run the metadata tests**

Run:

```bash
npm run build
npx playwright test tests/seo-foundation.spec.ts
```

Expected: all 23 (or the final approved count of) sitemap routes pass canonical and social metadata assertions.

**Step 5: Commit**

```bash
git add lib/seo.ts app content tests/seo-foundation.spec.ts
git commit -m "feat: standardize canonical and social metadata"
```

## Task 5: Add robots policy and make the sitemap truthful

**Files:**

- Create: `app/robots.ts`
- Modify: `app/sitemap.ts`
- Modify: `content/projects.ts`
- Modify: `tests/seo-foundation.spec.ts`

**Step 1: Keep the crawl-file tests failing**

Confirm the Task 1 assertions fail on missing robots and current build-time `lastmod` values.

**Step 2: Add the production robots route**

```ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
```

Do not disallow JavaScript, CSS, or images needed to render pages. Use `noindex` or authentication—not robots disallow—to keep a page out of search.

**Step 3: Simplify the sitemap**

- Generate URLs from one canonical route list plus `projects` and `serviceDetails` keys.
- Include only indexable 200 pages.
- Remove `priority` and `changeFrequency`.
- Remove `new Date()`.
- Add `lastModified` only when a route has an explicit significant-update date. It is acceptable to omit it.

**Step 4: Verify preview indexing protection**

On a deployed preview, run:

```bash
curl -I https://<preview-host>/
```

Expected: the preview is access-protected or returns `X-Robots-Tag: noindex`. Do not change production robots rules to solve a preview-host problem.

**Step 5: Run tests**

```bash
npm run build
npx playwright test tests/seo-foundation.spec.ts
```

Expected: robots and sitemap assertions pass.

**Step 6: Commit**

```bash
git add app/robots.ts app/sitemap.ts content/projects.ts tests/seo-foundation.spec.ts
git commit -m "feat: add crawl policy and accurate sitemap"
```

## Task 6: Consolidate and enrich structured data

**Files:**

- Modify: `lib/schema.ts:1-138`
- Modify: `app/layout.tsx:29-54`
- Modify: `app/about/page.tsx:33-52`
- Modify: `app/about/safety/page.tsx:31-48`
- Modify: `app/about/values/page.tsx:29-46`
- Modify: `app/services/[slug]/page.tsx:50-79`
- Modify: `app/projects/[slug]/page.tsx:36-64`
- Modify: `app/services/page.tsx`
- Modify: `app/projects/page.tsx`
- Modify: `tests/seo-foundation.spec.ts`

**Step 1: Write entity-identity tests**

Parse all JSON-LD nodes and assert:

- one organization/electrician node has `@id=https://datapowersource.com/#organization`;
- one WebSite node has `@id=https://datapowersource.com/#website` and references the organization as publisher;
- Service providers and Article authors/publishers reference the organization ID instead of duplicating partial objects;
- breadcrumb positions start at 1 and match visible breadcrumb URLs after Task 8;
- no schema node contains an empty, pending, or invented property.

**Step 2: Create a linked site graph**

Refactor the root schema to an `@graph` with:

```ts
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
```

The Electrician node should include the current name, URL, address, telephone, founding date, service area, logo/image, and verified values only. The WebSite node should include name, URL, publisher, and an approved `alternateName` if DPS is consistently used publicly.

**Step 3: Add verified local-business properties**

Only after client confirmation, add:

- `openingHoursSpecification`;
- `geo` coordinates;
- official `sameAs` profiles;
- logo and representative business image;
- any other property that is visible and accurate.

Do not add self-serving review/aggregate rating schema.

**Step 4: Link page schemas**

- Services: `provider: { "@id": ORGANIZATION_ID }`.
- Projects: `author` and `publisher` reference the organization ID; add real dates only when sourced.
- Contact page: `mainEntity` references the organization ID.
- Hub pages: use `CollectionPage` with an `ItemList` when the list is visible.
- FAQ: keep only while every schema answer exactly matches visible page content; do not expect a general FAQ rich result.

**Step 5: Validate locally and externally**

Run:

```bash
npm run build
npx playwright test tests/seo-foundation.spec.ts
```

Then validate a deployed home, service, project, breadcrumb, and local-business example in Schema.org Validator and Google's Rich Results Test.

Expected: parse tests pass; Google-supported schemas have no critical errors. Warnings for unavailable optional properties require review, not invented data.

**Step 6: Commit**

```bash
git add lib/schema.ts app tests/seo-foundation.spec.ts
git commit -m "feat: link and enrich structured data"
```

## Task 7: Tighten titles, descriptions, and primary headings

**Files:**

- Modify: `content/home.ts`
- Modify: `content/services.ts`
- Modify: `content/about.ts`
- Modify: `content/about-safety.ts`
- Modify: `content/about-values.ts`
- Modify: `content/faq.ts`
- Modify: `content/contact.ts`
- Modify: `content/industries.ts`
- Modify: `content/service-details.ts`
- Modify: `content/projects.ts`
- Modify: `tests/service-detail-pages.spec.ts`
- Modify: relevant page-specific Playwright tests that assert exact old copy

**Step 1: Approve the keyword/topic map**

Use Search Console and business priorities to assign one primary intent and supporting terms to each core page. At minimum:

- Home: Metro Atlanta commercial/industrial electrical contractor.
- Services hub: commercial electrical services.
- Electrical: commercial/industrial installation and upgrades.
- Mission critical: UPS and standby generator installation/service.
- Connectivity: structured cabling and fiber installation/testing.
- Design-build: electrical engineering and design-build.
- Industries: electrical systems by facility/market.
- Projects: commercial electrical case studies.

Avoid creating multiple pages that target the same primary query.

**Step 2: Update test expectations first**

Change exact title/H1 assertions in existing Playwright tests to the approved copy. Add assertions that the primary phrase appears naturally in the title, H1, opening copy, and at least one contextual internal link—not repeated to a target density.

**Step 3: Rewrite metadata**

Use the suggested direction in the audit, then review in a SERP preview by pixel width. Keep titles distinctive, front-load the topic, and keep the brand concise. Keep descriptions unique, factual, compelling, and focused on the page.

**Step 4: Align H1 and visible lead copy**

Examples:

- Home H1: “Metro Atlanta Commercial & Industrial Electrical Contractor.”
- Services H1: “Commercial Electrical Services Built for Business Continuity.”
- Mission-critical H1: “UPS & Standby Generator Systems for Critical Facilities.”
- Design-build H1: “Electrical Design-Build from Concept to Commissioning.”
- Industries H1: “Electrical Systems for Demanding Industries Across Georgia.”

Retain the existing campaign lines as supporting lead/display copy.

**Step 5: Make time-based claims evergreen**

Replace repeated “25 years” claims with “since 2001” where appropriate. Centralize the copyright year and review any year-sensitive metadata.

**Step 6: Run tests**

```bash
npm run lint
npm run build
npm test
```

Expected: all updated exact-copy tests pass; no duplicate title/description; all pages retain one H1.

**Step 7: Commit**

```bash
git add content tests
git commit -m "content: align metadata and headings with search intent"
```

## Task 8: Expose the hierarchy with breadcrumbs and stronger contextual links

**Files:**

- Modify: `components/breadcrumb.tsx`
- Modify: `components/hero.tsx`
- Modify: `components/service-detail-page.tsx`
- Modify: `components/project-detail-page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/about/safety/page.tsx`
- Modify: `app/about/values/page.tsx`
- Modify: `components/industry-chapter.tsx`
- Modify: `tests/service-detail-pages.spec.ts`
- Modify: `tests/projects.spec.ts`
- Create: `tests/breadcrumbs-and-links.spec.ts`

**Step 1: Write the failing breadcrumb tests**

For nested about pages, service detail pages, and project detail pages, assert:

- one visible `nav[aria-label="Breadcrumb"]`;
- Home and the relevant hub are real links;
- the current page is text with `aria-current=page`;
- JSON-LD names and URLs equal the visible trail;
- no breadcrumb is rendered on `/`.

**Step 2: Render compact breadcrumbs**

Reuse `components/breadcrumb.tsx`. Add an optional breadcrumb slot/prop to shared heroes where appropriate, and place the trail near the top of custom service/project heroes. Do not create duplicate navigation landmarks with identical labels.

**Step 3: Turn project service labels into contextual links**

Map each project service discipline to its relevant service page. Keep descriptive anchor text such as “UPS and standby generator systems,” not repeated “Learn more.”

**Step 4: Review hub-to-detail and sibling links**

Ensure:

- each core service has contextual links from relevant industry chapters and projects;
- every project links to its relevant service(s) and market section/page;
- the about subpages link naturally to one another;
- no page depends only on footer/navigation links.

**Step 5: Run tests**

```bash
npm run build
npx playwright test tests/breadcrumbs-and-links.spec.ts tests/service-detail-pages.spec.ts tests/projects.spec.ts
```

Expected: visible and structured breadcrumbs agree; no broken links or mobile overflow.

**Step 6: Commit**

```bash
git add components app tests
git commit -m "feat: expose hierarchy with breadcrumbs and contextual links"
```

## Task 9: Complete social/icon metadata and reduce avoidable media cost

**Files:**

- Modify: `app/opengraph-image.tsx`
- Create or modify: route-level `opengraph-image.tsx` files for approved core landing pages
- Create: `app/manifest.ts`
- Create: `public/brand/apple-touch-icon.png`
- Replace: `public/images/about/robert-kent-enhanced.png`
- Modify: `app/layout.tsx`
- Modify: image references if the optimized portrait filename changes
- Modify: `tests/seo-foundation.spec.ts`

**Step 1: Write metadata/image assertions**

Assert that priority landing pages have the approved absolute OG image, image alt, 1200×630 dimensions, Twitter image, favicon, and Apple touch icon.

**Step 2: Produce page-family OG images**

At minimum, create intentional sharing treatments for home, services, industries, projects, about, and contact. Reuse project/service photography only when licensing and subject accuracy are confirmed.

**Step 3: Optimize the large portrait source**

Re-export `robert-kent-enhanced.png` to a visually lossless modern format at no more than the maximum rendered dimensions. Record before/after bytes and visually inspect desktop/mobile rendering. Do not blindly reduce quality.

**Step 4: Add icon/manifest metadata**

Add the approved Apple touch icon and a minimal manifest with name, short name, theme/background colors, and icons. Do not add unused PWA behavior.

**Step 5: Run tests and compare output**

```bash
npm run build
npx playwright test tests/seo-foundation.spec.ts
find public/images/about -maxdepth 1 -type f -exec du -h {} +
```

Expected: metadata assertions pass and the portrait source is materially smaller without visible degradation.

**Step 6: Commit**

```bash
git add app public tests/seo-foundation.spec.ts
git commit -m "perf: complete social assets and optimize media"
```

## Task 10: Measure Core Web Vitals on a production-like deployment

**Files:**

- Create: `docs/seo/performance-baseline.md`
- Optionally create: `app/web-vitals.tsx` or the approved analytics integration
- Modify: `app/layout.tsx` only if real-user monitoring is added

**Step 1: Deploy a production-like preview**

Use the intended Vercel project, production environment variables, image optimizer, CDN, and font output. Ensure the preview itself is protected from indexing.

**Step 2: Record representative lab traces**

Measure at mobile and desktop for:

- `/`
- `/services/mission-critical-power`
- `/industries`
- `/projects`
- one image-heavy project detail page
- `/contact`

Record LCP, CLS, TBT (lab proxy for INP), Speed Index, TTFB, LCP element, render-blocking resources, network dependency chains, and transferred JavaScript/image bytes.

**Step 3: Optimize only measured bottlenecks**

Prioritize:

- LCP image discovery/size and server response;
- render-blocking CSS/font work;
- long JavaScript tasks and unnecessary client components;
- layout shifts from media or dynamic header/dialog behavior;
- cache policy on immutable assets.

Do not remove resources based only on bundle suspicion; verify usage and estimated savings.

**Step 4: Add field monitoring**

Use the approved analytics/RUM destination to collect LCP, INP, and CLS. Aggregate by route group and evaluate the 75th percentile.

**Step 5: Enforce the launch targets**

- LCP ≤ 2.5 seconds.
- INP < 200 milliseconds in field data when available.
- CLS < 0.1.
- No critical Lighthouse SEO/accessibility errors.

Document the baseline, device/network conditions, measured bottlenecks, changes, and re-test results in `docs/seo/performance-baseline.md`.

**Step 6: Commit**

```bash
git add docs/seo/performance-baseline.md app
git commit -m "perf: establish deployed web vitals baseline"
```

## Task 11: Run the prelaunch crawl and migration rehearsal

**Files:**

- Modify: `docs/seo/legacy-url-map.csv`
- Create: `docs/seo/prelaunch-verification.md`

**Step 1: Run the full local quality suite**

```bash
npm run lint
npm run build
npm test
npm run test:seo
```

Expected: all commands exit 0.

**Step 2: Crawl the deployed preview**

Verify every final indexable URL for status, canonical, robots directives, title/description, H1, OG/Twitter data, schema parsing, image alt text, and internal link status. Confirm there are no unexpected query, uppercase, slash, HTTP, or `www` duplicates.

**Step 3: Rehearse all 26 legacy URLs**

For each row in `legacy-url-map.csv`, capture:

- initial response;
- redirect location(s);
- final response;
- final canonical;
- number of hops;
- approval for 410 decisions.

Expected: no legacy URL unexpectedly ends at 404; no redirect chain or loop; no redirect points to a non-canonical URL.

**Step 4: Validate structured data and social previews**

Run Google Rich Results Test/Schema.org Validator on representative route types and use social debuggers for the default plus a service and project image.

**Step 5: Verify host and protocol policy**

Confirm these all converge permanently on the same apex HTTPS slashless canonical:

```text
http://datapowersource.com/
http://www.datapowersource.com/
https://www.datapowersource.com/
https://datapowersource.com/
```

**Step 6: Document the signed launch gate**

In `docs/seo/prelaunch-verification.md`, record dates, environment, commands, results, unresolved exceptions, and approvers. Do not launch with an unresolved P0 item.

**Step 7: Commit**

```bash
git add docs/seo/legacy-url-map.csv docs/seo/prelaunch-verification.md
git commit -m "docs: record SEO launch verification"
```

## Task 12: Launch, submit, and monitor

**External systems:**

- Vercel production deployment
- DNS/host redirects
- Google Search Console
- Google Business Profile
- Bing Webmaster Tools if used
- Analytics/RUM

**Step 1: Capture the current production state**

Save the final WordPress sitemap inventory, top landing pages/queries, indexed counts, backlinks, and recent 404s. Keep a rollback plan and database/files backup.

**Step 2: Deploy during a lower-traffic window**

Immediately verify the home page, forms, robots, sitemap, all old URLs, and representative new routes from outside the deployment platform.

**Step 3: Submit the new sitemap**

Submit `https://datapowersource.com/sitemap.xml` in Search Console and remove the old sitemap only after the new deployment is live and verified. Request indexing for the home page and primary hubs; do not submit every URL manually.

**Step 4: Align local identity**

Confirm the website URL, name, phone, address, hours, and service categories match the Google Business Profile and other authoritative citations.

**Step 5: Monitor on a fixed cadence**

- Daily for the first week: uptime, forms, 404s, redirect errors, and crawl/index anomalies.
- Weekly for six weeks: indexed pages, canonical selections, sitemap coverage, CWV, query/landing-page changes, and rich-result errors.
- Monthly thereafter: content freshness, significant sitemap dates, factual claims, broken links, and performance regressions.

**Step 6: Use evidence for phase-two content expansion**

Only after query data is available, prioritize dedicated industry pages with unique proof and buyer value. Do not create thin city or industry doorway pages.

## Final acceptance checklist

- [ ] All local lint, build, full Playwright, and SEO tests pass.
- [ ] All 26 legacy WordPress URLs have an approved, verified outcome.
- [ ] All indexable routes are canonical 200 pages with complete metadata and one descriptive H1.
- [ ] No indexable route contains legal, credential, hours, testimonial, or image placeholders.
- [ ] Robots and sitemap return 200 and agree with canonical/index policy.
- [ ] Structured data is valid, linked, visible, and factually verified.
- [ ] Preview and production host/protocol behavior is verified.
- [ ] Representative deployed pages meet Core Web Vitals targets or have an approved measured remediation.
- [ ] Search Console sitemap submission and monitoring ownership are assigned.
