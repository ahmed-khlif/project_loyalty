# Phase 3 design system and implementation contract

Status: Phase 3 implementation complete through Milestones 3.1–3.6. The web shells, locale catalogs, role layouts, responsive state patterns, and automated handoff checks are implemented. Human visual review on real mobile/desktop browsers and assistive technology remains a release prerequisite. No listed shell claims to perform a production loyalty action.

## Source of truth and audit result

The governing sources are [PHASE_03.md](../PHASE_03.md), [BRAND.md](BRAND.md), [UX_DESIGN.md](UX_DESIGN.md), [REQUIREMENTS.md](REQUIREMENTS.md), [ARCHITECTURE.md](ARCHITECTURE.md), [DECISIONS.md](DECISIONS.md), and [STATE.md](STATE.md). The repository was inspected at the existing root; no nested application or replacement scaffold was created.

Phase 2 prerequisites confirmed:

| Area | Actual result |
| --- | --- |
| Workspace | `apps/web`, `apps/api`, `packages/ui`, `packages/database`, `packages/contracts`, `packages/config`, `packages/testing`, and `infrastructure` exist. |
| Web | Next.js App Router route `/` redirects to `/fr`; `app/[locale]/page.tsx` renders the current French, Arabic, and English foundation shell. |
| Shared UI | `packages/ui` exports `Button`, `Card`, `CardHeader`, `CardTitle`, `CardContent`, and `cn`; shadcn configuration exists in both web and UI packages. |
| API | NestJS health endpoints remain at `/api/v1/health/live` and `/api/v1/health/ready`; no product API was added. |
| Local services | PostgreSQL and Redis are healthy through Compose on the developer's configured ports (`5434` and `6380`). |
| Tooling | Node `22.16.0`, pnpm `12.5.1`, Next `16.3.6`, React `19.3.0`, Tailwind `4.3.3`, Lucide `0.511.0`, TypeScript `6.0.3`, and Vitest `4.0.15` are installed/pinned. |
| i18n/forms/data UI | `next-intl`, React Hook Form, Zod, TanStack Table, camera/QR libraries, and Storybook are not installed. They are not added in Milestone 3.0. |
| Git checkpoint | `phase-03-design-system` is the active implementation branch; the Phase 3 work is committed locally after verification. |

## Current component and route inventory

### Implemented foundation

- `apps/web/app/page.tsx`: root redirect to `/fr`.
- `apps/web/app/[locale]/page.tsx`: responsive foundation/marketing-status shell with localized navigation, a textual `njiw.` wordmark, honest foundation status, and an API liveness link.
- `apps/web/app/layout.tsx`, `apps/web/app/[locale]/layout.tsx`, `apps/web/i18n/`, `apps/web/messages/`, and `apps/web/proxy.ts`: URL-prefixed French/Arabic/English routing, message loading, locale-aware document direction, and language controls.
- `packages/ui/src/components/button.tsx`: default, outline, ghost, and three size variants; focus-visible ring and disabled state are present.
- `packages/ui/src/components/card.tsx`: basic card composition with header/title/content.
- `packages/ui/src/components/brand-wordmark.tsx`: accessible textual `njiw.` wordmark with optional Arabic rendering; no unapproved logo asset.
- `packages/ui/src/components/layout.tsx`: `AppShell`, `PageContainer`, `PageHeader`, and `SectionHeader` layout primitives.
- `packages/ui/src/components/states.tsx`: `EmptyState`, `LoadingState`, `ErrorState`, and `StatusBadge` primitives with semantic state colors and appropriate status/alert roles.
- `packages/ui/src/components/badge.tsx`: shared outline/default/secondary badge primitive used for preview and connection state labels.
- `packages/ui/src/styles/globals.css`: Tailwind v4 semantic light/dark variables, initial brand aliases, typography fallback stacks, focus-visible treatment, 44px-ish form/action targets, and reduced-motion override.
- `apps/web/components/role-shell.tsx`, `route-shells.tsx`, `role-pages.tsx`, `preview-panels.tsx`, and `marketing-shell.tsx`: distinct customer, staff, merchant, admin, and marketing shells with role navigation and preview-safe content.

### Intentionally not implemented in Phase 3

- No authentication, tenant lookup, loyalty balance, QR credential generation, camera decoding, purchase confirmation, redemption, billing mutation, or admin authority.
- No synthetic customer, merchant, revenue, or transaction fixtures are exposed on the routes.
- No theme preference persistence, font binary/provider assumption, Wallet/NFC integration, or Storybook/screenshot harness was introduced.

The implementation keeps every action informational or inert. Labels such as scanner, credential, program, billing, and audit describe future placement and state handling; they do not authorize or simulate the corresponding business operation.

## Screen inventory and delivery order

All screens below are design shells until the later identity, ledger, enrollment, transaction, operations, and billing phases connect them. A shell must not imply authentication, a successful transaction, a real reward balance, or real analytics.

| Role/area | Proposed route or shell | Primary purpose | Required first-class states | Milestone |
| --- | --- | --- | --- | --- |
| Marketing | `/[locale]` and future marketing group | Explain njiw. and the customer/café value without pricing or testimonials | loading, unsupported locale, long copy, offline informational state | 3.1–3.2 |
| Marketing | `/[locale]/how-it-works`, `/[locale]/contact` | Explain the service and support entry point | unavailable contact path, long translation, keyboard navigation | 3.3 |
| Customer | `/[locale]/cafe/[slug]` | Present a café identity, published-program placeholder, terms, and join entry | no program, unavailable café, loading, error, not connected | 3.3 |
| Customer | `/[locale]/join`, `/[locale]/recover` | Show enrollment/recovery form shells only | empty, validation, unavailable, assisted/manual alternative, session expiry | 3.3 |
| Customer | `/[locale]/membership` | Show membership/progress hierarchy without a real balance | not enrolled, loading, pending, confirmed preview, error, expired reward | 3.3 |
| Customer | `/[locale]/membership/credential` | Place the future membership credential and explain its purpose | unavailable, expired, refresh-needed, manual/assisted alternative; no real QR | 3.3 / 3.4 |
| Customer | `/[locale]/rewards`, `/[locale]/activity`, `/[locale]/account` | Organize reward status, history, language, privacy, and support | empty, pending, expired, error, permission/session expiry | 3.3 |
| Cashier | `/[locale]/staff` and staff layout shell | Establish fast counter navigation and branch context | signed-out shell, unavailable branch context, loading, permission denied | 3.4 |
| Cashier | `/[locale]/staff/scan`, `/staff/manual` | Visual scanner/manual-entry shell only | camera permission denied, unsupported device, scanning, invalid/replayed, offline | 3.4 |
| Cashier | `/[locale]/staff/review`, `/staff/result`, `/staff/redemption` | Show review and result states without mutation | pending, confirmed preview, rejected, duplicate, conflict, retry-safe explanation | 3.4 |
| Cashier | `/[locale]/staff/exceptions` | Explain exception/support path | empty, restricted, needs reason, submitted, failed | 3.4 |
| Merchant | `/[locale]/merchant` and merchant layout shell | Establish dense but readable business navigation | setup empty, loading, permission denied, suspended/overdue shell | 3.5 |
| Merchant | `/merchant/programs`, `/merchant/staff`, `/merchant/branches`, `/merchant/settings` | Provide structural navigation and form/table patterns | empty, draft, validation, filtered empty, error, confirmation | 3.5 |
| Merchant | `/merchant/overview`, `/merchant/activity`, `/merchant/billing` | Show preview-safe dashboard patterns | no activity, unavailable, queued/failed export, no revenue claims, not connected | 3.5 |
| Platform admin | `/[locale]/admin` and admin layout shell | Separate access-sensitive operational navigation | queue empty, restricted data, evidence pending, audit/action failure | 3.5 |
| Platform admin | `/admin/merchants`, `/admin/subscriptions`, `/admin/support`, `/admin/audit` | Representative list/detail patterns only | filtered empty, restricted, action requires reason, conflict, success/failure audit result | 3.5 |

The exact public URL scheme and whether role prefixes are retained in the URL are still implementation decisions. App Router route groups can provide distinct layouts without adding URL segments; authorization remains a Phase 4 concern.

## Flow map for visual review

```text
Marketing shell
    → café public shell
    → join/recovery form shell
    → membership/progress shell
    → credential placement shell

Credential placement shell
    → staff scanner shell
    → review shell
    → pending/confirmed/rejected result states
    → reward/redeem review shell

Merchant setup shell
    → program editor shell
    → branch/staff shell
    → activity/table shell

Admin queue shell
    → merchant/subscription/support detail shell
    → reasoned action/audit result shell
```

The arrows represent information architecture and visual review paths only. No arrow may perform a real mutation in Phase 3.

## Token contract for Milestone 3.1

Feature components should consume semantic tokens, never the raw brand colors directly. The proposed semantic map is:

| Semantic token | Initial intent | Initial source/constraint |
| --- | --- | --- |
| `--background`, `--foreground` | Page canvas and primary text | `#F7F6F2` / `#252A27`; contrast must be verified. |
| `--card`, `--card-foreground` | Panels and card content | `#FFFFFF` / `#252A27`. |
| `--primary`, `--primary-foreground` | Primary actions and navigation | Deep forest `#273D35` / white; verify all states. |
| `--secondary`, `--secondary-foreground` | Low-emphasis actions | Must remain distinguishable without color alone. |
| `--muted`, `--muted-foreground` | Supporting text and quiet surfaces | Select an accessible foreground; do not use coffee by default. |
| `--border`, `--input`, `--ring` | Boundaries, controls, focus | Focus must remain visible on canvas, surface, and dark surfaces. |
| `--destructive`, `--success`, `--warning`, `--info` | State communication | Explicit accessible values and icon/text support required. |
| `--brand-canvas`, `--brand-surface`, `--brand-forest`, `--brand-coffee`, `--brand-ink` | Brand aliases for reviewed themes | Coffee `#B18B64` is decorative/secondary until contrast testing passes. |

Use a 4px-based spacing scale, comfortable targets around 44px where practical, restrained 12–16px panel radii, and 120–220ms motion with a reduced-motion override. The exact font loading strategy remains open: Geist Sans and IBM Plex Sans Arabic must be checked for rendering, weight coverage, licensing, fallback, and Arabic line height before binaries or provider assumptions are added.

Milestone 3.1 should define light and dark variables using an explicit theme contract, but it must not use dark mode to hide unavailable product states.

## Preview and fixture boundary

No preview route or fixture data is being added in Milestone 3.0. Until production exclusion is guaranteed, component-level stories/tests or another isolated development artifact are safer than shipping synthetic customer, loyalty, merchant, or revenue data through live routes.

When a visual preview mechanism is selected:

- fixtures must be typed, local, and visibly labeled as preview-only;
- preview code must not be imported by API clients, authentication, balances, staff confirmation, redemption, billing, or analytics;
- live routes must use honest `Not connected yet`, disabled, empty, loading, or unavailable states;
- a button labeled Confirm, Redeem, Publish, or Pay must not simulate a successful mutation;
- no synthetic revenue or customer activity may appear in a production route.

## Dependency-ordered implementation plan

1. **Milestone 3.1 — brand, tokens, foundations:** complete.
2. **Milestone 3.2 — i18n and layouts:** complete with `next-intl`, URL-prefixed locales, catalogs, locale-aware direction, language controls, and role route groups.
3. **Milestone 3.3 — customer and marketing:** complete with membership, credential, recovery, reward, activity, account, how-it-works, and contact shells.
4. **Milestone 3.4 — staff:** complete with scanner, result, exception, camera-denied, unsupported, and unavailable states.
5. **Milestone 3.5 — merchant/admin:** complete with responsive operational navigation and preview-safe overview/detail states.
6. **Milestone 3.6 — QA and handoff:** automated checks and route smoke complete; human visual/accessibility/device review remains a pre-production prerequisite.

## Open decisions carried forward

- Decide whether locale persistence should later add an account preference or cookie policy; URL locale is the current canonical mechanism and next-intl negotiation remains limited to locale selection.
- Select font loading/provider strategy after licensing and Arabic rendering checks.
- Select a preview review tool that can guarantee fixture exclusion from production; Storybook is not currently installed.
- Decide whether role prefixes are part of public URLs or only layout route groups.
- Define the theme preference behavior and whether a user preference is persisted; this must remain separate from all authoritative product state.
- Confirm the minimum customer-facing program-copy translation workflow before merchant-authored content appears in UI.
- Confirm final font loading/provider strategy and perform human visual review before Phase 4.
