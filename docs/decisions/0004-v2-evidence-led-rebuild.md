# 0004: v2 rebuild, evidence-led

**Status:** Proposed, 2026-10-19. Branch `portfolio-v2`. Not merged.

## Context
v1 carried numbers that had gone stale or were false: "twice a day" (the cron runs every 3 hours),
"91 KB page", "0 dependencies" for an app that loads React and Babel from unpkg, a gameweek-5 MAE
that was no longer the latest, a second OSP Scout URL, and a Design Patterns card whose repo holds
only a README. The reference site (knowledgemhodi.co.zw) was audited as raw HTML, not as a summary.

## Decisions
1. **One positioning:** "Data and platform engineer". The Keywords Studios QA role stays on About as
   current employment. It is not hidden (invariant 3). Needs the owner's confirmation.
2. **Facts tooling** (`tools/facts.py`, `data/accuracy.json`, invariant 14). A scheduled workflow
   refreshes the data and fails the build on drift.
3. **Case studies** for the three live systems, each with problem, constraint, decisions, result and
   what went wrong, drawn from each repo's own ledger.
4. **Research section** for the thesis, with the AUC-ROC comparison as an accessible table.
5. **Screenshots** from a real browser, each captioned with what it is (live, local build, fixture).
6. **Removed:** the Design Patterns card (no code in repo), the public phone number, the diploma
   number. Reversible. Listed in the final report as owner decisions.
7. **Relocation line** (Ireland/Australia): not added. Owner decision.
8. Invariants 1 to 12 are unchanged. 13 and 14 are appended.

## Consequences
Every number on the site is either generated, sourced, or labelled self-reported.
CI cost: Lighthouse, axe, Nu, Playwright (3 engines), link check on every push.
