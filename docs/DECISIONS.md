# Decisions, assumptions, risks, and unknowns

## Decision records

### D-012 — Phase 2 foundation versions and package boundaries

**Decision:** Pin Node 22.16.0-compatible tooling in one pnpm lockfile: pnpm 12.5.1, Next.js 16.3.6, React 19.3.0, NestJS 12.1.0, Prisma 7.10.0, Tailwind CSS 4.3.3, TypeScript 6.0.3, ESLint 9.39.5, and Vitest 4.0.15. Use `apps/web`, `apps/api`, `packages/ui`, `packages/database`, `packages/contracts`, `packages/config`, `packages/testing`, and `infrastructure` in the existing repository root.

**Reason:** Node 22.16.0 satisfies the current Next.js and NestJS requirements; TypeScript 6 is selected because the pinned `typescript-eslint` release does not support TypeScript 7. Prisma 7 uses `prisma.config.ts`, the ESM-first client generator, and `@prisma/adapter-pg` for PostgreSQL. The shared UI package follows shadcn's supported monorepo export pattern. **Sources:** [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [NestJS first steps](https://docs.nestjs.com/first-steps), [shadcn monorepo](https://ui.shadcn.com/docs/monorepo), and [Prisma configuration](https://www.prisma.io/docs/orm/v6/reference/prisma-config-reference).

**Constraint:** This phase does not create authentication, customer/loyalty models, QR issuance/scanning, Wallet/NFC, billing, or customer data workflows. The Prisma schema contains only a harmless `FoundationState` connectivity/migration marker.

### D-001 — Phase boundary

**Decision:** Phase 1 produces specifications only; no application scaffold, database migration, UI component, or production code.

**Reason:** Product, trust, legal, and concurrency assumptions need review before implementation. **Alternative rejected:** beginning Phase 2 from a visual mockup or unverified dependency set.

### D-002 — Staff-confirmed loyalty, not payment processing

**Decision:** A qualifying purchase is a staff-confirmed loyalty input. Until POS integration, analytics say validated loyalty activity and do not prove payment or total sales.

**Reason:** The platform does not control café payment methods. **Risk:** staff fraud or inaccurate confirmation; mitigate with scope, caps, audit, anomaly review, and corrections.

### D-003 — Per-item default with caps

**Decision:** Default eligibility is per item; merchants may publish per-visit or other rules with explicit caps and versioned terms.

**Reason:** It handles multi-item café purchases transparently while limiting abuse. **Open:** exact program-builder vocabulary and default caps need merchant/customer research.

### D-004 — Immutable versioned terms

**Decision:** Published program versions do not mutate; existing earned rights retain their source terms/version.

**Reason:** Prevents silent entitlement loss. **Open:** legal wording for exceptional migration/closure requires review.

### D-005 — Short-lived credentials

**Decision:** Sensitive staff actions prefer short-lived, single-use, authenticated web credentials. Static QR, static Wallet barcode, and ordinary NFC sticker are not proof or automatic award authority.

**Reason:** Reduces replay and misleading NFC/QR expectations. **Open:** library and device support will be selected in Phase 2/8 after official documentation and real-device tests.

### D-006 — Server-authoritative ledger

**Decision:** Durable event/reward transactions and rebuildable projections are authoritative; client storage/counters are not.

**Reason:** Protects integrity under retries and concurrency. **Open:** exact isolation/locking strategy is an implementation decision supported by database tests.

### D-007 — No verified offline redemption

**Decision:** Offline devices may show pending/unavailable and optionally queue a bounded server-validation request; they cannot present redemption as verified.

**Reason:** There is no safe server confirmation while disconnected. **Open:** whether a later signed pending queue is worth the operational complexity.

### D-008 — Customer recovery and minimum data

**Decision:** Phone/email are optional unless selected for recovery/communication; browser-only cards need verified-factor or support-assisted recovery. Marketing consent is separate.

**Reason:** Balances accessibility and data minimization. **Open:** exact identity-proof steps and retention require privacy/security review.

### D-009 — Branch-scoped operations

**Decision:** Businesses own branches; staff assignments and transactions are branch-scoped unless explicitly authorized across branches.

**Reason:** Limits misuse and supports multi-location owners. **Open:** cross-branch membership use and reporting policy needs merchant research.

### D-010 — Suspension preserves history

**Decision:** Merchant suspension blocks configured new activity but does not erase customer history or valid entitlements; behavior is visible and audited.

**Reason:** Avoids silent customer harm. **Open:** redemption/access policy during insolvency or closure requires terms/legal review.

### D-011 — Manual TND subscription records

**Decision:** Subscription lifecycle supports invoices and manually verified cash/bank-transfer evidence; no fake online payment success.

**Reason:** Matches current scope and avoids premature gateway/legal assumptions. **Open:** invoicing/tax/accounting workflow and evidence retention require Tunisian review.

### D-013 — Phase 3 Milestone 3.0 design contract

**Decision:** Preserve the existing App Router locale shell and shared `packages/ui` boundary. Phase 3 will add semantic theme tokens, reusable layout/state primitives, locale-aware role shells, and isolated visual previews in dependency order. It will not add authentication, business mutations, real credentials, scanner decoding, or domain data.

**Reason:** The Phase 2 repository already has a working web/API boundary and a minimal shadcn-compatible UI package. The Phase 3 brief requires distinct customer, staff, merchant, and admin experiences without allowing preview UI to imply production authority. Route groups and screen paths are documented in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) and implemented as preview-safe shells.

**Preview rule:** No synthetic fixtures are placed on live routes. Until production exclusion is guaranteed, use isolated component stories/tests or another explicitly non-production visual mechanism. A visual button must not simulate a loyalty, financial, authentication, or publishing mutation.

**Open:** locale preference persistence, font loading/licensing, light/dark preference behavior, preview tooling, role URL prefixes, and merchant-authored translation workflow. The implementation branch is `phase-03-design-system`; remote push remains a developer-controlled handoff.

### D-014 — Phase 3 Milestone 3.1 semantic foundation

**Decision:** Map the approved njiw. palette into semantic CSS variables for light and dark themes, expose those variables through Tailwind utilities, and use them in shared primitives. Use Geist/IBM Plex Sans Arabic-compatible CSS fallback stacks without bundling font binaries until rendering, licensing, and loading are reviewed. Use explicit focus-visible rings, semantic state colors, status icons, and comfortable action targets in the shared layer.

**Reason:** Feature components need one accessible token contract before customer, staff, merchant, and admin shells multiply. The coffee accent remains a decorative/secondary token and is not used as small body text. Theme support is present as a foundation through `data-theme`; preference persistence and theme controls remain unresolved and are not invented here.

**Open:** actual font loading/provider choice, contrast verification across rendered browsers, Arabic shaping/line-height review, and the user-facing theme preference policy.

### D-015 — Phase 3 locale and layout foundation

**Decision:** Use `next-intl` `4.14.6` with URL-prefixed `fr`, `ar`, and `en` locales, French as the default locale, and an App Router proxy for locale selection. Load catalogs server-side through `getTranslations`; set the document `lang` and `dir` from the selected locale; expose a locale switcher on every shell.

**Reason:** The product requires first-class French, Arabic RTL, and English before role screens multiply. URL-prefixed locales make links, QA, and support references explicit while keeping customer language independent from café/business data.

**Constraint:** Catalogs are real product copy, not demo data. Merchant-authored content, account preference persistence, translation workflow, and final font loading remain later decisions. Arabic correctness still requires review by a fluent speaker and real browser/assistive-technology checks.

### D-016 — Phase 3 preview shell boundary

**Decision:** Implement customer, staff, merchant, admin, and marketing routes as responsive, localized, preview-safe shells. All transaction, identity, billing, balance, credential, and administrative actions remain absent or informational; state components explicitly show unavailable, empty, loading, error, camera-denied, unsupported, and not-connected conditions.

**Reason:** Phase 3 validates hierarchy and interaction states without creating fake authority or synthetic production records. This preserves the Phase 3 boundary while giving later identity, ledger, enrollment, and operations phases stable UI contracts.

**Verification:** Web lint, typecheck, tests, and production build pass. Route smoke returned `200` for representative locales and role routes, including Arabic `dir="rtl"`. Human visual review on real mobile/desktop browsers, keyboard/assistive technology review, and contrast validation remain required before production use.

### D-017 — Phase 3 visual refinement direction

**Decision:** Make the public customer experience the visual anchor: warm canvas, deep forest membership card, coffee micro-accents, stronger editorial headings, and fewer status badges. Keep staff focused on a fast counter task, while merchant/admin surfaces use calmer dense panels with role-specific icons and hierarchy.

**Reason:** The first Phase 3 implementation was structurally correct but read as a generic scaffold. The refined direction gives njiw. a distinctive café relationship without using fake balances, synthetic stamps, or decorative dashboard noise.

**Constraint:** Visual personality must not imply that authentication, scanning, purchase confirmation, rewards, billing, or analytics are connected. The membership card shows empty slots and clearly states that progress appears only after a real connection.

## Assumptions

- Independent cafés can provide an authorized cashier workflow and publish eligibility terms.
- Customers can use a mobile browser or receive assisted access.
- Network connectivity is common but not guaranteed at the counter.
- The initial product can operate without POS integration.
- French, Arabic, and English content can be maintained or reviewed by appropriate speakers.

## Unresolved blockers and external prerequisites

- Trademark/domain/name and logo clearance.
- Tunisian privacy, data processing/transfer, retention, consumer terms, business registration, invoicing/tax, and manual-payment review.
- Hosting/provider and subprocessor assessment.
- Exact MFA/recovery policy and support identity proof.
- Program rule defaults, caps, customer grandfathering edge cases, and merchant closure terms.
- Supported browser/device/camera/QR library and Wallet/NFC provider approvals.
- Accessibility review with assistive technology and Tunisian language users.
- Final operations staffing, SLA, backup/restore targets, and incident ownership.

## Risk register

| Risk | Impact | Mitigation/owner |
|---|---|---|
| Staff fraud or collusion | False rewards/cost | Caps, anomaly signals, audit, scoped permissions, merchant review |
| Credential replay | Unauthorized earn/redeem | Short-lived single-use challenges, nonce store, idempotency |
| Ambiguous café terms | Customer disputes | Versioned preview, explicit translations, grandfathering |
| Poor connectivity | False promises/counter friction | Pending/unavailable states, no offline redemption, tested retry |
| Cross-tenant leakage | Severe privacy harm | Query scope, authorization tests, least privilege, exports audit |
| Provider/legal incompatibility | Launch delay/compliance risk | Treat as prerequisites; do not claim approval |
| Recovery abuse | Account/reward takeover | Verified factors, revocation, support review, rate limits |

## Review record

Phase 1 review questions: Are the earning unit/caps and offline policy acceptable? Are program closure and customer entitlement rules approved? Are legal/privacy/accounting prerequisites assigned? Are roles, screens, API states, and test cases complete enough to scaffold? Developer approval is required before Phase 2.
