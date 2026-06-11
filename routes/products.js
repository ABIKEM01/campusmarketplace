const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/auth");

const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

router.get("/", getAllProducts);

router.get("/:id", getSingleProduct);

router.post("/", isAuthenticated, createProduct);

router.put("/:id", isAuthenticated, updateProduct);

router.delete("/:id", isAuthenticated, deleteProduct);

module.exports = router;
