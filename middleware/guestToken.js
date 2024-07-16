const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

module.exports = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(498)
          .json({ error: "Token expired", message: "Please log in again" });
      }
      return res.status(403).json({
        message: `Forbidden: Invalid token`,
      });
    }

    if (user.deviceModel) {
      req.user = user;
      next();
    } else {
      return res.status(403).json({
        message:
          "Forbidden: You are not allowed to access this resource.",
      });
    }
  });
};
