const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "User ID is required"]
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, "Product ID is required"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Favorite', FavoriteSchema);