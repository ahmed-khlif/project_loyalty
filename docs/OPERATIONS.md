# Operations and launch prerequisites

## Environment model

Maintain separate development, staging, and production accounts, secrets, databases, queues, domains, logs, and customer data. Local development may use Docker Compose for PostgreSQL and Redis only when the feature requires it. Never copy production data into development or prompts.

## Tunisia billing and subscription operations

Merchant subscriptions are represented in TND with invoices and manual evidence states: issued, evidence submitted, under review, verified, rejected, grace, overdue, suspended, and closed. A human or approved future provider verifies payment; the UI never fabricates success. Effective dates, reviewer, evidence reference, reason, and audit event are retained.

Pricing, tax, invoicing, cash/bank-transfer records, business registration, and overdue collection require Tunisian accounting/legal review. No automated payment gateway is a Phase 1 or core launch assumption.

## Hosting prerequisites

Select managed PostgreSQL, web/API hosting, object storage, email/SMS providers, observability, and any Redis service only after cost, reliability, security, region/transfer, processor, and contractual review. Provider approval and supported-device testing are prerequisites for Wallet, messaging, NFC, POS, or payment adapters.

## Reliability

- Health/readiness checks separate dependency failure from app failure.
- Metrics cover request errors/latency, database health, authentication/recovery, credential replay, earning/redemption results, pending queues, job retries/dead letters, exports, subscription transitions, and support backlog.
- Alert on user-visible failures, unusual fraud patterns, queue age, backup failures, resource saturation, and security signals.
- Jobs are idempotent, retried with bounds, and dead-lettered with operator visibility.
- Migrations are reviewed, forward/backward compatibility considered, backed up, and rollback/repair plans documented.

## Backup and restore

Define encrypted backup frequency/retention, key ownership, point-in-time recovery, object/export backup, and access logging. Test restoration into an isolated environment on a schedule and record recovery point/time results. A backup that has never been restored is not launch evidence.

## Support and incidents

Support can inspect minimum necessary records, cannot silently alter balances, and must create a case/reason. Runbooks cover credential/device loss, duplicate/incorrect earning, redemption conflict, merchant suspension, privacy requests, payment evidence dispute, provider outage, data incident, and rollback.

Define incident severity, owner, escalation, customer/merchant communications, evidence preservation, legal/privacy notification decision, postmortem, and corrective action tracking.

## Launch prerequisites

Before a real-customer pilot: security review, privacy/legal/accounting review, terms and notices, backup restore evidence, monitoring/alerts, rate limits, staging rehearsal, migration rollback, support coverage, accessibility/device review, real café two-device test, merchant suspension test, and a rollback plan. Any unmet prerequisite is a launch blocker, not a hidden assumption.
