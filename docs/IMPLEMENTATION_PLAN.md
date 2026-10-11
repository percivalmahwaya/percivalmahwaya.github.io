# IMPLEMENTATION PLAN

Build order, with an acceptance check per phase. A phase is not done until its check passes.

---

## Phase 0 — Planning (DONE, 2026-10-11)

`BRIEF.md`, `INVARIANTS.md`, `DESIGN_SYSTEM.md`, this plan, and ADRs 0001–0003, all written
before any redesign code. Contrast ratios computed, not estimated.

**Check:** every later phase can point at a document for why it does what it does. ✅

---

## Phase 1 — CSS foundation

New `css/site.css`: the full token set for both themes (bare `:root` light, `prefers-color-scheme`
dark guarded against an explicit light choice, `[data-theme]` stamps for both directions), the
type scale, the spacing scale, base element styles, focus rings, reduced-motion and print blocks.

**Check:** no colour is declared only inside a media query or `[data-theme]` block — the classic
unreadable-artifact bug. Grep for it before moving on.

## Phase 2 — The shell

Header (brand, nav, theme toggle, mobile disclosure) and footer, written inline into each page per
ADR 0003. The anti-flash theme stamp as a blocking inline script in `<head>`. Delete
`includes/` and every `includeHTML()` call.

**Check:** view-source on each page shows the real nav markup. Page renders with JS disabled, nav
intact. No layout shift on load. `localStorage` wrapped in try/catch.

## Phase 3 — Homepage

In order down the page:

1. **Hero** — the name (Archivo bold / Fraunces italic), the identity block, the gold rule sweep,
   role tags, scroll cue. Carried over from the 2026-10-10 draft, re-tokenised for both themes.
2. **`(01) INTRODUCTION`** — short prose, photo inline, no progressive reveal (see design system §6).
3. **`(02) BY THE NUMBERS`** — the sourced-stats grid. Every figure carries a source line.
4. **`(03) SELECTED WORK`** — case-study cards for bcaChessHub, the FPL engine, OSP Scout. Live
   dots, two real stats each, link out.
5. **`(04) ELSEWHERE`** — contact / links.

**The stats grid content, with its sources — settled now so it cannot drift mid-build:**

| Figure | Caption | Source line | Note |
|---|---|---|---|
| `1.048` | Mean absolute error, FPL model, GW5 — against 1.150 and 1.205 for both baselines | `accuracy.json`, live-scored, percivalmahwaya.github.io/fpl-decision-engine | **Marked work in progress** at Percival's explicit instruction. Best overall error of the three models, and **worst on high-returning players (5.116 vs 4.500)** — both halves ship, per invariant 3 |
| `260` | Automated tests, Bulawayo Chess Hub | generated facts block, 2026-10-01 | |
| `4.79` | MSc Data Science GPA, out of 5.0 | Akademia WSB diploma, June 2026 | |
| `6` | Years in law-enforcement IT, Zimbabwe | Ministry of Home Affairs, 2013–2019 | |

**Check:** all three headline projects visible without clicking (brief §4.1). Every stat has a
visible source. The FPL caveat is present. Live links actually fetched and confirmed responding
(invariant 4).

## Phase 4 — Remaining pages

`about.html`, `projects.html`, `certifications.html`, `contact.html` — same shell, same tokens,
content preserved. `js/projects.js` and `js/certification.js` keep their data arrays; only the card
templates are restyled, and the "Private repo" branch added on 2026-10-11 is preserved.

**Check:** no page still references Bootstrap, jQuery, Popper or Font Awesome. No `href="undefined"`
anywhere. Skills/cert data unchanged from before the redesign.

## Phase 5 — Verification, in a real browser

Not read-for-correctness (invariant 9). Playwright, five pages × four theme states:

- system-light, system-dark, toggled-light, toggled-dark
- 1440×900 and 390×844
- zero console errors on every combination
- no horizontal body scroll at 390px
- toggle round-trips and survives a reload
- screenshots reviewed directly, both themes

**Check:** all of the above, with the screenshots actually looked at — this project family has
repeatedly found bugs invisible in source and obvious on render.

## Phase 6 — Measure, then ship

Measure real transferred weight per page and record it in `README.md` as a fact, not a guess.
Commit, push, then confirm live via `curl` against the public URL — a green push is not a verified
deploy.

**Check:** the live page contains a string only the redesign produces.

---

## Outcome (2026-10-11)

Phases 0–5 complete and verified; phase 6 measured, awaiting Percival's go-ahead to push.

**Measured, not estimated:** homepage **786.9 KB → 66.7 KB** (13 requests → 4), a 91.5%
reduction. Other pages 22–30 KB. The old weight was almost entirely framework and icon-font
payload nothing on the site used.

**Three real findings the process produced:**

1. **A skip-link sliver.** The link was hidden with `top: -3rem` but measured 49.09 px tall, so
   1.09 px of its gold border sat visible at the top-left of every page, in both themes. Invisible
   in source, obvious on render. Re-hidden with a height-independent transform so it cannot recur
   if the font or padding changes.
2. **A live claim that was not true.** Invariant 4 forced an actual fetch of every URL before
   badging it. The Crime Hotspot DSS — his MSc thesis app, linked from the portfolio *and* his
   LinkedIn — returns **HTTP 303 to a login wall**, so it is not publicly reachable. It is no
   longer marked live. Without the invariant this would have shipped as a working link again.
3. **A label that was accurate but wrong.** The chess economics report fell through to the
   "Private repo" branch, implying a repo exists and is hidden. There is no repo — the report
   *is* the output. Now labelled explicitly rather than inferred.

**Deliberately left alone:** the `photo.jpg` original is overwritten in the working tree
(960×1280 colour → 440×550 greyscale, 158 KB → 36.6 KB, since CSS renders it greyscale at 220 px).
The colour original remains in git history if it is ever wanted back.

---

## Rollback

The current site is committed and live. Every phase is additive or replaces a file already in git
history, so `git revert` on the redesign commit restores the working site. Nothing is deleted that
is not recoverable from history. No force-push at any point.

## Out of scope for this build

Per `BRIEF.md` §5: blog, contact form, analytics, scroll-progress, back-to-top, hero imagery, page
transitions, testimonials. Listed again here because mid-build is exactly when these creep in.
