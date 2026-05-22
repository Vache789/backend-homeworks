const path = require("node:path");
const { readDataFromFile, writeDataToFile } = require("../utils/fileHelper");

const ordersPath = path.join(__dirname, "../data/orders.json");
const cartsPath = path.join(__dirname, "../data/carts.json");
const productsPath = path.join(__dirname, "../data/products.json");

function createOrder(userId) {
  const orders = readDataFromFile(ordersPath);
  const carts = readDataFromFile(cartsPath);
  const products = readDataFromFile(productsPath);

  const cartIndex = carts.findIndex((c) => c.userId === Number(userId));
  if (cartIndex === -1 || carts[cartIndex].products.length === 0) {
    return { error: "Cart is empty" };
  }

  const cartProducts = carts[cartIndex].products;
  let totalAmount = 0;
  const orderItems = [];

  for (const item of cartProducts) {
    const product = products.find((p) => p.id === Number(item.productId));

    if (!product) {
      return { error: `Product with ID ${item.productId} not found` };
    }

    if (product.stock_quantity < item.quantity) {
      return { error: `Not enough stock for product: ${product.name}` };
    }

    totalAmount += product.price * item.quantity;

    orderItems.push({
      productId: product.id,
      quantity: item.quantity,
      priceAtPurchase: product.price,
    });

    product.stock_quantity -= item.quantity;
  }

  const newOrder = {
    id: orders.length + 1,
    userId: Number(userId),
    orderDate: new Date().toISOString(),
    totalAmount: totalAmount,
    status: "pending",
    items: orderItems,
  };

  orders.push(newOrder);

  carts[cartIndex].products = [];

  writeDataToFile(ordersPath, orders);
  writeDataToFile(cartsPath, carts);
  writeDataToFile(productsPath, products);

  return { success: true, order: newOrder };
}

function getUserOrders(userId) {
    const orders = readDataFromFile(ordersPath);

    return orders.filter((order) => orders.userId === Number(userId));
}

function getOrderById(id) {
  const orders = readDataFromFile(ordersPath);

  return orders.find((order) => order.id === Number(id)) || null;
}

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById
};
