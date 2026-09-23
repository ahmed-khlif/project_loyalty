# Project state

## Current phase

**Phase 3 — Milestone 3.1 foundation implemented.** Automated checks pass; visual/mobile/desktop and real Arabic rendering review remain. Milestone 3.2 has not started. Phase 2 remains implemented and locally verified.

## Phase 3 Milestone 3.1 result

Implemented the semantic design foundation in `packages/ui`: light/dark token variables and Tailwind mappings, typography fallback stacks for Latin and Arabic, accessible focus-visible rings, semantic state colors, reduced-motion support, and comfortable action/form targets. Added and exported `BrandWordmark`, `AppShell`, `PageContainer`, `PageHeader`, `SectionHeader`, `EmptyState`, `LoadingState`, `ErrorState`, and `StatusBadge`. Updated the existing locale foundation shell to use the wordmark, semantic shell, and status badge. No role-specific routes, business logic, authentication, i18n package, scanner behavior, or preview fixtures were added.

Milestone 3.1 verification: `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` passed. The web smoke test now confirms the foundation shell consumes `BrandWordmark`. Visual contrast, browser matrix, mobile widths, and real Arabic font shaping still require the Phase 3 visual review; automated checks do not establish those outcomes.

## Phase 3 Milestone 3.0 result

Completed the repository/design audit required by [PHASE_03.md](../PHASE_03.md). Confirmed the Phase 2 workspace, installed versions, scripts, healthy local services, API health endpoints, current web route, shared UI primitives, existing semantic color starters, and missing i18n/role/layout/preview infrastructure. Created [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) with the screen inventory, flow map, token contract, preview boundary, unresolved decisions, and dependency-ordered implementation plan. No business logic, database migration, authentication, scanner behavior, or new product page was added.

Milestone 3.0 verification: Node `22.16.0`, pnpm `12.5.1`, Git `2.40.0.windows.1`, Docker `29.8.0`, and Compose `v5.5.1` were checked; the Compose services were healthy; `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` passed. The aggregate test run intentionally skipped the opt-in DB integration test because `RUN_DB_TESTS` was not set; the isolated DB test had already passed during Phase 2 verification.

The Phase 2 checkpoint is the existing `main` commit. A phase-specific local branch, `phase-03-design-system`, is now active. The root [PHASE_03.md](../PHASE_03.md) is the available phase brief; no separate `apps/api/PHASE_03.md` exists in the repository.

## Files created or modified

Created the Phase 2 foundation:

- Root workspace/config: `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `.npmrc`, `.gitignore`, `.env.example`, `tsconfig.base.json`, `eslint.config.mjs`, `README.md`.
- Web: `apps/web` Next.js App Router shell, locale routes for `/fr`, `/ar`, and `/en`, Tailwind v4/PostCSS, shared UI imports, smoke test.
- API: `apps/api` NestJS modular foundation, validated environment config, structured logger, CORS, `/api/v1/health/live`, DB-backed `/api/v1/health/ready`, and health tests.
- Shared packages: `packages/ui`, `packages/database`, `packages/contracts`, `packages/config`, `packages/testing`.
- Local infrastructure: `infrastructure/docker-compose.yml` with PostgreSQL and Redis health checks and named volumes.
- CI: `.github/workflows/ci.yml`.
- Database: `packages/database/prisma/migrations/20260923224953_foundation_baseline/migration.sql`.

Updated the API health dependency injection to work reliably with the `tsx` development runner. Prisma and Nest configuration now resolve the root `.env` explicitly when workspace package commands run from package directories, and the Docker scripts load the root `.env` explicitly.

## Actual verification performed

Passed:

- `node --version` → `v22.16.0`.
- `pnpm --version` → `12.5.1`.
- `git --version` → `2.40.0.windows.1`.
- `docker --version` → `29.8.0`; `docker compose version` → `v5.5.1`.
- `pnpm install --frozen-lockfile`.
- `pnpm peers check`.
- `pnpm db:generate` and `pnpm db:validate`.
- Docker Compose PostgreSQL and Redis startup with both containers healthy. This local machine uses PostgreSQL port `5434` and Redis port `6380` because unrelated host services already occupy the default ports.
- `pnpm db:migrate`: the non-destructive `foundation_baseline` migration was applied to the local `njiw_dev` database.
- `RUN_DB_TESTS=1 pnpm test:db` against an isolated local `njiw_test` database: 1 test passed.
- `pnpm lint`.
- `pnpm typecheck`.
- `pnpm test`: API health tests and web shell smoke test passed; packages without tests explicitly use `--passWithNoTests`.
- `pnpm build`: Next.js web build and NestJS API TypeScript build passed.
- Runtime smoke: API liveness returned `200` with `{"status":"ok","service":"api"}`.
- Runtime smoke: API readiness returned `200` with `{"status":"ok","service":"api","dependency":"postgres"}` against the Compose PostgreSQL service.
- Runtime smoke: web `/fr` returned `200` and included the branded shell.

Not verified in this workspace:

- GitHub Actions execution in a remote repository; this supplied workspace is not a Git repository.
- Real-device camera, accessibility, browser-matrix, security, legal, provider, and production-deployment validation; these are outside Phase 2 scope.

## Phase 2 scope guard

No authentication, customer registration, loyalty transactions, QR issuance/scanning, Wallet/NFC integration, merchant billing, or customer data collection was implemented. The web copy identifies the shell as foundation-only.

## Acceptance status

The local Phase 2 acceptance checks are complete. The Docker services remain available for local development; the API process used for verification was stopped. No production secrets or customer data were created.

## Next single task

Begin Milestone 3.2 only: select and configure the maintained i18n approach, add French/Arabic/English message catalogs and locale-aware document direction, and verify language controls, mixed-script content, and narrow-screen RTL behavior. Do not implement identity, loyalty, scanner, or other business flows.
