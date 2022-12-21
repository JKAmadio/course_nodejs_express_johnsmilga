const Products = require("../models/product");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllProducts = asyncWrapper(async (req, res) => {
  // to garantee that we only search for existing properties
  // we destructure the queries to get only the product props
  // we include the sort query to make the sorting feature
  // we include the fields query to make the selecting feature
  // we include the numericFilters query to make the filter feature
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  let queryObject = {};

  // the query comes as string, so we need to manage the boolean value
  if (featured) queryObject.featured = featured === "true" ? true : false;

  if (company) queryObject.company = company;

  // we can use regex operators to make more complex searchs
  // in this case we ar looking for products that contain the letters we pass
  // https://www.mongodb.com/docs/manual/reference/operator/query/regex/#-regex
  if (name) queryObject.name = { $regex: name, $options: "i" };

  if (numericFilters) {
    //https://www.mongodb.com/docs/manual/reference/operator/query-comparison/
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };

    // we use regex and replace to transform the user query string to another
    // input: price>40,rating>=4 -> output: price-$gt-40,rating-$gte-4
    const regEx = /\b(>|>=|<|<=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-` // we include an hifen at the start and at the end to be able to split later
    );

    // we use split and array destructuring to mount the find sentence
    // input: price-$gt-40,rating-$gte-4 -> output queryObject[price] = { $gt : 40 } and queryObject[rating] = { $gte : 4 }
    const allowedOptions = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (allowedOptions.includes(field))
        // we must use "[]" around the operator to use its value and not the 'operator' string
        queryObject[field] = { [operator]: Number(value) };
    });
  }

  // we pass the queryObject as the find parameter
  // we remove the "await" keyword and pass it at the end of the result
  let result = Products.find(queryObject);

  // we must garantee that the sort will be executed only when the user passes the sort query
  // and the sort property must be chainned to the find function
  // https://mongoosejs.com/docs/queries.html#executing
  if (sort) {
    const sortList = sort.replace(",", " ");
    result = result.sort(sortList);
  }

  // we must garantee that the select will be executed only when the user passes the fields query
  // and the select property must be chainned to the find function
  // https://mongoosejs.com/docs/queries.html#executing
  if (fields) {
    const fieldsList = fields.replace(",", " ");
    result = result.select(fieldsList);
  }

  // if no limit query is passed we stablish its value
  // and the limit property must be chainned to the find function
  // https://mongoosejs.com/docs/queries.html#executing
  const limit = Number(req.query.limit) || 10;

  // if no page query is passed we stablish its value
  // and the page property must be chainned to the find function
  // https://mongoosejs.com/docs/api.html#query_Query-skip
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

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
