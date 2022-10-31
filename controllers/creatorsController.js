const jwt = require("jsonwebtoken");
require("dotenv").config();

const Creator = require("../models/creatorModel");

const createJWT = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// get all the creators
const getCreators = async (req, res) => {
  const creators = await Creator.find({}, { password: 0 });

  res.status(200).json({ creators });
};

// login creator
const loginCreator = async (req, res) => {
  const { username, password } = req.body;

  try {
    const creator = await Creator.login(username, password);

    const token = createJWT(creator._id);

    res.status(200).json({ username, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// signup creator
const signupCreator = async (req, res) => {
  const { username, password, confirmPassword, profileURL, profession } =
    req.body;

  try {
    const creator = await Creator.signup(
      username,
      password,
      confirmPassword,
      profileURL,
      profession
    );

    // create jwt
    const token = createJWT(creator._id);

    res.status(200).json({ username, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { loginCreator, signupCreator, getCreators };
