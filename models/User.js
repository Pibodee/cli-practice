const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
  email: { type: String, require: true },

  password: { type: String, require: true },

  refresh_token: { type: String },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
  ],
});

schema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // console.log(this)
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("user", schema);

module.exports = { User };
