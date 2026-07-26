# Contact Page and Brand Blue Design

## Design read

This is a targeted redesign for facilities managers, operations teams, and commercial buyers. The page should feel precise, established, and technically capable. It should use the existing light-first DPS system, a restrained navy/cobalt palette, and minimal motion.

Design dials:

- `DESIGN_VARIANCE: 5`
- `MOTION_INTENSITY: 3`
- `VISUAL_DENSITY: 6`

## Color system

Use `brand-600` (`#162792`) as the single primary action surface. The header quote button, company-preview button, dark-band quote buttons, and electrical service-card hover must use this same value. `brand-700` remains the hover state.

The navy ramp remains the foundation for large dark sections. The electric-blue ramp is limited to structural details such as focus rings, fine rules, icons, and high-contrast labels on navy. It is not used as an alternate CTA background.

## Footer credential

Place the existing IEC Atlanta and Georgia badge in the footer proof row. Keep it small and separated from the main footer columns so it reads as a credential, not a second brand. Use the supplied transparent PNG without recoloring or distortion.

## Contact page

Use a photo-backed compact hero with the existing field-planning image. Below it, create an asymmetric two-column intake:

- Left: a structured project form with real labels, helper text, native required fields, loading, success, and error states.
- Right: a navy contact rail with verified phone, fax, address, service area, emergency response, and a map link.

Preserve the source form's core fields: name, email, phone, and message. Add company, service interest, facility location, and timing because they materially improve quote qualification.

Form delivery uses a same-origin route and an environment-configured webhook. If the webhook is not configured, the page shows a clear call fallback instead of pretending the request was sent.

## SEO and structured data

Use the approved contact title and description from `04-specs/copy/10-contact.md`. Add `BreadcrumbList` and `ContactPage` JSON-LD. Keep the NAP exactly synchronized with the global site content.

## Accessibility

- Labels remain above every field.
- Required fields use native validation.
- Status messages use an `aria-live` region.
- Focus rings remain visible on light and navy surfaces.
- Phone and map actions are real links.
- The mobile layout collapses to one column with the global sticky call/quote bar intact.
