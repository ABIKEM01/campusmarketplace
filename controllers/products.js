const Product = require("../models/products");

const { handleErrors } = require("../utilities");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    throw new Error(error);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    throw new Error(error);
  }
};

const createProduct = async (req, res) => {
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
    throw new Error(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
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
    throw new Error(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
