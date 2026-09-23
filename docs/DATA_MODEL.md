# Data model specification

Status: logical model only. No Prisma schema or migration is created in Phase 1.

## Tenant hierarchy

```text
Platform
└── Business (tenant)
    ├── Branch
    ├── BusinessMembership (user/role/scope)
    ├── Program ── ProgramVersion ── Rule/Translation
    └── CustomerMembership ── LoyaltyEvent/LoyaltyReward
```

Every business-owned row carries a business identifier directly or through a constrained relationship. Branch-scoped rows carry branch scope where meaningful. API authorization verifies the relationship; a request parameter never establishes it.

## Core entities

| Entity | Purpose and key constraints |
|---|---|
| User | Login identity; no implicit business role; unique verified contact identifiers under defined normalization |
| CustomerProfile | Minimal optional profile data, separate from consent and membership |
| Business | Tenant lifecycle, locale defaults, subscription linkage |
| Branch | Business location and active/suspended status |
| StaffAssignment | User-business/branch role, permissions, invitation and suspension state |
| CustomerMembership | Customer-to-business/program participation; unique membership identity; lifecycle and recovery links |
| Consent | Purpose, version, locale, timestamp, source, withdrawal; marketing separate from core participation |
| Program | Stable business concept and lifecycle |
| ProgramVersion | Immutable published rules, terms, translation snapshots, effective/retirement dates |
| EligibilityRule | Versioned eligible unit/category, quantity limits, visit/day/transaction caps |
| RewardDefinition | Threshold, reward description, expiry and redemption terms within a program version |
| LoyaltyEvent | Append-only earning, adjustment, redemption, expiry, revocation, or correction event with actor/scope/reason |
| LoyaltyReward | Issued entitlement tied to source/version; status transition and unique redemption reference |
| BalanceProjection | Rebuildable read model, never the sole authority |
| CredentialChallenge | Short-lived audience-bound nonce, expiry, use state, membership/action binding |
| IdempotencyRecord | Actor/scope/endpoint/key/request hash/result reference with retention policy |
| Subscription | Merchant entitlement state and effective dates |
| Invoice | TND amount/status/evidence/verification metadata; no fake payment result |
| AuditEvent | Immutable actor, action, target, scope, reason, before/after summary, timestamp |
| SupportRequest | Customer privacy/support workflow, restricted access and retention state |
| ExportJob/DeletionRequest | Tracked privacy operations and legal holds |

## Ledger rules

- Earning is an immutable event with program version, eligibility result, staff actor, branch, customer membership, request/idempotency reference, and server time.
- Corrections are compensating events with an authorized reason and link to the original; original events are not silently edited or deleted.
- Rewards reference the exact version and source threshold. A reward can be available, redeemed, expired, revoked, or pending review under explicit transitions.
- Projections are derived from committed events and can be rebuilt. A browser counter, cache, or localStorage value is never authoritative.
- Event and reward writes use atomic transactions and constraints to prevent duplicate issuance and double redemption.

## Versioning and grandfathering

Published `ProgramVersion` rows are immutable. Events and rewards snapshot or reference the terms/version used. New versions affect future events only unless an explicit, additive migration is approved and audited. Retiring a program blocks new activity according to policy but does not erase valid earned rights.

## Privacy and retention

Separate authentication, customer profile, consent, loyalty history, business operations, audit, and billing data by access policy. Collect phone/email only for selected uses. Deletion must respect statutory/legal holds and preserve minimal integrity/audit records where required; the exact retention schedule requires Tunisian legal/accounting/privacy review.

## Integrity constraints to test

- unique membership per customer/business/program as defined by lifecycle;
- unique staff invitation token and credential nonce use;
- unique idempotency key per actor/scope/operation and stable request hash;
- reward can have at most one successful redemption;
- event business/branch/membership/program relationships agree;
- program version cannot mutate after publication;
- no negative or unexplained projection balance;
- corrections cannot exceed authorized scope;
- subscription/invoice status transitions are explicit and audited.

API representation and error behavior: [API.md](API.md). Concurrency verification: [TEST_STRATEGY.md](TEST_STRATEGY.md).
