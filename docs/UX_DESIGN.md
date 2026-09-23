# UX and interaction specification

Status: Phase 3 Milestone 3.0 audit baseline. The current implementation is still a Phase 2 foundation shell; the audited component inventory, screen contract, preview boundary, and implementation order are in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

## Experience model

The product has distinct layouts for customer, cashier, merchant, and platform admin. Customer is phone-first and brand-forward. Cashier is speed-first with large targets and minimal private data. Merchant/admin is information-dense but readable, with predictable filters and accessible responsive behavior.

Primary navigation must remain short:

- Customer: Home/program, progress/rewards, membership credential, activity, account/privacy.
- Cashier: Scan, recent results, exceptions/help, account/sign out.
- Merchant: Overview, programs, customers/activity, branches/staff, brand/settings, billing.
- Admin: Queue/onboarding, merchants, subscriptions, support/incidents, audit.

## Journey maps

### Customer journey

Discover café → read terms → join/recover account → view progress → present fresh credential → wait for explicit result → track progress/reward → redeem at counter → view history or request support.

Failure points and responses: no camera/NFC shows manual/assisted path; network loss shows pending/unavailable; expired credential prompts refresh; device loss starts recovery; suspended café explains access state without deleting earned records.

### Cashier journey

Sign in → confirm branch/context → scan or enter credential → verify member/program/eligibility → confirm eligible quantity → submit once → show server result → optionally redeem a selected reward → finish with receipt-like summary.

The cashier never types a client-provided tenant or balance. Any correction goes to an exception flow with reason and permission check.

### Merchant journey

Onboard business → add branches → invite scoped staff → create and preview program → publish version → monitor validated activity → investigate exceptions → manage billing/subscription state.

### Admin journey

Review onboarding/support queue → inspect scoped records → perform approved action with reason → notify affected party → preserve audit trail → close or escalate incident.

## Screen inventory and required states

| Area | Screens | Required states |
|---|---|---|
| Customer | Café landing, join/sign-in, recovery, membership/progress, credential, activity, reward detail, privacy/account | loading; no program; invalid/expired credential; pending; confirmed; reward unavailable/expired; network error; permission/session expiry; success confirmation |
| Cashier | Sign-in/MFA, branch selector, scanner, manual credential entry, eligibility confirmation, result, reward redemption, exception history | camera permission denied; unsupported device; scanning; invalid/replayed; duplicate; offline; confirmed; pending; rejected; redemption conflict; rate limited |
| Merchant | Setup checklist, dashboard, program list/editor/version history, staff/branches, customers/activity, exceptions, brand/localization, billing | empty setup; draft; validation error; publish confirmation; no activity; filtered empty; export queued/failed; suspended/overdue; permission denied |
| Admin | Onboarding queue, merchant detail, subscription/invoice review, support case, incident/audit view | queue empty; restricted data; evidence pending; approved/rejected; action requires reason; conflict; audit success/failure |

Each error must state whether anything changed, whether retry is safe, and the next permitted action. Loading cannot imply success. Destructive actions require confirmation and explain impact.

## Credential and scan UX

The customer membership page provides a clearly labeled “Show membership credential” action. A fresh credential is short-lived and single-use for sensitive staff operations. A static membership identifier may support lookup/manual fallback but does not authorize an award.

The café’s static counter QR/NFC opens a landing page. It must not say “scan to earn.” Wallet passes, if later supported, are convenience representations and not automatically equivalent to a fresh authenticated proof. Reader-based NFC is a separate later integration.

## Accessibility

- Keyboard access and visible focus for every action.
- Screen-reader labels for scanner states, progress, reward status, and live result announcements.
- Minimum touch target guidance appropriate for a busy counter; no action depends on color alone.
- Contrast checked for text, icons, borders, focus, error, and disabled states.
- Reduced-motion mode; no autoplay or flashing.
- Arabic RTL review with logical ordering, mirrored navigation where appropriate, and correct punctuation/numeral behavior.
- Manual/assisted paths for people without a camera, NFC, Wallet, smartphone, or reliable vision/hearing.

## Design tokens and responsive rules

Use semantic tokens from [BRAND.md](BRAND.md), shadcn/ui primitives, Tailwind utilities, Lucide icons, restrained borders/shadows, and a consistent spacing scale. Define mobile-first layouts, then adapt to tablet/desktop. Do not make merchant/admin cards excessively large; prioritize tables, filters, hierarchy, and scan speed.

## Content and trust rules

Show the program version/terms relevant to a benefit, but keep technical event IDs out of the primary customer view. Distinguish “request received,” “confirmed,” “pending review,” “reward earned,” and “reward redeemed.” Never show a locally incremented balance as authoritative.

Detailed acceptance criteria: [REQUIREMENTS.md](REQUIREMENTS.md). API states: [API.md](API.md).
