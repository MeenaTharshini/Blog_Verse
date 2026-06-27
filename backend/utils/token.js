const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_SECRET);
};

module.exports = {
  ACCESS_SECRET,
  REFRESH_SECRET,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};