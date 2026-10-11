# DESIGN SYSTEM

Authoritative on colour, type, spacing and component states. Every value here is a token in
`css/site.css`; nothing in the markup carries a literal colour.

---

## 1. CONCEPT

**Editorial, not promotional.** The site reads like a dossier someone compiled — numbered
sections, sourced figures, evidence under every claim — rather than a landing page selling a
service. That choice comes straight from the brief: the reader's question is *"is this real?"*,
and the format that answers it is a document, not an advert.

Structural devices earn their place or are cut. Section numbers are used because the page has a
genuine reading order (who he is → what the numbers are → what he built → how to reach him), and
removing a number would lose that. Source lines under statistics are used because invariant 2
requires them. Nothing decorative is numbered.

## 2. COLOUR

Verified with a WCAG contrast calculation on 2026-10-11 — not eyeballed (invariant 12). Ratios
below are against each value's own surface.

### Dark theme — ground `#0D0D0B`

| Token | Value | Role | Contrast |
|---|---|---|---|
| `--ground` | `#0D0D0B` | page background | — |
| `--raised` | `#141412` | cards, elevated surfaces | — |
| `--ink` | `#F2EFE8` | body + headings | **16.94** ✓ AAA |
| `--muted` | `#9A9484` | captions, labels, source lines | **6.43** ✓ AA |
| `--line` | `#2A2820` | rules, card borders | — |
| `--accent` | `#D9A753` | emphasis, links, the italic surname | **8.90** ✓ AAA |

### Light theme — ground `#F7F5F0`

| Token | Value | Role | Contrast |
|---|---|---|---|
| `--ground` | `#F7F5F0` | page background | — |
| `--raised` | `#FFFFFF` | cards, elevated surfaces | — |
| `--ink` | `#17160F` | body + headings | **16.64** ✓ AAA |
| `--muted` | `#605B4C` | captions, labels, source lines | **6.22** ✓ AA |
| `--line` | `#E0DCD2` | rules, card borders | — |
| `--accent` | `#8A5D16` | emphasis, links, the italic surname | **5.27** ✓ AA |
| `--accent-flat` | `#D9A753` | decorative fills ONLY — never text | 2.01 ✗ |

**The accent is two different hexes by necessity, not preference.** `#D9A753` measures **2.01** on
the light ground — a hard fail — and `#9A6B1F` still only reaches 4.29, under the 4.5 AA floor.
`#8A5D16` is the lightest gold that passes. `--accent-flat` exists so the original brass can still
be used for non-text decoration (the rule sweep, a status dot) on light, where contrast rules do
not apply. **Never set text in `--accent-flat`.**

### Semantic

| Token | Dark | Light | Role |
|---|---|---|---|
| `--live` | `#5FBF7F` | `#1F7A3D` | the live-status dot |

Status is never conveyed by colour alone (invariant 10): a live project carries the word "Live"
next to its dot, and the dot has a ring so it survives greyscale.

### Provenance

The gold is the exact dark-mode brass already used in the "Below 2700" chess economics report —
reused on purpose. It is his own established accent, not a colour borrowed from the reference site,
whose palette this deliberately does not copy.

## 3. TYPE

Four faces, each with a distinct job and a real fallback stack. Loaded from Google Fonts, the one
external origin invariant 1 permits.

| Token | Face | Used for |
|---|---|---|
| `--display` | **Archivo** 500/700/900 | the name, section headings, stat figures |
| `--script` | **Fraunces** italic 500/600 | emphasis words only — the surname, one or two pulled phrases |
| `--sans` | **IBM Plex Sans** 400/500/600 | all body copy |
| `--mono` | **IBM Plex Mono** 400/500 | section labels, tags, source lines, the identity block |

**The defining device** is the display/script pair: a heavy grotesque set against an italic serif,
used on the name and sparingly afterwards. Taken as a *technique* from the reference site; the
specific faces are not its faces.

Plex Sans and Plex Mono are the same body and data faces as the chess economics report — personal-
brand consistency across his own work rather than a fresh choice per project. Archivo + Fraunces is
the one genuinely new pairing.

### Scale

Fluid via `clamp()`, so no breakpoint-specific font sizes:

| Step | Size | Use |
|---|---|---|
| `--t-hero` | `clamp(3rem, 11vw, 7.5rem)` | the name |
| `--t-h2` | `clamp(1.75rem, 4vw, 2.75rem)` | section headings |
| `--t-h3` | `clamp(1.15rem, 2vw, 1.4rem)` | card titles |
| `--t-stat` | `clamp(2.25rem, 5vw, 3.25rem)` | stat figures |
| `--t-body` | `1.0625rem` | body copy |
| `--t-small` | `0.875rem` | captions |
| `--t-label` | `0.75rem` | mono labels, uppercase, `0.14em` tracking |

Running text is capped at `68ch`. Headings get `text-wrap: balance`. Stat figures get
`font-variant-numeric: tabular-nums`.

## 4. LAYOUT

- Single column, `max-width: 1180px`, gutter `clamp(1.25rem, 5vw, 4rem)`.
- Sibling groups laid out with grid/flex and `gap` — never per-element margins (no collapse bugs).
- Spacing scale: `0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4.5 / 7rem`.
- Section rhythm: a mono label row (`(01) ── INTRODUCTION`), a hairline rule, then content.
- Stat and case-study grids: `repeat(auto-fit, minmax(…, 1fr))`, so they reflow with no media query.

## 5. COMPONENTS AND THEIR STATES

| Component | States |
|---|---|
| Nav link | rest · hover (accent) · `aria-current="page"` (accent + underline) · focus-visible ring |
| Theme toggle | shows the icon for the theme it will switch *to*; `aria-label` updates with it |
| Mobile nav | closed · open; `aria-expanded` maintained; closes on Escape and on link activation |
| Stat block | figure · caption · **source line** (mono, muted) — the source line is not optional |
| Case-study card | rest · hover (border lifts to accent, slight raise) · live dot + "Live" label |
| Project card | as above, plus the no-public-repo variant showing "Private repo" instead of a dead link |
| Link | rest (accent, underline offset) · hover (underline thickens) · focus-visible ring |
| Tag | static; mono, hairline border, no hover (not interactive, must not look it) |

Focus is never removed — `:focus-visible` gets a 2px accent ring at 2px offset throughout.

## 6. MOTION

Deliberately sparse; over-animation is itself a tell of generated design.

1. **Hero rule sweep** — the gold rule under the name draws across once on load.
2. **Scroll cue** — a small bobbing arrow in the hero footer, loops.
3. **Card hover** — 160ms border/transform lift.

Nothing else moves. No scroll-triggered reveals (they hide content from anyone whose JS fails
and add weight for an effect the reader sees once). Every animation sits behind
`@media (prefers-reduced-motion: reduce)`, which disables all three.

## 7. PRINT

A reader printing this is printing a CV substitute. Print styles force the light palette, drop
the nav/toggle/scroll-cue, and show link URLs after their text.
