---
paths:
  - "src/components/**/*.tsx"
  - "src/app/**/*.tsx"
---

# Frontend Rules

- Tailwind CSS + shadcn/ui primitives, functional components + hooks only
- Mobile-first, test at 320 / 375 / 430 / 768 / 1024 / 1440px — no horizontal scroll
- WCAG 2.1 AA: semantic HTML, visible focus states, labeled form fields, `prefers-reduced-motion` respected
- Never communicate score/status by colour alone (pair with icon/text)
- Brand palette: deep navy/near-black + white primary, warm gold accent; RESTORE=blue, INCOME=amber, SUSTAIN=green, EMPIRE=purple
- Type: Inter / Manrope / Plus Jakarta Sans
- Avoid: excessive gradients, flashy animation, countdown timers, generic stock finance imagery
- Sticky mobile CTA must not cover content; forms must not lose data when keyboard opens
