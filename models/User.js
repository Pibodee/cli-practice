const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: { type: String, require: true },
  refresh_token: { type: String },
  password: { type: String, require: true},
});

const User = mongoose.model('user', schema);


module.exports = {User}