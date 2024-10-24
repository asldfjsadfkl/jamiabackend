const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
  },

  phone: {
    type: Number,
    required: [true, "Phone required"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  role: {
    type: String,
    default: "user",
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  return await bcrypt.hash(this.password, 12);
});

// compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = USER = mongoose.model("USER", userSchema);
