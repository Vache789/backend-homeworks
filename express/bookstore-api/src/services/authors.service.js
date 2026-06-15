const db = require('../configs/db.js');

async function getAllAuthors() {
    const result = await db.query("SELECT * FROM authors");
    return result.rows;
}

async function getAuthorById(id) {
    const result = await db.query("SELECT * FROM authors WHERE id = $1", [id]);
    return result.rows[0];
}

async function createAuthor(name, birth_year, country) {
    const result = await db.query(
        `
        INSERT INTO authors(name, birth_year, country)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [name, birth_year, country]
    );

    return result.rows[0];
}

async function updateAuthor(id, name, birth_year, country) {
    const result = await db.query(
        `
        UPDATE authors
        SET name = $1,
            birth_year = $2,
            country = $3
        WHERE id = $4
        RETURNING *
        `,
        [name, birth_year, country, id]
    );

    return result.rows[0];
}

async function deleteAuthor(id) {
    const result = await db.query(
        "DELETE FROM authors WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0]; 
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};