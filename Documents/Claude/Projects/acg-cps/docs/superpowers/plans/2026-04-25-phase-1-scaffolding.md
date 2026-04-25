# Phase 1: Project Scaffolding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bootstrap a working Docker Compose project with FastAPI backend (SQLAlchemy + Alembic), core DB models, LLM client stub, and Next.js frontend shell — everything compiles, tests pass, and `docker compose up -d` brings all services up healthy.

**Architecture:** FastAPI `cps-api` service owns all business logic and exposes a REST API on port 8000; `cps-ui` Next.js service serves the operator UI on port 3000. SQLite is the main datastore; Alembic manages all schema changes. All LLM calls are funnelled through `api/src/llm/client.py` — nothing else calls the Anthropic SDK directly.

**Tech Stack:** Python 3.11, FastAPI 0.111, SQLAlchemy 2.x, Alembic 1.13, pytest, httpx (test client); Next.js 14 App Router, TypeScript strict, Tailwind CSS 3, shadcn/ui, TanStack Query 5; Docker Compose 2; SQLite 3.

---

## File Map

**Created:**
- `docker-compose.yml` — orchestrates `cps-api` + `cps-ui`, all on `127.0.0.1`
- `api/Dockerfile`
- `api/requirements.txt`
- `api/alembic.ini`
- `api/alembic/env.py`
- `api/alembic/versions/.gitkeep`
- `api/src/__init__.py`
- `api/src/main.py` — FastAPI app factory
- `api/src/config.py` — settings via pydantic-settings
- `api/src/database.py` — engine + session factory
- `api/src/models/__init__.py`
- `api/src/models/content_request.py`
- `api/src/models/research_brief.py`
- `api/src/models/prompt_version.py`
- `api/src/models/variant.py`
- `api/src/llm/__init__.py`
- `api/src/llm/client.py` — thin Anthropic SDK wrapper (stub with interface)
- `api/src/routers/__init__.py`
- `api/src/routers/health.py`
- `api/tests/__init__.py`
- `api/tests/conftest.py`
- `api/tests/test_health.py`
- `ui/Dockerfile`
- `ui/package.json`
- `ui/tsconfig.json`
- `ui/next.config.ts`
- `ui/tailwind.config.ts`
- `ui/postcss.config.js`
- `ui/src/app/layout.tsx`
- `ui/src/app/page.tsx`

---

## Task 1: Docker Compose + Directory Skeleton

**Files:**
- Create: `docker-compose.yml`
- Create: `api/Dockerfile`
- Create: `api/requirements.txt`
- Create: `ui/Dockerfile`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p api/src/models api/src/llm api/src/routers api/tests \
         api/alembic/versions \
         ui/src/app ui/src/components ui/src/lib
touch api/src/__init__.py api/src/models/__init__.py \
      api/src/llm/__init__.py api/src/routers/__init__.py \
      api/tests/__init__.py api/alembic/versions/.gitkeep
```

- [ ] **Step 2: Write `api/requirements.txt`**

```
fastapi==0.111.0
uvicorn[standard]==0.29.0
sqlalchemy==2.0.30
alembic==1.13.1
pydantic-settings==2.2.1
anthropic==0.27.0
httpx==0.27.0
pytest==8.2.0
pytest-asyncio==0.23.6
```

- [ ] **Step 3: Write `api/Dockerfile`**

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "src.main:app", "--host", "127.0.0.1", "--port", "8000", "--reload"]
```

- [ ] **Step 4: Write `ui/Dockerfile`**

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]
```

- [ ] **Step 5: Write `docker-compose.yml`**

```yaml
services:
  cps-api:
    build: ./api
    ports:
      - "127.0.0.1:8000:8000"
    volumes:
      - ./api:/app
      - cps-db:/app/data
    environment:
      - DATABASE_URL=sqlite:////app/data/cps.db
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - SERPER_API_KEY=${SERPER_API_KEY}
    restart: unless-stopped

  cps-ui:
    build: ./ui
    ports:
      - "127.0.0.1:3000:3000"
    volumes:
      - ./ui:/app
      - /app/node_modules
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    depends_on:
      - cps-api
    restart: unless-stopped

volumes:
  cps-db:
```

- [ ] **Step 6: Write `.env.example`**

```bash
# Copy to .env and fill in values
ANTHROPIC_API_KEY=sk-ant-...
SERPER_API_KEY=...
```

- [ ] **Step 7: Commit**

```bash
git add docker-compose.yml api/Dockerfile api/requirements.txt ui/Dockerfile .env.example \
        api/src/__init__.py api/src/models/__init__.py api/src/llm/__init__.py \
        api/src/routers/__init__.py api/tests/__init__.py api/alembic/versions/.gitkeep \
        ui/src/app/.gitkeep ui/src/components/.gitkeep ui/src/lib/.gitkeep
git commit -m "chore: bootstrap project directory structure and Docker Compose"
```

---

## Task 2: FastAPI App + Config + Health Endpoint (TDD)

**Files:**
- Create: `api/src/config.py`
- Create: `api/src/main.py`
- Create: `api/src/routers/health.py`
- Create: `api/tests/conftest.py`
- Create: `api/tests/test_health.py`

- [ ] **Step 1: Write the failing test**

```python
# api/tests/test_health.py
import pytest
from httpx import AsyncClient, ASGITransport
from src.main import app


@pytest.mark.asyncio
async def test_health_returns_ok():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as client:
        response = await client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
```

- [ ] **Step 2: Write `api/tests/conftest.py`**

```python
# api/tests/conftest.py
import pytest

pytest_plugins = ["pytest_asyncio"]
```

- [ ] **Step 3: Run test to verify it fails**

```bash
cd api && pytest tests/test_health.py -v
```

Expected: `ImportError` or `ModuleNotFoundError` — `src.main` doesn't exist yet.

- [ ] **Step 4: Write `api/src/config.py`**

```python
# api/src/config.py
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "sqlite:///./data/cps.db"
    anthropic_api_key: str = ""
    serper_api_key: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
```

- [ ] **Step 5: Write `api/src/routers/health.py`**

```python
# api/src/routers/health.py
from fastapi import APIRouter

router = APIRouter(prefix="/api")


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
```

- [ ] **Step 6: Write `api/src/main.py`**

```python
# api/src/main.py
from fastapi import FastAPI
from src.routers.health import router as health_router

app = FastAPI(title="ACG Content Pipeline System")
app.include_router(health_router)
```

- [ ] **Step 7: Run test to verify it passes**

```bash
cd api && pytest tests/test_health.py -v
```

Expected: `PASSED tests/test_health.py::test_health_returns_ok`

- [ ] **Step 8: Commit**

```bash
git add api/src/config.py api/src/main.py api/src/routers/health.py \
        api/tests/conftest.py api/tests/test_health.py
git commit -m "feat: FastAPI app with health endpoint and config"
```

---

## Task 3: SQLAlchemy + Alembic Setup

**Files:**
- Create: `api/src/database.py`
- Create: `api/alembic.ini`
- Create: `api/alembic/env.py`

- [ ] **Step 1: Write `api/src/database.py`**

```python
# api/src/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from src.config import settings


class Base(DeclarativeBase):
    pass


engine = create_engine(
    settings.database_url,
    connect_args={"check_same_thread": False},
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

- [ ] **Step 2: Write `api/alembic.ini`**

```ini
[alembic]
script_location = alembic
prepend_sys_path = .
sqlalchemy.url = sqlite:///./data/cps.db

[loggers]
keys = root,sqlalchemy,alembic

[handlers]
keys = console

[formatters]
keys = generic

[logger_root]
level = WARN
handlers = console
qualname =

[logger_sqlalchemy]
level = WARN
handlers =
qualname = sqlalchemy.engine

[logger_alembic]
level = INFO
handlers =
qualname = alembic

[handler_console]
class = StreamHandler
args = (sys.stderr,)
level = NOTSET
formatter = generic

[formatter_generic]
format = %(levelname)-5.5s [%(name)s] %(message)s
datefmt = %H:%M:%S
```

- [ ] **Step 3: Write `api/alembic/env.py`**

```python
# api/alembic/env.py
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from src.database import Base  # noqa: E402 — must come after sys.path insert
import src.models  # noqa: F401 — import all models so Base.metadata is populated

config = context.config
if config.config_file_name:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(url=url, target_metadata=target_metadata, literal_binds=True)
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
```

- [ ] **Step 4: Write `api/src/models/__init__.py` (re-export all models)**

```python
# api/src/models/__init__.py
from src.models.content_request import ContentRequest  # noqa: F401
from src.models.research_brief import ResearchBrief  # noqa: F401
from src.models.prompt_version import PromptVersion  # noqa: F401
from src.models.variant import Variant  # noqa: F401
```

- [ ] **Step 5: Write failing test for DB connectivity**

```python
# api/tests/test_database.py
import pytest
from sqlalchemy import text
from src.database import engine


def test_database_connects():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        assert result.scalar() == 1
```

- [ ] **Step 6: Run test to verify it fails (models not defined yet)**

```bash
cd api && pytest tests/test_database.py -v
```

Expected: `ImportError` — `src.models.content_request` doesn't exist.

- [ ] **Step 7: Commit this partial state**

```bash
git add api/src/database.py api/alembic.ini api/alembic/env.py \
        api/src/models/__init__.py api/tests/test_database.py
git commit -m "feat: SQLAlchemy engine and Alembic configuration"
```

---

## Task 4: Core Database Models

**Files:**
- Create: `api/src/models/content_request.py`
- Create: `api/src/models/research_brief.py`
- Create: `api/src/models/prompt_version.py`
- Create: `api/src/models/variant.py`

- [ ] **Step 1: Write `api/src/models/content_request.py`**

```python
# api/src/models/content_request.py
from datetime import datetime
from sqlalchemy import String, Text, DateTime, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column
from src.database import Base
import enum


class RequestStatus(str, enum.Enum):
    pending = "pending"
    researching = "researching"
    generating = "generating"
    review = "review"
    done = "done"
    failed = "failed"


class Pillar(str, enum.Enum):
    acvest = "ACVEST"
    onecare = "OneCare"
    daso = "DASO"
    acology = "ACOLOGY"
    iyashi = "IYASHI"
    aicare = "aiCARE"
    primary_care = "Primary Care"
    acg = "ACG"


class Arc(str, enum.Enum):
    regulatory_urgency = "Regulatory Urgency"
    family_savings = "Family Savings"
    expert_authority = "Expert Authority"
    convenience = "Convenience"
    heritage_trust = "Heritage & Trust"


class ContentRequest(Base):
    __tablename__ = "content_requests"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    pillar: Mapped[str] = mapped_column(String(50))
    arc: Mapped[str] = mapped_column(String(50))
    topic: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(20), default=RequestStatus.pending)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
```

- [ ] **Step 2: Write `api/src/models/research_brief.py`**

```python
# api/src/models/research_brief.py
from datetime import datetime
from sqlalchemy import Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.database import Base


class ResearchBrief(Base):
    __tablename__ = "research_briefs"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    content_request_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("content_requests.id"), index=True
    )
    raw_results: Mapped[str] = mapped_column(Text)
    summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
```

- [ ] **Step 3: Write `api/src/models/prompt_version.py`**

```python
# api/src/models/prompt_version.py
from datetime import datetime
from sqlalchemy import String, Text, DateTime, Integer, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from src.database import Base


class PromptVersion(Base):
    __tablename__ = "prompt_versions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), index=True)
    version: Mapped[int] = mapped_column(Integer)
    system_prompt: Mapped[str] = mapped_column(Text)
    user_prompt_template: Mapped[str] = mapped_column(Text)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
```

- [ ] **Step 4: Write `api/src/models/variant.py`**

```python
# api/src/models/variant.py
from datetime import datetime
from sqlalchemy import Integer, Text, DateTime, ForeignKey, Boolean, String
from sqlalchemy.orm import Mapped, mapped_column
from src.database import Base


class Variant(Base):
    __tablename__ = "variants"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    content_request_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("content_requests.id"), index=True
    )
    prompt_version_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("prompt_versions.id")
    )
    index: Mapped[int] = mapped_column(Integer)  # 0, 1, 2 — three variants per request
    content: Mapped[str] = mapped_column(Text)
    input_tokens: Mapped[int] = mapped_column(Integer, default=0)
    output_tokens: Mapped[int] = mapped_column(Integer, default=0)
    model: Mapped[str] = mapped_column(String(50))
    selected: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
```

- [ ] **Step 5: Run the database test to verify it now passes**

```bash
cd api && pytest tests/test_database.py -v
```

Expected: `PASSED tests/test_database.py::test_database_connects`

- [ ] **Step 6: Write model unit tests**

```python
# api/tests/test_models.py
import pytest
from src.models.content_request import ContentRequest, Pillar, Arc, RequestStatus
from src.models.research_brief import ResearchBrief
from src.models.prompt_version import PromptVersion
from src.models.variant import Variant


def test_content_request_pillar_values():
    assert Pillar.acvest == "ACVEST"
    assert Pillar.onecare == "OneCare"
    assert len(Pillar) == 8


def test_content_request_arc_values():
    assert Arc.regulatory_urgency == "Regulatory Urgency"
    assert len(Arc) == 5


def test_content_request_status_default():
    req = ContentRequest(pillar=Pillar.acvest, arc=Arc.regulatory_urgency, topic="Test")
    assert req.status == RequestStatus.pending


def test_variant_index_range():
    # variants are 0-indexed, three per request
    for i in range(3):
        v = Variant(
            content_request_id=1,
            prompt_version_id=1,
            index=i,
            content="content",
            model="claude-haiku-4-5-20251001",
        )
        assert v.index == i
```

- [ ] **Step 7: Run model tests**

```bash
cd api && pytest tests/test_models.py -v
```

Expected: all 4 tests `PASSED`

- [ ] **Step 8: Generate initial Alembic migration**

```bash
cd api && alembic revision --autogenerate -m "initial_schema"
```

Expected: new file created in `alembic/versions/XXXX_initial_schema.py`

- [ ] **Step 9: Run migration to verify it applies cleanly**

```bash
mkdir -p data && cd api && alembic upgrade head
```

Expected: `Running upgrade  -> XXXX, initial_schema`

- [ ] **Step 10: Commit**

```bash
git add api/src/models/ api/alembic/versions/ api/tests/test_models.py api/tests/test_database.py
git commit -m "feat: core database models and initial Alembic migration"
```

---

## Task 5: LLM Client Wrapper

**Files:**
- Create: `api/src/llm/client.py`
- Create: `api/tests/test_llm_client.py`

- [ ] **Step 1: Write the failing test**

```python
# api/tests/test_llm_client.py
import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from src.llm.client import LLMClient, LLMResponse


@pytest.mark.asyncio
async def test_llm_client_returns_llm_response():
    mock_message = MagicMock()
    mock_message.content = [MagicMock(text="Generated content")]
    mock_message.usage.input_tokens = 100
    mock_message.usage.output_tokens = 50
    mock_message.model = "claude-haiku-4-5-20251001"

    with patch("src.llm.client.anthropic.AsyncAnthropic") as mock_cls:
        mock_client = AsyncMock()
        mock_cls.return_value = mock_client
        mock_client.messages.create = AsyncMock(return_value=mock_message)

        client = LLMClient()
        response = await client.generate(
            system="You are a helpful assistant.",
            prompt="Write a headline.",
            model="claude-haiku-4-5-20251001",
        )

    assert isinstance(response, LLMResponse)
    assert response.text == "Generated content"
    assert response.input_tokens == 100
    assert response.output_tokens == 50
    assert response.model == "claude-haiku-4-5-20251001"


@pytest.mark.asyncio
async def test_llm_client_raises_on_empty_response():
    mock_message = MagicMock()
    mock_message.content = []
    mock_message.usage.input_tokens = 10
    mock_message.usage.output_tokens = 0
    mock_message.model = "claude-haiku-4-5-20251001"

    with patch("src.llm.client.anthropic.AsyncAnthropic") as mock_cls:
        mock_client = AsyncMock()
        mock_cls.return_value = mock_client
        mock_client.messages.create = AsyncMock(return_value=mock_message)

        client = LLMClient()
        with pytest.raises(ValueError, match="LLM returned empty content"):
            await client.generate(
                system="sys",
                prompt="prompt",
                model="claude-haiku-4-5-20251001",
            )
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd api && pytest tests/test_llm_client.py -v
```

Expected: `ImportError` — `src.llm.client` doesn't exist.

- [ ] **Step 3: Write `api/src/llm/client.py`**

```python
# api/src/llm/client.py
from dataclasses import dataclass
import anthropic
from src.config import settings

SONNET = "claude-sonnet-4-6"
HAIKU = "claude-haiku-4-5-20251001"


@dataclass
class LLMResponse:
    text: str
    input_tokens: int
    output_tokens: int
    model: str

    @property
    def total_tokens(self) -> int:
        return self.input_tokens + self.output_tokens


class LLMClient:
    def __init__(self) -> None:
        self._client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)

    async def generate(
        self,
        *,
        system: str,
        prompt: str,
        model: str = HAIKU,
        max_tokens: int = 2048,
    ) -> LLMResponse:
        message = await self._client.messages.create(
            model=model,
            max_tokens=max_tokens,
            system=system,
            messages=[{"role": "user", "content": prompt}],
        )
        if not message.content:
            raise ValueError("LLM returned empty content")
        return LLMResponse(
            text=message.content[0].text,
            input_tokens=message.usage.input_tokens,
            output_tokens=message.usage.output_tokens,
            model=message.model,
        )
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd api && pytest tests/test_llm_client.py -v
```

Expected: both tests `PASSED`

- [ ] **Step 5: Commit**

```bash
git add api/src/llm/client.py api/tests/test_llm_client.py
git commit -m "feat: LLM client wrapper with token tracking"
```

---

## Task 6: Next.js Frontend Shell

**Files:**
- Create: `ui/package.json`
- Create: `ui/tsconfig.json`
- Create: `ui/next.config.ts`
- Create: `ui/tailwind.config.ts`
- Create: `ui/postcss.config.js`
- Create: `ui/src/app/layout.tsx`
- Create: `ui/src/app/page.tsx`

- [ ] **Step 1: Write `ui/package.json`**

```json
{
  "name": "acg-cps-ui",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "14.2.3",
    "react": "^18",
    "react-dom": "^18",
    "@tanstack/react-query": "^5.40.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.2.3",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Write `ui/tsconfig.json`**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Write `ui/next.config.ts`**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 4: Write `ui/tailwind.config.ts`**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ACG brand tokens — fill from brand guide
        acg: {
          blue: "#0066CC",
          teal: "#00A99D",
          dark: "#1A1A2E",
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: Write `ui/postcss.config.js`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Write `ui/src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACG Content Pipeline System",
  description: "Localhost content production for ACG Healthcare",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Write `ui/src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 8: Write `ui/src/app/page.tsx`**

```tsx
export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold text-acg-blue">
        ACG Content Pipeline System
      </h1>
      <p className="mt-2 text-gray-600">Phase 1 scaffold — backend healthy.</p>
    </main>
  );
}
```

- [ ] **Step 9: Install dependencies and type-check**

```bash
cd ui && npm install && npm run type-check
```

Expected: no TypeScript errors.

- [ ] **Step 10: Commit**

```bash
git add ui/
git commit -m "feat: Next.js 14 frontend shell with Tailwind and ACG brand tokens"
```

---

## Task 7: Full Stack Smoke Test

**Files:**
- Modify: `api/tests/test_health.py` (add integration assertion)

- [ ] **Step 1: Run all backend tests**

```bash
cd api && pytest -v
```

Expected: all tests `PASSED`, 0 failures.

- [ ] **Step 2: Build and start Docker services**

```bash
cp .env.example .env   # fill in ANTHROPIC_API_KEY and SERPER_API_KEY
docker compose up -d --build
```

Expected: both services start without error.

- [ ] **Step 3: Verify API health endpoint**

```bash
curl http://localhost:8000/api/health
```

Expected: `{"status":"ok"}`

- [ ] **Step 4: Verify UI loads**

```bash
curl -s http://localhost:3000 | grep "ACG Content Pipeline"
```

Expected: HTML containing `ACG Content Pipeline`

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "chore: Phase 1 complete — scaffold verified end-to-end"
```

---

## Self-Review Checklist

- [x] Docker Compose services bound to `127.0.0.1` only ✓
- [x] All LLM calls go through `api/src/llm/client.py` ✓
- [x] No hardcoded API keys — env vars only ✓
- [x] All schema changes via Alembic migration ✓
- [x] TypeScript strict mode, no `any` ✓
- [x] `prompt_versions` table created (insert-only by design) ✓
- [x] All 8 ACG pillars and 5 narrative arcs modelled as enums ✓
- [x] Token tracking fields on `variants` table ✓
- [ ] `docs/CPS_BUILD_SPEC.md` doesn't exist yet — create it before Phase 2 to capture §10 (phases), §14 (compliance hard limits), and prompt hard limits referenced in `.claude/rules/prompts.md`
