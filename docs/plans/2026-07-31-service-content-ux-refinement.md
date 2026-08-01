# Service Content and UX Refinement Implementation Plan

> **For implementation:** Follow the repository's test-first workflow and verify each client-provided statement against the named DOCX before changing production content.

**Goal:** Correct the Mission-Critical narrative order, improve the two list-heavy service sections, and restore the full approved Design-Build messaging without weakening readability, visual distinction, accessibility, or search relevance.

**Architecture:** Keep the four pages on the shared `ServiceDetailPage`, but make section order, capability presentation, section tone, and closing CTA label explicit content-model choices. Add three purpose-built capability presentations to the shared renderer: the existing cards, a Low Voltage service ledger, and an Electrical split-services composition. Model Design-Build system descriptors as structured content instead of label-only strings.

**Primary files:**

- `content/service-details.ts`
- `components/service-detail-page.tsx`
- `tests/service-detail-pages.spec.ts`
- `app/services/[slug]/page.tsx` only if structured data needs to consume new fields

**Client sources:**

- `/Users/andrew/Downloads/CONTENT/MISSION CRITICAL CONTENT.docx`
- `/Users/andrew/Downloads/CONTENT/LOW VOLTAGE CONTENT.docx`
- `/Users/andrew/Downloads/CONTENT/ELECTRICAL SERVICES CONTENT.docx`
- `/Users/andrew/Downloads/CONTENT/DESIGN BUILD CONTENT.docx`

## Approved content and design decisions

### Mission-Critical Power

Use this page order:

1. Highlight-color hero
2. White overview, “Some facilities simply cannot go dark”
3. Solid mission-orange “What’s at Stake” section
4. White “What We Deliver” section
5. Soft-orange supporting proof area for equipment, code/load commissioning, and lifecycle support
6. White related-services area
7. Navy closing CTA

This follows the client document while avoiding two adjacent orange-family backgrounds. The capability section needs a white-tone override on this page. The closing CTA reads **“Let’s Talk”**; the hero action remains **“Request a Quote.”** Both can continue to open the existing quote/contact dialog unless product direction later changes the destination.

### Low Voltage

Replace **“Low-Voltage Service Scope”** with the SEO-relevant H2:

> **Structured Cabling, Fiber Optic & Low-Voltage Services**

Use a compact **service ledger** rather than four large cards:

- Four full-width groups: Structured Cabling & Data Communications, Fiber Optic Cabling, Certification & Testing, and Adjacent Low-Voltage Systems.
- Each group has a narrow identity rail with icon, H3, and one-sentence descriptor.
- The services occupy the wider column in a two-column list with short rows, subtle dividers, and restrained green markers.
- Alternate white and soft-green group backgrounds. Do not add a rounded outer card to every group.
- On mobile, stack the identity rail above the list and allow the list to collapse to one column when needed.
- Keep every client-provided service visible in server-rendered semantic lists. Do not hide the core content in tabs, carousels, or closed accordions.

### Commercial & Industrial Electrical

Replace **“Electrical Installation Scope”** with the SEO-relevant H2:

> **Commercial Electrical Installation & EV Charging Services**

Use an **asymmetric split-services composition**, visually distinct from Low Voltage:

- A wider Commercial & Industrial Installation panel and a narrower EV Charging panel.
- Internally group the approved lines for faster scanning without rewriting or omitting them:
  - Distribution & protection
  - Pathways & feeders
  - Equipment & delivery
  - Charger types
  - Site applications
  - Make-ready infrastructure
- Use compact service rows with icons or short labels instead of one uninterrupted bullet block.
- Keep the primary panel white with a strong blue rail; use a soft-blue surface for EV charging.
- Stack panels on mobile, with all items visible and no horizontal overflow.

### Engineering & Design-Build

Restore the full meaning of the client-approved **“Why Design-Build Works for Critical Power”** content:

- The introduction must explain the risk of handoffs and finger-pointing, including schedule, cost, and reliability consequences.
- Single-source responsibility must cover design, procurement, installation, and startup, plus direct field-to-designer accountability.
- Faster to energized must cover overlapping design/construction, early long-lead procurement, and permitting in parallel with detailing.
- Cost certainty, earlier must cover pricing what is designed, catching surprises on paper, realistic early numbers, and fewer late changes.
- Buildability baked in must cover field input into feeder routing, access, grounding, and maintenance clearances before they become site problems.

Keep that section completely grayscale. Present the introduction as a strong editorial lead followed by four ordered benefit modules. Use spatial flow and icons, not decorative step numbers.

Redesign **“What We Design and Build”** as a grayscale technical-systems directory with the five approved descriptor pairs:

- UPS systems: sized, configured, and integrated for loads that cannot go dark.
- Standby and emergency power: generators and automatic transfer switches.
- Power distribution and switchgear: service entrance to branch circuit, coordinated and code-compliant.
- IT and server room power upgrades: clean, redundant power and cooling infrastructure.
- Electrical service upgrades: capacity for growth, planned around operations and uptime.

Use one wide featured UPS module plus four supporting modules in an asymmetric 2+3 arrangement on desktop, stacked on mobile. Keep “Built Around Your Business” as a separate narrative block so the system descriptors remain easy to scan.

## Data-model changes

Extend `ServiceDetail` with explicit presentation metadata rather than slug-specific conditions:

```ts
type ServiceSectionKey =
  | "overview"
  | "proof"
  | "capabilities"
  | "focus"
  | "process"
  | "questions"
  | "related";

type ServicePresentation = {
  sectionOrder?: ServiceSectionKey[];
};

type CapabilityPresentation = "cards" | "ledger" | "split" | "benefit-rail";
type SectionTone = "white" | "soft" | "accent" | "monochrome";

type DescriptiveItem = {
  title: string;
  body: string;
  icon?: CapabilityIcon;
};
```

Add:

- `presentation?: ServicePresentation`
- `capabilities.variant?: CapabilityPresentation`
- `capabilities.tone?: SectionTone`
- optional subgroup metadata for electrical service rows
- `focus[].details?: DescriptiveItem[]`
- `focus[].variant?: "feature-cards" | "systems-directory"`
- `cta.actionLabel?: string`

Default values must preserve existing rendering for pages that do not opt in.

## Task 1: Lock the requested behavior with failing tests

**Files:**

- Modify: `tests/service-detail-pages.spec.ts`

Add tests that:

1. Compare DOM positions and prove “What’s at Stake” precedes “What We Deliver” on Mission-Critical.
2. Confirm the Mission-Critical closing CTA says “Let’s Talk” while the hero CTA still says “Request a Quote.”
3. Check the Mission-Critical background sequence at the section level: accent, white, soft accent, white/navy as applicable.
4. Assert the new Low Voltage and Electrical H2 headings.
5. Assert every existing source-copy item remains visible after the UI redesign.
6. Assert each Design-Build benefit contains the restored client details.
7. Assert all five Design-Build system descriptors are visible.
8. Retain the current grayscale test and expand it to cover the systems directory.
9. Retain the 390px overflow check and include each new capability variant.
10. Confirm there are no em dashes or en dashes in rendered page copy.

Run:

```bash
npx playwright test tests/service-detail-pages.spec.ts
```

Expected: new assertions fail against the current order, CTA, headings, layouts, and shortened Design-Build copy.

## Task 2: Extend the shared content model

**Files:**

- Modify: `content/service-details.ts`
- Modify: `components/service-detail-page.tsx`

Add the new optional presentation types and defaults. Refactor `PrimaryAction` to accept a label:

```tsx
function PrimaryAction({
  inverse = false,
  label = "Request a Quote",
}: {
  inverse?: boolean;
  label?: string;
})
```

Keep CTA behavior and accessibility unchanged. Add stable `data-testid` hooks to section wrappers so ordering and tone can be tested without depending on CSS class order.

Run the focused test file again. Expected: type-check succeeds; presentation-specific tests remain failing until Tasks 3 through 6.

## Task 3: Correct Mission-Critical order, tone, and CTA

**Files:**

- Modify: `content/service-details.ts`
- Modify: `components/service-detail-page.tsx`
- Test: `tests/service-detail-pages.spec.ts`

Set the Mission-Critical section order to place `proof` before `capabilities`. Render that capability section on white, followed by the supporting focus content on soft orange. Set `cta.actionLabel` to `Let’s Talk` and pass it only to the closing CTA.

Run:

```bash
npx playwright test tests/service-detail-pages.spec.ts --grep "mission-critical"
```

Expected: order, copy, CTA, contrast, and tone tests pass.

## Task 4: Build the Low Voltage service ledger

**Files:**

- Modify: `content/service-details.ts`
- Modify: `components/service-detail-page.tsx`
- Test: `tests/service-detail-pages.spec.ts`

Set the new heading and `variant: "ledger"`. Implement semantic H3 and list structure with the existing four groups and every approved item. Use responsive columns, alternating surface tones, and restrained green wayfinding.

Do not truncate, summarize away, or client-hide technical specifications such as category types, OS2/OM fiber types, OLTS/OTDR testing, IEC inspection, TIA-606 administration, DAS, or data-center containment.

Run:

```bash
npx playwright test tests/service-detail-pages.spec.ts --grep "low-voltage"
```

Expected: heading, source-copy, semantic structure, and mobile layout tests pass.

## Task 5: Build the Electrical split-services composition

**Files:**

- Modify: `content/service-details.ts`
- Modify: `components/service-detail-page.tsx`
- Test: `tests/service-detail-pages.spec.ts`

Set the new heading and `variant: "split"`. Add optional service subgroups so the two approved lists can be reorganized visually without changing their meaning. Render the commercial installation area as the dominant panel and EV charging as the supporting panel.

Run:

```bash
npx playwright test tests/service-detail-pages.spec.ts --grep "commercial-industrial"
```

Expected: heading, full-copy, responsive, and visual-structure tests pass.

## Task 6: Restore and redesign Design-Build content

**Files:**

- Modify: `content/service-details.ts`
- Modify: `components/service-detail-page.tsx`
- Test: `tests/service-detail-pages.spec.ts`

Replace the shortened benefit copy with faithful, readable versions of the client content. Use `variant: "benefit-rail"` and keep the entire capability section grayscale.

Convert “What We Design and Build” from `items: string[]` to structured descriptor items. Render it with the grayscale `systems-directory` variant, followed by the separate “Built Around Your Business” narrative.

Run:

```bash
npx playwright test tests/service-detail-pages.spec.ts --grep "engineering"
```

Expected: source-copy, descriptors, grayscale, and mobile tests pass.

## Task 7: Accessibility, SEO, and visual verification

**Files:**

- Modify only if a defect is found: `components/service-detail-page.tsx`
- Modify only if a defect is found: `content/service-details.ts`
- Test: `tests/service-detail-pages.spec.ts`

Verify:

- One H1 per page and a logical H2/H3 hierarchy.
- New headings appear as visible H2s and use service-intent phrases naturally.
- All substantive service copy is rendered in the initial HTML.
- Icons are decorative where the adjacent text supplies meaning.
- Text contrast meets WCAG AA, including orange, green, blue, grayscale, and navy surfaces.
- Keyboard focus remains clear on CTA and linked elements.
- No content is conveyed by color alone.
- No horizontal overflow at 390px, 768px, 1024px, and 1440px.
- Background alternation reads clearly after the Mission-Critical reorder.
- No unwanted “card wall” effect remains in either list-heavy service section.

Capture current-size screenshots for the four pages at 1440px and 390px and review the complete page, not only the changed section.

## Task 8: Full regression gate

Run:

```bash
npm run lint
npm run build
npx playwright test
```

Expected:

- Lint passes.
- Production build passes.
- Full Playwright suite passes.
- Existing service metadata and structured data remain valid.

Review `git diff` and `git status`. Do not stage unrelated screenshots or prior user changes. Commit and push only after explicit user approval.

## Acceptance criteria

- Mission-Critical matches the client document order and has a deliberate white/orange/white/soft-orange rhythm.
- Its closing action reads “Let’s Talk”; its hero action remains “Request a Quote.”
- Low Voltage uses the heading “Structured Cabling, Fiber Optic & Low-Voltage Services” and a compact, all-visible service ledger.
- Electrical uses the heading “Commercial Electrical Installation & EV Charging Services” and an asymmetric, grouped service composition.
- Design-Build faithfully contains the full client-approved benefit logic and all five service descriptors.
- Design-Build’s two redesigned technical sections remain fully grayscale.
- Every approved technical service item remains visible and readable on desktop and mobile.
- Heading hierarchy, initial HTML content, contrast, keyboard behavior, and structured data remain sound.
- No page introduces overflow, hidden essential content, repetitive card walls, or unapproved punctuation.
