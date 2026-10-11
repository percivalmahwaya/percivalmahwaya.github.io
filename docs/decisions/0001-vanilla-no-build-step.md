# 0001 — Vanilla HTML/CSS/JS, no framework, no build step

**Status:** Accepted, 2026-10-11.
**Supersedes:** the current site's Bootstrap 4 + jQuery + Popper + Font Awesome CDN stack.

## Context

The redesign is modelled on knowledgemhodi.co.zw, which is built on Next.js/React/Tailwind. The
obvious move is to match the reference's stack. The current site already carries a different
framework stack (Bootstrap 4) loaded entirely from CDNs.

What the site actually needs to render: five static pages, a theme toggle, a mobile nav, and a
list of project cards generated from a data array. There is no routing, no state management, no
form handling, no authentication, no data fetching.

The measured cost of the current stack, for that: `bootstrap.min.css` ~227 KB, Font Awesome's full
CSS plus its font files, jQuery ~85 KB, Popper, and `bootstrap.min.js` — all blocking, all from
four separate third-party origins, to render pages whose own content is a few KB of text.

## Decision

Vanilla HTML, CSS and JavaScript. No framework, no bundler, no build step, no runtime CDN
dependency except Google Fonts (with real fallback stacks). Icons are inline SVG, drawn only
for the handful actually used.

## Alternatives considered

**Next.js + Tailwind (match the reference).** Rejected. It would introduce a build step and a
`node_modules` tree to a site that is currently `git push` and it is live on GitHub Pages. None of
React's actual strengths — component state, client routing, data fetching — are exercised by five
static pages. The reference site's stack is a consequence of its builder's other work, not a
requirement of the look; nothing visual in it depends on React.

**Keep Bootstrap, restyle it.** Rejected. The redesign's type scale, spacing and colour system all
diverge from Bootstrap's, so the framework would be fought rather than used, while still shipping
its full weight. This is the same conclusion bcaChessHub reached in September, where removing
Bootstrap cut the home page from 329 KB to 19 KB.

**A light build step (just a CSS minifier, or templating for the shared header).** Rejected for
now. It solves a problem — duplicated header markup across five pages — that is genuinely small at
five pages, and it costs the property that makes this repo pleasant: any file can be opened and
edited with no toolchain. Revisit if the site passes roughly a dozen pages.

## Consequences

- The site stays deployable by `git push` to GitHub Pages, with no CI, no install, no lockfile.
- Page weight drops by a large multiple; the exact figure is measured after the build, not
  predicted here.
- Header and footer markup is duplicated across five pages. Accepted deliberately, and it is the
  direct trade for invariant 5 — see `decisions/0003`.
- No component abstraction. If a pattern appears a fourth time, that is the signal to reconsider,
  not before.
- **This is the same choice already made, independently, on every project shipped this year** —
  the FPL engine's static site, OSP Scout, the chess economics report. The consistency is the
  point: it is a demonstrated position, not a limitation worked around.
