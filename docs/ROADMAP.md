# Roadmap and phase gates

Only one phase is active at a time. Completing a phase requires documented evidence in [STATE.md](STATE.md) and developer approval before the next phase begins.

## Phase 1 — Foundation (complete; approved for implementation)

Deliver: product, requirements, brand, UX, architecture, data model, API, security/privacy, testing, operations, roadmap, decisions, and state documents. Exit: coherent reviewed docs, explicit unknowns and acceptance criteria, no app/database/production code.

## Phase 2 — Repository (implemented and locally verified)

Deliver: pnpm monorepo, Next.js/NestJS scaffolds, shared configuration, shadcn baseline, local PostgreSQL/Redis services where justified, environment handling, CI, health checks. The implementation passes install, lint, typecheck, unit/smoke tests, web build, API build, web runtime smoke, Docker-backed service startup, baseline migration, isolated DB connectivity, and API readiness against PostgreSQL. GitHub Actions execution remains unverified because the supplied workspace has no Git repository or remote. First verify official dependency compatibility and lock versions.

## Phase 3 — Design system (implementation complete; human review pending)

Deliver: semantic tokens, typography/localization foundations, customer card, scanner shell, merchant/admin shells, responsive/accessibility states. Milestones 3.1–3.6 implemented the shared foundation, `next-intl` catalogs and locale direction, customer/marketing routes, staff scanner/result states, merchant/admin shells, and automated QA/route smoke checks in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md). The implementation does not add identity, loyalty mutations, QR generation, camera decoding, billing, or synthetic production data. Exit review still requires representative mobile/desktop and Arabic RTL review by a human; previews do not imply functioning loyalty.

## Phase 4 — Identity and tenancy

Deliver: customer accounts/memberships, secure staff/merchant sessions, recovery, consent, role/branch scope, MFA plan/implementation. Exit: authorized journeys work and cross-user/cross-tenant tests fail closed.

## Phase 5 — Merchant onboarding

Deliver: business/branch setup, staff invitations, brand customization, merchant lifecycle. Exit: owner securely creates a real business and assigns scoped staff.

## Phase 6 — Program and ledger

Deliver: rule builder, immutable versioning, eligibility, earning events, projections, rewards, corrections, concurrency controls. Exit: deterministic and concurrency tests pass; existing rights survive version changes.

## Phase 7 — Customer enrollment

Deliver: café landing, localized signup, membership card, short-lived QR credential, recovery, history, privacy paths. Exit: customer joins and retrieves a real membership using web fallback.

## Phase 8 — Staff transactions

Deliver: camera scanning, manual/accessible fallback, server-authorized confirmation, issuance, redemption, corrections, connection failure states. Exit: two-device real-café journey succeeds; replay, duplicate, and double redemption are prevented.

## Phase 9 — Merchant operations

Deliver: tenant-scoped customers, actual activity analytics, transactions, campaigns only where specified, staff control, exports. Exit: all reports derive from authorized records and avoid sales claims.

## Phase 10 — Billing and platform admin

Deliver: TND invoices, manual payment verification, subscription lifecycle, merchant support, audit-safe administration. Exit: no fictitious payment success; invoice/entitlement/admin tests pass.

## Phase 11 — Wallet and engagement

Deliver only after approval: Apple/Google Wallet, physical NFC tags, consent-aware notifications, optional integrations. Exit: supported-device tests pass and unavailable options remain hidden; QR/web core remains functional.

## Phase 12 — Production launch

Deliver: security/performance/accessibility review, legal/accounting signoff, backups/restore, monitoring, staging, deployment, pilot, support and rollback. Exit: written release checklist passes and launch is controlled.

Dependencies and risks are recorded in [DECISIONS.md](DECISIONS.md).
