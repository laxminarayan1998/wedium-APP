const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authenticationToken");
const guestToken = require("../middleware/guestToken");

router.post("/guestLogin", authController.guestLogin);

module.exports = router;
