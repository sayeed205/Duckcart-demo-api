const jwt = require("jsonwebtoken");
require("dotenv").config();

const Creator = require("../models/creatorModel");

/**
 * This function takes id from mongodb and return the json web token
 * @param {String} _id id from mongodb
 * @returns signed token
 */
const createJWT = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

/**
 * return all the creator as response of 200
 */
const getCreators = async (req, res) => {
  const creators = await Creator.find({}, { password: 0 }); //get all the creator excluding password field

  res.status(200).json(creators);
};

/**
 * This function Logs in a creator using username and password
 */
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

/**
 * This function signs up a creator using username and password
 */
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
