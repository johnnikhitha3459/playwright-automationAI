# DemoBlaze Store Manual Test Plan

## Purpose

Validate the core customer-facing behavior of the DemoBlaze Product Store at
`https://www.demoblaze.com/` through manual end-to-end testing.

## Scope

In scope:

- Read-only product API: catalog, category filtering, and product details
- Store home page, navigation, product catalog, and category filtering
- Product details and add-to-cart flow
- Cart contents, totals, removal, and checkout
- Sign-up, login, contact, and About Us modal smoke checks
- Basic responsive and cross-browser usability checks

Out of scope:

- Payment processing or real financial transactions (the demo checkout is mocked)
- Back-office, APIs, load/performance, and security testing
- Real personal information or real customer accounts

## Test approach

- Execute the cases in [manual-test-cases.md](./manual-test-cases.md) on the live
  demo store.
- Use fresh browser sessions for cases involving accounts or cart state.
- Use only synthetic names, addresses, and payment-like values. Do not enter
  real credentials or payment details.
- Record actual result, status, browser/version, date, and evidence for each run.
- For any failure, capture the steps, expected/actual result, screenshot, and
  browser console/network details when available.

## Environment and data

| Item | Value |
|---|---|
| Application | `https://www.demoblaze.com/` |
| Browsers | Current Chrome/Chromium, Firefox, and Safari/WebKit |
| Viewports | Desktop (1280x800) and mobile-sized (390x844) |
| Test data | Synthetic data only; use a unique username for sign-up |
| Dependencies | Internet access; application available |

## Entry criteria

- DemoBlaze is reachable and displays the Product Store home page.
- Browser has no extensions that block the site or its dialogs.
- Tester has prepared synthetic data and a clean session where required.

## Exit criteria

- All applicable critical/high-priority cases pass, or failures are documented.
- No open blocker prevents browsing, adding/removing items, or completing mock checkout.
- Results and supporting evidence are recorded.

## Risks and notes

- This is a public demo environment; catalog data, availability, and backend
  behavior can change without notice.
- Accounts and cart state may be shared or persisted by the demo service. Use a
  fresh session and avoid relying on pre-existing data.
- Native JavaScript alerts and asynchronous catalog loading can affect timing.
- Purchase confirmation verifies the demo flow only, not a real payment.

## Deliverables

- Completed manual test cases with pass/fail/blocked status
- Defect reports with reproducible steps and evidence
- API manual results from [api-manual-test-cases.md](./api-manual-test-cases.md)
- Automation output from `npm run test:chromium` when applicable
- API automation output from `npm run test:api`
