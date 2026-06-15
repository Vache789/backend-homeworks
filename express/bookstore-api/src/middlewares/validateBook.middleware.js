const AppError = require("../utils/AppError");

function validateBook(req, res, next) {
    const data = req.body;
    const errors = [];

    if (req.method === "POST" && (!data.title || data.title.trim() === "")) {
        errors.push("Title is required");
    } else if (data.title !== undefined && data.title.trim() === "") {
        errors.push("Title cannot be empty");
    }

    if (req.method === "POST" && data.author_id === undefined) {
        errors.push("Author ID is required");
    } else if (data.author_id !== undefined && typeof data.author_id !== "number") {
        errors.push("Author ID must be a number");
    }

    if (req.method === "POST" && data.price === undefined) {
        errors.push("Price is required");
    } else if (data.price !== undefined) {
        if (typeof data.price !== "number") {
            errors.push("Price must be a number");
        } else if (data.price <= 0) {
            errors.push("Price must be greater than 0");
        }
    }

    if (errors.length > 0) {
        return next(new AppError(errors.join(", "), 400));
    }

    next();
}

module.exports = validateBook;