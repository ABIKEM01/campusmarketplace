const express = require("express");
const router = express.Router();

const {
  getAllMessages,
  getSingleMessage,
  createMessage,
  updateMessage,
  deleteMessage
} = require("../controllers/messages");
const isAuthenticated = require('../middleware/auth');

router.get("/", getAllMessages);

router.get("/:id", getSingleMessage);

router.post("/", isAuthenticated,createMessage);

router.put("/:id", isAuthenticated,updateMessage);

router.delete("/:id", isAuthenticated,deleteMessage);

module.exports = router;