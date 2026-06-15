const router = require("express").Router();
const authorsController = require("../controllers/authors.controller");

router.get("/", authorsController.getAllAuthors);
router.get("/:id", authorsController.getAuthorById);
router.post("/", authorsController.createAuthor);
router.patch("/:id", authorsController.updateAuthor);
router.delete("/:id", authorsController.deleteAuthor);

module.exports = router;