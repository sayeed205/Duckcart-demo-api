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
  profileURL: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
});

// Static signup method
creatorSchema.statics.signup = async function (
  username,
  password,
  confirmPassword,
  profileURL,
  profession
) {
  // validation
  if (!username) throw Error("username needed");
  if (!password) throw Error("password needed");
  if (!confirmPassword) throw Error("confirm password needed");
  if (!profileURL) throw Error("profileURL  needed");
  if (!profession) throw Error("profession needed");

  if (!validator.isURL(profileURL)) throw Error("profileURL is not valid");

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

  const creator = await this.create({
    username,
    password: hash,
    profileURL,
    profession,
  });

  return creator;
};

// static login method
creatorSchema.statics.login = async function (username, password) {
  if (!username) throw Error("username needed");
  if (!password) throw Error("password needed");

  const creator = await this.findOne({ username });
  if (!creator) throw Error("Incorrect username");

  const match = await bcrypt.compare(password, creator.password);

  if (!match) throw Error("Incorrect password");

  return creator;
};

module.exports = model("Creator", creatorSchema);
