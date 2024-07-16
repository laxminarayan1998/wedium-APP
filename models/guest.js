const mongoose = require("mongoose");

const guestScheme = new mongoose.Schema(
  {
    deviceModel: {
      type: String,
      required: true,
    },
    os: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Guest = mongoose.model("Guest", guestScheme);

module.exports = Guest;
