# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# ACG-CPS — Project Brain

Localhost-only content production system for ACG Healthcare (acg.healthcare), Johor Bahru.

**Source of truth:** `docs/CPS_BUILD_SPEC.md`. Always read it before architectural decisions.

## Stack

Python 3.11 / FastAPI / SQLAlchemy 2.x / Alembic / SQLite + DuckDB / Anthropic Claude (Sonnet 4.6 + Haiku 4.5) / Serper.dev — backend.
Next.js 14 / TypeScript strict / Tailwind / shadcn/ui / TanStack Query — frontend.
Docker Compose, all services bound to 127.0.0.1.

## Commands

```bash
docker compose up -d                                       # start all services
docker compose exec cps-api alembic upgrade head           # run migrations
docker compose exec cps-api python -m src.seeds.run_all    # seed data
docker compose exec cps-api pytest                         # all tests
docker compose exec cps-api pytest tests/path/test_file.py::test_name  # single test
curl http://localhost:8000/api/costs/summary?period=month  # cost check
```

Slash commands in `.claude/commands/`: `/start-phase`, `/audit-compliance`, `/cost-check`, `/new-prompt-version`, `/debug-issue`, `/smoke-test`, `/backup-db`.

## Architecture

All Anthropic API calls funnel through `api/src/llm/client.py` — never call the SDK directly elsewhere.

**Key data flow:** `content_request` → research (Serper.dev → `research_briefs`) → LLM generation → 3 `variants` per request → operator selects → carousel export with JSON sidecar.

**Prompt versioning:** prompts live in `prompt_versions` table; never edit in place — always insert new version via `/new-prompt-version`.

**Cost tracking:** every LLM call logs tokens to enable the `/api/costs/summary` endpoint.

## Domain

See `glossary.md` for full term definitions. Key concepts:

- **Pillar** — product line (ACVEST, OneCare, DASO, ACOLOGY, IYASHI, aiCARE, Primary Care, ACG)
- **Arc** — narrative arc: Regulatory Urgency | Family Savings | Expert Authority | Convenience | Heritage & Trust
- **Variant** — one of 3 generated content options per request
- **Sidecar** — JSON metadata file accompanying generated carousel

Audiences: **B2B** (HR Managers, HSE Officers, Operations Directors) and **B2C** (families, working parents).
Malaysian regulatory context: OSHA 2022, DOSH, CHRA, HIRARC, MRO, CMIA, NRA.

## Conventions

- Python: type hints everywhere, async-first
- TypeScript: strict mode, no `any`, server components by default, ACG brand tokens via Tailwind
- Database: every schema change = Alembic migration
- Localhost-only: every service binds `127.0.0.1`, never `0.0.0.0`

Path-scoped rules in `.claude/rules/` auto-load when editing matching files.

## Compliance

Hard limits and approved facts: `.claude/rules/prompts.md` and `docs/CPS_BUILD_SPEC.md` §14.
`compliance-auditor` agent runs before any commit touching prompts, seeds, or generators.

## Build Phasing

8 phases per spec §10. Use `/start-phase N` to begin each. Don't skip phases.
