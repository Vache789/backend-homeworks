const AppError = require("../utils/AppError");

module.exports = (req, res, next) => {
    const { name, email } = req.body;

    if (req.method === "POST" && (!name || typeof name !== 'string' || name.trim() === '')) {
        return next(new AppError("Name is required and cannot be empty", 400));
    }
    if (req.method === "PATCH" && name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
        return next(new AppError("Name cannot be empty", 400));
    }

    if (req.method === "POST" && (!email || typeof email !== 'string' || !email.includes('@'))) {
        return next(new AppError("A valid email address is required", 400));
    }
    if (req.method === "PATCH" && email !== undefined && (typeof email !== 'string' || !email.includes('@'))) {
        return next(new AppError("A valid email address is required", 400));
    }

    next();
};