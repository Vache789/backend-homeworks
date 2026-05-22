const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller.js");

router.post("/:user_id", cartController.addItemToCart);

router.get("/:user_id", cartController.getCart);

router.delete("/:user_id/items/:product_id", cartController.deleteCartItem);
router.delete("/:user_id", cartController.clearUserCart);

module.exports = router;
