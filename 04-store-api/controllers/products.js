const Products = require("../models/product");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllProducts = asyncWrapper(async (req, res) => {
  // to garantee that we only search for existing properties
  // we destructure the queries to get only the product props
  // we include the sort query to make the sorting feature
  const { featured, company, name, sort } = req.query;
  let queryObject = {};

  // the query comes as string, so we need to manage the boolean value
  if (featured) queryObject.featured = featured === "true" ? true : false;

  if (company) queryObject.company = company;

  // we can use regex operators to make more complex searchs
  // in this case we ar looking for products that contain the letters we pass
  // https://www.mongodb.com/docs/manual/reference/operator/query/regex/#-regex
  if (name) queryObject.name = { $regex: name, $options: "i" };

  // we pass the queryObject as the find parameter
  // we remove the "await" keyword and pass it at the end of the result
  let result = Products.find(queryObject);

  // we must garantee that the sort will be executed only when the user pass the sort query
  // and the sort property must be chainned to the find function
  // https://mongoosejs.com/docs/queries.html#executing
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }

  // we pass the "await" keyword to this point to garantee the whole DB return (find and sort)
  const products = await result;
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
