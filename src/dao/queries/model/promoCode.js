const mongoose = require("mongoose");

const promoCodeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      allowNull: true,
    },
    code: {
      type: String,
      allowNull: true,
    },
  },
  { timestamps: true }
);

const PromoCode = mongoose.model("PromoCode", promoCodeSchema);

module.exports = PromoCode;
