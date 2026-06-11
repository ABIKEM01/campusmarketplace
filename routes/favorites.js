const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/auth");

const {
  getAllFavorites,
  getSingleFavorite,
  createFavorite,
  updateFavorite,
  deleteFavorite,
} = require("../controllers/favorites");

router.get("/", getAllFavorites);

router.get("/:id", getSingleFavorite);

router.post("/", isAuthenticated, createFavorite);

router.put("/:id", isAuthenticated, updateFavorite);

router.delete("/:id", isAuthenticated, deleteFavorite);

module.exports = router;
