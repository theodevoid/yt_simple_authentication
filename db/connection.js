const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose.connect("mongodb://localhost:27017/yt-simple-auth");
};

module.exports = {
  connectDB,
};
