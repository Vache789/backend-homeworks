CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    registered_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);