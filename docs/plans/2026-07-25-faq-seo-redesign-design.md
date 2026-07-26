# FAQ SEO Redesign

Reading this as a trust-first FAQ redesign for facilities managers and local commercial buyers, using a technical editorial language with restrained interaction.

## Design direction

- DESIGN_VARIANCE: 5
- MOTION_INTENSITY: 3
- VISUAL_DENSITY: 6

Preserve the existing route, title hierarchy, breadcrumb, grouped accordion behavior, FAQ schema, contact paths, brand tokens, and approved answers. Remove the generic Page System module from the hero. Reuse the current field-planning image as a faded full-bleed hero background with the same navy scrim treatment as Home.

Replace the `System / 01` labels with functional category identities. Each FAQ group receives one Phosphor icon, a plain-language category label, its title and description, and a real question count. On desktop the category rail remains visually anchored beside the accordion; on mobile it collapses above the questions.

## SEO content direction

Google recommends people-first content that directly helps the site's intended audience. Google also states that FAQ rich-result displays are now largely limited to authoritative government and health sites. Keep valid FAQPage JSON-LD because it accurately describes the page, but do not present it as a guaranteed rich-result tactic.

Add only questions that match documented DPS services or can be answered with authoritative technical guidance:

- What does an automatic transfer switch do?
- How often should commercial UPS batteries be inspected or tested?
- Can DPS upgrade commercial switchgear or service in an occupied facility?
- Does DPS install commercial EV charging stations in Metro Atlanta?
- Does DPS install low-voltage cabling and fiber?
- What does NFPA 70E arc-flash training cover?
- What is an EMR and why does it matter?
- What happens during a commercial electrical site assessment?

Do not add pricing, warranty, permitting, licensing, response-radius, brand certification, replacement-cycle, or schedule claims that the client has not confirmed.

## Research notes

- Google Search Central: helpful content should be written for the existing audience and demonstrate first-hand expertise.
- Google Search Central: FAQ structured data can remain valid, but FAQ rich results are generally restricted to authoritative government and health sites.
- NFPA and OSHA: NFPA 70E addresses safe work practices intended to reduce exposure to electrical shock and arc-flash hazards.
- Cummins: an automatic transfer switch monitors normal power, starts the generator when needed, transfers the load, and returns it after utility power stabilizes.
- Schneider Electric: UPS battery systems require scheduled inspection and testing; temperature, charging conditions, leakage, corrosion, and age affect condition.
- OSHA: EMR compares workers' compensation claim frequency and severity against similar businesses, but it should be treated as one safety indicator rather than a complete safety program.

## Verification

- Confirm the FAQ hero uses the existing field image as a full background and contains no Page System module or separate image section.
- Confirm all five groups have icons and no `System / 0X` labels.
- Confirm all new questions render in the accordion and the FAQPage schema includes the same complete question set.
- Confirm keyboard expansion, collapse, focus visibility, mobile stacking, and desktop spacing.
- Run the new tests red before implementation, then green.
- Run ESLint, the production build, the full Playwright suite, and visual QA.
