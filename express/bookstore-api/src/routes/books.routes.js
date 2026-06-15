const router = require("express").Router();
const booksController = require("../controllers/books.controller");
const validateBook = require("../middlewares/validateBook.middleware");

router.get("/", booksController.getAllBooks);
router.get("/:id", booksController.getBookById);
router.post("/", validateBook, booksController.createBook);
router.patch("/:id", validateBook, booksController.updateBook);
router.delete("/:id", booksController.deleteBook);

module.exports = router;