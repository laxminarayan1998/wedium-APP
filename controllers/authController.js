const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");
const Guest = require("../models/guest");
const admin = require("firebase-admin");

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

exports.getJwt = async (req, res) => {
  const idToken = req.body.token;

  try {
    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const provider = decodedToken.firebase.sign_in_provider;

    console.log(`Token verified for user ${uid} signed in with ${provider}`);

    // Generate custom token
    const customToken = jwt.sign({ uid, provider }, jwtSecret, {
      expiresIn: "1y",
    });

    res.status(200).json({ customToken, provider });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.adminGenerateToken = async (req, res) => {
  const { uid, provider } = req.body;

  if (!uid || !provider) {
    return res.status(400).json({ error: "UID and provider are required" });
  }

  try {
    // Generate custom token
    const customToken = jwt.sign({ uid, provider }, jwtSecret, {
      expiresIn: "1y",
    });

    res.status(200).json({ customToken });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.validationUserCheck = [
  check("userName").notEmpty().withMessage("Please enter yor userName"),
];
