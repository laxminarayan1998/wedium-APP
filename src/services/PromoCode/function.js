const dbServices = require("../../dao/queries/index");

// Get All PromoCodes
const getAllPromoCode = async () => {
  try {
    const dbResponse = await dbServices.getAllPromoCode();
    return dbResponse;
  } catch (err) {
    throw new Error(err);
  }
};

// Create PromoCode
const createPromoCodefunction = async (promoCodeData) => {
  try {
    const dbResponse = await dbServices.createPromoCode(promoCodeData);
    return dbResponse;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllPromoCode,
  createPromoCodefunction,
};
