const Products = require("../models/product");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Products.find({});
  return res.status(200).json(products);
});

const createProduct = asyncWrapper(async (req, res) => {
  const newProduct = await Products.create(req.body);
  return res.status(201).json(newProduct);
});

const deleteProduct = asyncWrapper(async (req, res, next) => {
  const product_id = req.params.id;
  const product = await Products.findOneAndDelete({ _id: product_id });
  if (!product)
    return next(createCustomError(`No product with id ${product_id}`, 404));
  return res.status(200).json(product);
});

const updateProduct = asyncWrapper(async (req, res, next) => {
  const product_id = req.params.id;
  const newName = req.body;
  const products = await Products.findOneAndUpdate(
    { _id: product_id },
    newName,
    {
      runValidators: true,
      returnDocument: "after",
    }
  );
  if (!products)
    return next(createCustomError(`No product with id ${product_id}`, 404));
  return res.status(200).json(products);
});

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
