# 0003 — Inline the header and footer into every page

**Status:** Accepted, 2026-10-11.
**Supersedes:** the `includeHTML()` / `fetch()` pattern in `js/projects.js`,
`js/certification.js` and `js/script.js`.

## Context

The current site keeps `includes/header.html` and `includes/footer.html` as separate files and
injects them on every page after load:

```js
fetch(file).then(r => r.text()).then(d => { document.getElementById(id).innerHTML = d; });
```

This is DRY, and it has four real costs:

1. **The navigation is not in the delivered HTML.** View-source on any page shows an empty
   `<div id="header-placeholder">`. Anything reading the page without executing JavaScript — a
   crawler that does not run scripts, a reader-mode parser, a browser with JS blocked — sees a page
   with no navigation at all.
2. **It flashes.** The header renders on a second paint, after a network round trip, on every
   single page load.
3. **It shifts layout.** Content is laid out, then pushed down when the header lands. This is the
   exact cumulative-layout-shift failure mode, self-inflicted.
4. **It fails silently.** The `.catch()` logs to console and leaves the page navigationless, with
   nothing visible to the reader explaining why.

None of that is worth avoiding ~20 lines of duplicated markup across five pages.

## Decision

Header and footer markup is written directly into each of the five HTML pages. The `includes/`
directory and the `includeHTML()` helper are removed.

## Alternatives considered

**Keep `fetch()` but render a static fallback nav underneath it.** Rejected — strictly more code
than inlining, and now two copies of the nav that can disagree.

**Server-side includes / Jekyll layouts.** GitHub Pages does run Jekyll, so `{% include %}` would
work with no local build step and would genuinely solve the duplication. Rejected for now because
it couples the repo to Jekyll's build on GitHub's side — a category of failure that is invisible
locally and only shows up as a broken deploy, which is precisely the failure mode this project
family has been bitten by repeatedly. Reconsider alongside the build-step question in
`decisions/0001` if the page count grows.

**A small Node script that stamps the shell into each page.** Rejected — that is a build step, see
`decisions/0001`.

## Consequences

- Navigation is present, correct, and stable in the delivered HTML of every page. Satisfies
  invariant 5.
- A nav change means editing five files. Accepted: it is a five-line edit on a site whose
  navigation changes roughly never, and the alternative costs every reader a layout shift on every
  page view.
- One fewer network request per page, and one fewer failure mode.
- The "current page" nav state becomes a per-page `aria-current="page"` attribute written into the
  markup, which is simpler and more accessible than deriving it from `location.pathname` in JS.
