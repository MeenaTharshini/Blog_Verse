const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

    req.user = {
      id: String(decoded.id),
      email: decoded.email,
      name: decoded.name,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};