const { getAllPromoCode, createPromoCodefunction } = require("../PromoCode/function");

// Retrieve and return all PromoCodes
const getPromoCodeList = async (req, res, next) => {
  try {
    const promoCodes = await getAllPromoCode();
    res.status(200).json({
      data: promoCodes,
      success: true,
      message: null,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error occurred while retrieving PromoCode information",
    });
    next(err);
  }
};

// Create PromoCode
const createPromoCode = async (req, res, next) => {
  try {
    const promoCodeData = req.body; // Assuming you're sending data in the request body
    const newPromoCode = await createPromoCodefunction(promoCodeData);
    res.status(201).json({
      data: newPromoCode,
      success: true,
      message: "PromoCode created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error occurred while creating PromoCode",
    });
    next(err);
  }
};

module.exports = {
  getPromoCodeList,
  createPromoCode,
};
