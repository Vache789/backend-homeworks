-- Task 3.2 — books table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author_id INTEGER REFERENCES authors(id),
    price NUMERIC(10, 2) CHECK (price > 0),
    in_stock BOOLEAN DEFAULT TRUE,
    published_date DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);