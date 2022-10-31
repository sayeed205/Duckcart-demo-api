const Express = require("express");

// controller functions
const {
  signupCreator,
  loginCreator,
  getCreators,
} = require("../controllers/creatorsController");

const router = Express.Router();

// login route
router.post("/login", loginCreator);

// signup route
router.post("/signup", signupCreator);

// get all the creators
router.get("/", getCreators);

module.exports = router;
