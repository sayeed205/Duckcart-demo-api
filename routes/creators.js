const Express = require("express");

const router = Express.Router();

router.get("/", (req, res) => {
  res.json({ mssg: "GET all the creators" });
});

module.exports = router;
