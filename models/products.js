const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: [true, 'Title is required'],
    min: [7, 'Title must be at least 7 letters long']
  },

  description: {
    type: String,
    required: [true, 'Description is required'],
    min: [10, 'Description must be at least 10 letters long']
  },

  category: {
    type: String,
    required: [true, 'Category is required'],
    min: [3, 'Category must be at least 3 letters long']
  },

  price: {
    type: Number,
    required: [true, 'Price is required'],
    validate: {
      validator: Number.isFinite,
      message: 'Price must be a number'
    }
  },

  condition: {
    type: String,
    required: [true, 'Condition is required'],
    enum: {
      values: ['New', 'Used', 'Worn'],
      message: 'Condition must be: New, Used or Worn',
    },
    default: 'Used'
  },

  sellerName: {
    type: String,
    required: [true, 'Seller name is requires'],
    min: [6, 'Seller name must be at least 6 letters']
  }
},
{ timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);