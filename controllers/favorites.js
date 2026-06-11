const Favorite = require("../models/favorites");
const mongoose = require("mongoose");

const getAllFavorites = async (req, res) => {
  try {

    const favorites = await Favorite.find({});
    return res.status(200).json(favorites);

  } catch (error) {

    return res.status(500).json({ message: error.message });

  }
};

const getSingleFavorite = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid favorite ID" });
    }

    const favorite = await Favorite.findById(id);

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    return res.status(200).json(favorite);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};

const createFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        message: "userId and productId are required"
      });
    }

    const favorite = await Favorite.create(req.body);

    return res.status(201).json({
      message: "Favorite created successfully",
      id: favorite._id
    });

  } catch (error) {

    if (error.name === "ValidationError") {
      return res.status(422).json({
        message: error.message,
      });
    }

    res.status(500).json({ message: error.message });

  }
};

const updateFavorite = async (req, res) => {
  try {

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid favorite ID" });
    }

    const favorite = await Favorite.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!favorite) {
      return res.status(404).json({
        message: "Favorite not found"
      });
    }

    return res.status(204).send();

  } catch (error) {

    if (error.name === "ValidationError") {
      return res.status(422).json({
        message: error.message,
      });
    }

    res.status(500).json({ message: error.message });

  }
};

const deleteFavorite = async (req, res) => {
  try {

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid favorite ID" });
    }

    const favorite = await Favorite.findByIdAndDelete(id);

    if (!favorite) {
      return res.status(404).json({
        message: "Favorite not found"
      });
    }

    return res.status(200).json({
      message: "Favorite deleted successfully"
    });
    
  } catch (error) {

    res.status(500).json({ message: error.message });
    
  }
};

module.exports = {
  getAllFavorites,
  getSingleFavorite,
  createFavorite,
  updateFavorite,
  deleteFavorite
};