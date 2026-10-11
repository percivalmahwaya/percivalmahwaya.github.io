# 0002 — Light and dark themes, with an explicit toggle

**Status:** Accepted, 2026-10-11. **Decided by Percival**, against the recommendation on record.

## Context

The hero draft built on 2026-10-10 was committed to single-theme dark, matching the reference site
and matching every other surface Percival has shipped this year (the chess economics report, the
FPL engine's static site, OSP Scout — all dark-only by deliberate choice). The question of whether
the full site should stay dark-only was deliberately left open rather than decided unilaterally.

Asked directly on 2026-10-11, Percival chose **light and dark with a toggle.**

## Decision

The site ships a complete light palette and a complete dark palette, plus a visible toggle. Light
is the base defined on bare `:root`; dark is applied by `prefers-color-scheme` and by an explicit
`[data-theme="dark"]` stamp, so an explicit choice beats the OS preference in both directions.

## Alternatives considered

**Dark-only (my recommendation, not taken).** Argued for on the grounds that it matches the
reference, matches his own established body of work, and halves the design and verification
surface. Percival chose otherwise; recorded here so the reasoning is not lost and so a future
session does not silently "restore" dark-only as if it were an oversight.

**Dark-only with no toggle but a light print stylesheet.** Rejected — solves printing, not the
actual request.

**Respect `prefers-color-scheme` only, with no toggle.** Rejected. It is less code, but it leaves a
reader who wants the other theme with no recourse, and the toggle is most of the remaining work
once both palettes exist anyway.

## Consequences

- Every colour must be defined twice, and the gold accent cannot be the same hex in both: `#D9A753`
  has acceptable contrast on a near-black ground and fails on an off-white one, so the light theme
  uses a darkened gold for any text-weight use (invariant 12).
- Four states must be verified, not two: system-light, system-dark, toggled-light, toggled-dark.
  This is the single largest addition to the QA pass.
- The toggle needs `localStorage`, which can throw. Wrapped in try/catch, and the page must render
  correctly with no stored value (invariant 7).
- A theme stamp applied by JavaScript after first paint causes a visible flash of the wrong theme.
  The stamp is therefore applied by a small blocking inline script in `<head>` — which is the one
  deliberate exception to the "no inline script" instinct, and it exists specifically to prevent
  that flash.
