# Data Power Source migration and launch runbook

**Purpose:** Controlled replacement of the current WordPress site with the reviewed Next.js build  
**Current status:** Prepared only; no launch action has been executed  
**Canonical production origin:** `https://datapowersource.com`

## 1. Assign launch ownership

Record one accountable owner for each area before scheduling the cutover.

| Area | Owner | Backup | Approved/date |
|---|---|---|---|
| Client go/no-go | Assign | Assign | Pending |
| Legal content | Assign | Assign | Pending |
| Vercel deployment and rollback | Assign | Assign | Pending |
| DNS and host redirects | Assign | Assign | Pending |
| Forms and lead delivery | Assign | Assign | Pending |
| Search Console and sitemap | Assign | Assign | Pending |
| Analytics/Core Web Vitals | Assign | Assign | Pending |
| Post-launch monitoring | Assign | Assign | Pending |

## 2. Complete the protected-preview gate

1. Create or identify the intended Vercel project and link the reviewed branch.
2. Configure production-equivalent environment variables, using preview-safe form recipients or delivery controls.
3. Protect the preview from public indexing with access control and crawler directives.
4. Run the full crawl and all checks listed in [`prelaunch-verification.md`](./prelaunch-verification.md).
5. Complete [`performance-baseline.md`](./performance-baseline.md) with repeat mobile and desktop traces.
6. Validate representative schema and social cards using external validators.
7. Obtain final visual, factual, legal, redirect, and performance approvals.

Do not proceed while any P0 gate is pending.

## 3. Capture the current production state

Immediately before cutover:

- export the final WordPress sitemap inventory;
- export top landing pages and queries, indexed counts, incoming links, and recent 404s from Search Console;
- capture current analytics landing-page baselines;
- create and verify a restorable WordPress database/files backup;
- record the current DNS and hosting configuration;
- record the known-good production deployment or rollback target;
- freeze content and redirect changes for the launch window.

Attach the exports and backup locations to the launch ticket. Do not place credentials or secrets in this repository.

## 4. Go-live sequence

Schedule a lower-traffic window with all owners available.

1. Confirm the reviewed commit/deployment ID and environment variables.
2. Deploy the reviewed build to production.
3. Apply the approved apex/HTTPS host policy without changing the 26 path outcomes.
4. Verify from outside the hosting dashboard:
   - home, services, industries, projects, a project detail, about, FAQ, and contact;
   - successful and failed form-delivery states;
   - `/robots.txt`, `/sitemap.xml`, and `/site-map`;
   - all 26 rows in `legacy-url-map.csv`;
   - privacy and terms remain `noindex` unless approved final copy was deliberately published;
   - `http://`, `http://www`, and `https://www` converge permanently to the apex HTTPS canonical;
   - no redirect chain, loop, unexpected 404, mixed content, or incorrect canonical appears.
5. Record deployment time, deployment ID, verifier, and results.

## 5. Rollback conditions

Pause or roll back when any of these occurs and cannot be corrected safely within the agreed launch window:

- the home page or primary navigation is unavailable;
- project requests cannot be submitted or delivered;
- robots blocks the production site or the sitemap is unavailable;
- canonical or host behavior points search engines to the wrong origin;
- a material group of legacy URLs returns 404, loops, or chains;
- an unapproved legal draft, factual claim, testimonial, or image is published;
- a severe visual/accessibility regression blocks primary content or actions.

The deployment owner decides the technical rollback; the client go/no-go owner decides whether the launch window remains open. Record the event and preserve logs before retrying.

## 6. Search and local-identity handoff

After the production checks pass:

1. Submit `https://datapowersource.com/sitemap.xml` in Google Search Console.
2. Remove the old sitemap only after the new sitemap is fetched successfully.
3. Request indexing for the home page and primary hubs; do not manually submit every URL.
4. Confirm monitoring ownership for coverage, canonical selection, redirects, 404s, rich results, and Core Web Vitals.
5. Update Google Business Profile and other authoritative citations only with confirmed matching name, address, phone, website, hours, and service categories.
6. Submit to Bing Webmaster Tools if the client uses it.

## 7. Monitoring cadence

### Daily for the first week

- uptime and primary page responses;
- successful form delivery;
- 404s, redirect errors, and host/canonical anomalies;
- sitemap fetches and unexpected crawl/index exclusions;
- obvious traffic or landing-page disruptions.

### Weekly for six weeks

- indexed-page count and canonical selections;
- sitemap coverage and legacy URL behavior;
- LCP, INP, and CLS by route group;
- query and landing-page changes against the prelaunch export;
- structured-data and rich-result errors;
- unresolved client feedback.

### Monthly thereafter

- factual claims, legal review dates, and content freshness;
- meaningful sitemap modification dates;
- broken links and redirect regressions;
- performance regressions and image growth;
- query evidence for deeper industry content.

Create dedicated industry or location pages only when query evidence, real service coverage, unique project proof, and buyer value justify them. Do not create thin doorway pages.

## 8. Launch record

| Field | Value |
|---|---|
| Approved commit | Pending |
| Protected preview URL | Pending |
| Production deployment ID | Pending |
| Launch date/time | Pending |
| Client approver | Pending |
| Technical verifier | Pending |
| Search Console owner | Pending |
| Monitoring owner | Pending |
| Rollback target | Pending |
| Final outcome | Pending |
