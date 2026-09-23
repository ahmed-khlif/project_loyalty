# Requirements and acceptance criteria

Status: Phase 1. The requirements below describe the intended product; they are not implemented features.

## Roles and authorization

- **Customer** can manage their own account, memberships, credentials, consent, history, and privacy requests.
- **Cashier** can operate only on assigned branch/program scopes and only through server-authorized earning/redemption workflows.
- **Manager/owner** can manage only businesses they own or are assigned to, with explicit branch and action permissions.
- **Platform administrator** can perform controlled support and subscription operations with reason, scope, and audit record. Administrative access is not blanket access to unrelated customer data.

The server derives tenant, branch, membership, role, and permission scope from the authenticated session and stored relationships. Browser-supplied scope is a filter at most, never an authority claim.

## Feature inventory

### Customer

1. Discover a café landing page and published loyalty program.
2. Join with a minimal account; phone/email are optional until a recovery method is selected and consent is recorded.
3. View active membership, program terms, progress, earned rewards, expiry, history, and pending states.
4. Present a short-lived, authenticated web credential for staff scanning or manual fallback.
5. Recover access after device/browser loss through an approved recovery method or support process.
6. Request export/deletion and manage optional marketing consent separately from core participation.

### Cashier

1. Sign in securely and select only an assigned branch/program context.
2. Scan or enter a customer credential using a camera, upload/manual fallback where permitted, or accessible assisted flow.
3. See only the minimum identity and eligibility information needed at the counter.
4. Submit a purchase confirmation with eligible item/visit details and an idempotency key.
5. Receive explicit confirmed, pending, rejected, duplicate, or needs-review results.
6. Redeem an eligible reward once, with customer confirmation and a server transaction.
7. Request a correction or exception; never silently edit a ledger event.

### Manager/owner

1. Create and configure a business and branches.
2. Invite, suspend, and scope staff; assign roles and permissions.
3. Create, preview, publish, schedule, and retire versioned loyalty programs.
4. Define eligible units, progress thresholds, rewards, expiry, and terms.
5. Configure approved brand tokens and multilingual customer copy.
6. View tenant-scoped members, events, rewards, exceptions, activity metrics, and exports.
7. Manage subscription records, invoices, manual payment evidence, and overdue/suspended states.

### Platform administrator

1. Review and approve controlled merchant onboarding.
2. Support account, branch, subscription, and incident workflows without bypassing scope.
3. Place a merchant into a documented operational state such as trial, active, past due, suspended, or closed.
4. Make support corrections only through an authorized compensating workflow.
5. Review immutable audit trails and operational alerts.

## High-impact decisions

### Stamp unit and multi-item purchases

Default strategy: **per eligible item**, with a merchant-configurable cap per transaction/day and an explicit program version. A café may choose a per-visit rule, but it must be stated in the published terms. A staff member records the eligible quantity/category; the server calculates the award from the program version. Multi-item purchases do not become unlimited stamps: caps and qualifying categories are enforced server-side. No POS integration means the record is staff-confirmed activity, not independent payment proof.

### Proof of purchase

No claim of independent payment proof is made before POS integration. Staff confirmation is an authorized loyalty event and must include actor, branch, program version, timestamp, quantity/rule result, and optional reference. Suspicious patterns are rate-limited, reported, and reviewable. See [SECURITY_PRIVACY.md](SECURITY_PRIVACY.md).

### Program changes and grandfathering

Published programs are immutable versions. New enrollments and future events use the active version. Existing earned stamps and rewards retain the terms and expiry attached to their event/version. A migration can be explicit, additive, and audited; it cannot silently destroy valid entitlements.

### Rewards

Reward issuance occurs when the server transaction crosses the threshold. Rewards have a status, issue time, expiry policy, program-version terms, and redemption history. Redemption consumes one specific eligible reward atomically. Expired or revoked rewards remain visible in history with a reason.

### Credential strategy

The preferred sensitive credential is a short-lived, single-use, authenticated web credential tied to a membership and intended action. A static membership QR or Wallet barcode may identify a membership but cannot be treated as fresh proof or automatic award authority. Ordinary NFC stickers open a café page only. Reader-based phone-to-terminal NFC requires separate approved hardware/platform support.

### Recovery and accessibility

Browser-only cards must be recoverable through a verified phone/email method when available, or a support-assisted identity process with limited staff/admin disclosure. Camera denial, incompatible NFC, unsupported Wallet, and no-smartphone cases have manual/assisted alternatives. Alternatives may be slower but must not grant unverified rewards.

### Connectivity

Without server confirmation, an earning request is pending or rejected—not confirmed. A controlled pending-earnings workflow may queue a signed request for later server validation, with a visible non-redeemable status and duplicate protection. Offline redemption is not allowed by default; a manager-approved manual exception creates a review record and does not present the reward as verified until reconciled.

### Branches, suspension, and separation

Memberships belong to a business program and may be used at allowed branches. Staff permissions are branch-scoped. A merchant suspension blocks new earning/redemption as configured, but does not silently erase customer history or earned rights; access and redemption policy during suspension must be displayed and admin-audited. Customer data is logically and authorization-wise separate from business data, with only necessary operational views.

### Locale and contact data

Customer language preference is independent of café/merchant admin language. French, Arabic RTL, and English must cover system copy and program content, with mixed-script and TND/date/time formatting. Phone/email are optional core fields; each is collected only for a selected purpose and consent state.

### Subscription renewal

Subscriptions use explicit TND invoice and manual-payment states: issued, evidence submitted, under review, verified, rejected, overdue, grace, suspended, or closed. No fictitious payment success is shown. Entitlement changes are effective-dated and audited.

## End-to-end acceptance criteria

The following are release-level scenarios for later implementation and E2E tests.

1. **Café onboarding:** an approved owner creates a business and branch, accepts required terms, chooses locale settings, and sees an auditable active setup. A non-owner cannot create or alter it.
2. **Staff invitation:** an owner invites a cashier with branch scope; the invite expires, is single-use, and cannot grant broader permissions than assigned. A suspended cashier is denied.
3. **Program publication:** a manager drafts a program, previews localized terms, publishes version 1, and cannot mutate its historical rules. A new version has an effective time and preserves prior rights.
4. **First visit:** a customer joins the published program, receives membership status and terms, and can present a credential on a mobile web page.
5. **Repeat scan and award:** an assigned cashier presents/scans a valid credential, confirms an eligible quantity, and receives one server result. The customer history and balance update only after the transaction commits.
6. **Sixth eligible coffee:** with a six-item threshold, exactly six accepted eligible units create one reward according to the versioned terms. The sixth request retried with the same idempotency key does not create a second reward.
7. **Redemption:** an assigned cashier sees an unexpired eligible reward, confirms redemption, and the reward becomes redeemed exactly once. Concurrent attempts yield one success and one safe rejection.
8. **Duplicate request:** a reused credential, request ID, or event reference is rejected or returned as the original result without a second ledger event.
9. **Concurrency:** simultaneous earn or redeem requests preserve ledger invariants, unique constraints, and correct projection after commit/rollback.
10. **Rule change:** after version 2 is published, version 1 earned stamps/rewards retain their terms; a new event uses version 2.
11. **Device loss:** a customer signs in on a new device through verified recovery, revokes old credentials, and retains valid membership/history without exposing another customer.
12. **Camera/NFC limitation:** camera-denied or incompatible devices can use an accessible manual/assisted flow; no unsupported device receives an automatic award.
13. **Offline staff device:** a disconnected cashier sees a clear pending/unavailable state; redemption is not falsely marked verified and a queued earn cannot bypass server validation.
14. **Subscription expiration:** an overdue merchant sees the grace/suspension state and allowed actions; blocked actions return an explicit reason; customer earned rights remain recorded.
15. **Privacy request:** a customer submits an export/deletion request, receives a tracked status, and restricted staff/admin can process it under retention/legal holds without deleting immutable audit evidence improperly.

## Screen/state acceptance contract

Every route in [UX_DESIGN.md](UX_DESIGN.md) must define loading, empty, error, success, permission-denied, and narrow/mobile states. In particular:

- Customer screens must show current program terms, progress source, reward status, and pending/expired distinctions.
- Cashier screens must show large targets, scan/entry status, confirmation details, duplicate/replay result, connection state, and recoverable next action.
- Merchant/admin screens must show filter scope, table empty/loading/error states, destructive-action confirmation, audit context, and responsive alternatives to dense tables.

## Traceability

Security controls are in [SECURITY_PRIVACY.md](SECURITY_PRIVACY.md); entities and constraints in [DATA_MODEL.md](DATA_MODEL.md); API behavior in [API.md](API.md); validation in [TEST_STRATEGY.md](TEST_STRATEGY.md). Phase exit checks are in [STATE.md](STATE.md).
