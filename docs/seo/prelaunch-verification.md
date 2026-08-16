# SEO prelaunch verification

**Verification date:** August 16, 2026  
**Environment:** Local production build in the isolated `feature/seo-remediation` worktree  
**Overall status:** Local implementation passes; deployed-preview and client approval gates remain open  
**Production impact:** None — no live deployment, DNS, Search Console, or current WordPress changes were made

## Local quality results

| Check | Result | Evidence |
|---|---|---|
| Lint | Pass | `npm run lint` exited 0 |
| Production build | Pass | `npm run build` exited 0 and generated 38 static/build routes |
| Complete browser suite | Pass | `npm test`: 188 passed |
| Focused SEO and migration suite | Pass | `npm run test:seo`: 28 passed |
| Indexable metadata contract | Pass locally | Every indexable route has a unique title and description, canonical, OG/Twitter data, and one descriptive H1 |
| Robots and sitemap contract | Pass locally | Both return 200; the sitemap contains only canonical indexable routes and excludes review-only legal pages |
| Structured identity contract | Pass locally | JSON-LD parses and uses linked organization/website identifiers without empty or invented optional properties |
| Hierarchy and internal links | Pass locally | Nested pages have visible breadcrumbs aligned with schema; contextual links resolve in the browser suite |

The first production build attempt was blocked only because the restricted workspace could not fetch the configured Google font files. The unchanged build passed when network access was allowed. The first sandboxed browser run was similarly blocked from opening its local test port; the unchanged suite passed when the local port was allowed. Neither environmental retry required a site-code workaround.

## Legacy URL rehearsal

All 26 rows in [`legacy-url-map.csv`](./legacy-url-map.csv) were requested from the production build with redirect following disabled, then followed manually to capture the final status and canonical.

- The canonical home page returns 200 with zero hops.
- All 13 replacement routes return a single 308 directly to the approved slashless destination, followed by a canonical 200.
- All 12 retained trailing-slash URLs return one 308 to the same slashless route, followed by a canonical 200.
- No row ends at 404, enters a loop, creates a redirect chain, or points to a non-canonical destination.

The rehearsal initially found that trailing-slash replacement URLs took two hops. The redirect policy was corrected so both forms now map directly to the final destination, and the automated migration contract was strengthened to prevent regression.

### Approval exceptions

- `/author/admin/` and `/author/dpsadmin/` remain provisional redirects to `/projects`; approve them only after Search Console and backlink review confirms equivalence.
- `/contact-us/contact-us-handler/` remains a client-review mapping to `/contact` rather than an approved 410.
- `/site-map/` remains retained pending traffic/backlink review.
- `/privacy-policy/` maps to the review-only `/privacy` route. The destination remains `noindex` and outside navigation/sitemap until counsel-approved copy is supplied.
- No 410 response is currently proposed, so no 410 approval has been recorded.

## Deployed-preview checks still required

These checks cannot be truthfully completed against localhost and are not approved:

| Check | Status | Required evidence |
|---|---|---|
| Protected production-like preview | Blocked | Intended Vercel project, protected deployment URL, and proof of `noindex`/access control |
| Full preview crawl | Pending | Status, canonical, robots, metadata, H1, images, schema, and internal links for every final URL |
| Duplicate URL policy | Pending | Query, uppercase, slash, HTTP, `www`, and apex behavior on the deployed host |
| Structured-data validation | Pending | Representative results from Schema.org Validator and Google Rich Results Test |
| Social preview validation | Pending | Default, service, and project share cards in platform debuggers |
| Core Web Vitals | Blocked | Completed mobile/desktop matrix in [`performance-baseline.md`](./performance-baseline.md) |
| Host/protocol convergence | Pending until cutover | Permanent convergence of all HTTP/HTTPS and `www`/apex variants to `https://datapowersource.com/` |
| Forms and delivery | Pending | Successful and failed submission behavior using approved preview-safe delivery configuration |

## Client and counsel launch gates

| Gate | Current implementation | Approval required |
|---|---|---|
| Privacy Policy and Terms of Use | Review-only, `noindex`, excluded from navigation and sitemap | Client and counsel |
| Public business hours | Omitted rather than guessed | Client |
| License numbers/display language | Omitted rather than guessed | Client |
| Official profile URLs for `sameAs` | Omitted until confirmed | Client |
| Published coordinates | Omitted until confirmed | Client |
| EMR, 24/7 service, two-hour response, NFPA 70E, First Aid/CPR, IEC, and “since 2001” claims | Existing build copy retained where present; current accuracy not independently certified | Client |
| Generated/representative imagery | Representative team imagery removed; remaining generated production imagery needs final client approval | Client |
| Testimonial | Removed until an approved endorsement exists | Client |
| Robert L. Kent portrait | Approved high-resolution production asset preserved exactly and served responsively | Client confirmed for continued use |
| Legacy author/archive decisions | Provisional mappings implemented and tested | Client plus Search Console/backlink review |
| Search Console migration evidence | Not available in this task | Client/account owner |

## Go/no-go record

The build is ready for final client review, but it is **not yet approved for production launch**. A production launch requires every P0 gate below to be resolved and signed.

| P0 gate | Owner | Evidence | Status/approval date |
|---|---|---|---|
| Client/counsel legal approval | Assign | Final legal copy and approval record | Pending |
| Client factual-claim and imagery approval | Assign | Signed content checklist | Pending |
| Search Console/backlink redirect review | Assign | Export and approved legacy map | Pending |
| Protected preview crawl and form QA | Assign | Crawl/export and form results | Pending |
| Deployed Core Web Vitals evidence | Assign | Completed performance baseline | Pending |
| Host/protocol and rollback rehearsal | Assign | Deployment checklist and rollback owner | Pending |

No approver names or signatures are inferred in this document.
