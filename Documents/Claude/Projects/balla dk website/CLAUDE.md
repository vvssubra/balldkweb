# Balla DK — R.I.S.E. Landing Page

## Overview
Marketing site for Balla DK (Malaysian financial mentor / agency leader). Three routes: `/` homepage, `/agents` (agency career journey, primary business objective), `/clients` (financial guidance journey). Visitor pick one of two gated scorecards (Financial Health / Career Growth), get personalised R.I.S.E. result instant, route to WhatsApp for follow-up.

Structure and copy follow `Website Analysis BALLADK.pdf` + `[BRIEF] WEBSITE STRUCTURE AND COPYWRITING.pdf` (marketing, Aug 2026): first-person Balla voice, scorecard as conversion bridge, WhatsApp always reachable, agency gets own page.

## Stack
- Next.js + TypeScript + Tailwind CSS
- Deploy: Vercel
- Leads: client-side scoring → contact gate → result page → **WhatsApp deep-link** (`wa.me/<number>?text=<prefilled summary>`). No DB, no CRM webhook, no email service v1.

## Key Conventions
- Scoring/question/band/CTA data live in structured config, not hardcoded in components — see brief §18
- Page copy in `src/lib/site-content.ts` (shared) and `src/lib/content/*.ts` (per page). Components render, never own copy.
- Scorecard opens from anywhere via `useScorecard()` (`ScorecardProvider` mounted in `app/layout.tsx`). No prop-drilling.
- Every WhatsApp entry uses `siteWhatsAppLink(opener)` from `src/lib/whatsapp.ts`; number from `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- CTA button classes from `src/lib/cta-styles.ts`.
- Copy voice: first person ("I help you..."), plain Malaysian English, no em-dashes, no hype. See analysis §Copywriting.
- Scoring logic in `lib/scoring/` — pure functions, immutable, table-driven (see `.claude/rules/scoring.md`)
- Brand palette: navy/near-black + white primary, warm gold accent; R=blue, I=amber, S=green, E=purple
- Type: Inter / Manrope / Plus Jakarta Sans

## Critical Paths
1. Client: Hero/nav CTA → path selection → scorecard (1 question/screen) → contact gate → result reveal → WhatsApp CTA
2. Agent: Hero "Explore the Agency Opportunity" → `/agents` → Career Growth scorecard → result → WhatsApp / `/agents` link
3. Unsure: any "Not sure where to start? Talk to me" → WhatsApp direct
4. Scoring: 12 answers (0-3 each) → R/I/S/E % → overall % → result band → missing letter (lowest %, tiebreak R→I→S→E)

## Out of Scope (v1)
CRM webhook, email follow-up sequences, DB persistence, Sentry/ClickUp integration — skipped, leads route WhatsApp only.
Blog (brief proposes 5 categories), Solutions & Pricing table, verified stats/testimonials — need real content from client before build. Respond.io AI lives in WhatsApp, not this repo.

## Source of Truth
`balla-dk-rise-master-prompt.md` — full spec. Scoring: §7-12. UI: §16. Accessibility: §20. Compliance: §23.

## Compliance (non-negotiable)
- No fake testimonials, awards, stats, guaranteed outcomes
- Financial + career disclaimers must appear on result pages (brief §23)
- Never communicate score/status by colour alone (WCAG 2.1 AA)