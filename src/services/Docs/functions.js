const dbServices = require("../../dao/queries/index");


// get All PromoCode +
const getAllDocument = async () => {
    try {
      const dbResponse = await dbServices.PromoCode.getAllDocument();
      return dbResponse;
    } catch (err) {
      throw new Error(err);
    }
  };


  module.exports = {
    getAllDocument
  };