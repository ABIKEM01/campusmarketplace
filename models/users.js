const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [6, "Name must be at least 6 characters long"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+@.+\..+/, "Provide a valid email address"]
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minlength: [8, "Phone number must be at least 8 characters"]
    },

    role: {
      type: String,
      enum: {
        values: ["student", "admin"],
        message: "Role must be student or admin"
      },
      default: "student"
    },

    profileImage: {
      type: String,
      default: ""
    },

    githubId: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);