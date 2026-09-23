njiw. / نجيو — Codex project instructions
Project status: Phase 1 — product foundation and specifications.
This file is the persistent operating contract for Codex. Read it at the start of every new task, along with docs/STATE.md when that file exists.

1. Mission and audience
Build njiw., a production-oriented, mobile-first, multi-tenant loyalty SaaS for independent cafés in Tunisia, with an architecture that can later serve other local businesses. The name njiw. / نجيو and current logo are working brand concepts, not cleared trademarks or finalized production assets.
- Customer: joins a café loyalty program, views a digital card, presents a QR credential, collects progress after staff-confirmed eligible purchases, and redeems earned rewards. A native app and an online purchase are not required.
- Cashier: signs in, scans a customer credential, confirms an eligible purchase, issues stamps via the backend, and redeems rewards under assigned permissions.
- Manager/owner: sets up businesses and branches, staff, branding, loyalty programs, reward rules, customer support, reports, and subscription records.
- Platform administrator: handles controlled merchant onboarding, support, subscriptions, operational incidents, and auditable administration.
Customer purchases happen directly at the café through its existing methods, including cash. njiw. does not process purchases, hold funds, or require an online payment gateway. For platform subscriptions, plan for TND invoices and manually verified payments (for example cash or bank transfer), with financial/legal details reviewed before launch.
2. Non-negotiable product truths
1. A static counter QR code or ordinary NFC sticker opens a café page. Neither proves a purchase nor grants a stamp automatically.
2. Only an authorized staff workflow can confirm a qualifying purchase and request loyalty issuance. The server independently validates identity, tenant/branch, eligibility, limits, program version, and idempotency.
3. A customer QR credential identifies or authorizes presentation of a membership, not a payment. Prefer short-lived, single-use authenticated web credentials for sensitive interactions. A static Wallet barcode must not be treated as equivalent to a fresh one-time proof.
4. Direct phone-to-terminal NFC Wallet redemption requires separate hardware/platform support; do not describe a cheap NFC sticker as a full NFC payment/Wallet reader.
5. Earned benefits must follow documented, versioned loyalty-program terms; changing a program must not silently destroy existing valid entitlements.
6. Never use localStorage, a UI counter, an unverified client claim, or an AI model as the authoritative reward balance. Use server-side transactional records and auditable corrections.
7. No fake completed features, hardcoded production accounts, mock purchase success, or fabricated revenue. Clearly isolate preview/demo fixtures from production functionality.
8. Until integrated with an actual sales/POS system, analytics describe validated loyalty activity, not total sales or proof of customer spending. Staff confirmation alone cannot independently prove payment.
9. Customer use must have a mobile web fallback for devices without NFC, Wallet, or a supported native app. Define accessible alternatives for people without smartphones.
10. Do not imply offline reward redemption is verified when the server cannot confirm it. Define a safe pending-earnings and manual-exception policy.
3. Design and brand contract
Brand tone: welcoming, calm, contemporary, trustworthy, premium but approachable, rooted in Tunisian café culture. Use the provisional names njiw. and نجيو until trademark, domain, language, and customer checks are completed. Do not claim the previously generated logo is a final vector asset.
- Core palette to evaluate as semantic tokens: canvas #F7F6F2, surface #FFFFFF, deep forest #273D35, coffee accent #B18B64, ink #252A27. Adjust text/state colors as needed to satisfy WCAG contrast; do not use decorative accent color for unreadable small text.
- Latin UI direction: Geist Sans; Arabic UI direction: IBM Plex Sans Arabic, subject to actual rendering, licensing, and readability checks. Avoid assuming equal font sizes/line heights yield equal visual weight.
- Use shadcn/ui as the primary component foundation, Tailwind CSS for styling, Lucide for icons, consistent spacing, restrained shadows, clean borders, and purposeful motion with reduced-motion support.
- Customer: brand-forward, phone-first, clear progress and reward, quickly accessible scan credential, minimal navigation.
- Cashier: fast camera/scanner, large targets, explicit transaction result, recoverable errors, minimal private customer data.
- Owner/admin: readable dense information, reliable filters/tables, predictable actions, accessible responsive layouts; not oversized decorative cards.
- First-class French, Arabic with full RTL, and English; support mixed-script content, currency in TND, date/time formatting, and customer language preference independent of café language.
- Use real copy and accurate product states. Avoid autoplay animations, excessive gradients, glassmorphism, decorative dashboards, and a generic coffee-cup-as-logo requirement.
4. Technical direction (validate in Phase 1)
- pnpm monorepo; Next.js App Router + React + TypeScript for the responsive web application with customer/staff/merchant/admin route groups and distinct layouts.
- NestJS + TypeScript modular-monolith backend; PostgreSQL + Prisma persistence. Redis/BullMQ only where background jobs, rate-limiting, or ephemeral challenges justify them.
- shadcn/ui + Tailwind, next-intl, React Hook Form + Zod, TanStack Table where needed; use a well-tested camera/QR library after testing on real devices.
- Use OpenAPI/typed contracts where practical. Backend owns validation, permissions, state transitions, and business rules.
- Local development: Docker Compose for database/Redis; separate development, staging, and production. Deploy using managed services when requirements and data-residency/legal review permit.
- Test tooling: appropriate unit/integration runner and Playwright E2E; CI for lint, typecheck, migration checks, tests, and builds.
- Do not scaffold code during Phase 1. Check dependency/version compatibility against official documentation at the beginning of the implementation phase, then record and lock selected versions.
5. Security, reliability, and privacy invariants
- All business-owned resources use server-verified tenant and branch scope. Never trust a tenant ID, role, balance, or ownership claim supplied by a browser.
- Apply business-specific authorization even when one user holds roles in several cafés. Customers and cafés cannot see unrelated cafés' private data.
- Use secure sessions, CSRF protection where relevant, staff/merchant MFA appropriate to risk, rate limits, secret management, encryption in transit, audit trails, and restrained access to customer data.
- Issue and redeem rewards using atomic database transactions, appropriate unique constraints, idempotency, and concurrency tests. Write immutable loyalty events plus explicitly authorized compensating corrections; maintain a rebuildable balance projection if used.
- Design expiry, revocation, replay prevention, duplicate scans, simultaneous redemptions, staff misuse, device loss, account recovery, and intermittent connectivity before release.
- Collect only necessary customer information. Separate core loyalty participation from optional marketing consent and optional customer profile data. Provide documented export/deletion request paths, retention rules, and restricted admin access.
- Before real-customer deployment, obtain qualified Tunisian legal/accounting review for personal-data processing and international data transfers, business registration/invoicing, privacy terms, and integrations. Do not assert that a cloud region, foreign analytics provider, or third-party messaging service is automatically compliant.
- Keep live secrets, signing certificates, real customer data, and production database dumps out of the repository and AI prompts.
- Define backup/restore testing, metrics, incident response, retry/dead-letter handling, deployment rollback, and alerting before commercial launch.
6. Repository layout target
Use this as a target, not an instruction to create directories before Phase 2:
apps/web/                 # One Next.js app; role-specific routes/layouts
apps/api/                 # NestJS modular monolith
packages/ui/             # Shared shadcn-based components and design tokens
packages/database/       # Prisma schema, migrations, database utilities
packages/contracts/      # Shared validated API contracts/types
packages/config/         # Shared tooling configuration
packages/testing/        # Test helpers and non-production fixtures
infrastructure/          # Local and deployment configuration
docs/                    # Specifications, decisions and project state
AGENTS.md
7. Full delivery phases
Codex must work on one active phase at a time. A phase is complete only after its specified acceptance checks are satisfied, actual verification results are recorded in docs/STATE.md, and the developer approves moving on. The phase descriptions define scope, not permission to implement everything at once.
Phase	Scope	Exit criterion
1 — Foundation	Validate user flows and assumptions; write full product, brand, UX, domain, architecture, security, legal-risk, testing and operations specifications.	Docs are coherent, decisions/unknowns explicit, phase plan and acceptance criteria reviewed; no app code.
2 — Repository	Monorepo, app/backend scaffolds, shadcn baseline, database/Redis local services, config, CI.	Reproducible install; frontend/backend start; health check; lint/typecheck/build pass.
3 — Design system	Tokens, multilingual layouts, customer card, scanner shell, merchant/admin shells, responsive and accessible states.	Representative screens visually reviewed on mobile/desktop and Arabic RTL; previews not misrepresented as functioning business flows.
4 — Identity & tenancy	Customer accounts/memberships, secure staff/merchant sessions, recovery, consent, role and branch scope.	Authorized access works; cross-user/cross-tenant access tests fail closed.
5 — Merchant onboarding	Business/branch setup, staff invitations, brand customization, merchant lifecycle.	Owner can set up real business and assign scoped staff securely.
6 — Program & ledger	Rule builder, versioning, eligibility, immutable earning events, balance projection, rewards.	Deterministic domain and concurrency tests pass; existing earned rights protected.
7 — Customer enrollment	Café landing, signup, membership card, QR credential, account recovery and history.	Customer can join and retrieve a real membership using web fallback.
8 — Staff transactions	Camera scanning, server-authorized purchase confirmation, stamp issuance, redemption, corrections and connection failure states.	Two-device real-café journey succeeds; replay, duplicates and double redemption prevented.
9 — Merchant operations	Real loyalty analytics, customers, transactions, campaigns, staff control and exports.	All reporting is derived from actual authorized records and properly tenant-scoped.
10 — Billing & platform admin	TND invoices, manual payment verification, subscription lifecycle, merchant support and audit-safe administration.	No fictitious payment success; invoices, entitlement changes and administrative controls tested.
11 — Wallet & engagement	Apple/Google Wallet integrations subject to approval, web fallback, physical NFC tags, consent-aware notifications.	External integrations tested on supported devices; unavailable options hidden; core QR experience remains functional.
12 — Production launch	Security/performance/accessibility review, legal/accounting signoff, backups/restore, monitoring, staging, deployment, real-device pilot.	Written release checklist passed; controlled launch with support and rollback procedures.


8. Phase 1: exact execution contract — ACTIVE NOW
Goal: produce complete actionable specifications, not UI mockups or working code. Read AGENTS.md first. The initial repository may contain only this file; do not assume other files exist.
1A. Create the documentation tree
Create exactly these documents (expand only when justified):
docs/PRODUCT.md              # Vision, customers, goals/non-goals, value proposition, business model
docs/REQUIREMENTS.md         # Feature inventory by role, use cases, exceptions, testable acceptance criteria
docs/BRAND.md                # Provisional name/logo direction, verbal identity, localization, clearance to-do
docs/UX_DESIGN.md            # Journey maps, screen inventory, navigation, accessibility, UI states, tokens
docs/ARCHITECTURE.md         # Boundaries, application flows, choices/tradeoffs, deployment topology
docs/DATA_MODEL.md           # Entities, relationships, tenant scope, constraints, ledger, versioning
docs/API.md                  # Endpoint outline, auth rules, errors, idempotency and versioning
docs/SECURITY_PRIVACY.md     # Threat model, fraud controls, permissions, privacy/legal-review checklist
docs/TEST_STRATEGY.md        # Verification matrix, device coverage, concurrency and failure tests
docs/OPERATIONS.md           # Tunisia billing constraints, hosting prerequisites, monitoring, backups, support
docs/ROADMAP.md              # Dependency-ordered phase breakdown, deliverables, exit criteria
docs/DECISIONS.md            # Decision records, assumptions, risks, unanswered questions
docs/STATE.md                # Current phase, completed outputs, checks performed, blockers, next task
1B. Settle high-impact product decisions on paper
Document and justify the chosen strategy for: per-item vs per-visit stamps; multi-item purchases; valid proof of purchase without POS; merchant-controlled terms and customer grandfathering; reward issuance/expiry/redemption; static vs rotating membership credentials; recovery for browser-only cards; staff fraud and correction approval; low-connectivity behavior; optional phone/email; multiple branches; merchant suspension and customer access to earned rewards; customer and business data separation; locale behavior; manual subscription renewal and overdue accounts. Mark unresolved external/legal/brand approvals explicitly rather than guessing.
1C. Define end-to-end journeys and acceptance tests
At minimum specify: café onboarding; staff invitation; program publication; first customer visit; repeat QR scan and staff award; sixth eligible coffee and reward issuance; reward redemption; duplicate request; concurrency; program rule change; customer device loss; camera-denied or NFC-incompatible phone; offline staff device; merchant subscription expiration; customer privacy request.
1D. Phase 1 completion checklist
- [ ] Every document above exists, is internally consistent, and links to related decisions rather than duplicating conflicting rules.
- [ ] Every major role and screen has user goals, main actions, empty/loading/error/success states, and testable acceptance criteria.
- [ ] QR, ordinary NFC sticker, Wallet pass, and reader-based NFC are distinguished correctly.
- [ ] Purchase/stamp/reward authority and duplicate/replay/concurrency behavior are explicitly specified.
- [ ] Tunisia-specific currency, languages, connectivity, payment, data-processing, and invoicing constraints are covered without presenting unverified legal advice as settled.
- [ ] Production work and future optional integrations are explicitly separated, without calling placeholders complete.
- [ ] docs/DECISIONS.md identifies assumptions, decisions, alternatives, unresolved blockers, and external prerequisites.
- [ ] docs/STATE.md summarizes what was created, what was actually checked, and the next single task.
- [ ] No application scaffold, database migration, UI component, or production code was generated in Phase 1.
Phase 1 stop condition: once the docs and written review are complete, stop and present the findings. Do not automatically begin Phase 2.
9. General Codex task workflow
1. Read this file, the active phase in docs/STATE.md (if present), and only the relevant specification documents.
2. Inspect repository state and existing code before editing. Never overwrite a user's existing work or the approved logo without explicit instruction.
3. Summarize the concrete scope, assumptions, and planned file changes. Keep changes within the active phase.
4. Implement the smallest complete vertical slice of that phase with relevant validation, permissions, errors, and tests.
5. Run the available checks; report precisely what ran, what passed, what failed, and what could not be tested. A build alone is not production validation.
6. Update the relevant specifications, docs/DECISIONS.md, and docs/STATE.md as appropriate.
7. Stop at the phase boundary; do not self-authorize work from the next phase.
10. Definition of done and communication
No feature is "production-ready" unless functional and security requirements, authorization, persistence, concurrency where relevant, accessibility, localization, error recovery, automated testing, and real-environment acceptance criteria have been met. Do not claim that legal approval, provider approval, device compatibility, security testing, or deployment happened unless it actually did.
At the end of each task, respond concisely with changed files, implemented behavior or produced documents, verification actually performed, open risks/decisions, and the exact next task. Prefer concise factual progress over long status narration. Do not begin the next phase without developer approval.