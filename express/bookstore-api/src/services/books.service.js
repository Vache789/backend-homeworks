const db = require('../configs/db.js');

async function getAllBooks() {
    const result = await db.query("SELECT * FROM books ORDER BY id ASC;");
    return result.rows;
}

async function getBookById(id) {
    const result = await db.query("SELECT * FROM books WHERE id = $1;", [id]);
    return result.rows[0];
}

async function createBook(title, author_id, price, in_stock, published_date) {
    const result = await db.query(
        `
        INSERT INTO books (title, author_id, price, in_stock, published_date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
        [title, author_id, price, in_stock !== undefined ? in_stock : true, published_date]
    );
    return result.rows[0];
}

async function updateBook(id, title, author_id, price, in_stock, published_date) {
    const result = await db.query(
        `
        UPDATE books
        SET title = $1,
            author_id = $2,
            price = $3,
            in_stock = $4,
            published_date = $5
        WHERE id = $6
        RETURNING *;
        `,
        [title, author_id, price, in_stock, published_date, id]
    );
    return result.rows[0];
}

async function deleteBook(id) {
    const result = await db.query(
        "DELETE FROM books WHERE id = $1 RETURNING *;",
        [id]
    );
    return result.rows[0];
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};