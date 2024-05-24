const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      require: true,
      unique: true,
      type: String,
    },
    name: {
      type: String,
      require: true,
    },
    password: {
      require: false,
      type: String,
    },
    authSource: {
      type: String,
      enum: ["google", "self"],
      default: "self",
    },
  },
  { timestamp: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
