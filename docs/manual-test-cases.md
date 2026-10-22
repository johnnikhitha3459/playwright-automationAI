# DemoBlaze Store Manual Test Cases

Use a fresh browser session where noted. Record the actual result and status for
each execution. Test data should be synthetic.

| ID | Priority | Test case |
|---|---|---|
| TC-STORE-001 | High | Verify home page and product catalog |
| TC-STORE-002 | High | Filter catalog by each product category |
| TC-STORE-003 | Medium | Browse products with pagination |
| TC-STORE-004 | High | Open product details |
| TC-STORE-005 | High | Add product to cart |
| TC-STORE-006 | High | Remove product from cart |
| TC-STORE-007 | High | Place a mock order |
| TC-STORE-008 | Medium | Sign up with a unique synthetic account |
| TC-STORE-009 | Medium | Log in with a valid test account |
| TC-STORE-010 | Medium | Validate invalid/empty login behavior |
| TC-STORE-011 | Low | Send a contact message |
| TC-STORE-012 | Low | Open and close About Us information |
| TC-STORE-013 | Medium | Check responsive layout and navigation |

## Detailed steps and expected results

### TC-STORE-001 — Verify home page and product catalog

**Preconditions:** None.

1. Navigate to `https://www.demoblaze.com/`.
2. Observe the page title, top navigation, category list, and product cards.

**Expected:** The Product Store home page loads without a blocking error.
Navigation, Phones/Laptops/Monitors categories, and product cards are visible.

### TC-STORE-002 — Filter catalog by each product category

**Preconditions:** Home page is open.

1. Select **Phones**.
2. Verify only phone products appear.
3. Select **Laptops** and verify laptop products appear.
4. Select **Monitors** and verify monitor products appear.
5. Select **Home** to return to the full catalog.

**Expected:** Each category displays products belonging to that category; Home
restores the complete catalog. No unrelated products remain in the filtered view.

### TC-STORE-003 — Browse products with pagination

**Preconditions:** Home page is open and the complete catalog is displayed.

1. Select **Next** below the product list.
2. Record the visible products.
3. Select **Previous**.

**Expected:** Next displays another product page; Previous returns to the prior
page without duplicate or missing items.

### TC-STORE-004 — Open product details

**Preconditions:** Home page is open.

1. Open a product card, for example **Samsung galaxy s6**.
2. Review its name, price, description, and **Add to cart** control.

**Expected:** The selected product's details load and correspond to the card
that was selected.

### TC-STORE-005 — Add product to cart

**Preconditions:** Product details are open.

1. Select **Add to cart**.
2. Accept the browser alert if displayed.
3. Open **Cart**.

**Expected:** A success alert is displayed and accepted. The selected product
appears in the cart with the correct price and the total reflects the item.

### TC-STORE-006 — Remove product from cart

**Preconditions:** Cart contains at least one product.

1. Select **Delete** on a product row.
2. Observe the cart contents and total.

**Expected:** The selected row is removed and the total updates. If it was the
only item, the cart is empty and the total is blank/zero.

### TC-STORE-007 — Place a mock order

**Preconditions:** Cart contains at least one product.

1. Select **Place Order**.
2. Enter synthetic name, country, city, card-like test value, month, and year.
3. Select **Purchase**.
4. Review and dismiss the confirmation.

**Expected:** The order is accepted by the demo flow and a purchase confirmation
displays the expected order summary. No real payment is made.

### TC-STORE-008 — Sign up with a unique synthetic account

**Preconditions:** Use a fresh session and a username not previously registered.

1. Select **Sign up**.
2. Enter the unique synthetic username and a test-only password.
3. Select **Sign up** and accept any browser alert.

**Expected:** The site reports successful registration. Reusing the same
username should be handled with an understandable duplicate-account message.

### TC-STORE-009 — Log in with a valid test account

**Preconditions:** A test account has been registered.

1. Select **Log in**.
2. Enter the test account credentials.
3. Select **Log in**.

**Expected:** Login succeeds and the navigation shows the signed-in username.
The automated test in `tests/login/login.spec.js` creates a unique synthetic
account, reads its credentials from the SQLite database in
`tests/login/test-data/`, and verifies sign-up and login. The database file is
created automatically on the first test run and is excluded from version
control. This test uses Node.js 22.5 or later for the built-in SQLite module.

### TC-STORE-010 — Validate invalid/empty login behavior

**Preconditions:** None.

1. Open **Log in**.
2. Submit with both fields blank.
3. Repeat with an invalid username/password pair.

**Expected:** The application does not report a successful login and provides
an understandable validation/error response.

### TC-STORE-011 — Send a contact message

**Preconditions:** None.

1. Select **Contact**.
2. Enter synthetic contact email, name, and message.
3. Select **Send message** and accept any confirmation alert.

**Expected:** The contact form accepts the message and displays confirmation.

### TC-STORE-012 — Open and close About Us information

**Preconditions:** None.

1. Select **About us**.
2. Verify the information/video modal appears.
3. Close it using its close control.

**Expected:** The modal opens and closes without disrupting the store page.

### TC-STORE-013 — Check responsive layout and navigation

**Preconditions:** Browser developer tools or a mobile device is available.

1. Open the home page at desktop width and inspect navigation and product cards.
2. Resize to approximately 390x844.
3. Open the navigation menu and visit a category and the cart.

**Expected:** Content remains readable, controls can be reached and used, and
the navigation menu does not obscure essential content.

## Execution record

| ID | Run date | Browser/version | Status | Actual result / evidence | Defect ID |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## Automated test reports

Run `npm test` to execute all Playwright projects and generate the HTML report
in `allure-report/` automatically, including when tests fail. Use
`npm run report:allure` to open the generated report. Targeted commands such as
`npm run test:chromium` and `npm run test:api` also generate an Allure report.
The raw `allure-results/` files and generated HTML report are ignored by Git.
