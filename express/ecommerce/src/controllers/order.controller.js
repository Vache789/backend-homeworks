const orderService = require("../services/order.service.js");

function placeOrder(req, res) {
  try {
    const userId = req.params.user_id;

    const result = orderService.createOrder(userId);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    res.status(201).json({
      message: "Order placed successfully",
      order: result.order,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function getUserOrdersHistory(req, res) {
  try {
    const userId = req.params.user_id;
    const history = orderService.getUserOrders(userId);
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function getSingleOrder(req, res) {
  try {
    const id = req.params.id;
    const order = orderService.getOrderById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  placeOrder,
  getUserOrdersHistory,
  getSingleOrder,
};
