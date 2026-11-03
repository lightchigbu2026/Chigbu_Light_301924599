-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. reject customer pk. Expected: pk_customers, SQLSTATE 23505.
INSERT INTO portfolio."customers" ("customer_id", "email", "full_name", "created_at")
VALUES (101, 'fresh-customer@example.test', 'Nia Reed', '2026-03-01T09:00:00Z');

-- 2. reject customer email. Expected: uq_customers_0, SQLSTATE 23505.
INSERT INTO portfolio."customers" ("customer_id", "email", "full_name", "created_at")
VALUES (91001, 'ava@example.test', 'Mia Stone', '2026-03-02T09:00:00Z');

-- 3. reject customer email null. Expected: email, SQLSTATE 23502.
INSERT INTO portfolio."customers" ("customer_id", "email", "full_name", "created_at")
VALUES (91002, NULL, 'Sam Lee', '2026-03-03T09:00:00Z');

-- 4. reject product pk. Expected: pk_products, SQLSTATE 23505.
INSERT INTO portfolio."products" ("product_id", "sku", "name", "unit_price", "active")
VALUES (201, 'MUG-999', 'Travel Mug', 15, TRUE);

-- 5. reject product sku. Expected: uq_products_0, SQLSTATE 23505.
INSERT INTO portfolio."products" ("product_id", "sku", "name", "unit_price", "active")
VALUES (91003, 'MUG-001', 'Another Mug', 13, TRUE);

-- 6. reject order pk. Expected: pk_orders, SQLSTATE 23505.
INSERT INTO portfolio."orders" ("order_id", "customer_id", "placed_at", "status")
VALUES (301, 102, '2026-03-04T09:00:00Z', 'placed');

-- 7. reject order customer fk. Expected: fk_orders_0, SQLSTATE 23503.
INSERT INTO portfolio."orders" ("order_id", "customer_id", "placed_at", "status")
VALUES (91004, 99999, '2026-03-05T09:00:00Z', 'placed');

-- 8. reject item pk. Expected: pk_order_items, SQLSTATE 23505.
INSERT INTO portfolio."order_items" ("item_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (401, 302, 201, 3, 10);

-- 9. reject item order product unique. Expected: uq_order_items_0, SQLSTATE 23505.
INSERT INTO portfolio."order_items" ("item_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (91005, 302, 202, 2, 24);

-- 10. reject item order fk. Expected: fk_order_items_0, SQLSTATE 23503.
INSERT INTO portfolio."order_items" ("item_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (91006, 99999, 201, 1, 12.5);

-- 11. reject item product fk. Expected: fk_order_items_1, SQLSTATE 23503.
INSERT INTO portfolio."order_items" ("item_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (91007, 301, 99999, 1, 12.5);

-- 12. reject item quantity check. Expected: line_quantity_positive, SQLSTATE 23514.
INSERT INTO portfolio."order_items" ("item_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (91008, 302, 201, 0, 12.5);

-- 13. reject item price check. Expected: line_price_nonnegative, SQLSTATE 23514.
INSERT INTO portfolio."order_items" ("item_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (91009, 302, 201, 1, -1);
