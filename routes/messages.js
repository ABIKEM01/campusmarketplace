const express = require("express");
const router = express.Router();

const {
  getAllMessages,
  getSingleMessage,
  createMessage,
  updateMessage,
  deleteMessage
} = require("../controllers/messages");

router.get("/", getAllMessages);

router.get("/:id", getSingleMessage);

router.post("/", createMessage);

router.put("/:id", updateMessage);

router.delete("/:id", deleteMessage);

module.exports = router;