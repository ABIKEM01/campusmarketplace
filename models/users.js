const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: [true, 'Name is required'],
    min: [6, 'Name must be at least 6 letters long']
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+@.+\..+/, 'Provide an email in the format username@domain.com']
  },

  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    min: [8, 'Phone number must be at least 8 characters']
  },

  role: {
    type: String,
    enum: {
      values: ['student', 'admin'],
      message: 'Role must be student or admin'
    },
    default: 'student'
  }
},
{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);