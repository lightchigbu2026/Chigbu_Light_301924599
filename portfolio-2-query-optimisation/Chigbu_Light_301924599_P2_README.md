# E-commerce Platform — SQL queries

## 1. Show related orders, customers, order_items, products records (up to 20).

```sql
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
```

| orders_order_id | orders_placed_at | customers_customer_id | customers_email | order_items_item_id | order_items_quantity | products_product_id | products_sku |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 301 | 2026-02-01T14:15:00+00:00 | 101 | ava@example.test | 401 | 2 | 201 | MUG-001 |
| 302 | 2026-02-02T16:45:00+00:00 | 102 | leo@example.test | 402 | 1 | 202 | TEE-001 |

## 2. Find customers records where email matches "ava@example.test" (up to 20).

```sql
SELECT * FROM portfolio."customers"
WHERE "email" IS NOT DISTINCT FROM 'ava@example.test'
ORDER BY "customer_id"
LIMIT 20;
```

| customer_id | email | full_name | created_at |
| --- | --- | --- | --- |
| 101 | ava@example.test | Ava Chen | 2026-01-10T09:00:00+00:00 |

## 3. Count order_items records for each order_id (up to 20 groups).

```sql
SELECT "order_id", count(*) AS record_count
FROM portfolio."order_items"
GROUP BY "order_id"
ORDER BY record_count DESC, "order_id" NULLS LAST
LIMIT 20;
```

| order_id | record_count |
| --- | --- |
| 301 | 1 |
| 302 | 1 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 2.449 | 2.33, 2.449, 3.01 | Sort → Seq Scan | 274 |
| After index | 0.326 | 0.33, 0.301, 0.326 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 55 |

The median execution time changed from 2.449 ms to 0.326 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=2.3..2.304 rows=50 loops=1)
  Seq Scan on orders (actual time=0.019..2.264 rows=50 loops=1)
Planning Time: 0.353 ms
Execution Time: 2.33 ms
```

### Before index, run 2

```text
Sort (actual time=2.42..2.423 rows=50 loops=1)
  Seq Scan on orders (actual time=0.019..2.38 rows=50 loops=1)
Planning Time: 0.352 ms
Execution Time: 2.449 ms
```

### Before index, run 3

```text
Sort (actual time=2.976..2.979 rows=50 loops=1)
  Seq Scan on orders (actual time=0.026..2.926 rows=50 loops=1)
Planning Time: 0.471 ms
Execution Time: 3.01 ms
```

### After index, run 1

```text
Sort (actual time=0.273..0.276 rows=50 loops=1)
  Bitmap Heap Scan on orders (actual time=0.037..0.235 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.015..0.016 rows=50 loops=1)
Planning Time: 0.532 ms
Execution Time: 0.33 ms
```

### After index, run 2

```text
Sort (actual time=0.247..0.25 rows=50 loops=1)
  Bitmap Heap Scan on orders (actual time=0.036..0.209 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.015..0.015 rows=50 loops=1)
Planning Time: 0.574 ms
Execution Time: 0.301 ms
```

### After index, run 3

```text
Sort (actual time=0.27..0.273 rows=50 loops=1)
  Bitmap Heap Scan on orders (actual time=0.036..0.232 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.016..0.016 rows=50 loops=1)
Planning Time: 0.538 ms
Execution Time: 0.326 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Chigbu_Light_301924599_P2_Queries.sql, then Chigbu_Light_301924599_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Chigbu_Light_301924599_P2_QueryResults.png) · [Index comparison](screenshots/Chigbu_Light_301924599_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

