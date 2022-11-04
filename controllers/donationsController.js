const paginatedResults = require("./paginationController");
const Donation = require("../models/donationModel");

/**
 * send response of 200 with all the donation of a logged in creator
 */
const getDonations = async (req, res) => {
  const filters = {};
  const options = {};
  const donations = await paginatedResults(req, Donation, { filters, options });

  res.status(200).json(donations);
};

/**
 * send response of 200 with all the donation of a logged in creator
 * filtered by donation to creator
 *
 * sends response of 404 with error message of not found
 */
const getDonationTo = async (req, res) => {
  const { toCreator } = req.params;

  const filters = { toCreator };
  const options = {};
  const donations = await paginatedResults(req, Donation, { filters, options });

  if (donations.currentPage > donations.totalPages && donations.totalPages > 0)
    return res.status(404).json({
      error: `You are trying to open page ${donations.currentPage} but total page ${donations.totalPages}`,
    });

  if (donations.results.length === 0)
    return res.status(404).json({
      error: `Didn't find the creator '${toCreator}' or you haven't made a donation to '${toCreator}'`,
    });

  res.status(200).json(donations);
};

/**
 * makes a donation to a creator using
 *
 * toCreator - whom to donate
 *
 * currency - payment currency
 *
 * amount - amount of donation
 *
 * name(optional) - name of creator
 *
 * message(optional) - message of the donation
 */
const createDonation = async (req, res) => {
  const { toCreator, currency, amount, name, message } = req.body;

  let emptyFields = [];
  if (!toCreator) emptyFields.push("toCreator");
  if (!currency) emptyFields.push("currency");
  if (!amount) emptyFields.push("amount");

  if (emptyFields.length > 0)
    return res
      .status(400)
      .json({ error: "Please fill all the empty fields", emptyFields });

  // add document to db
  try {
    const fromCreator = req.creator.username;
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
