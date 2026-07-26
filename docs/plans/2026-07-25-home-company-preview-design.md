# Home Company Preview Design

Reading this as a targeted Home-page evolution for facilities and procurement buyers, using a technical, owner-led trust language.

## Direction

Preserve the existing light-first DPS system, asymmetric service bento, navy proof bands, service colors, Sora display type, and Inter body type. Set the pass at:

- DESIGN_VARIANCE: 6
- MOTION_INTENSITY: 6
- VISUAL_DENSITY: 5

Replace the duplicated two-pillar service introduction with an editorial company preview. The preview will pair concise company context and an About CTA with the supplied Independent Electrical Contractors recognition mark in a navy credentials panel.

## Interaction

Keep the service bento arrangement, but separate each card with a 20px gutter. Each service card retains its discipline-color inversion and gains a restrained discipline-color halo on hover. The halo communicates card focus and service identity.

Move the hero proof rail above the photographic stacking context, increase label contrast and size, and remove its hover treatment. It should read as static proof, not as four clickable controls.

Place one kinetic type banner directly after the company preview. It cycles through:

1. Industry knowledge
2. Track record of successful projects
3. Dynamically responsive
4. Industry knowledge & design build expertise

The animated line is visual-only. Assistive technology receives the complete static list. `prefers-reduced-motion` receives the first phrase as a stable, non-animated line.

## Components

- Add `CompanyPreview` markup to `app/page.tsx`, with content stored in `content/home.ts`.
- Add `RotatingTypeBanner` as an isolated Client Component.
- Reuse the existing `Button`, `Reveal`, and Phosphor icon system.
- Add the supplied IEC PNG under `public/brand/`.
- Update `TechnicalStatusRail` and `ServiceCard` without changing their public APIs.

## Verification

- Browser-check service gutters, rounded cards, and discipline-color hover shadows.
- Verify the old pillar split is absent and the company preview, IEC mark, and About CTA are present.
- Verify the Why DPS header contains an About CTA.
- Verify the hero rail is foregrounded, readable, and has no hover-color change.
- Verify the type banner order, phrase content, and reduced-motion state.
- Run the focused tests red before implementation, then green.
- Run ESLint, the production build, the complete Playwright suite, and desktop/mobile visual captures.
