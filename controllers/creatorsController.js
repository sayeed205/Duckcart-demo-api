const Creator = require("../models/creatorModel");

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

    res.status(200).json({ username, creator });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { loginCreator, signupCreator };
