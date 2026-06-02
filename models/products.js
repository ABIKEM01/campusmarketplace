const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  condition: {
    type: String,
    required: true
  },

  sellerName: {
    type: String,
    required: true
  }
},
{ timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);