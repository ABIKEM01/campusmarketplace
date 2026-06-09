const Message = require("../models/messages");
const mongoose = require("mongoose");

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleMessage = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid message ID"
      });
    }

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found"
      });
    }

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMessage = async (req, res) => {
  try {
    const {
      senderId,
      receiverId,
      productId,
      message
    } = req.body;

    if (
      !senderId ||
      !receiverId ||
      !productId ||
      !message
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const newMessage = await Message.create(req.body);

    res.status(201).json({
      message: "Message created successfully",
      id: newMessage._id
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const updateMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!message) {
      return res.status(404).json({
        message: "Message not found"
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(
      req.params.id
    );

    if (!message) {
      return res.status(404).json({
        message: "Message not found"
      });
    }

    res.status(200).json({
      message: "Message deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllMessages,
  getSingleMessage,
  createMessage,
  updateMessage,
  deleteMessage
};