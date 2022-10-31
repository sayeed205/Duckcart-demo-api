const jwt = require("jsonwebtoken");
require("dotenv").config();

const Creator = require("../models/creatorModel");

const createJWT = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// login creator
const loginCreator = async (req, res) => {
  res.json({ mssg: "login user " });
};

// signup creator
const signupCreator = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (username.length === 0)
    return res.status(400).json({ error: "username needed" });
  if (password.length === 0)
    return res.status(400).json({ error: "password needed" });
  if (confirmPassword.length === 0)
    return res.status(400).json({ error: "confirm password needed" });

  try {
    const creator = await Creator.signup(username, password, confirmPassword);

    // create jwt
    const token = createJWT(creator._id);

    res.status(200).json({ username, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { loginCreator, signupCreator };
