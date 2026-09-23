# njiw. / نجيو — Phase 03: UI/UX and design system

**Status:** Ready to begin after Phase 02 is verified  
**Owner:** Project developer with Codex in VS Code  
**Purpose:** Establish an implementation-ready visual and interaction foundation for the full production application.  
**Scope boundary:** Design system, responsive layouts, component library, route shells, i18n and representative user journeys. **No fabricated auth, purchase confirmation, stamps, rewards, merchant analytics, or billing.**

## 0. Preconditions and source of truth

1. Read `AGENTS.md`, `docs/PRODUCT.md`, `docs/REQUIREMENTS.md`, `docs/BRAND.md`, `docs/UX_DESIGN.md` (or actual equivalents), `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`, `docs/DECISIONS.md`, and `docs/STATE.md`. Reconcile this phase document with the approved documents; record conflicts rather than silently overriding them.
2. Inspect the **actual** Phase 02 repository; do not assume that the proposed paths, ports, tools, or versions were created. Confirm `apps/web`, shared UI package (if present), backend health endpoint, local database, scripts, and passing Phase 02 verification. Report unverified preconditions instead of asserting they passed.
3. Make a Git checkpoint for Phase 02 if it has been reviewed and verified. Create a phase-specific branch. Work in the existing repository; do not reinitialize Next.js or create a duplicate project.
4. Do not begin new business logic, database migrations, authentication implementations, scanner camera decoding, Wallet pass generation, or transaction APIs in Phase 03.

## 1. Brand and UX principles

- **Working name:** `njiw.` / `نجيو`, subject to trademark/domain clearance; do not claim that legal availability has been established.
- **Personality:** Tunisian-rooted, contemporary, friendly, premium, quiet, readable, not childish or a generic coffee-store template.
- **Customer promise:** A person can see their café, progress, next reward, and their member-card entry point with minimal navigation.
- **Staff promise:** During a rush, the primary action is obvious. Camera/scan and confirmation states are visually distinct; no distractions.
- **Owner promise:** Business information is readable, accurate, and actionable without clutter.
- **Admin promise:** Access-sensitive operational pages prioritize clarity and auditability over decoration.
- **Visual constraint:** No generic coffee-cup-as-logo substitutions, excessive gradients, glassmorphism, decorative charts, or fabricated revenue.
- **Language:** French, Arabic (real RTL), English. Tunisian phrasing may be used in marketing; security/legal/transaction messages must be precise.
- **Currency:** TND in locale-appropriate format, with three fractional digits when money is displayed. There is no customer checkout or online payment flow.
- **Logo:** Treat the earlier generated image as a *concept only*. Do not scrape it from conversation or invent a production-ready SVG. Use an approved accessible text wordmark until a reviewed logo asset is provided in the repository.

## 2. Design tokens — starting direction, verify contrast

| Token | Suggested value | Usage |
| --- | --- | --- |
| `--brand-canvas` | `#F7F6F2` | Warm page background |
| `--brand-surface` | `#FFFFFF` | Content panels |
| `--brand-forest` | `#273D35` | Primary brand and primary button |
| `--brand-coffee` | `#B18B64` | Decorative accent only unless tested for contrast |
| `--brand-ink` | `#252A27` | Body headings and text |

Use semantic tokens mapped to shadcn's expected token names and support both light/dark modes. Define text-muted, border, input, ring, destructive, success, warning, and focus tokens by purpose. Do not blindly use the coffee accent for small text on cream. Test WCAG 2.2 AA contrast and adjust values where needed. Avoid hard-coded colors within feature components. Use a consistent 4px-based spacing scale; ordinary panels can start at 12–16px radius, but hierarchy and accessibility matter more than a single radius everywhere. Ensure 44px-ish comfortable mobile target sizes where practical; meet applicable WCAG 2.2 target-size requirements.

**Typography:** Geist Sans (Latin) and IBM Plex Sans Arabic (Arabic) are proposed pairings; validate visual fit, weight coverage, font source/licensing, fallbacks, loading performance, numeral direction and Arabic line height. Do not distribute font binaries. Preserve native Arabic letter shaping and mixed LTR/RTL isolation.

**Motion:** Favor reduced, purposeful 120–220ms state transitions; honor `prefers-reduced-motion`. Avoid motion in time-sensitive scanner feedback.

## 3. Component inventory

Use existing shadcn/ui primitives where appropriate: Button, Input, Label, Select, Checkbox, Card, Badge, Dialog, Sheet, Tabs, Table, Tooltip, Skeleton, Alert, Toast/Sonner, Separator, DropdownMenu, Sidebar, Form-related primitives. Check which are installed and consult current official docs before adding packages.

Create reusable Njiw-specific components, with documented props and variants:

- `BrandWordmark`, `AppShell`, `PageHeader`, `PageContainer`, `SectionHeader`, `EmptyState`, `ErrorState`, `LoadingState`, `StatusBadge`, `ConfirmActionDialog`.
- `CafeIdentity`, `LoyaltyCard`, `StampProgress`, `RewardCard`, `MemberCodePanel` (design shell, **not** an authentic QR token), `MembershipActivityRow`.
- `ScannerFrame`, `ScanResultPanel`, `PurchaseConfirmationPanel`, `RedemptionReviewPanel`, `TransactionFeedback` (all preview-only until integrated).
- `MetricCard`, `DateFilter`, `EntityDataTable`, `ProgramSummaryCard`, `BranchSwitcher`, `StaffRoleBadge`, `DashboardShell`.

Keep domain UI in feature folders and truly shared components in `packages/ui` if the approved architecture has it. Use composition rather than giant configurable components. Set component APIs before multiplying pages.

## 4. Route shells and screens

**Do not invent route groups if Phase 1 already specifies them.** Suggested user flows and screen set:

### 4A. Marketing
- Home: brand promise; how it works for customers and cafés; primary CTA to business onboarding and a concise privacy note.
- How it works and contact/support entry points; no invented pricing or live testimonials.

### 4B. Customer (mobile-first)
- Café public landing: name, branch, real program terms when later connected, how to join.
- Enrollment entry and recovery entry as interface shells only, without pretending signup has succeeded.
- Membership card: café identity, stamp progress, next reward, credential placement, supporting help.
- Rewards: available, used, expired, pending.
- Membership history, language and privacy/settings views.
- Every page: loading, not enrolled, empty, error, unavailable/offline and long-text states as applicable.

### 4C. Cashier/staff (mobile-first)
- Scanner landing: large camera viewport **visual shell only**, clear camera-permission and unavailable states; do not access camera unless explicitly included in the approved Phase 3 scope.
- Validation review: membership info minimized, branch, eligible purchase/quantity, confirm/cancel states.
- Reward review and redemption feedback.
- Invalid, expired, reused token, unauthorized branch, offline, and error patterns.
- No artificial success feedback from clicking `Confirm` before the real backend exists.

### 4D. Merchant dashboard
- Overview with clearly **preview-only** synthetic metrics; no revenue claim or fabricated customer data in live routes.
- Programs and program creation *form UI shell*, members, transactions, rewards, staff, branches, campaigns, subscription/invoices and settings navigation.
- Responsive sidebar + mobile adaptation; table empty/error/loading and pagination patterns.

### 4E. Platform admin
- Minimal distinct admin shell, navigation and representative business management/operational list UI. Must not expose admin functionality or fake role checks; actual authorization belongs to Phase 04.

**Preview policy:** Use typed local fixtures in an explicit non-production preview gallery, such as a development-only Storybook or `/dev-preview` that does not ship to production. On live app routes, show honest `Not connected yet` or disabled action states. Never leak preview fixtures into real API clients, auth, customer balances, staff confirmations or analytics. If you cannot guarantee gallery exclusion from production, use isolated component tests/stories only.

## 5. Phase 03 milestones, tasks and exits

### Milestone 3.0 — Audit and design contract
- Inspect Phase 02, read source-of-truth docs, list current components/routes, verify installed versions and scripts.
- Produce a concise screen inventory, flow map, token table, preview strategy, and implementation ordering.
- Identify UX/business rule questions and log them in `docs/DECISIONS.md` instead of inventing behavior.
- **Exit:** no incompatible architecture or scope assumptions; a documented plan exists.

### Milestone 3.1 — Brand, tokens, foundations
- Implement theme variables, typography, icon use, responsive primitives, page shells, component variants, accessible focus and reduced motion.
- Add a textual `njiw.`/`نجيو` brand lockup until approved graphic asset exists.
- Create documentation/previews for core components, both themes, all locales.
- **Exit:** consistent light/dark tokens, readable Arabic/Latin text, no direct color hacks in feature UI, keyboard/focus checks pass.

### Milestone 3.2 — i18n and layouts
- Configure a supported maintained i18n approach already approved in Phase 1 (e.g. `next-intl` if specified).
- Implement French, Arabic RTL, English locale routing/strings, language switching, locale persistence policy and currency/date formatting.
- Fix icon mirroring, directional spacing, form alignment, dialog flow, phone numbers and mixed-script codes.
- **Exit:** each representative shell renders in all three languages and remains usable on narrow phones.

### Milestone 3.3 — Customer flow and marketing
- Build home/public café card concept and customer pages from the screen inventory, reusing shared UI.
- Prioritize progress, next reward, member credential placement. Show actual credential only in a later integrated phase.
- Use development-only fixtures for visual previews, honest empty/non-connected production states.
- **Exit:** responsive preview of first visit, existing card, available reward, empty, error and long-translation cases.

### Milestone 3.4 — Staff transaction interface
- Create scanner and purchase/reward review panels, permission/error/connection states, and visually distinct pending/success states.
- Ensure `Confirm`/`Redeem` has no simulated backend mutation; in non-integrated routes leave actions disabled with explanatory text.
- **Exit:** ergonomic small-screen flow, readable in bright conditions, keyboard accessible where applicable, no fake award/redeem result.

### Milestone 3.5 — Merchant and platform dashboards
- Implement dashboard shell, navigation, overview, tabular patterns, program editor UI shell, staff/branch/settings structure, admin shell.
- Avoid total revenue, profit or campaign-lift metrics without POS data. Clearly label synthetic numbers in isolated previews only.
- **Exit:** responsive side navigation, scalable tables, useful empty/loading/error states, branch context visible.

### Milestone 3.6 — QA, documentation and handoff
- Run available lint/typecheck/build/unit tests and Playwright checks where configured; fix regressions.
- At a minimum, test representative routes at mobile (~375px), tablet (~768px), desktop (~1440px) widths, all three locales, and RTL navigation. Use real devices for final experience checks where possible.
- Check contrast, keyboard focus/order, labels, zoom up to 200%, reduced motion, overflow, loading/empty/error state visibility.
- Capture screenshots of representative states if project tooling supports this.
- Update `docs/DESIGN_SYSTEM.md` or `docs/UX_DESIGN.md`, `docs/DECISIONS.md`, and `docs/STATE.md` with exact completed work, tests actually run, known blockers and Phase 04 handoff.
- **Exit:** tests actually executed and results recorded; no critical a11y/layout defects; all preview-only screens unmistakably separate from production features.

## 6. Explicit non-goals

Do **not**: add Prisma entities/migrations; implement authentication/roles; connect backend for stamps, redemption, purchase confirmation or analytics; generate actual customer QR credentials; add camera scanner behavior; add Apple/Google Wallet integration; wire NFC reader APIs; implement online checkout; create fake merchant subscriptions; claim legal review or trademark clearance is complete.

Do not create placeholder buttons that appear to commit financial or loyalty transactions. A nonfunctional workflow must be visibly marked as a design preview or disabled until integration.

## 7. Release and quality checklist

- [ ] Phase 02 source docs and repository were audited and inconsistencies recorded.
- [ ] A single semantic design-token system powers shared components.
- [ ] Njiw brand typography and wordmark work at small mobile sizes.
- [ ] French, Arabic/RTL, English have working language and direction controls.
- [ ] Customer, staff, merchant and admin layouts have distinct, appropriate UX.
- [ ] Representative screen states include loading, empty, error and offline where relevant.
- [ ] No preview-only UI can grant stamps, redeem rewards, authenticate users, or show synthetic analytics as real.
- [ ] Mobile/tablet/desktop and keyboard/contrast/RTL checks were performed.
- [ ] Lint, typecheck, tests and build were run where available; failures are documented and resolved or reported.
- [ ] Decisions and `docs/STATE.md` updated with next task and known limitations.

## 8. First Codex task (send as a separate message)

> Read `AGENTS.md`, this `PHASE_03.md`, and the real Phase 01/02 documentation, including `docs/STATE.md`. Audit the actual repository; do not assume the scaffold matches example directory trees. For now execute **Milestone 3.0 only**: inventory the current components and routes, verify installed versions and available scripts, create or update the Phase 03 screen inventory and design contract, identify conflicts/unresolved decisions, and propose a dependency-ordered implementation plan. Make no new business-logic changes and do not start designing all pages yet. Record the result in `docs/STATE.md` and report findings and the exact next Milestone 3.1 task.

## 9. Follow-up prompt template for each milestone

> Read `AGENTS.md`, `PHASE_03.md`, relevant design and architecture docs, and `docs/STATE.md`. Implement **Milestone 3.X only** as specified, preserving existing architecture and design decisions. First inspect current files and outline changes. Use shadcn/ui and approved tokens, real locale strings/RTL, accessible responsive layouts, and isolated preview fixtures only where justified. Do not implement backend business logic or fake successful transactions. Add appropriate tests, run available verification commands, fix regressions, update docs and `docs/STATE.md`. Report changed files, checks actually run, remaining issues and whether this milestone's exit criteria passed. Stop before the next milestone.
