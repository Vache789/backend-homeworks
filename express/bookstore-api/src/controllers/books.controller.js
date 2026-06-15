const booksService = require('../services/books.service.js');

async function getAllBooks(req, res, next) {
    try {
        const books = await booksService.getAllBooks();
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
}

async function getBookById(req, res, next) {
    try {
        const { id } = req.params;
        const book = await booksService.getBookById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
}

async function createBook(req, res, next) {
    try {
        const { title, author_id, price, in_stock, published_date } = req.body;
        const book = await booksService.createBook(title, author_id, price, in_stock, published_date);
        
        res.status(201).json(book);
    } catch (err) {
        next(err);
    }
}

async function updateBook(req, res, next) {
    try {
        const { title, author_id, price, in_stock, published_date } = req.body;
        const { id } = req.params;

        const book = await booksService.updateBook(id, title, author_id, price, in_stock, published_date);

        if (!book) {
            return res.status(404).json({ message: "Book not found to update" });
        }

        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
}

async function deleteBook(req, res, next) {
    try {
        const { id } = req.params;
        const book = await booksService.deleteBook(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found to delete" });
        }

        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};