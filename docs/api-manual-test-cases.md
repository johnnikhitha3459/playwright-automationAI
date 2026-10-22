# DemoBlaze Product API Manual Test Cases

These cases cover read-only product API operations. Run them using Postman,
Insomnia, or another HTTP client. The API is a public demo service; do not use
these cases to send real customer data or perform real transactions.

## Environment

- Base URL: `https://api.demoblaze.com`
- Header for POST requests: `Content-Type: application/json`
- For POST, select raw JSON as the request body.

| ID | Priority | Method and endpoint | Purpose |
|---|---|---|---|
| TC-API-001 | High | `GET /entries` | Retrieve the complete product catalog |
| TC-API-002 | High | `POST /bycat` | Filter products by supported category |
| TC-API-003 | High | `POST /view` | Retrieve details for a known product |
| TC-API-004 | Medium | `POST /bycat` | Verify an unsupported category returns no products |

## Detailed test cases

### TC-API-001 — Retrieve the complete product catalog

**Request**

- Method: `GET`
- URL: `https://api.demoblaze.com/entries`
- Body: none

**Steps**

1. Send the request.
2. Inspect status code, response body, and product records.

**Expected**

- Response status is successful (normally `200`).
- Response is JSON with an `Items` array containing products.
- Each product has an `id`, `title`, `price`, `cat`, `desc`, and `img`.
- Product IDs are unique in the returned catalog.

### TC-API-002 — Filter products by supported category

Run once for each of `phone`, `notebook`, and `monitor`.

**Request**

- Method: `POST`
- URL: `https://api.demoblaze.com/bycat`
- Header: `Content-Type: application/json`
- Body:

```json
{
  "cat": "phone"
}
```

Replace `"phone"` with `"notebook"` or `"monitor"` for the other runs.

**Steps**

1. Send the request with a supported category.
2. Inspect the response status and `Items`.

**Expected**

- Response status is successful (normally `200`).
- Response contains an `Items` array.
- Every returned product has `cat` equal to the requested category.
- The array contains at least one product for the currently supported categories.

### TC-API-003 — Retrieve details for a known product

**Request**

- Method: `POST`
- URL: `https://api.demoblaze.com/view`
- Header: `Content-Type: application/json`
- Body:

```json
{
  "id": "1"
}
```

**Steps**

1. Send the request for product ID `1`.
2. Inspect the response body.

**Expected**

- Response status is successful (normally `200`).
- Response describes the requested product with matching `id` and non-empty
  `title`, `cat`, and `desc`, and a numeric `price`.

### TC-API-004 — Unsupported category returns no products

**Request**

- Method: `POST`
- URL: `https://api.demoblaze.com/bycat`
- Header: `Content-Type: application/json`
- Body:

```json
{
  "cat": "not-a-real-category"
}
```

**Steps**

1. Send the request with an unsupported category.
2. Inspect status code and response body.

**Expected**

- Request completes without a server error.
- Response contains an empty `Items` array.

## Execution record

| ID | Run date | Client/version | Status | Actual result / evidence | Defect ID |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
