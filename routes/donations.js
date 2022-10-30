const Express = require("express");
const {
  createDonation,
  getDonationTo,
  getDonations,
} = require("../controllers/donationsController");

const router = Express.Router();

router.get("/", getDonations);

router.get("/:toCreator", getDonationTo);

router.post("/", createDonation);

module.exports = router;
