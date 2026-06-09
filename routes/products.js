const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const isAuthenticated = require('../middleware/auth');

router.get("/", getAllProducts);

router.get("/:id", getSingleProduct);

router.post("/",  isAuthenticated,createProduct);

router.put("/:id",isAuthenticated, updateProduct);

router.delete("/:id", isAuthenticated, deleteProduct);

module.exports = router;
