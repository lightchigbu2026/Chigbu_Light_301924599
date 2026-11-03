# E-commerce Platform — ER diagram

```mermaid
erDiagram
    direction LR
    customers {
        bigint customer_id PK
        text email UK
        text full_name
        timestamptz created_at
    }
    products {
        bigint product_id PK
        text sku UK
        text name
        numeric unit_price
        boolean active
    }
    orders {
        bigint order_id PK
        bigint customer_id FK
        timestamptz placed_at
        text status
    }
    order_items {
        bigint item_id PK
        bigint order_id FK
        bigint product_id FK
        integer quantity
        numeric unit_price
    }
    customers ||--o{ orders : "customer_id"
    orders ||--o{ order_items : "order_id"
    products ||--o{ order_items : "product_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Chigbu_Light_301924599_ERDiagram.png)
