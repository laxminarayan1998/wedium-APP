const mongoose = require("mongoose");

const promoCodeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      allowNull: true,
      // required: [true, 'Please add a serviceId.'],
    },
    code: {
      type: String,
      allowNull: true,
    },
  },
  { timestamps: true }
);

//we need to create collection
const PromoCode = mongoose.model("promoCode", promoCodeSchema);

module.exports = PromoCode;
