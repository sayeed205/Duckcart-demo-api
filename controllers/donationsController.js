const Donation = require("../models/donationModel");

// get all donations
const getDonations = async (req, res) => {
  const donations = await Donation.find({}).sort({ createdAt: -1 });

  res.status(200).json(donations);
};

// get a single creator donation
const getDonationTo = async (req, res) => {
  const { toCreator } = req.params;

  const donations = await Donation.find({ toCreator });

  if (donations.length === 0) {
    return res
      .status(404)
      .json({
        error: `Didn't find the creator ${toCreator} or you haven't made a donation to ${toCreator}`,
      });
  }

  res.status(200).json(donations);
};

// create a donation
const createDonation = async (req, res) => {
  const { fromCreator, toCreator, currency, amount, name, message } = req.body;

  // add document to db
  try {
    const donation = await Donation.create({
      fromCreator,
      toCreator,
      currency,
      amount,
      name,
      message,
    });
    return res.status(200).json(donation);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = { getDonations, createDonation, getDonationTo };
