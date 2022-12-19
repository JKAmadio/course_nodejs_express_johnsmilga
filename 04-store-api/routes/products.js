const express = require("express");
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/products");

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").delete(deleteProduct).patch(updateProduct);
module.exports = router;
