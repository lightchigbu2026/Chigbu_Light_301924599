# E-commerce Platform — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| customer_id | orders records (list) |
| --- | --- |
| 101 | [301] |
| 102 | [302] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| orders.order_id | orders.customer_id | orders.status | customers.customer_id | customers.email |
| --- | --- | --- | --- | --- |
| 301 | 101 | placed | 101 | ava@example.test |
| 302 | 102 | placed | 102 | leo@example.test |

Key: order_id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## orders_example

| orders.order_id | orders.customer_id | orders.status | customers.customer_id | customers.email |
| --- | --- | --- | --- | --- |
| 301 | 101 | placed | 101 | ava@example.test |
| 302 | 102 | placed | 102 | leo@example.test |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## customers

| customer_id | email | full_name | created_at |
| --- | --- | --- | --- |
| 101 | ava@example.test | Ava Chen | 2026-01-10T09:00:00+00:00 |
| 102 | leo@example.test | Leo Park | 2026-01-11T10:30:00+00:00 |

## products

| product_id | sku | name | unit_price | active |
| --- | --- | --- | --- | --- |
| 201 | MUG-001 | Ceramic Mug | 12.5 | true |
| 202 | TEE-001 | Cotton T-shirt | 24 | true |

## orders

| order_id | customer_id | placed_at | status |
| --- | --- | --- | --- |
| 301 | 101 | 2026-02-01T14:15:00+00:00 | placed |
| 302 | 102 | 2026-02-02T16:45:00+00:00 | placed |

## order_items

| item_id | order_id | product_id | quantity | unit_price |
| --- | --- | --- | --- | --- |
| 401 | 301 | 201 | 2 | 12.5 |
| 402 | 302 | 202 | 1 | 24 |

## Dependencies

- customers: (customer_id) → email, full_name, created_at
- products: (product_id) → sku, name, unit_price, active
- orders: (order_id) → customer_id, placed_at, status
- order_items: (item_id) → order_id, product_id, quantity, unit_price

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
