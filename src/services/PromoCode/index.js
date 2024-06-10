const { getAllPromoCode } = require("../PromoCode/function");

// retrieve and return all PromoCode
const getPromoCodeList = async (req, res, next) => {
  getAllPromoCode()
    .then((PromoCode) => {
      console.log(PromoCode);
      res.status(200).json({
        data: PromoCode,
        success: true,
        message: null,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Error Occurred while retriving PromoCode information",
      });
      next(err);
    });
};

module.exports = {
  getPromoCodeList,
};
