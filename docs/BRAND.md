# Brand and content specification

## Position

njiw. / نجيو is a provisional working name for a welcoming loyalty layer between local cafés and their regulars. The voice should feel calm, warm, contemporary, trustworthy, premium but approachable, and grounded in Tunisian café culture without using stereotypes.

The name, Arabic rendering, domain, logo, and visual assets require trademark, domain, language, customer, and legal clearance. The previously generated logo is not a final vector or production asset.

## Verbal identity

- Say what happened and what happens next.
- Use warm, direct language at the counter; avoid gamification pressure and exaggerated savings claims.
- Explain that a staff confirmation records loyalty activity; do not say a scan proves payment.
- Avoid unexplained technical terms such as “token,” “ledger,” or “idempotency” in customer UI.
- Use “progress,” “reward,” “pending,” and “confirmed” consistently across locales.

Example copy intent:

- Success: “Progress added. You are 2 stamps away from your reward.”
- Pending: “We saved your request for review. It is not redeemable yet.”
- Offline redemption: “The server is unavailable, so we cannot verify this reward now.”
- Static counter QR: “Open the café page” rather than “Scan to earn.”

## Visual direction

Semantic starting tokens:

| Token | Starting value | Use |
|---|---|---|
| canvas | `#F7F6F2` | App background |
| surface | `#FFFFFF` | Cards and panels |
| deep forest | `#273D35` | Primary actions, headings, navigation |
| coffee accent | `#B18B64` | Decorative/secondary emphasis only after contrast check |
| ink | `#252A27` | Body text |

These values are candidates, not a completed accessible theme. Text and state colors must be checked against WCAG contrast; coffee accent must not be used for unreadable small text. Error, warning, success, focus, and disabled tokens need explicit accessible values.

Use restrained shadows, clean borders, consistent spacing, Lucide icons, and purposeful motion with reduced-motion support. Avoid excessive gradients, glassmorphism, autoplay, decorative dashboard art, and a generic coffee-cup logo requirement.

## Typography and scripts

- Latin direction: Geist Sans, subject to licensing and actual rendering checks.
- Arabic direction: IBM Plex Sans Arabic, subject to licensing, rendering, and readability checks.
- Arabic uses full RTL layout, not merely translated strings; icons, progress direction, tables, forms, and back/forward affordances need RTL review.
- Mixed-script content, numbers, dates, and TND amounts require locale-aware formatting and manual visual review.
- Font size/line height cannot be copied mechanically across scripts; visual weight and wrapping must be checked.

## Localization contract

French, Arabic, and English are first-class. The customer chooses a preferred language independently of café/admin language. Merchant-authored program content should require a translation status and clearly identify missing translations; it must not silently display the wrong locale.

Locale tests must cover long French labels, Arabic shaping/RTL, mixed names, Latin digits versus locale conventions, TND currency, dates, times, pluralization, and right-to-left error/help text.

## Clearance to-do

1. Search and clear “njiw.” and “نجيو” in relevant trademark/domain channels.
2. Validate pronunciation, meaning, and connotations with Tunisian French/Arabic speakers and café customers.
3. Confirm font licenses and supported production formats.
4. Commission/approve a final logo system, favicon, wordmark, and usage rules; do not promote a concept logo.
5. Approve the legal/privacy/invoicing language with qualified Tunisian advisers.
6. Test copy and visual tokens with café staff and customers, including accessibility review.

Related experience rules: [UX_DESIGN.md](UX_DESIGN.md). Product facts: [PRODUCT.md](PRODUCT.md).
