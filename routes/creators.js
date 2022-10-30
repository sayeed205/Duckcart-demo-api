const Express = require("express");

const router = Express.Router();

const { getCreators } = require("../controllers/creatorsController");

router.get("/", getCreators);

module.exports = router;
