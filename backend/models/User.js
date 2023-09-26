const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  confirmed: Boolean,
  firstName: String,
  lastName: String,
});

module.exports = mongoose.model("User", userSchema);
