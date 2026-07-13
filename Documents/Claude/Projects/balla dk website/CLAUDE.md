# Balla DK — R.I.S.E. Landing Page

## Overview
One-page high-converting landing site for Balla DK (Malaysian financial mentor / agency leader). Visitors take one of two gated scorecards (Financial Health / Career Growth), get an immediate personalised R.I.S.E. result, and get routed to WhatsApp for follow-up.

## Stack
- Next.js + TypeScript + Tailwind CSS
- Deploy: Vercel
- Leads: client-side scoring → contact gate → result page → **WhatsApp deep-link** (`wa.me/<number>?text=<prefilled summary>`). No DB, no CRM webhook, no email service in v1.

## Key Conventions
- Scoring/question/band/CTA data lives in structured config (not hardcoded in components) — see brief §18
- Scoring logic in `lib/scoring/` — pure functions, immutable, table-driven (see `.claude/rules/scoring.md`)
- Brand palette: navy/near-black + white primary, warm gold accent; R=blue, I=amber, S=green, E=purple
- Type: Inter / Manrope / Plus Jakarta Sans

## Critical Paths
1. Hero/nav CTA → path selection → scorecard (1 question/screen) → contact gate → result reveal → WhatsApp CTA
2. Scoring: 12 answers (0-3 each) → R/I/S/E % → overall % → result band → missing letter (lowest %, tiebreak R→I→S→E)

## Out of Scope (v1)
CRM webhook, email follow-up sequences, DB persistence, Sentry/ClickUp integration — all skipped because leads route to WhatsApp only.

## Source of Truth
`balla-dk-rise-master-prompt.md` — full spec. Scoring: §7-12. UI: §16. Accessibility: §20. Compliance: §23.

## Compliance (non-negotiable)
- No fake testimonials, awards, stats, or guaranteed outcomes
- Financial + career disclaimers must appear on result pages (brief §23)
- Never communicate score/status by colour alone (WCAG 2.1 AA)
