const { Pool } = require("pg");
const env = require("./env.js");

const pool = new Pool({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    port: env.DB_PORT,
});

pool.on('connect', () => {
    console.log("PostgreSQL database connected successfully!");
});

module.exports = pool;