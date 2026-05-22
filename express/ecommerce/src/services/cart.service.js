const path = require("node:path");
const { readDataFromFile, writeDataToFile } = require("../utils/fileHelper");

const fullPath = path.join(__dirname, "../data/carts.json");

function addToCart({ userId, productId, quantity }) {
  const carts = readDataFromFile(fullPath);

  const cartIndex = carts.findIndex((c) => c.userId === Number(userId));

  if (cartIndex === -1) {
    const newCart = {
      userId: Number(userId),
      products: [{ productId: Number(productId), quantity: Number(quantity) }],
    };
    carts.push(newCart);
  } else {
    const productIndex = carts[cartIndex].products.findIndex(
      (p) => p.productId === Number(productId),
    );

    if (productIndex === -1) {
      carts[cartIndex].products.push({
        productId: Number(productId),
        quantity: Number(quantity),
      });
    } else {
      carts[cartIndex].products[productIndex].quantity += Number(quantity);
    }
  }

  const success = writeDataToFile(fullPath, carts);
  if (!success) return null;

  return carts.find((c) => c.userId === Number(userId));
}

function getByUserId(user_id) {
  const carts = readDataFromFile(fullPath);

  const userCart = carts.find((c) => c.userId === Number(user_id));

  if (!userCart) {
    return { userId: Number(user_id), products: [] };
  }
  return userCart;
}

function removeFromCart(userId, productId) {
  const carts = readDataFromFile(fullPath);

  const cartIndex = carts.findIndex((c) => c.userId === Number(userId));

  if (cartIndex === -1) return false;

  carts[cartIndex].products = carts[cartIndex].products.filter(
    (c) => c.productId !== Number(productId),
  );

  return writeDataToFile(fullPath, carts);
}

function clearCart(userId) {
  const carts = readDataFromFile(fullPath);

  const cartIndex = carts.findIndex((c) => c.userId === Number(userId));

  if (cartIndex === -1) return false;

  carts[cartIndex].products = [];

  return writeDataToFile(fullPath, carts);
}

module.exports = {
  addToCart,
  getByUserId,
  removeFromCart,
  clearCart,
};
