const express = require("express");
const router = express.Router();

const {
  getAllFavorites,
  getSingleFavorite,
  createFavorite,
  updateFavorite,
  deleteFavorite
} = require("../controllers/favorites");

router.get("/", getAllFavorites);

router.get("/:id", getSingleFavorite);

router.post("/", createFavorite);

router.put("/:id", updateFavorite);

router.delete("/:id", deleteFavorite);

module.exports = router;