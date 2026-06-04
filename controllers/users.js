const User = require("../models/users");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    throw new Error(error);
  }
};

const getSingleUser = async (req, res) => {
  try {

    const id = req.params.id;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid user ID'
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    throw new Error(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "name, email and phone are required",
      });
    }

    const user = await User.create(req.body);

    res.status(201).json({
      message: "User created successfully",
      id: user._id,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    if(error.name === 'ValidationError') {
      return res.status(422).json({
        message: error.message
      });
    }

    throw new Error(error);
  }
};

const updateUser = async (req, res) => {
  try {
    
    const id = req.params.id;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid user ID'
      });
    }
    
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(204).send();
  } catch (error) {

    if(error.name === 'ValidationError') {
      return res.status(422).json({
        message: error.message
      });
    }

    throw new Error(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    
    const id = req.params.id;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid user ID'
      });
    }
    
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
