# AGENTS.md

NestJS 10 + Prisma 6 + PostgreSQL REST API (TypeScript). Standard Nest layout: one module per domain under `src/` — `client`, `combo`, `furniture`, `rental`, `report`.

## Package manager: pnpm

Use the pnpm version pinned in `package.json` and commit `pnpm-lock.yaml` changes.
Long commands are allowed, but provide a short package-script alias for recurring commands. Use names such as `dev`, `build`, `prisma:generate`, and `prisma:migrate-reset`.

## Commands

- `pnpm dev` — hot-reload server (port `PORT` or 3000)
- `pnpm build && pnpm start:prod` — build then run `dist/main`
- `pnpm lint` — eslint (runs with `--fix`)
- `pnpm test` — jest unit tests (`*.spec.ts` under `src/`); no DB needed
- `pnpm test:e2e` — supertest e2e (`test/*.e2e-spec.ts`); **needs a reachable Postgres** (booting `AppModule` instantiates `PrismaService`, which calls `$connect()` on init)
- `pnpm prisma:migrate-dev` / `pnpm prisma:generate`

## Setup / env

- No `.env.example` is committed. Create `.env` with `DATABASE_URL` (and optional `PORT`) per README. `.env` is gitignored.
- Local Postgres: `docker-compose up -d db` (reads `DB_PASSWORD`/`DB_NAME` from env).
- Swagger UI is served at `/docs`.

## Architecture gotchas

- **`PrismaService` is declared in each module's own `providers` array** (client/combo/furniture/rental/report), so Nest spins up 5 separate PrismaClients = 5 connection pools. Known bug (#17); do not copy this per-module pattern in new modules — route through a single shared provider.
- A global `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })` is active: DTOs must declare every accepted field or requests 400.
- Money is Prisma `Decimal @db.Decimal(10, 2)` on `Rental`/`Furniture`; `Combo.dailyRate` is `Float`. Comparing `Decimal` with `<`/`>` compares objects (bug #22) — use `Prisma.Decimal`.
- Rental `create`/`markDone`/`markCanceled` wrap stock changes in `$transaction`; the restock loop is copy-pasted between `markDone` and `markCanceled` (see #20).

## Navigating the codebase

Prefer the knowledge graph over reading files one by one. A graph of this repo lives in `graphify-out/` — `graph.html` (interactive), `graph.json` (raw data), and `GRAPH_REPORT.md` (audit summary).

- Ask the graph first: `graphify query "<question>"` (e.g. "what calls RentalService?", "trace stock changes in markDone"). It returns a scoped subgraph faster than grepping raw files.
- Use `GRAPH_REPORT.md` for broad architecture (communities, god nodes, cross-cutting connections) and `graph.html` for point-and-click exploration.

When starting work on a module, confirm the graph actually covers it. If it's thin, stale, or misses part of that module (e.g. a migration `.sql` that isn't modeled), rebuild it for that subtree before diving in — `graphify src/<module>` (or `graphify <path> --update` to refresh only changed files) — then consult the refreshed graph instead of paging through files.

## Work process

- Feature branches target **`development`**, not `main`. `main` is only updated via `development → main` merge PRs (the repo's default branch is `main`, so `gh pr create` will get this wrong unless you pass `--base development`).
- Issues live in GitHub (Samuel581/furniture-rental-api), operated via the `gh` CLI. Conventions and label vocabulary: see `CLAUDE.md` and `docs/agents/{issue-tracker,triage-labels}.md`.
- **Read `docs/issue-plan.md` before picking up work** — it encodes issue dependency order. The lifecycle chain (#19 → #27 → #21 → #20 → #22) must go in order; the "Independent" items can run in parallel.
- Domain vocabulary and ADRs: see `docs/agents/domain.md`. `GLOSSARY.md` and `docs/adr/` do not exist yet — proceed silently rather than creating them upfront.
