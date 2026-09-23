# API specification outline

Status: contract outline for implementation. Endpoint names are provisional; no API has been built.

## General rules

- Version public routes under `/api/v1` or an equivalent negotiated contract.
- Use JSON with a stable error envelope and correlation ID.
- Validate request bodies with shared schemas; reject unknown or unsafe fields where appropriate.
- Derive user, business, branch, role, membership, and program scope server-side.
- Mutating earning, redemption, corrections, invitations, publishing, billing verification, and privacy actions require authentication, authorization, audit context, and idempotency where retries are possible.
- Never return a client-supplied balance, role, or tenant claim as authoritative.

## Resource outline

| Area | Representative endpoint | Required authority |
|---|---|---|
| Auth | `POST /auth/session`, recovery endpoints | Secure session/recovery policy; MFA for risk-appropriate staff/merchant flows |
| Public café | `GET /businesses/{publicSlug}`, `GET /programs/{id}/published` | Public data only; no private customer data |
| Customer | `POST /memberships`, `GET /me/memberships`, `GET /me/activity`, privacy endpoints | Authenticated customer and own records |
| Credential | `POST /memberships/{id}/challenges`, `POST /credentials/consume` | Membership owner or authorized staff; nonce/audience/expiry/replay checks |
| Staff earning | `POST /staff/transactions/earn` | Staff assignment, branch, program, eligibility, idempotency |
| Staff redemption | `POST /staff/rewards/{id}/redeem` | Assigned staff, branch/program scope, reward status, idempotency |
| Exceptions | `POST /staff/exceptions`, merchant/admin review endpoints | Permission, reason, compensating event only |
| Merchant setup | businesses, branches, staff invitations, brand/settings | Owner/manager scope |
| Programs | draft/version/preview/publish/retire endpoints | Program manager; immutable published versions |
| Operations | customer/activity/export endpoints | Tenant/branch scope and minimum necessary fields |
| Billing | invoices, evidence, review, entitlement state | Merchant/admin scoped roles; no fake verification |
| Admin | onboarding/support/incidents/audit | Explicit platform permission, reason, immutable audit |

## Earning request contract

The server should receive a credential/challenge reference, membership reference, branch context, eligible purchase details, client request timestamp, and idempotency key. The server independently resolves membership, tenant, branch, active program version, rule eligibility, quantity caps, staff authority, credential freshness, and replay status.

Response states: `confirmed`, `pending_review`, `duplicate` (with original result where safe), `rejected`, or `unavailable`. `confirmed` means the database transaction committed; it does not mean njiw. independently proved payment.

## Redemption contract

The request identifies one reward and one authorized action. The response is `redeemed`, `duplicate`/original result, `conflict_already_redeemed`, `expired`, `not_eligible`, `forbidden`, `pending_review`, or `unavailable`. Offline UI must never convert `pending_review` or `unavailable` into `redeemed`.

## Error envelope

```json
{
  "error": {
    "code": "REWARD_ALREADY_REDEEMED",
    "message": "This reward is no longer available.",
    "retryable": false,
    "requestId": "server-generated-id"
  }
}
```

Messages are localized at the client or returned with locale-aware safe copy; codes remain stable for tests and support. Avoid exposing whether unrelated customer accounts exist.

Suggested codes include `AUTH_REQUIRED`, `FORBIDDEN_SCOPE`, `CREDENTIAL_EXPIRED`, `CREDENTIAL_REPLAYED`, `PROGRAM_VERSION_CLOSED`, `ELIGIBILITY_FAILED`, `LIMIT_REACHED`, `DUPLICATE_REQUEST`, `CONFLICT`, `OFFLINE_UNCONFIRMED`, `SUBSCRIPTION_RESTRICTED`, `RATE_LIMITED`, `VALIDATION_FAILED`, and `INTERNAL_ERROR`.

## Idempotency and replay

Accept an idempotency key for every retryable mutation. Bind it to authenticated actor, tenant/branch scope, operation, and normalized request hash. Reusing the key with a different request fails. Store enough result metadata to safely return the original committed result. Credential nonces are single-use and short-lived; replay is rejected even when a client retries from a different device.

## Auth/session rules

Use secure, expiry-controlled sessions and rotation/revocation. Protect cookie-based mutations against CSRF as applicable. Recovery requires verified factors or an auditable support process. Staff/merchant MFA and session/device revocation are risk decisions that must be implemented before real deployment.

## Pagination, filtering, exports

All merchant/admin list endpoints require explicit server-enforced scope and bounded pagination. Filter fields are allowlisted. Export jobs are asynchronous, access-controlled, expiring, and audited; generated files must not be public by URL alone.

## Contract tests

Shared schemas must test authorization, tenant isolation, versioning, stable error codes, idempotent retries, concurrent redemption, malformed/oversized input, locale output, and subscription restrictions. See [TEST_STRATEGY.md](TEST_STRATEGY.md).
