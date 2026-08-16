# Production-like performance baseline

**Status:** Open launch gate — not yet measured  
**Prepared:** August 16, 2026  
**Scope:** New Next.js build on `feature/seo-remediation`

## Decision

No Core Web Vitals or Lighthouse scores are reported here because this branch has not been deployed to a protected, production-like environment. Localhost results would not represent the intended CDN, image optimizer, font delivery, caching, or server response behavior, and INP requires field data.

No preview or production deployment was created during this work. The workspace has no `.vercel/project.json` link, and the connected Vercel team currently contains no projects. The Chrome performance tracing connection required for the audit is also unavailable in this task.

This gate must remain open. Do not infer a pass from the successful build or browser test suite.

## Measurement matrix

Run both mobile and desktop traces after a protected preview is available.

| Route | Route purpose | Mobile | Desktop |
|---|---|---|---|
| `/` | Home and primary hero | Pending | Pending |
| `/services/mission-critical-power` | Representative service detail | Pending | Pending |
| `/industries` | Long multi-section hub | Pending | Pending |
| `/projects` | Image-led collection | Pending | Pending |
| `/projects/georgia-institute-of-technology-holland-heating-cooling-plant-480v-upgrade` | Image-heavy case study | Pending | Pending |
| `/contact` | Form and conversion route | Pending | Pending |

For each trace, record:

- LCP and the LCP element;
- CLS and any shifting elements;
- TBT as the lab proxy for interaction responsiveness;
- Speed Index and TTFB;
- render-blocking resources and critical request chains;
- transferred JavaScript and image bytes;
- device, viewport, network, throttling, run count, date, and preview deployment ID.

## Acceptance targets

- LCP at or below 2.5 seconds at the 75th percentile.
- INP below 200 milliseconds when field data is available.
- CLS below 0.1.
- No critical Lighthouse SEO or accessibility errors.
- No route is approved based on a single anomalous trace; use repeat runs under the same conditions.

## Preparation already implemented

- Core pages are statically generated where appropriate.
- Responsive images use the Next.js image optimizer and explicit responsive sizing.
- Header branding and the primary hero image are the only image preloads on the home page.
- The footer logo and Robert L. Kent portrait remain lazy-loaded.
- The approved high-resolution Robert L. Kent source file is preserved byte-for-byte while browser delivery uses responsive optimized output.
- Page-family social images are generated separately from in-page hero assets.

These are implementation facts, not measured performance results.

## Required next steps

1. Create or identify the intended Vercel project and link this worktree.
2. Configure production-equivalent environment variables without exposing production form delivery to test submissions.
3. Enable deployment protection and confirm the preview cannot be indexed.
4. Enable the Chrome DevTools performance tracing connection.
5. Capture the matrix above, optimize only measured bottlenecks, and retest.
6. Select and approve a real-user monitoring destination; collect LCP, INP, and CLS by route group at the 75th percentile.
7. Record the final measurements and approval in this file before launch.

## Approval record

| Gate | Owner | Evidence | Approval/date |
|---|---|---|---|
| Protected production-like preview | Assign before preview | Deployment URL and protection evidence | Pending |
| Lab performance traces | Assign before preview | Trace exports and completed matrix | Pending |
| Field monitoring destination | Client/implementation owner | Approved analytics destination | Pending |
| Performance launch approval | Client/technical approver | Targets met or measured remediation accepted | Pending |
