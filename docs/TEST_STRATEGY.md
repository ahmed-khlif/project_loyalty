# Test and verification strategy

Phase 1 defines the verification plan. It does not claim that any test has passed; the current execution record is in [STATE.md](STATE.md).

## Test layers

| Layer | Scope | Required examples |
|---|---|---|
| Unit/domain | Rule calculation, state transitions, localization helpers | per-item/per-visit rules, caps, expiry, version selection, corrections |
| API/integration | Database, auth, authorization, contracts | tenant isolation, branch scope, idempotency, error codes, transaction rollback |
| Concurrency | Database and service races | simultaneous sixth stamp, duplicate retry, two redemptions, correction conflict |
| Security | Abuse and access control | replay, enumeration, session theft assumptions, rate limits, export scope, CSRF where applicable |
| Component/visual | UI states and tokens | loading/empty/error/success, contrast, focus, responsive, Arabic RTL, long copy |
| E2E | Full role journeys | onboarding through redemption, recovery, subscription restriction, privacy request |
| Real-device | Camera/network/accessibility | supported iOS/Android browsers, camera denial, low bandwidth, interrupted request, QR readability |
| Operational | Jobs and resilience | retry/dead-letter, backup restore, migration rollback, alert delivery, incident runbook |

## Required domain cases

- zero/negative/very large quantities and invalid item categories;
- per-item versus per-visit and multi-item caps;
- threshold exactly reached, exceeded, and repeated;
- version change before/after earning and reward issuance;
- reward expiry, revocation, redemption, and correction;
- duplicate idempotency key with same/different request hash;
- reused/expired/wrong-audience credential;
- simultaneous earn/redemption and database rollback;
- branch mismatch, suspended staff, suspended merchant, overdue subscription;
- pending connectivity and reconciliation without false confirmation.

## Device and locale matrix

At minimum test current supported versions of major iOS Safari and Android Chrome, plus a desktop browser for merchant/admin. Test camera permissions, low-light QR, orientation, zoom, reduced motion, keyboard, screen reader, small viewport, slow network, offline transition, and interrupted tab.

Test French, Arabic RTL, and English for all major routes; mixed-script names, long program terms, TND values, dates/times, plural forms, right-to-left tables/forms, and missing translation handling.

## Acceptance evidence

Each phase records test command/version/environment, result, artifact or issue link, and known limitations. A passing build does not prove authorization, accessibility, device compatibility, concurrency correctness, legal approval, or production readiness.

## Phase gates

- Phase 1: documents coherent; decisions/unknowns explicit; no app code.
- Phase 2: reproducible install, app/API start, health check, lint/typecheck/build, migration checks.
- Phase 3: representative visual review on mobile/desktop and Arabic RTL; preview states honest.
- Identity/tenancy: cross-user/cross-tenant tests fail closed.
- Program/ledger: deterministic rules, concurrency, immutable event and grandfathering tests.
- Staff transactions: two-device real-café journey, replay/duplicate/double-redemption prevention.
- Launch: security/accessibility/legal/operations/recovery and controlled pilot checklist.

## Fixtures and test data

Fixtures must be clearly marked non-production, synthetic, resettable, and tenant-isolated. No hardcoded production accounts or real customer data. Load and security tests use generated data and approved environments.
