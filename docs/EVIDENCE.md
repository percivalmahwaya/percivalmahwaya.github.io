# Evidence log, 2026-10-19

| Check | Result | How |
|---|---|---|
| facts drift | pass | `python tools/facts.py --check` |
| Nu validator, 8 pages | 0 errors | vnu-jar 23.4.11, `--errors-only` |
| axe-core 4.x, 8 pages x 2 themes x 2 widths | 0 violations | Chromium |
| Lighthouse, 8 pages | perf 98-100, a11y 100, best-practices 96, SEO 100 | local server, Fonts stubbed (sandbox cannot reach Google Fonts) |
| Playwright Chromium, 8 pages x 2 themes x 2 widths | 32/32, no console errors, no horizontal overflow | `tools/matrix.mjs` |
| Playwright Firefox, WebKit | NOT RUN here (sandbox has Chromium only). CI runs them. | |
| internal links and fragments | 108 refs, 0 broken | scripted |
| external links | NOT CHECKED here (sandbox allowlist). CI runs lychee offline mode only. | |
| LinkedIn Post Inspector | NOT RUN (needs a public URL) | |

## Unsourced or self-reported numbers on the site
Six years in law-enforcement IT (2013 to 2019). MSc 4.79 and BSc 4.39 grades on About. Keywords Studios figures on About (200+ weekly test cases, 500+ bugs, 97%, 95%). Labelled self-reported on the homepage; About still needs labels (see final report).
