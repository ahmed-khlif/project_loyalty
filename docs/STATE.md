# Project state

## Current phase

**Phase 3 — Design system implementation complete.** Milestones 3.1 through 3.6 are implemented on the `phase-03-design-system` branch. The remaining Phase 3 release prerequisite is human visual/accessibility review on representative mobile, desktop, and Arabic RTL browsers/devices. Phase 4 has not started.

## Phase 3 result

Implemented the design-system contract in `packages/ui` and the responsive web shells in `apps/web`:

- semantic light/dark design tokens, typography fallback stacks, focus-visible treatment, semantic state colors, reduced-motion support, and reusable layout/state primitives;
- `next-intl` URL-prefixed `fr`, `ar`, and `en` routing with server-loaded message catalogs, locale-aware `lang`/`dir`, Arabic RTL shell direction, and language controls;
- customer membership, credential, join, recovery, rewards, activity, and account shells;
- marketing how-it-works and contact shells;
- cashier/staff overview, scanner, results, and exception shells with camera-denied, unsupported-device, offline, and no-submission states;
- merchant overview, programs, activity, branches/staff, billing, and settings shells;
- platform-admin overview, merchants, subscriptions, support, and audit shells;
- localized preview/status copy with no synthetic customer, reward, revenue, transaction, or account fixtures.

The route shells are intentionally non-authoritative. They do not authenticate users, load tenant data, generate QR credentials, request camera access, confirm purchases, issue stamps, redeem rewards, mutate billing, or perform administrative actions.

## Documentation updated

- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) records the implemented route/component inventory, token contract, preview boundary, and review handoff.
- [DECISIONS.md](DECISIONS.md) records the locale decision and preview-shell boundary as D-015 and D-016.
- [ROADMAP.md](ROADMAP.md) marks Phase 3 implementation complete and preserves the human visual-review gate.

## Verification actually performed

Passed:

- `pnpm install --frozen-lockfile` after adding the pinned `next-intl` dependency;
- `pnpm --filter @njiw/web lint`;
- `pnpm --filter @njiw/web typecheck`;
- `pnpm --filter @njiw/web test` — 3 tests passed, including aligned locale catalogs and Arabic copy presence;
- `pnpm --filter @njiw/web build` — Next.js production build generated all Phase 3 routes;
- runtime route smoke against the local web server: `/fr`, `/ar`, `/en`, `/fr/membership`, `/fr/membership/credential`, `/fr/staff`, `/fr/staff/scan`, `/fr/merchant`, `/fr/admin`, `/fr/how-it-works`, and `/fr/contact` returned `200`; `/ar` returned `dir="rtl"`;
- repository status checked after build-generated files were removed from the worktree.

Previously verified Phase 2 checks remain recorded in the earlier state history and include full workspace lint/typecheck/test/build, Prisma validation/generation, Docker-backed PostgreSQL/Redis health, migration, isolated DB test, and API health/readiness runtime checks.

Not verified here:

- real-device camera/QR behavior, Wallet/NFC behavior, authentication, tenant authorization, production data, accessibility with assistive technology, browser-matrix visual review, final contrast review, legal/provider approvals, GitHub Actions execution, and production deployment;
- human visual inspection of rendered mobile/desktop and Arabic typography. Automated route smoke verifies availability and direction markup, not visual quality.

## Scope guard

No Phase 4 identity or tenancy work was started. No authentication, customer registration, loyalty ledger, QR issuance/scanning, Wallet/NFC integration, merchant billing mutation, or customer data collection was added.

## Branch and handoff

The active branch is `phase-03-design-system`. The Phase 3 changes are ready for developer review and push. No remote push was performed by Codex.

## Next single task

Perform the human Phase 3 visual/accessibility review on representative customer, staff, merchant, and admin screens at narrow/wide widths and Arabic RTL. Once approved, begin Phase 4 identity and tenancy; do not implement loyalty transactions before authorization and tenant scope exist.
