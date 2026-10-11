# BRIEF — portfolio redesign

**Status:** approved, in build. **Written:** 2026-10-11, before any redesign code.
**Scope decision:** whole site in one pass (Percival's call, 2026-10-11).

This is the scaled-down version of the planning standard in
`feedback_planning_rigor_standard.md` — a personal 5-page static site does not need 22 documents.
It gets five: this brief, `INVARIANTS.md`, `DESIGN_SYSTEM.md`, `IMPLEMENTATION_PLAN.md`, and
`decisions/` (ADRs). Everything the build does traces back to one of them.

---

## 1. WHAT THIS SITE IS FOR

One job: **convince a specific reader, in under a minute, that Percival builds and ships real
working systems** — then give them a way to verify it without taking his word for anything.

Not a CV. Not a blog. Not a design showcase. The CV exists separately; this site's job is the
part a CV cannot do — showing live, running, inspectable work.

## 2. THE READER

Three real audiences, in priority order. Where they conflict, the earlier one wins.

| # | Reader | Arrives from | What they need in 30 seconds |
|---|---|---|---|
| R1 | **Hiring manager / recruiter** — DevOps, data, or platform role | LinkedIn, CV link, direct | Is this person real? What have they actually shipped? Can I click something live? |
| R2 | **PhD supervisor / research contact** | Email, LinkedIn, academic referral | Is there real research substance? Methodology, results, a thesis? |
| R3 | **Peer / collaborator** — another builder | GitHub, a shared link | What does he work with? Is the code open? |

**Explicit non-reader:** a general audience browsing for design inspiration. The site does not
need to be a portfolio-of-portfolios showpiece; it needs to be *credible*.

## 3. THE CORE PROBLEM WITH THE CURRENT SITE

Not that it looks dated — that it **under-sells verifiable work**. Diagnosed by reading the
current pages (2026-10-11):

1. The homepage's two featured projects are a university team dashboard and the MSc thesis app
   — the thesis one matters, but neither is his most substantial *engineering* work. bcaChessHub
   (260 tests, live, real users) and the FPL engine (automated twice-daily pipeline, live-scored
   model) are reachable only by clicking through to a third page.
2. The claim-to-evidence ratio is backwards. The site asserts "2 LIVE deployed apps" and "5
   certifications" but doesn't show *what shipping actually looks like* for any of them.
3. It is heavy for what it renders: Bootstrap 4 CSS + jQuery + Popper + Bootstrap JS + the full
   Font Awesome CDN, for a five-page static site with no components that need any of it.
4. Header and footer are injected by `fetch()` after load — so the navigation does not exist in
   the delivered HTML, flashes in on every page, and shifts layout.

## 4. WHAT MUST BE TRUE WHEN THIS IS DONE

The acceptance test, written before the build. Each is checkable, not a matter of taste:

1. A reader landing on the homepage can see **bcaChessHub, the FPL engine and OSP Scout** without
   clicking anything — all three are live, all three are his own.
2. Every number on the site traces to a **named source** — a repo, a live URL, a generated facts
   block, or a dated document. No unsourced superlatives.
3. The site renders correctly in **both light and dark** (Percival's explicit call — see
   `decisions/0002`), in all four states: system-light, system-dark, toggled-light, toggled-dark.
4. **No framework, no build step, no CDN dependency** — consistent with every project he shipped
   this year (see `decisions/0001`).
5. Navigation is present in the **delivered HTML** of every page, works with JS disabled, and
   does not shift layout on load.
6. Every page works at **390px wide** (his own phone-first reality and most recruiters' first look).
7. Zero console errors on every page, verified in a real browser, both themes.

## 5. WHAT IS DELIBERATELY NOT BEING BUILT

Named here so it does not creep back in mid-build:

| Not building | Why |
|---|---|
| A blog / writing section | Nothing to put in it today. An empty blog is worse than none — it dates the site the moment a reader sees the last post was months ago. |
| A contact form | Needs a backend or a third-party endpoint; email + LinkedIn already work and cost nothing. |
| Analytics / tracking | A third-party script on a 5-page personal site buys nothing he will act on. |
| Scroll-progress bar, back-to-top, floating CTA | Long-form and lead-capture patterns. The longest page here is one screen of scrolling past the hero. |
| Hero imagery / background video | Weight with no information in it. |
| Animated page transitions | Fragile without a framework, and a reader clicking "Projects" wants Projects. |
| A testimonials section | He has no quotable testimonials. Inventing or soliciting filler ones would undercut the one thing this site is for. |

## 6. OPEN ITEMS NEEDING PERCIVAL, NOT ME

1. **The chess-economics artifact is private.** Its "Live App" link on the projects page will not
   resolve for a visitor until he opens the artifact and clicks Share. Flagged twice already.
2. **The `cv` link** — `reference_github_and_live_urls.md` records it as still dead. Either a real
   PDF goes somewhere linkable or the link comes off the site.
3. **A current photo.** The existing `assets/images/photo.jpg` is reused; if he wants a different
   one, it's a drop-in replacement.
4. **FPL engine framing** — he asked for it marked **work in progress**, which is honest and is
   what the stats grid will say. Worth his eye on the exact wording, since it is the one stat
   where the honest version includes a weakness (see `INVARIANTS.md` #3).
