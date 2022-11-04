const JWT = require("jsonwebtoken");
require("dotenv").config();

const Creator = require("../models/creatorModel");

/**
 * this is a middleware to provide authentication to api routes
 */
const requireAuth = async (req, res, next) => {
  // authentication verification
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: "Authorization token required" });

  const token = authorization.split(" ")[1];

  try {
    const { _id } = JWT.verify(token, process.env.JWT_SECRET);
    req.creator = await Creator.findOne({ _id }).select("username");

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: err.message });
  }
};

module.exports = { requireAuth };
