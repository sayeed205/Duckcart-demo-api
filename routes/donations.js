const Express = require("express");
const {
  createDonation,
  getDonationTo,
  getDonations,
} = require("../controllers/donationsController");
const { requireAuth } = require("../middleware/requireAuth");

const router = Express.Router();

router.use(requireAuth);

router.get("/", getDonations);

router.get("/:toCreator", getDonationTo);

router.post("/", createDonation);

module.exports = router;
