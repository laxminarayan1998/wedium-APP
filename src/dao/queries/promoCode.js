const promoCode = require("./model/promoCode");
// const promoCode = require("./model/city");
const mongoose = require("mongoose");

const getAllPromoCode = async () => await promoCode.find();

const createPromoCode = async (promoCodeData) => {
  const promoCode = new PromoCode(promoCodeData);
  return await promoCode.save();
};
module.exports = {
    getAllPromoCode,
    createPromoCode,
  };