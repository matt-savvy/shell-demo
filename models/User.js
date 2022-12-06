const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    // username
    username: { type: String, unique: true, required: true },
    // email
    email: { type: String, unique: true, required: true },
    // password
    password: { type: String, required: true },
    // roles
    roles: {
      type: [{ type: String, enum: ["Admin", "User"] }],
      default: ["User"],
    },
  },
  { strictQuery: true }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
