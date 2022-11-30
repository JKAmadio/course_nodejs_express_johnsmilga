// mongoose is an optional library that facilitates the setup with MongoDB
const mongoose = require("mongoose");

// connectDB function that will be executed at app.js before running the server
const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
