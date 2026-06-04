const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const { handleErrors } = require("../utilities/");

router.get("/", handleErrors(getAllUsers));

router.get("/:id", handleErrors(getSingleUser));

router.post("/", handleErrors(createUser));

router.put("/:id", handleErrors(updateUser));

router.delete("/:id", handleErrors(deleteUser));

module.exports = router;
