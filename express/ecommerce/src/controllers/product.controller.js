const productService = require("../services/product.service.js");

function getAllProducts(req, res) {
  const products = productService.getAll();
  res.status(200).json(products);
}

function getProductById(req, res) {
  const product = productService.getById(req.params.id);

  if (!product) {
    return res.status(404).json({ message : "Product not found" });
  }

  res.status(200).json(product);
}

function createProduct(req, res) {
  try {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ message : "Missing required fields: name, price, or category" });
    }

    const newProduct = productService.create({ name, price, category });

    if (!newProduct) {
      return res
        .status(500)
        .json({ message: "Internal Server Error while saving" });
    }

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message : "Internal Server Error" });
  }
}

function updateProduct(req, res) {
    const updateProduct = productService.update(req.params.id, req.body);

    if (!updateProduct) {
        return res.status(404).json({ message : "Product not found or could not update"})
    }

    res.status(200).json(updateProduct);
}

function deleteProduct(req, res) {
    const success = productService.remove(req.params.id);

    if (!success) {
        return res.status(404).json({ message : "Product not found or could not deleted"});
    }

    res.status(200).json({ message: "Product successfully deleted" });
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
