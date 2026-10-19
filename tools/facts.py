#!/usr/bin/env python3
"""Recompute every number on the site that has a machine source.

Source of truth: data/accuracy.json (a copy of the FPL engine's published file).
Targets: any element carrying data-fact="<key>" in the HTML files. Its text is
replaced with the computed value.

  python tools/facts.py            rewrite the HTML in place
  python tools/facts.py --check    exit 1 if any page is out of date (CI)
  python tools/facts.py --print    show the computed facts
"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
acc = json.loads((ROOT / "data" / "accuracy.json").read_text())
CH = acc["champion"]

def rows(model):
    return [r for r in acc["scored"] if r["model"] == model]

def pooled(model, key):
    rs = rows(model)
    return sum(r[key] * r["n"] for r in rs) / sum(r["n"] for r in rs)

last = max(r["gameweek"] for r in acc["scored"])
at = lambda m, k: next(r[k] for r in acc["scored"] if r["gameweek"] == last and r["model"] == m)
base = [m for m in ("form_fdr", "naive_form")]
gws = sorted({r["gameweek"] for r in acc["scored"]})

F = {
    "fpl_gw": str(last),
    "fpl_mae": f"{at(CH,'mae'):.3f}",
    "fpl_mae_base_a": f"{at('form_fdr','mae'):.3f}",
    "fpl_mae_base_b": f"{at('naive_form','mae'):.3f}",
    "fpl_hr": f"{at(CH,'mae_high_return'):.3f}",
    "fpl_hr_base_lo": f"{min(at(m,'mae_high_return') for m in base):.3f}",
    "fpl_hr_base_hi": f"{max(at(m,'mae_high_return') for m in base):.3f}",
    "fpl_pooled_mae": f"{pooled(CH,'mae'):.3f}",
    "fpl_pooled_base": f"{min(pooled(m,'mae') for m in base):.3f}",
    "fpl_gw_count": str(len(gws)),
    "fpl_gw_range": f"{gws[0]} to {gws[-1]}",
    "fpl_rows": f"{sum(r['n'] for r in rows(CH)):,}",
    "fpl_wins_hr": str(sum(1 for g in gws if at.__call__ and
        next(r['mae_high_return'] for r in rows(CH) if r['gameweek']==g) <
        min(next(r['mae_high_return'] for r in rows(m) if r['gameweek']==g) for m in base))),
}
# which models have scored all gameweeks
if "--print" in sys.argv:
    print(json.dumps(F, indent=2)); sys.exit(0)

pat = re.compile(r'(<(\w+)[^>]*\bdata-fact="([\w]+)"[^>]*>)(.*?)(</\2>)', re.S)
stale = []
for p in sorted(ROOT.glob("*.html")):
    s = p.read_text()
    def sub(m):
        k = m.group(3)
        if k not in F:
            print(f"unknown fact {k} in {p.name}"); sys.exit(2)
        return m.group(1) + F[k] + m.group(5)
    new = pat.sub(sub, s)
    if new != s:
        stale.append(p.name)
        if "--check" not in sys.argv:
            p.write_text(new)
if "--check" in sys.argv:
    if stale:
        print("STALE:", ", ".join(stale)); sys.exit(1)
    print("facts: all pages match data/accuracy.json")
else:
    print("updated:", ", ".join(stale) or "nothing")
