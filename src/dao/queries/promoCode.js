const promoCode = require("./model/promoCode");
// const promoCode = require("./model/city");
const mongoose = require("mongoose");

const getAllPromoCode = async () => await promoCode.find();

const createPromoCode = async (promoCodeData) => {
  try {
    const promoCode = new PromoCode(promoCodeData);
    return await promoCode.save();
  } catch (err) {
    throw new Error(`Error saving promo code: ${err.message}`);
  }
};
module.exports = {
    getAllPromoCode,
    createPromoCode,
  };