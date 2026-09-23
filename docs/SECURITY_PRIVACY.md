# Security, privacy, and legal-risk specification

This is a product/security design, not legal advice. Tunisian qualified legal, privacy, accounting, and security review is a launch prerequisite.

## Threat model

Assets include customer identity/contact data, memberships, credentials, earned rewards, merchant configuration, invoices/payment evidence, audit records, secrets, and availability. Relevant threats include:

- forged, copied, expired, or replayed credentials;
- staff self-awarding, collusion, fabricated confirmations, or unauthorized corrections;
- cross-tenant/branch data access;
- double earning/redemption through retries or concurrency;
- account takeover, device loss, weak recovery, session theft;
- tampered client balances or offline queues;
- QR/NFC phishing or misleading static signage;
- abusive scans, enumeration, scraping, exports, and support access;
- data leakage through logs, analytics, backups, provider integrations, or prompts;
- failed jobs, partial writes, backup/restore failure, and denial of service.

## Required controls

- Server-side authorization on every business-owned resource and mutation.
- Secure session cookies/tokens, rotation, revocation, CSRF protection where relevant, and MFA for staff/merchant risk profiles.
- Short-lived, audience-bound, single-use credentials with nonce/replay storage and revocation.
- Atomic ledger/reward transactions, unique constraints, idempotency, concurrency tests, and immutable events.
- Rate limiting for login, recovery, credential issuance/consumption, scans, earning, redemption, and exports.
- No sensitive customer details in cashier view beyond operational minimum.
- Encryption in transit and at rest where appropriate; secret management outside the repository.
- Audit logs for role changes, program publication, earning, redemption, corrections, privacy actions, billing verification, and admin support.
- Structured logs with redaction; no live secrets, signing certificates, production dumps, or raw credentials in code or prompts.
- Dependency, container, vulnerability, and supply-chain review before production.

## Fraud and abuse controls

Programs define eligible units and caps. Monitor unusual staff/member/branch patterns, repeated corrections, velocity spikes, reward issuance anomalies, and shared-device behavior. Detection must produce review signals, not silently punish customers without a documented process. Staff corrections require permission, reason, source event, and compensating ledger event.

Staff confirmation is not proof of payment. Reports must label activity as validated loyalty activity. POS/payment integrations, if later added, need a separate trust and reconciliation design.

## Privacy design

- Separate core loyalty participation from optional marketing consent.
- Make phone/email optional unless a user chooses them for recovery or communication; explain purpose and retention.
- Give customers a visible path to access/export, correction, deletion, consent withdrawal, and support.
- Restrict support/admin access and record reason and scope.
- Minimize public café pages, cashier screens, exports, analytics, logs, and notification payloads.
- Define retention/deletion schedules, legal holds, backups, derived projections, and third-party deletion responsibilities before launch.
- Conduct a data inventory, processing-purpose review, processor/subprocessor review, transfer assessment, and incident-notification plan with qualified advisers.

## Tunisia legal/accounting checklist

Obtain qualified local review for personal-data processing and data-subject rights, international transfers and cloud/provider locations, privacy notices/consent, business registration, TND invoicing/tax records, manual cash/bank-transfer evidence, consumer terms, employment/staff access, retention, security incident duties, and marketing communications. Do not state that any hosting region or provider is compliant automatically.

## Recovery, suspension, and incidents

Design account recovery that resists social engineering, credential/device revocation, support verification, branch/merchant suspension behavior, and customer access to existing earned rights. Define severity levels, on-call ownership, evidence preservation, customer/merchant communications, rollback, and post-incident review before production.

Security verification matrix: [TEST_STRATEGY.md](TEST_STRATEGY.md). Operational controls: [OPERATIONS.md](OPERATIONS.md).
