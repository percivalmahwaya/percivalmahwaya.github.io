# INVARIANTS

Violating one of these is a defect, not a trade-off. Referenced by number from the other
documents and from code comments. Added to only by appending — never renumber, never edit one
into meaning something else.

---

**1. No framework, no build step, no runtime CDN dependency.**
Every byte the browser loads is served from this repo. No Bootstrap, no jQuery, no icon font, no
analytics, no remote script or stylesheet. The one allowed external origin is Google Fonts, and
every face it serves has a real system fallback stack so the page is fully readable if it never
arrives. Rationale and alternatives in `decisions/0001`.

**2. Every number on the site traces to a named, checkable source.**
A stat without a source line does not ship. "Source" means a repo, a live URL, a dated generated
facts block, or a named document — not "trust me". Where a figure has an as-of date, the date is
shown.

**3. A weakness is never hidden to make a number look better.**
If the honest version of a claim includes a caveat, the caveat ships with it. The FPL engine beats
both baselines on overall prediction error *and* loses to them on high-returning players; both
halves appear, or neither does. This is the whole reason the site is credible rather than just
confident.

**4. Nothing is claimed as live that is not verified live — and for an app, verified means loaded
in a real browser.**
Before any "LIVE" badge or live link ships, the URL is confirmed to actually serve the thing it
claims to. A link that requires a login, or an artifact that has not been shared, is not live — it
is labelled accurately or it is not linked.

**A status code is not a verification.** This rule was violated by the very first check run under
it: a bare `curl` of the Crime Hotspot DSS returned `303` to a Streamlit auth endpoint, which was
read as a login wall and shipped as "not live". Loading it in a browser showed a fully working
public app — the redirect is a cookie handshake every browser completes automatically. For any
JavaScript application, open it and look at it; `curl` can only prove a server answered, never
that a reader gets the page.

**5. Navigation exists in the delivered HTML of every page.**
No `fetch()`-injected header or footer. The nav must work with JavaScript disabled and must not
shift layout on load. Rationale in `decisions/0003`.

**6. Both themes are complete, and neither is an afterthought.**
Every colour is defined as a token on bare `:root` (light), redefined for dark under
`prefers-color-scheme` guarded against an explicit light choice, and redefined again under an
explicit `[data-theme="dark"]`. No colour may have its only definition inside a media query or a
`[data-theme]` block. All four states — system-light, system-dark, toggled-light, toggled-dark —
render correctly. Rationale in `decisions/0002`.

**7. The theme toggle degrades silently.**
`localStorage` can throw (private windows, blocked site data). Every read and write is wrapped,
and with no stored value the page renders correctly on the system preference. A broken toggle must
never produce an unreadable page.

**8. Every page works at 390px wide.**
No horizontal page scroll at any width. Wide content (tables, code) scrolls inside its own
container, never the body.

**9. Zero console errors, verified in a real browser.**
Not read-for-correctness — actually loaded, in both themes, on every page, before anything is
pushed. This project family has repeatedly found bugs that are invisible in source and obvious on
render.

**10. Accent colour carries emphasis only; it is never the only signal.**
A live-status dot, a tag, a link — each is distinguishable without relying on hue alone, so the
page survives a colour-blind reader and a greyscale print.

**11. No invented, padded, or placeholder content ships.**
No lorem, no fake testimonials, no rounded-up metrics, no project that does not exist. An empty
section is deleted, not filled.

**12. Contrast is checked, not eyeballed.**
Body text and any text-weight accent usage meets WCAG AA (4.5:1) against its own surface in both
themes. The gold accent is lightened for dark grounds and darkened for light grounds precisely
because the same hex cannot pass on both.

**13. Self-reported figures are labelled self-reported.**
A number with no machine or document source (years of service, grades, diploma details) carries the
words "Self-reported" beside it. It is never styled as if a script produced it. Added in v2, ADR 0004.

**14. Numbers with a machine source are written by `tools/facts.py`, not by hand.**
Any element carrying `data-fact="key"` is rewritten from `data/accuracy.json`. CI runs
`python tools/facts.py --check` and fails on drift. Added in v2, ADR 0004.
