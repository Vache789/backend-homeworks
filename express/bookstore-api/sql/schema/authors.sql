-- Task 3.1 — authors table
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    birth_year INTEGER CHECK (birth_year BETWEEN 1000 AND 2100),
    country TEXT DEFAULT 'Unknown'
);