const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");
const Guest = require("../models/guest");

const { validationResult, check } = require("express-validator");

exports.guestLogin = async (req, res) => {
  const data = {
    deviceModel: req.body.deviceModel,
    os: req.body.os,
    platform: req.body.platform,
  };
  try {
    const token = jwt.sign(data, jwtSecret, {
      expiresIn: "1y",
    });

    const guest = new Guest(data);

    await guest.save();
    res.json({ token: token });
  } catch (err) {
    if ((err.name = "ValidationError")) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

exports.validationUserCheck = [
  check("userName").notEmpty().withMessage("Please enter yor userName"),
];
