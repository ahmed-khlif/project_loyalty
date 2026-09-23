# njiw. / نجيو

Phase 2 application foundation for a mobile-first, multi-tenant loyalty SaaS for independent cafés in Tunisia.

This repository currently contains a runnable foundation only. Authentication, customer registration, loyalty transactions, QR issuance/scanning, Wallet/NFC integrations, billing, and customer data collection are intentionally not implemented.

## Prerequisites

- Node.js 22.16.0 (the repository requires Node `>=22.12.0 <23`)
- pnpm 12.5.1
- Git
- Docker Desktop with the Linux engine running
- Docker Compose v2+

On Windows PowerShell, install the pinned package manager if `pnpm` is unavailable:

```powershell
npm install --global pnpm@12.5.1
```

Copy `.env.example` to `.env` for local development. The values are local-only examples and must never be reused in production.

## Install and run

From `C:\project_loyalty` (do not create a nested `njiw` directory):

```powershell
pnpm install
pnpm db:up
pnpm db:generate
pnpm dev
```

Expected URLs:

- Web shell: http://localhost:3000/fr
- Arabic RTL shell: http://localhost:3000/ar
- English shell: http://localhost:3000/en
- API liveness: http://localhost:3001/api/v1/health/live
- API readiness: http://localhost:3001/api/v1/health/ready

Readiness requires PostgreSQL. Liveness only confirms that the API process responds.

## Checks

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The database integration check is isolated and requires the local services:

```powershell
docker exec njiw-postgres createdb -U njiw_dev njiw_test
$env:RUN_DB_TESTS = "1"
$env:DATABASE_URL = "postgresql://njiw_dev:njiw_dev_local_only@localhost:5432/njiw_test?schema=public"
pnpm test:db
```

If you changed `POSTGRES_PORT` or the database credentials in `.env`, use the matching values in `DATABASE_URL`.

Do not run migration or integration commands against a production database. The Phase 2 Prisma schema contains no loyalty-domain models.

## Troubleshooting

- `pnpm` is not recognized: run the user-level install command above, then reopen PowerShell.
- Docker cannot connect to the Linux engine: start Docker Desktop, wait for “Engine running,” then run `pnpm db:up` again.
- Readiness returns `503`: check `docker compose -f infrastructure/docker-compose.yml ps` and confirm the `DATABASE_URL` in `.env` matches the Compose values.
- Port already in use: change `POSTGRES_PORT`, `REDIS_PORT`, or `API_PORT` in `.env`; update the corresponding URL if needed.
- Arabic route appears left-to-right: use `/ar`; full localization and visual RTL review are Phase 3 work, not claimed complete here.

## Repository boundaries

- `apps/web`: Next.js App Router shell.
- `apps/api`: NestJS modular-monolith foundation and health endpoints.
- `packages/ui`: shared shadcn-compatible Button/Card baseline and semantic tokens.
- `packages/database`: Prisma 7 configuration and empty foundation schema.
- `packages/contracts`: shared health response contract.
- `packages/config`: shared locale constants.
- `packages/testing`: shared test constants.
- `infrastructure`: local-only PostgreSQL/Redis Compose services.
- `docs`: approved product and architecture specifications.

See [docs/STATE.md](docs/STATE.md) for actual verification results and the Phase 3 handoff.
