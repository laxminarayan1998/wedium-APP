// config.js

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "yourdefaultsecret",
  guestUser: { id: 0, username: "guest" },
};
