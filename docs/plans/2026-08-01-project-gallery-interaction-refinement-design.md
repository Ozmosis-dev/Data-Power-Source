# Project Gallery Interaction Refinement

## Design read

Targeted evolution of a technical B2B portfolio for facilities and procurement teams. Preserve the existing editorial gallery and navy brand system, then add clearer interaction feedback and a more useful industry overview.

Design variance is 7, motion intensity is 5, and visual density is 5.

## Project-card interaction

Use the brighter DPS blue as a photographic color wash that fades in behind the existing dark readability scrims. The card rises four pixels, the image scales slightly, the copy shifts two pixels, and the arrow responds with a small diagonal movement. A short blue rule expands beneath the market label to connect the hover state with the site's technical line language.

Only transform and opacity animate. Keyboard focus receives the same blue treatment. Reduced-motion users retain the color feedback but receive no spatial movement.

## Industry rail

Replace the decorative dot list with a compact six-cell market rail inspired by the icon-led Industry cards on the homepage and the tightly grouped Discipline Strip. Each cell contains a Phosphor icon, market name, and verified number of represented projects.

The rail uses one connected grid with gap-pixel dividers rather than six detached pills. It stays inside the hero's existing navy theme, uses the brighter blue for icons and counts, and collapses from six columns to three and then two columns on small screens.

The cells are informational rather than links because the gallery does not currently support market filtering and the Industries route is not yet complete.

## Verification

- Confirm the overlay uses the bright brand-blue token and becomes visible on hover and keyboard focus.
- Confirm spatial transforms are removed under reduced motion.
- Confirm six market cells, icons, and verified counts render.
- Confirm the market rail uses six columns on desktop and two on a 390px viewport.
- Confirm the gallery remains free of horizontal overflow.
