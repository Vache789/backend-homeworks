const path = require("node:path");
const { readDataFromFile, writeDataToFile } = require("../utils/fileHelper");

const fullPath = path.join(__dirname, "../data/products.json");

function getAll() {
  return readDataFromFile(fullPath);
}

function getById(id) {
  const products = readDataFromFile(fullPath);
  return products.find((p) => p.id === parseInt(id));
}

function create(productData) {
  const products = readDataFromFile(fullPath);

  const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const newProduct = {
    id: newId,
    name: productData.name,
    price: Number(productData.price),
    category: productData.category,
  };

  products.push(newProduct);
  const success = writeDataToFile(fullPath, products);

  if (!success) return null;
  return newProduct;
}

function update(id, updateData) {
  const products = getAll();
  const index = products.findIndex((p) => p.id === parseInt(id));

  if (index === -1) return null;

  products[index] = {
    ...products[index],
    name: updateData.name || products[index].name,
    price: updateData.price ? Number(updateData.price) : products[index].price,
    category: updateData.category || products[index].category,
  };

  const success = writeDataToFile(fullPath, products);
  if (!success) return null;

  return products[index];
}

function remove(id) {
    const products = readDataFromFile(fullPath);

    const exists = products.some(p => p.id === parseInt(id));
    if (!exists) return false;

    const fileProducts = products.filter(p => p.id !== parseInt(id));

    const success = writeDataToFile(fullPath, fileProducts);
    return success;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
