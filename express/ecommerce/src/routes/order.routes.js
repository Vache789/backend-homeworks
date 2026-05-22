const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller.js");

router.post("/:user_id", orderController.placeOrder);

router.get("/:user_id", orderController.getUserOrdersHistory);

router.get("/order/:id", orderController.getSingleOrder);

module.exports = router;
