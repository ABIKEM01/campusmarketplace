const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const { handleErrors } = require("../utilities/");

router.get("/", handleErrors(getAllProducts));

router.get("/:id", handleErrors(getSingleProduct));

router.post("/", handleErrors(createProduct));

router.put("/:id", handleErrors(updateProduct));

router.delete("/:id", handleErrors(deleteProduct));

module.exports = router;
