const Product = require("../models/products");
const mongoose = require("mongoose");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    next(new Error(error));
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    next(new Error(error));
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { title, description, category, price, condition, sellerName } =
      req.body;

    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !condition ||
      !sellerName
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product created successfully",
      id: product._id,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(422).json({
        message: error.message,
      });
    }

    next(new Error(error));
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(204).send();
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(422).json({
        message: error.message,
      });
    }

    next(new Error(error));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(new Error(error));
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
