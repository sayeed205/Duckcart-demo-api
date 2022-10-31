const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const creatorSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static signup method
creatorSchema.statics.signup = async function (
  username,
  password,
  confirmPassword
) {
  // validation
  if (!validator.matches(username, "^[a-zA-Z0-9_.-]*$"))
    throw Error("username is not valid. only a-z, A-Z, 0-9, _, ., - supported");

  const exists = await this.findOne({ username });
  if (exists) throw Error("username already exists");

  if (!validator.isStrongPassword(password))
    throw Error("Password not strong enough");

  if (password !== confirmPassword)
    throw Error("password and confirm password didn't match");

  // salting and hashing the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const creator = await this.create({ username, password: hash });

  return creator;
};

module.exports = model("Creator", creatorSchema);
