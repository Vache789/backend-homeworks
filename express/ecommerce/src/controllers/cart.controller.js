const cartService = require("../services/cart.service.js");

function addItemToCart(req, res) {
  try {
    const userId = req.params.user_id;
    const { productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res
        .status(400)
        .json({ message: "userId, productId, and quantity are required" });
    }

    const updatedCart = cartService.addToCart({ userId, productId, quantity });

    if (!updatedCart) {
      return res
        .status(500)
        .json({ message: "Internal Server Error while updating cart" });
    }

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function getCart(req, res) {
  try {
    const user_id = req.params.user_id;
    const userCart = cartService.getByUserId(user_id);
    res.status(200).json(userCart);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function deleteCartItem(req, res) {
  try {
    userId = req.params.user_id;
    productId = req.params.product_id;

    const success = cartService.removeFromCart(userId, productId);

    if (!success) {
      return res.status(404).json({ message: "Cart or product not found" });
    }

    res.status(200).json({ message: "Product successfully removed from cart" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function clearUserCart(req, res) {
  try {
    userId = req.params.user_id;

    const success = cartService.clearCart(userId);

    if (!success) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  addItemToCart,
  getCart,
  deleteCartItem,
  clearUserCart,
};
