# Architecture specification

Status: Phase 2 foundation implemented; domain modules remain intentionally unimplemented.

## Boundaries

The system is a pnpm monorepo with one responsive Next.js App Router web application and a NestJS TypeScript modular-monolith API. PostgreSQL/Prisma own durable state. Redis/BullMQ is optional and limited to justified ephemeral challenges, rate limits, retries, or background jobs.

Target layout:

```text
apps/web/                 Next.js customer/staff/merchant/admin routes
apps/api/                 NestJS modular monolith
packages/ui/              shared shadcn-based components and tokens
packages/database/        Prisma schema, migrations, database utilities
packages/contracts/       validated API contracts/types
packages/config/          shared tooling configuration
packages/testing/         helpers and non-production fixtures
infrastructure/           local/deployment configuration
docs/                     specifications, decisions, project state
```

## Logical modules

- Identity and sessions
- Tenancy, businesses, branches, roles, permissions
- Customer accounts, memberships, consent, recovery
- Programs, versioned rules, terms, translations
- Loyalty ledger, rewards, corrections, projections
- Staff transaction workflows and credential challenges
- Merchant operations, analytics, exports
- Billing/subscriptions/invoices/manual verification
- Platform support, incidents, audit, notifications

The API owns validation, authorization, state transitions, idempotency, and business rules. The browser is a presentation/client layer, not a source of balances, tenant scope, or transaction success.

## Core flows

### Earning

1. Staff session is authenticated and branch-scoped.
2. Customer presents a valid credential; API validates signature, audience, expiry, nonce/replay, membership, branch, program status, and staff permission.
3. Cashier submits eligible quantity/details and an idempotency key.
4. API loads the active program version and validates limits/eligibility.
5. A database transaction writes an immutable earning event, any reward issuance, and projection update/outbox record under unique constraints.
6. API returns the committed result; UI renders it as confirmed.

### Redemption

1. Staff identifies a specific eligible reward.
2. API checks tenant/branch permission, reward status, expiry, program terms, credential/action authorization, and idempotency.
3. One transaction changes the reward from available to redeemed and writes an immutable redemption event.
4. Contenders receive one success and safe conflict/rejection; no double redemption.

### Pending connectivity

The web client may retain a non-authoritative pending request identifier only to help retry. It cannot display a confirmed reward or redemption offline. If a server-validated queue is introduced, it must use signed requests, replay protection, bounded retention, clear pending status, and reconciliation tests.

## Data and consistency

PostgreSQL transactions, unique constraints, serializable/appropriate row locking, and an append-only event model protect the ledger. Read projections can be rebuilt from events and corrections. Background jobs are at-least-once and idempotent, with retry/dead-letter visibility.

## Security boundaries

Use secure cookies/session tokens, CSRF protection where cookie-based mutations require it, MFA appropriate to staff/merchant risk, secret management, TLS, rate limits, audit trails, and least-privilege data access. All queries require a server-derived business/branch scope. See [SECURITY_PRIVACY.md](SECURITY_PRIVACY.md).

## Deployment topology

Local development uses Docker Compose for PostgreSQL and, only if justified, Redis. Development, staging, and production are separate environments and credentials. Managed hosting is a candidate pending availability, cost, operational and Tunisian legal/data-transfer review. Production topology must include encrypted backups, restore testing, logs/metrics/traces, alerting, secret rotation, rollback, and controlled migrations.

## External integrations

POS, Apple Wallet, Google Wallet, reader-based NFC, messaging, and payment providers are optional adapters. Their unavailability must not break the core QR/web flow. Integration contracts, provider approval, device coverage, and legal/privacy review are prerequisites before enabling each adapter.

## Compatibility validation before Phase 2

The Phase 2 implementation records this selected foundation in [DECISIONS.md](DECISIONS.md) and `pnpm-lock.yaml`: Node 22.16.0, pnpm 12.5.1, Next.js 16.3.6, React 19.3.0, NestJS 12.1.0, Prisma 7.10.0, Tailwind CSS 4.3.3, TypeScript 6.0.3, ESLint 9.39.5, and Vitest 4.0.15. Prisma uses `prisma.config.ts`, the `prisma-client` generator, and the PostgreSQL driver adapter. next-intl, Zod/React Hook Form, table, and QR/camera libraries remain Phase 3+ selections because no production flows are implemented yet.

Related data/API contracts: [DATA_MODEL.md](DATA_MODEL.md), [API.md](API.md).
