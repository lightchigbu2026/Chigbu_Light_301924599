-- Show related orders, customers, order_items, products records (up to 20).
SELECT t0."order_id" AS "orders_order_id",
       t0."placed_at" AS "orders_placed_at",
       t3."customer_id" AS "customers_customer_id",
       t3."email" AS "customers_email",
       t1."item_id" AS "order_items_item_id",
       t1."quantity" AS "order_items_quantity",
       t2."product_id" AS "products_product_id",
       t2."sku" AS "products_sku"
FROM portfolio."orders" t0
JOIN portfolio."order_items" t1 ON t1."order_id" = t0."order_id"
JOIN portfolio."products" t2 ON t1."product_id" = t2."product_id"
JOIN portfolio."customers" t3 ON t0."customer_id" = t3."customer_id"
ORDER BY t0."order_id", t3."customer_id", t1."item_id", t2."product_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT t0."order_id" AS "orders_order_id",
       t0."placed_at" AS "orders_placed_at",
       t3."customer_id" AS "customers_customer_id",
       t3."email" AS "customers_email",
       t1."item_id" AS "order_items_item_id",
       t1."quantity" AS "order_items_quantity",
       t2."product_id" AS "products_product_id",
       t2."sku" AS "products_sku"
FROM portfolio."orders" t0
JOIN portfolio."order_items" t1 ON t1."order_id" = t0."order_id"
JOIN portfolio."products" t2 ON t1."product_id" = t2."product_id"
JOIN portfolio."customers" t3 ON t0."customer_id" = t3."customer_id"
ORDER BY t0."order_id", t3."customer_id", t1."item_id", t2."product_id"
LIMIT 20;

-- Find customers records where email matches "ava@example.test" (up to 20).
SELECT * FROM portfolio."customers"
WHERE "email" IS NOT DISTINCT FROM 'ava@example.test'
ORDER BY "customer_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."customers"
WHERE "email" IS NOT DISTINCT FROM 'ava@example.test'
ORDER BY "customer_id"
LIMIT 20;

-- Count order_items records for each order_id (up to 20 groups).
SELECT "order_id", count(*) AS record_count
FROM portfolio."order_items"
GROUP BY "order_id"
ORDER BY record_count DESC, "order_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "order_id", count(*) AS record_count
FROM portfolio."order_items"
GROUP BY "order_id"
ORDER BY record_count DESC, "order_id" NULLS LAST
LIMIT 20;
