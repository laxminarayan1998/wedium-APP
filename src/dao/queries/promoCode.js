const promoCode = require("./model/promoCode");
// const promoCode = require("./model/city");
const mongoose = require("mongoose");

const getAllPromoCode = async () => await promoCode.find();
const createPromoCode = (promoCodeData) => promoCode.create(promoCodeData);

module.exports = {
    getAllPromoCode,
    createPromoCode,
  };