const path = require("node:path");
require("dotenv").config({
    path: path.resolve(__dirname, "../../.env"),
    quiet: true,
});

module.exports = {
    PORT: process.env.PORT,
    DB_PORT: process.env.DB_PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
};