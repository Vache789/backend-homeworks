const db = require('../configs/db.js');

async function getAllCustomers() {
    const result = await db.query("SELECT * FROM customers ORDER BY id ASC;");
    return result.rows;
}

async function getCustomerById(id) {
    const result = await db.query("SELECT * FROM customers WHERE id = $1;", [id]);
    return result.rows[0];
}

async function createCustomer(name, email, phone) {
    const result = await db.query(
        `INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3) RETURNING *;`,
        [name, email, phone]
    );
    return result.rows[0];
}

async function updateCustomer(id, name, email, phone) {
    const result = await db.query(
        `
        UPDATE customers
        SET
            name = COALESCE($2, name),
            email = COALESCE($3, email),
            phone = COALESCE($4, phone)
        WHERE id = $1
        RETURNING *;
        `,
        [
            id,
            name ?? null,
            email ?? null,
            phone ?? null
        ]
    );

    return result.rows[0];
}

async function deleteCustomer(id) {
    const result = await db.query("DELETE FROM customers WHERE id = $1 RETURNING *;", [id]);
    return result.rows[0];
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};