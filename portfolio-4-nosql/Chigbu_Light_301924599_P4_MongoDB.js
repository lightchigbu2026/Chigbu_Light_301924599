// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("checkout_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("checkout_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "order_placed",
                    "item_added"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "order_items"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "item_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("checkout_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "order_placed",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "order_items",
            "key": {
                "item_id": 401
            },
            "snapshot": {
                "item_id": 401,
                "order_id": 301,
                "product_id": 201,
                "quantity": 2,
                "unit_price": 12.5
            }
        },
        "embedded": {},
        "references": {
            "orders": [
                {
                    "key": {
                        "order_id": 301
                    },
                    "via": [
                        "order_items.order_id → orders"
                    ]
                }
            ],
            "customers": [
                {
                    "key": {
                        "customer_id": 101
                    },
                    "via": [
                        "order_items.order_id → orders.customer_id → customers"
                    ]
                }
            ]
        },
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "item_added",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "order_items",
            "key": {
                "item_id": 401
            },
            "snapshot": {
                "item_id": 401,
                "order_id": 301,
                "product_id": 201,
                "quantity": 2,
                "unit_price": 12.5
            }
        },
        "embedded": {},
        "references": {
            "orders": [
                {
                    "key": {
                        "order_id": 301
                    },
                    "via": [
                        "order_items.order_id → orders"
                    ]
                }
            ],
            "customers": [
                {
                    "key": {
                        "customer_id": 101
                    },
                    "via": [
                        "order_items.order_id → orders.customer_id → customers"
                    ]
                }
            ]
        },
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "attributes": [
                {
                    "entity": "orders",
                    "key": {
                        "order_id": 301
                    },
                    "field": "status",
                    "value": "placed"
                }
            ],
            "examples": {
                "reason": "illustrative reason",
                "item_snapshot": "illustrative item_snapshot"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "order_placed",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "order_items",
            "key": {
                "item_id": 402
            },
            "snapshot": {
                "item_id": 402,
                "order_id": 302,
                "product_id": 202,
                "quantity": 1,
                "unit_price": 24
            }
        },
        "embedded": {},
        "references": {
            "orders": [
                {
                    "key": {
                        "order_id": 302
                    },
                    "via": [
                        "order_items.order_id → orders"
                    ]
                }
            ],
            "customers": [
                {
                    "key": {
                        "customer_id": 102
                    },
                    "via": [
                        "order_items.order_id → orders.customer_id → customers"
                    ]
                }
            ]
        },
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "item_added",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "order_items",
            "key": {
                "item_id": 402
            },
            "snapshot": {
                "item_id": 402,
                "order_id": 302,
                "product_id": 202,
                "quantity": 1,
                "unit_price": 24
            }
        },
        "embedded": {},
        "references": {
            "orders": [
                {
                    "key": {
                        "order_id": 302
                    },
                    "via": [
                        "order_items.order_id → orders"
                    ]
                }
            ],
            "customers": [
                {
                    "key": {
                        "customer_id": 102
                    },
                    "via": [
                        "order_items.order_id → orders.customer_id → customers"
                    ]
                }
            ]
        },
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "attributes": [
                {
                    "entity": "orders",
                    "key": {
                        "order_id": 302
                    },
                    "field": "status",
                    "value": "placed"
                }
            ],
            "examples": {
                "reason": "illustrative reason",
                "item_snapshot": "illustrative item_snapshot"
            }
        }
    }
]));
  await db.getCollection("checkout_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("checkout_events").find({"eventType":"order_placed"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("checkout_events").find({"source.key.item_id":401}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("checkout_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("checkout_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("checkout_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "order_placed",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "order_items",
        "key": {
            "item_id": 401
        },
        "snapshot": {
            "item_id": 401,
            "order_id": 301,
            "product_id": 201,
            "quantity": 2,
            "unit_price": 12.5
        }
    },
    "embedded": {},
    "references": {
        "orders": [
            {
                "key": {
                    "order_id": 301
                },
                "via": [
                    "order_items.order_id → orders"
                ]
            }
        ],
        "customers": [
            {
                "key": {
                    "customer_id": 101
                },
                "via": [
                    "order_items.order_id → orders.customer_id → customers"
                ]
            }
        ]
    },
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("checkout_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "order_placed",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "order_items",
        "key": {
            "item_id": 401
        },
        "snapshot": {
            "item_id": 401,
            "order_id": 301,
            "product_id": 201,
            "quantity": 2,
            "unit_price": 12.5
        }
    },
    "embedded": {},
    "references": {
        "orders": [
            {
                "key": {
                    "order_id": 301
                },
                "via": [
                    "order_items.order_id → orders"
                ]
            }
        ],
        "customers": [
            {
                "key": {
                    "customer_id": 101
                },
                "via": [
                    "order_items.order_id → orders.customer_id → customers"
                ]
            }
        ]
    },
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("checkout_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
