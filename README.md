# percivalmahwaya.github.io

Personal portfolio. Five static pages, no framework, no build step.

**Live:** https://percivalmahwaya.github.io

## Running it

There is nothing to install and nothing to build.

```bash
python -m http.server 8840      # then open http://localhost:8840
```

Edit a file, reload the browser. Deploy is `git push` — GitHub Pages serves the repo as-is.

## Measured weight

Homepage, first visit, measured in a real browser on 2026-10-11 (not estimated):

| | Requests | Transferred |
|---|---|---|
| Before the redesign | 13 | **786.9 KB** |
| After | 4 | **66.7 KB** |

A **91.5% reduction.** Most of the old weight was framework and icon-font payload that nothing on
the site actually used: Bootstrap CSS (156.5 KB), two Font Awesome webfonts (224.8 KB combined),
Font Awesome's CSS (82 KB), jQuery (70.7 KB), Bootstrap JS (58.6 KB) and Popper (17.9 KB), pulled
from four separate third-party origins. All of it is gone. The remaining pages are 22–30 KB each.

## Layout

```
index.html  about.html  projects.html  certifications.html  contact.html
css/site.css          all tokens, both themes, every component
js/site.js            theme toggle + mobile nav (enhancement only)
js/projects.js        project data + card rendering
js/certification.js   credential data + card rendering
assets/images/        photo
docs/                 the planning package — read this before changing anything
```

## Before you change anything

The design is specified, not improvised. `docs/` holds the package that was written **before** the
redesign was built:

| File | What it governs |
|---|---|
| `docs/BRIEF.md` | Who the site is for, what must be true when it is done, what is deliberately not built |
| `docs/INVARIANTS.md` | 12 non-negotiable rules. Breaking one is a defect, not a trade-off |
| `docs/DESIGN_SYSTEM.md` | Colour (with measured contrast ratios), type, spacing, every component state |
| `docs/IMPLEMENTATION_PLAN.md` | Build order and the acceptance check for each phase |
| `docs/decisions/` | Architecture decision records — why no framework, why two themes, why the shell is inlined |

The three that catch people out:

- **Invariant 2 — every number traces to a named source.** A stat without a visible source line
  does not ship.
- **Invariant 3 — a weakness is never hidden to make a number look better.** The FPL caveat on the
  homepage is deliberate.
- **Invariant 6 — no colour may be defined only inside a media query or `[data-theme]` block.**
  That bug renders one theme's text on the other theme's background, and only for readers whose
  OS is set to "system", which is most of them.

## Verifying a change

Changes are verified in a real browser, not read for correctness — this site has already produced
one bug (a 1.09 px sliver of the skip link peeking above the viewport) that was invisible in the
source and obvious on render.

Check, at minimum: all five pages, both themes, 1440 px and 390 px, zero console errors, no
horizontal page scroll, the theme toggle round-trips and survives a reload, and the nav is still
present with JavaScript disabled.

## v2 tooling
- `python tools/facts.py --check` fails if any page disagrees with `data/accuracy.json`.
- `node tools/matrix.mjs` runs every page across engines, themes and widths (needs a server on :8080).
- `.github/workflows/checks.yml` runs facts, Nu, Lighthouse CI, axe, the matrix and a link check on every push.
- Docs: `docs/EVIDENCE.md`, `docs/READER_TESTS.md`, `docs/decisions/0004-v2-evidence-led-rebuild.md`.
