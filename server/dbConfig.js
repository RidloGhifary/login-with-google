const mongoose = require("mongoose");

const connectMongoDb = async (str) => {
  try {
    await mongoose.connect(str);
    return console.log("Database connected");
  } catch (err) {
    return console.log(err);
  }
};

module.exports = connectMongoDb;
