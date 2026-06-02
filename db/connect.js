const mongoose = require('mongoose');

const connectDB = async (url) => {
  await mongoose.connect(url);

  console.log('MongoDB Connected');
};

module.exports = connectDB;