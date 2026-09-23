# njiw. / نجيو — Product specification

Status: Phase 1 foundation specification. The name and logo are provisional and are not cleared production assets.

## Vision

njiw. helps independent cafés in Tunisia run a trustworthy, low-friction loyalty program without requiring a POS integration, online customer payment, or a native app. A customer joins a café program on the web, presents a membership credential, receives progress only after an authorized staff confirmation, and redeems benefits under the published program terms.

The platform is a multi-tenant SaaS. It starts with cafés and is designed so that the domain can later support other local businesses without weakening tenant, branch, ledger, or privacy boundaries.

## Customers and jobs

| User | Job to be done | Primary value |
|---|---|---|
| Customer | Join a café, understand progress, present a credential, and use earned rewards | A clear benefit with no app or online payment requirement |
| Cashier | Quickly identify a member, confirm an eligible purchase, award progress, and redeem a reward | A fast, explicit, recoverable service flow |
| Manager/owner | Configure programs, branches, staff, branding, customers, reports, and subscription records | Retention operations without needing technical staff |
| Platform administrator | Onboard and support merchants, manage subscriptions and incidents, and preserve an audit trail | Controlled, supportable platform operations |

## Value proposition

- Customer-facing web experience that works on ordinary smartphones and has an accessible non-smartphone path.
- Server-authoritative loyalty ledger: a QR presentation identifies a membership; it never proves payment or grants a reward by itself.
- Staff workflow that is quick at the counter while limiting customer data exposure.
- Merchant-controlled, versioned terms that protect benefits already earned under an older version.
- Operational records and analytics that describe validated loyalty activity, not total sales until a real POS integration exists.

## Business model

The platform sells subscriptions to cafés/businesses. Subscription invoices and payment verification are planned in TND with manual payment methods such as cash or bank transfer until a legally and operationally approved billing workflow exists. njiw. does not process café purchases, hold customer funds, or require an online payment gateway.

Pricing, tax treatment, invoicing format, business registration, and payment-record requirements require Tunisian legal/accounting review. They are not settled by this document.

## Goals for Phase 1 and later delivery

1. Validate the customer, staff, merchant, and administrator journeys before code is scaffolded.
2. Make earning and redemption safe under retries, replay, concurrency, poor connectivity, and staff misuse.
3. Establish French, Arabic RTL, and English as first-class product requirements.
4. Give café owners useful operational insight without overstating what staff-confirmed loyalty activity proves.
5. Keep future Wallet, NFC-reader, POS, messaging, and native-app integrations optional and isolated.

## Non-goals

- Processing or proving a customer payment.
- Replacing a café POS, accounting system, or payment terminal.
- Treating a static QR code, ordinary NFC sticker, static Wallet barcode, localStorage value, or client counter as reward authority.
- Promising offline verified redemption when the server cannot confirm it.
- Launching Apple Wallet, Google Wallet, reader-based NFC, marketing automation, or an online subscription gateway as part of the foundation.
- Claiming legal, trademark, provider, data-residency, or device-compatibility approval before qualified review.

## Product principles

1. Server authority over client convenience.
2. Clear states over optimistic claims.
3. Earned rights survive terms changes and merchant operational changes unless a documented legal/terms process says otherwise.
4. Collect the minimum customer data required for loyalty.
5. A web fallback remains usable when camera, NFC, Wallet, or native-app support is absent.
6. Every material business action is attributable, scoped, and auditable.

## Success measures

Initial measures are product/loyalty activity measures, not sales measures:

- customer enrollment completion rate;
- successful staff-confirmed earning and redemption completion rate;
- duplicate/replay requests rejected safely;
- median counter-flow time and error recovery rate;
- active programs and members by tenant/branch;
- reward issuance and redemption rates;
- support requests resolved with an auditable outcome;
- availability, failed-job rate, and restore-test results.

Interpretation must distinguish attempted, pending, confirmed, rejected, corrected, and redeemed events. Revenue and customer spend are not inferred from these metrics.

Related decisions: [DECISIONS.md](DECISIONS.md). Detailed requirements: [REQUIREMENTS.md](REQUIREMENTS.md).
