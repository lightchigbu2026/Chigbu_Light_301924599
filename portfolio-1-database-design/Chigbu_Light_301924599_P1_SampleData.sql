-- Fictional sample records for E-commerce Platform.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."customers" ("customer_id", "email", "full_name", "created_at") VALUES (101, 'ava@example.test', 'Ava Chen', '2026-01-10T09:00:00Z');
INSERT INTO portfolio."customers" ("customer_id", "email", "full_name", "created_at") VALUES (102, 'leo@example.test', 'Leo Park', '2026-01-11T10:30:00+00:00');
INSERT INTO portfolio."products" ("product_id", "sku", "name", "unit_price", "active") VALUES (201, 'MUG-001', 'Ceramic Mug', 12.5, TRUE);
INSERT INTO portfolio."products" ("product_id", "sku", "name", "unit_price", "active") VALUES (202, 'TEE-001', 'Cotton T-shirt', 24, TRUE);
INSERT INTO portfolio."orders" ("order_id", "customer_id", "placed_at", "status") VALUES (301, 101, '2026-02-01T14:15:00Z', 'placed');
INSERT INTO portfolio."orders" ("order_id", "customer_id", "placed_at", "status") VALUES (302, 102, '2026-02-02T16:45:00+00:00', 'placed');
INSERT INTO portfolio."order_items" ("item_id", "order_id", "product_id", "quantity", "unit_price") VALUES (401, 301, 201, 2, 12.5);
INSERT INTO portfolio."order_items" ("item_id", "order_id", "product_id", "quantity", "unit_price") VALUES (402, 302, 202, 1, 24);
COMMIT;
