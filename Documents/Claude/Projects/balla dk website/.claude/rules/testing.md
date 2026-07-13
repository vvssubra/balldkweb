---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
---

# Testing Rules (TDD strict)

- RED → GREEN → REFACTOR: write failing test first, minimal impl to pass, then refactor
- Vitest for unit tests
- Scoring engine, missing-letter logic, result-band logic: table-driven tests covering every band boundary and tiebreak case
- Contact-gate form validation: required fields, email/phone format, consent checkbox states
- Minimum 80% coverage on `lib/scoring/**` and form validation logic
