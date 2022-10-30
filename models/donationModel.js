const { Schema, model } = require("mongoose");

const donationSchema = new Schema(
  {
    fromCreator: {
      type: String,
      required: true,
    },
    toCreator: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Donation", donationSchema);
