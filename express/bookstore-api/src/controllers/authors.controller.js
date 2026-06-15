const authorsService = require('../services/authors.service.js');

async function getAllAuthors(req, res, next) {
    try {
        const authors = await authorsService.getAllAuthors();
        res.status(200).json(authors);
    } catch (err) {
        next(err);
    }
}

async function getAuthorById(req, res, next) {
    try {
        const { id } = req.params;
        const author = await authorsService.getAuthorById(id);

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        return res.status(200).json(author);
    } catch (err) {
        next(err);
    }
}

async function createAuthor(req, res, next) {
    try {
        const { name, birth_year, country } = req.body;
        const author = await authorsService.createAuthor(name, birth_year, country);
        
        res.status(201).json(author);
    } catch (err) {
        next(err);
    }
}

async function updateAuthor(req, res, next) {
    try {
        const { name, birth_year, country } = req.body;
        const { id } = req.params;

        const author = await authorsService.updateAuthor(id, name, birth_year, country);

        if (!author) {
            return res.status(404).json({ message: "Author not found to update" });
        }

        res.status(200).json(author);
    } catch (err) {
        next(err);
    }
}

async function deleteAuthor(req, res, next) {
    try {
        const { id } = req.params;
        const author = await authorsService.deleteAuthor(id);

        if (!author) {
            return res.status(404).json({ message: "Author not found to delete" });
        }

        res.status(200).json(author);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};