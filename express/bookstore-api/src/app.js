const express = require("express");
const authorsRoutes = require("./routes/authors.routes");
const booksRoutes = require("./routes/books.routes");
const customersRoutes = require("./routes/customers.routes");
const errorMiddleware = require("./middlewares/error.middleware.js");

const app = express();

app.use(express.json());

app.use("/authors", authorsRoutes);
app.use("/books", booksRoutes); 

app.use("/customers", customersRoutes);

app.use(errorMiddleware);

module.exports = app;