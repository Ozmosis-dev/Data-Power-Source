# Request a Quote Dialog Design

## Design read

This is a global B2B conversion overlay for facility leaders, contractors, and technical buyers. It should feel precise, reassuring, and distinctly Data Power Source, not like a generic lead-generation widget.

Design dials:

- Design variance: 6
- Motion intensity: 4
- Visual density: 6

The existing DPS design system remains the source of truth: Sora and Inter, deep navy, DPS cobalt `#162792`, disciplined 12px card radii, outline Phosphor icons, and short state transitions.

## Chosen approach

Use one Radix Dialog provider at the root of the site. Every visible "Request a quote" link keeps `/contact` as its no-JavaScript fallback but opens the same dialog when JavaScript is available.

The dialog is a split-panel intake on desktop:

- Left: a dark photo-backed brand panel with the white DPS wordmark, a short value statement, verified response proof, and a direct-call fallback.
- Right: a compact intake form with clear labels, high-contrast controls, service-choice radios, project timing, and project details.

On mobile, the dialog becomes a full-height sheet. The brand panel compresses into a short visual header while the form remains vertically scrollable. The close control stays visible.

## Conversion strategy

The form asks only for information needed to qualify and respond:

- Full name
- Company or facility
- Work email
- Phone
- Service interest
- Project timing
- Facility location
- Project details

Only name, email, phone, service interest, and project details are required. The form explains that city and state are enough for location. Urgent prospects always see the click-to-call option.

The success state replaces the form with a clear confirmation and a direct-call option. The error state remains inline and gives the phone number as the immediate fallback.

## Data and accessibility

The module posts to the existing `/api/contact` route. The client splits the full-name field into `firstName` and `lastName`, preserving the current backend contract.

The dialog must:

- Have a programmatic title and description.
- Trap focus while open.
- Return focus to the triggering CTA when closed.
- Close on Escape and overlay click.
- Prevent background scroll.
- Respect reduced motion.
- Keep every field label visible above its control.
- Expose success and error messages through live regions.

## Visual guardrails

- No gradients or outer neon glows.
- No invented claims or response guarantees.
- One cobalt action color throughout.
- Existing generated field-planning photography is reused as a temporary brand asset.
- The DPS logo remains unaltered.
- Motion communicates state change only and stays under 200ms.
