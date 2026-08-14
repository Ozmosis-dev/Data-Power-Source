# Data Power Source Technical & On-Page SEO Audit

**Audit date:** August 14, 2026  
**Audited build:** Next.js application in `08-build gpt` at commit `3c3fa9e`  
**Production comparison:** `https://datapowersource.com` currently serves the legacy WordPress site  
**Companion implementation plan:** `docs/plans/2026-08-14-seo-remediation.md`

## Executive assessment

The new site has a strong technical foundation, but it is not ready for an SEO-safe production launch. The site renders static HTML, its navigation is crawlable, all 23 sitemap pages return a true 200, metadata is unique, headings are structurally clean, internal links resolve, images have alt text, and useful JSON-LD is already present.

The main launch risks are concentrated and fixable:

1. The seven configured legacy redirects do not work. Requests normalize from the trailing-slash source to a slashless URL and then return 404.
2. Eight important pages lack a self-referencing canonical and `og:url`.
3. Eight additional URLs in the live WordPress sitemap have no migration rule or equivalent route in the new application.
4. `/robots.txt` returns 404 in the new build.
5. The sitemap assigns the current build time to every page on every build and emits `changefreq` and `priority` fields that Google ignores.
6. The privacy policy is an indexable placeholder, the existing Terms of Use page has no new equivalent, and client-pending trust content is visible across indexable pages.
7. Several titles, descriptions, and H1s are descriptive in metadata but generic or unnecessarily long in the rendered page.
8. Structured data is valid JSON and broadly appropriate, but the entities are not linked with stable IDs and important verified business properties are absent.

**Provisional technical on-page strength: 75/100.** This is a codebase/readiness score, not a live ranking forecast. It excludes field Core Web Vitals, backlink quality, Google Business Profile health, rankings, and Search Console data.

| Area | Score | Assessment |
|---|---:|---|
| Crawlability and index control | 13/20 | Static HTML and a valid sitemap are strong; broken migration redirects and no robots file are launch risks. |
| Metadata and canonicalization | 14/20 | Titles and descriptions are unique; eight canonicals/OG URLs are missing and the privacy metadata is inherited. |
| Site hierarchy and semantic HTML | 19/20 | One H1 per page, no heading skips, no broken links, no orphans; visible breadcrumbs are absent. |
| Structured data | 12/15 | Useful types and valid JSON-LD are present; organization/entity linkage and verified local properties need work. |
| Content quality and trust readiness | 9/15 | Strong service and project depth; legal and client-pending placeholders must not launch as indexable content. |
| Performance foundation | 8/10 | Static generation, `next/image`, responsive sizing, priority hero images, and self-hosted build fonts are good; live CWV is unmeasured. |

## Scope and methodology

The audit covered:

- Next.js configuration, layouts, metadata objects, route generation, redirects, sitemap output, schemas, content modules, headings, links, images, and build output.
- A production build with `npm run build` and lint with `npm run lint`.
- A browser crawl of all 23 URLs emitted by the new `/sitemap.xml`.
- Rendered `<head>` output, status codes, H1 and heading order, image alt text, JSON-LD parsing, duplicate IDs, internal links, and orphan detection.
- The live WordPress robots file and all 26 URLs in its post, page, category, and author sitemaps.
- Current Google Search Central and web.dev guidance cited at the end of this report.

The new Next.js build is not deployed to the production domain. Therefore, CDN behavior, TLS/host redirects, real-user Core Web Vitals, final response headers, and Search Console coverage could not be measured for the new site.

## Automated crawl results

| Check | Result |
|---|---:|
| New sitemap URLs crawled | 23 |
| 200 responses | 23/23 |
| Pages with exactly one H1 | 23/23 |
| Heading-level skips | 0 |
| Duplicate titles | 0 |
| Duplicate meta descriptions | 0 |
| Rendered images missing `alt` | 0 |
| Broken internal links | 0 |
| Orphan sitemap pages | 0 |
| Duplicate DOM IDs | 0 |
| Pages with `main#main-content` | 23/23 |
| Pages with valid, parseable JSON-LD | 23/23 |
| Pages with an OG image and Twitter card | 23/23 |
| Pages missing self-canonical and `og:url` | 8 |
| New `/robots.txt` status | 404 |
| Unknown page status | true 404 with `noindex` |

## What is already strong

### Rendering and crawlability

- The marketing pages and all service/project detail pages are statically generated. Search engines receive meaningful HTML without waiting for client-side rendering.
- Internal navigation uses real anchor elements with `href` attributes.
- All sitemap routes are linked from at least one other page. Important hubs have strong sitewide or contextual link coverage.
- The four service pages and nine project pages use readable, descriptive URL paths.
- Unknown routes return a true 404 and Next.js adds `noindex` to the error response.

### HTML structure and media

- Every audited page has exactly one H1.
- No page skips heading levels in the rendered sequence.
- `html[lang="en"]`, UTF-8, viewport metadata, a skip link, and `main#main-content` are present.
- Every rendered image has non-empty alt text.
- Responsive `sizes` are defined for content images, and above-the-fold hero/project images use priority loading.
- Fonts are bundled by `next/font` in the production build rather than fetched from Google by visitors.

### Metadata and social sharing

- Every page has a title and meta description.
- Titles and descriptions are unique across all 23 pages.
- Every page receives `og:title`, `og:description`, `og:image`, a large Twitter card, and a Twitter image.
- Service and project detail pages have page-specific OG images and absolute canonical URLs.
- Project pages correctly use `og:type=article`; other pages use `website`.

### Content architecture

- The service hub links to four focused service detail pages.
- The project hub links to nine substantial case studies, each of which has adjacent-project navigation.
- The industries page covers nine operating markets with semantic H2 sections and contextual service/project links.
- About, safety, and values form a sensible company-information cluster.
- FAQ content is visible in the page and mirrored in JSON-LD.

## Findings and recommendations

### SEO-01 — P0: Configured legacy redirects terminate at 404

**Evidence:** `next.config.ts:8-31` defines sources with trailing slashes while `trailingSlash` is `false`. In the production build, `/about-us/` first returns a permanent 308 to `/about-us`, which then returns 404. The same failure occurs for the sampled electrical-services, projects-category, and contact URLs.

**Impact:** Existing indexed URLs, backlinks, bookmarks, and WordPress authority would be lost at launch. This is the largest direct migration risk.

**Recommendation:** Define redirect sources without trailing slashes, add every legacy URL in the live sitemap, and test both slash and slashless requests through the final destination. A permanent 308 is acceptable to search engines, but each old URL should reach its closest equivalent in one effective migration rule and never end at 404.

### SEO-02 — P0: The redirect inventory is incomplete

The live WordPress sitemap exposes 26 URLs: nine project posts, 14 pages, one category archive, and two author archives. The new configuration covers only seven renamed paths. The following legacy URLs still need an explicit decision:

| Legacy URL | Recommended handling |
|---|---|
| `/contact-us/contact-us-handler/` | Redirect to `/contact` if it represents the old form outcome; otherwise return 410 and remove from all sitemaps. |
| `/about/contact-information/` | 308 to `/contact`. |
| `/projects-old/` | 308 to `/projects`. |
| `/site-map/` | Preserve as a small HTML sitemap only if it has traffic/backlinks; otherwise 410 after Search Console review. |
| `/privacy-policy/` | 308 to `/privacy` only after the real policy exists. |
| `/terms-of-use/` | Preserve the existing path with a complete Terms of Use page. |
| `/author/admin/` | Redirect to `/projects` only if the archive is substantially a project list; otherwise 410. |
| `/author/dpsadmin/` | Redirect to `/projects` only if the archive is substantially a project list; otherwise 410. |

The nine project URLs and `/services/` already have equivalent new routes. Their trailing slash will normalize to the slashless canonical URL.

### SEO-03 — P0: Indexable legal and trust placeholders are not launch-ready

**Evidence:** `app/privacy/page.tsx` renders “Privacy policy pending” and inherits the generic site title/description. `/privacy` is included in the sitemap. The live WordPress `/terms-of-use/` has no replacement. Sitewide content also renders “Business hours pending client confirmation” and “License numbers pending”; the home page renders a pending testimonial and labels representative/generated imagery.

**Impact:** This is primarily a legal, trust, conversion, and quality problem. It also creates a weak indexable page and reduces the credibility signals users and search systems can corroborate.

**Recommendation:** Do not launch indexable placeholders. Obtain approved legal copy, hours, license/credential display decisions, and final image/testimonial approvals. Until a real legal page is available, add `noindex,follow` and remove it from the sitemap. Do not fabricate hours, licenses, reviews, coordinates, or credentials.

### SEO-04 — P1: Eight pages lack self-canonicals and `og:url`

Affected routes:

- `/`
- `/about`
- `/about/safety`
- `/about/values`
- `/services`
- `/faq`
- `/contact`
- `/privacy`

Google can infer canonical URLs, and the sitemap is a canonical signal, but Google explicitly recommends self-referencing canonicals on canonical pages. The missing `og:url` also makes social identity less explicit.

**Recommendation:** Use one shared metadata builder so every indexable page emits an absolute canonical, matching `og:url`, unique title/description, and intentional social image. Canonicals, sitemap URLs, internal links, and redirects must all use the same apex HTTPS, slashless format.

### SEO-05 — P1: `robots.txt` is absent from the new application

**Evidence:** `/robots.txt` returns 404; `/sitemap.xml` returns 200. The live WordPress robots file currently allows crawling and advertises `sitemap_index.xml`.

**Impact:** A missing robots file does not block crawling, but it loses an easy, standard sitemap discovery mechanism and leaves preview/production crawler policy implicit.

**Recommendation:** Add `app/robots.ts` with production allow rules and the new sitemap URL. Verify that non-production deployments return `X-Robots-Tag: noindex` or an equivalent policy without blocking the resources required to render pages.

### SEO-06 — P1: Sitemap modification dates are inaccurate

**Evidence:** `app/sitemap.ts:27` uses `new Date()` for every URL, so every deployment tells crawlers that every page changed. Lines 28-38 emit `changeFrequency` and `priority`.

**Impact:** Google uses accurate `lastmod` as a crawl scheduling signal, but may stop trusting it when it repeatedly fails to match significant content changes. Google ignores `changefreq` and `priority`.

**Recommendation:** Omit `lastModified` until the application has reliable page-level significant-update dates, or store an explicit `updatedAt` alongside each page/project. Remove `changeFrequency` and `priority`. Include only canonical, indexable 200 URLs.

### SEO-07 — P1: Metadata is unique but often too verbose; the privacy metadata is incorrect

Google has no fixed character limit and truncates by device width, so the following counts are editorial warnings, not protocol failures.

- Ten titles are 70 characters or longer.
- Nine descriptions are longer than 160 characters.
- The home, services, and industries descriptions are 201, 209, and 218 characters.
- `/privacy` inherits the generic 17-character title “Data Power Source” and the sitewide contractor description.
- Four service pages emit `meta[name=keywords]`; Google ignores this tag entirely.

**Recommendation:** Rewrite for intent-first clarity and likely SERP display, not arbitrary keyword density. Put the differentiated service/location phrase first, keep branding concise, and front-load the value proposition in descriptions. Remove the unused keywords arrays/tag.

Suggested title direction:

| Route | Suggested title |
|---|---|
| `/` | Atlanta Commercial Electrical Contractor \| Data Power Source |
| `/about` | About Data Power Source \| Atlanta Electrical Contractor |
| `/about/safety` | Electrical Safety Program & NFPA 70E \| Data Power Source |
| `/about/values` | Safety, Integrity & Workmanship \| Data Power Source |
| `/services` | Commercial Electrical Services in Atlanta \| Data Power Source |
| `/services/commercial-industrial-electrical` | Commercial & Industrial Electrician in Atlanta \| DPS |
| `/services/mission-critical-power` | UPS & Generator Installation in Atlanta \| Data Power Source |
| `/services/low-voltage-connectivity` | Structured Cabling & Fiber Installation in Atlanta \| DPS |
| `/services/engineering-design-build` | Electrical Design-Build Contractor in Atlanta \| DPS |
| `/industries` | Industries We Serve \| Atlanta Electrical Contractor |
| `/projects` | Commercial Electrical Projects & Case Studies \| DPS |
| `/faq` | Commercial Electrical, UPS & Generator FAQs \| DPS |
| `/contact` | Contact Data Power Source \| Atlanta Electrical Contractor |
| `/privacy` | Privacy Policy \| Data Power Source |

Long project titles should be shortened without losing the client/project identifier, for example “US Army Data Center Generator & Cooling Project | DPS.”

### SEO-08 — P1: Several visible H1s do not state the page's primary search topic

The title tags are generally keyword-aware, but Google also uses the main visual title and headings when forming search title links. Examples:

- Home: “Power you can build on — installed right, kept running.”
- Services: “Electrical solutions for business continuity.”
- Mission critical: “When downtime isn't an option, power can't be an afterthought.”
- Engineering/design-build: “One team. One contract. One point of accountability.”
- Industries: “Power systems built around your operating reality.”

These are strong campaign headlines but weak standalone topic labels.

**Recommendation:** Make the H1 descriptive and move the brand line into the lead or supporting display copy. Example home H1: “Metro Atlanta Commercial & Industrial Electrical Contractor,” with the current promise immediately below it. Preserve natural language; do not turn headings into keyword lists.

### SEO-09 — P1: Structured data needs entity consolidation and verified enrichment

**What works:** All JSON-LD parses. The site uses `Electrician`, `BreadcrumbList`, `Service`, `Article`, `FAQPage`, `AboutPage`, `ContactPage`, `WebPage`, and `ItemList` where broadly relevant.

**Gaps:**

- The business, provider, author, and publisher objects are repeated instead of connected to one stable `@id`.
- There is no `WebSite` entity and no explicit organization/logo relationship.
- The `Electrician` entity lacks an image/logo, `sameAs`, coordinates, opening hours, and other verified recommended properties.
- Project Article markup has no real `datePublished` or `dateModified` fields.
- Service/provider and article/publisher nodes do not reference a shared organization entity.
- The services and projects hubs could be represented as `CollectionPage` plus `ItemList`.
- FAQ markup is semantically consistent with visible content, but Google has removed general FAQ rich-result documentation/eligibility. It should not be treated as a traffic feature.

**Recommendation:** Build a linked `@graph` using `https://datapowersource.com/#organization` and `/#website`. Add only properties that the client can verify and that are visible or corroborated on the site. Do not invent business hours, coordinates, social profiles, or article dates solely to satisfy validators.

### SEO-10 — P2: The site has breadcrumb schema but no visible breadcrumbs

`components/breadcrumb.tsx` exists but is unused. Nested about pages, service details, and project details emit `BreadcrumbList` JSON-LD without rendering the corresponding path for users.

**Impact:** This is not an indexability failure, but visible breadcrumbs improve orientation, internal linking, accessibility, and consistency between structured data and page content.

**Recommendation:** Render compact breadcrumbs on nested and detail pages and keep the visible labels/URLs identical to JSON-LD. Hubs and the home page do not need breadcrumbs.

### SEO-11 — P2: The architecture is strong but has limited standalone industry/local landing depth

The single `/industries` page has nine well-structured chapters. It can rank as an industries hub, but each vertical has no dedicated URL for focused queries such as data-center electrical contractor, healthcare electrical contractor, or broadcast power systems.

**Recommendation:** Do not mass-produce thin location or industry pages. After Search Console/query research, create dedicated pages only for markets with distinct services, project proof, buyer questions, and meaningful copy. The best first candidates appear to be data centers/mission-critical, healthcare, education, government, and broadcast/telecom because the project library supports them.

For geography, keep Metro Atlanta/Georgia targeting in the core pages. Add service-area pages only where the company genuinely serves the location and can provide unique local proof; avoid doorway pages.

### SEO-12 — P2: Trust content and evergreen claims need a publishing workflow

“25 years” and the hard-coded 2026 copyright will become stale. The site repeats EMR, emergency-response, training, and business-continuity claims in several content modules and components.

**Recommendation:** Prefer “Serving commercial and industrial facilities since 2001” where it reads naturally. Centralize factual trust claims and review them at least annually. Require a source/approval for EMR, 24/7 response, training, licenses, affiliations, and client/testimonial statements.

### SEO-13 — P2: Social and icon metadata can be more complete

The generated default OG image is technically complete and all pages inherit it, while service and project detail pages use page-specific images. Static landing pages share the same generic image. Only an SVG favicon is explicitly configured.

**Recommendation:** Add intentional OG images for home, services, industries, projects, about, and contact; add an Apple touch icon and web app manifest if the brand package includes them. This affects sharing quality more than rankings.

### SEO-14 — Measurement gap: Core Web Vitals must be measured on the deployed new build

The code has a good performance foundation:

- 23 marketing/content pages are statically rendered.
- The entire `.next/static` directory is approximately 1.2 MB; that is not the payload of any single route.
- Critical hero/project images use priority loading and responsive `sizes`.
- Most images use WebP or Next's optimizer.
- The largest source asset is `public/images/about/robert-kent-enhanced.png` at approximately 2.2 MB; it should be recompressed even though Next optimizes delivered variants.
- No third-party analytics or marketing scripts are currently present.

No valid LCP, INP, CLS, TTFB, or Lighthouse numbers are reported in this audit. The Chrome tracing connection was unavailable, and the production domain still runs the legacy WordPress site. Lab results from localhost would not represent Vercel/CDN behavior, and INP requires real interaction/field data.

**Launch target:** At the 75th percentile, LCP ≤2.5s, INP <200ms, and CLS <0.1. Validate representative home, service, industries, projects, project-detail, and contact pages in PageSpeed Insights/Chrome DevTools after deploying a production-like preview, then monitor field data in Search Console and real-user monitoring.

## Per-route metadata coverage

| Route/group | Title chars | Description chars | Canonical / OG URL | On-page note |
|---|---:|---:|---|---|
| `/` | 82 | 201 | Missing / missing | H1 is a brand promise rather than primary topic. |
| `/about` | 71 | 163 | Missing / missing | Structure and AboutPage schema are strong. |
| `/about/safety` | 68 | 173 | Missing / missing | Strong topic depth; H1 is generic. |
| `/about/values` | 64 | 158 | Missing / missing | Good hierarchy; add canonical. |
| `/services` | 80 | 209 | Missing / missing | Strong hub; H1 and metadata need tightening. |
| Four service details | 68–81 | 152–175 | Present / present | Unique image/schema; two H1s are generic and keywords meta is unnecessary. |
| `/industries` | 61 | 218 | Present / present | Strong nine-section hub; shorten description and improve H1. |
| `/projects` | 65 | 166 | Present / present | Strong hub; add CollectionPage/ItemList if useful. |
| `/faq` | 63 | 149 | Missing / missing | Visible questions match schema; no general Google FAQ rich-result benefit. |
| `/contact` | 63 | 154 | Missing / missing | Strong contact schema; confirm hours and credentials before launch. |
| `/privacy` | 17 | 151 | Missing / missing | Inherits generic metadata and contains placeholder copy. |
| Nine project details | 50–83 | 139–162 | Present / present | Strong unique pages; five titles should be shortened and Article dates added only if known. |

## Recommended implementation order

1. **Migration safety:** fix and complete redirects; add automated legacy-URL tests.
2. **Launch blockers:** replace/noindex legal and client-pending content; create Terms of Use handling.
3. **Index controls:** add robots, correct sitemap output, and align canonical URL policy.
4. **Metadata foundation:** add self-canonicals/OG URLs everywhere; fix privacy and tighten titles/descriptions.
5. **On-page alignment:** make H1s descriptive and add visible breadcrumbs/contextual links.
6. **Entity/schema quality:** consolidate organization/site nodes and add only verified local-business data.
7. **Performance and media:** recompress large sources, deploy preview, measure CWV, then optimize measured bottlenecks.
8. **Launch and monitoring:** crawl the preview, validate rich results, submit the new sitemap, and monitor redirect/404/indexation data.
9. **Growth phase:** use Search Console query data to decide whether individual industry or legitimate service-area pages deserve investment.

## Definition of done

- Every current WordPress sitemap URL either remains a 200 canonical URL, returns one permanent redirect to the closest equivalent, or has a documented 410 decision.
- Every indexable new page returns 200, appears in the sitemap, has one self-canonical, matching `og:url`, unique title/description, one descriptive H1, and no placeholder content.
- `/robots.txt` returns 200 and advertises the canonical sitemap.
- The sitemap contains only canonical 200 pages and no false modification dates.
- All structured data passes Schema.org validation; Google-supported types pass the Rich Results Test without critical errors.
- No internal links are broken and no indexable page is orphaned.
- The deployed build meets the stated CWV targets in representative lab tests and is instrumented for field monitoring.
- Search Console has the new sitemap, no unexpected indexing exclusions, and no rising 404/redirect errors after launch.

## Primary guidance used

- [Google: canonical URL best practices](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: accurate sitemap `lastmod`; `changefreq` and `priority` are ignored](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping)
- [Google: robots.txt introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Google: title-link best practices](https://developers.google.com/search/docs/appearance/title-link)
- [Google: meta description best practices](https://developers.google.com/search/docs/appearance/snippet)
- [Google: crawlable links and internal anchor text](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Google: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google: Core Web Vitals and Search](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [web.dev: field and lab Web Vitals measurement](https://web.dev/articles/vitals)
- [Google: the keywords meta tag is not used for web ranking](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag)
