const Express = require("express");

// controller functions
const {
  signupCreator,
  loginCreator,
} = require("../controllers/creatorsController");

const router = Express.Router();

// login route
router.post("/login", loginCreator);

// signup route
router.post("/signup", signupCreator);

module.exports = router;
