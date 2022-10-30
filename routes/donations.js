const Express = require("express");

const router = Express.Router();

router.get("/", (req, res) => {
  res.json({ mssg: "GET all Donations" });
});

router.get("/:id", (req, res) => {
  res.json({ mssg: "GET a single Donation" });
});

router.post("/", (req, res) => {
  res.json({ mssg: "POST a Donation" });
});

module.exports = router;
