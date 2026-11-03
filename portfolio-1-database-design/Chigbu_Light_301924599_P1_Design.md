# E-commerce Platform — database design

My case study records customers, products, orders, order_items.

## Users

- Customers browsing products and placing orders
- Shop staff reviewing orders and product sales

## Main operations

- Maintain customer and product records
- Place an order containing one or more products
- Review customer orders and aggregate product sales

## Entities

| Entity | Information stored |
| --- | --- |
| customers | Stores customer contact details. |
| products | Stores the shop catalog and current prices. |
| orders | Stores order-level details for a customer. |
| order_items | Stores products, quantities, and price snapshots for each order. |

## customers

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| customer_id | BIGINT | PK | Yes |
| email | TEXT | Unique | Yes |
| full_name | TEXT |  | Yes |
| created_at | TIMESTAMPTZ |  | Yes |
- Unique key: (email).

## products

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| product_id | BIGINT | PK | Yes |
| sku | TEXT | Unique | Yes |
| name | TEXT |  | Yes |
| unit_price | NUMERIC(18,2) |  | Yes |
| active | BOOLEAN |  | Yes |
- Unique key: (sku).

## orders

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| order_id | BIGINT | PK | Yes |
| customer_id | BIGINT | FK | Yes |
| placed_at | TIMESTAMPTZ |  | Yes |
| status | TEXT |  | Yes |
- customer_id → customers.customer_id

## order_items

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| item_id | BIGINT | PK | Yes |
| order_id | BIGINT | FK | Yes |
| product_id | BIGINT | FK | Yes |
| quantity | INTEGER |  | Yes |
| unit_price | NUMERIC(18,2) |  | Yes |
- order_id → orders.order_id
- product_id → products.product_id
- Unique key: (order_id, product_id).

## Relationships and business rules

- Each customer must have a non-null email address, and no two customers may share the same email.
- Each catalog product must have a distinct SKU.
- Every order must reference an existing customer through orders.customer_id to customers.customer_id.
- Every order item must reference an existing order through order_items.order_id to orders.order_id.
- Every order item must reference an existing product through order_items.product_id to products.product_id.
- An order can contain at most one line for a given product; a unique constraint resolves concurrent attempts to add duplicate lines.
- Each order line must have a quantity greater than zero.
- Each order-line price snapshot must be zero or greater.

## Assumptions

- Each order belongs to exactly one customer, and each order line references exactly one order and one product.
- An order line stores the product price at order time; later catalog price changes do not alter historical order lines.
- For a simple normalization example, use orders as the root with its customer_id foreign key: move customer name and email facts to customers, retain customer_id on orders, and keep order-specific facts on orders. This example uses one customer role.
- Separate benchmark plan: generate 50,000 synthetic orders, compare the same placed_at range workload before and after a B-tree index on orders.placed_at, verify identical result sets, and inspect the query plans.

