const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/auth");

const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.post("/", isAuthenticated, createUser);

router.put("/:id", isAuthenticated, updateUser);

router.delete("/:id", isAuthenticated, deleteUser);

module.exports = router;
