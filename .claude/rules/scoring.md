---
paths:
  - "src/lib/scoring/**"
---

# Scoring Engine Rules

Source of truth: `Balla_DK_RISE_Gated_Content_Questions.txt` (implementation-precise). `balla-dk-rise-master-prompt.md`'s 36-point/4-band model is the earlier narrative brief — superseded here.

- Pure functions only — no mutation, return new values (see global coding-style rule)
- All logic table-driven from structured config (`financial-health-config.ts` / `career-growth-config.ts`), never hardcoded per-question
- Each answer scores 0-3; 3 questions per category (R/I/S/E), 12 per scorecard; max per category = 9
- `normalisedScore = round((rawScore / 9) * 100)` per category
- Tiers: 0-33 Needs Attention · 34-66 Developing · 67-100 Strong
- Missing letter = category with lowest normalised score; tie → caller-supplied tie-break category (from goal/urgency/path context questions) if it's among the tied lowest, else priority order R → I → S → E
- Two scorecards (Financial Health, Career Growth) share `engine.ts` via the same `ScorecardConfig` shape, not duplicated logic
- Never collect identity numbers, salary, policy numbers, medical details, or bank info inside the scorecard (safety rule from source txt)
